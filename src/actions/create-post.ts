"use server"

import {db} from "@/db"
import type {Post} from "@prisma/client"
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";
import {z} from "zod"
import {auth} from "@/auth";
import paths from "@/paths";

const createPostSchema = z.object({
    title: z.string().min(3, {message: "Title is required"}),
    content: z.string().min(10, {message: "Content is required"}),
})

interface CreatePostFormState {
    errors: {
        title?: string[]
        content?: string[]
        _form?: string[]
    }
}

export async function createPost(slug: string, formState: CreatePostFormState, formData: FormData): Promise<CreatePostFormState> {
    const result = createPostSchema.safeParse({
        title: formData.get("title"),
        content: formData.get("content"),
    })

    const session = await auth()
    if (!session || !session.user) {
        return {
            errors: {
                _form: ["You must be signed in to create a post"]
            }
        }
    }

    if (!result.success) {
        return {
            errors: result.error.flatten().fieldErrors
        }

    }

    const topic = await db.topic.findFirst({
        where: {
            slug: slug,
        },
    })

    if (!topic) {
        return {
            errors: {
                _form: ["Topic not found"]
            }
        }
    }

    let post: Post
    try {
        post = await db.post.create({
            data: {
                title: result.data.title,
                content: result.data.content,
                userId: session.user.id || "",
                topicId: topic.id,
            }
        })
    } catch (error: unknown) {
        if (error instanceof Error) {
            return {
                errors: {
                    _form: [error.message]
                }
            }
        } else {
            return {
                errors: {
                    _form: ["Failed to create post"]
                }
            }
        }
    }

    revalidatePath(paths.topicShow(slug))
    redirect(paths.postShow(slug, post.id))

    // TODO: revalidate topicShow page
}