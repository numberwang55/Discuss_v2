"use server"

import type {Topic} from "@prisma/client"
import {redirect} from "next/navigation";
import {z} from "zod"
import {auth} from "@/auth"
import {db} from "@/db"
import paths from "@/paths";
import {revalidatePath} from "next/cache";

const createTopicSchema = z.object({
    name: z.string().min(3).regex(/[a-z-]/, "Name must be lowercase and can only contain letters and dashes"),
    description: z.string().min(10),
})

interface CreateTopicFormState {
    errors: {
        name?: string[]
        description?: string[]
        _form?: string[]
    }
}

export async function createTopic(formState: CreateTopicFormState, formData: FormData): Promise<CreateTopicFormState> {

    await new Promise((resolve) => setTimeout(resolve, 2000))

    const name = formData.get("name")
    const description = formData.get("description")

    const result = createTopicSchema.safeParse({
        name,
        description
    })

    if (!result.success) {
        return {
            errors: result.error.flatten().fieldErrors
        }
    }

    const session = await auth()

    if (!session || !session.user) {
        return {
            errors: {
                _form: ["You must be signed in to create a topic"]
            }
        }
    }

    let topic: Topic
    try {
        topic = await db.topic.create({
            data: {
                slug: result.data.name,
                description: result.data.description
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
                    _form: ["Something went wrong"]
                }
            }
        }
    }

    revalidatePath("/")
    redirect(paths.topicShow(topic.slug))
}