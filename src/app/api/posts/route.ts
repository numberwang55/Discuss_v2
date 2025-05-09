import { NextResponse } from 'next/server';
import { db } from '@/db';

export async function GET(slug: string) {
    try {
        const topics = await db.post.findMany({
            where: {topic: {slug}},
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
        return NextResponse.json(topics);
    } catch (error) {
        console.error("Error fetching topics:", error);
        return NextResponse.json({ error: "Failed to fetch topics" }, { status: 500 });
    }
}