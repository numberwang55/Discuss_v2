const paths = {
    home() {
        return "/"
    },
    topicShow(slug: string) {
        return `/topics/${slug}`
    },
    postCreate(slug: string) {
        return `/topics/${slug}/posts/new`
    },
    postShow(slug: string, postId: string) {
        return `/topics/${slug}/posts/${postId}`
    }
}

export default paths

import { db } from "@/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const topics = await db.topic.findMany();
        return NextResponse.json(topics);
    } catch (error) {
        console.error("Error fetching topics:", error);
        return NextResponse.json({ error: "Failed to fetch topics" }, { status: 500 });
    }
}