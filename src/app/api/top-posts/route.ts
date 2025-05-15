import { NextResponse } from 'next/server';
import { db } from '@/db';

export async function GET() {
    try {
        const posts = await db.post.findMany({
            orderBy: [{
                comments: {
                    _count: 'desc'
                }
            }],
            include: {
                topic: {select: {slug: true}},
                user: {select: {name: true, image: true}},
                _count: {select: {comments: true}},
            },
            take: 5
        })
        return NextResponse.json(posts);
    } catch (error) {
        console.error("Error fetching topics:", error);
        return NextResponse.json({ error: "Failed to fetch topics" }, { status: 500 });
    }
}