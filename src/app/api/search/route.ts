import { NextResponse } from 'next/server';
import { db } from '@/db';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const term = searchParams.get('term'); // Get the 'term' query parameter

    if (!term) {
        // If no search term is provided, you might return an empty array,
        // or a default list (e.g., popular posts), or an error.
        return NextResponse.json({ error: "Search term is required" }, { status: 400 });
    }

    try {
        const posts = await db.post.findMany({
            include: {
                topic: { select: { slug: true } },
                user: { select: { name: true, image: true } },
                _count: { select: { comments: true } },
            },
            where: {
                OR: [{ title: { contains: term } }, { content: { contains: term } }],
            },
        });
        return NextResponse.json(posts);
    } catch (error) {
        console.error("Error fetching search results:", error);
        return NextResponse.json({ error: "Failed to fetch search results" }, { status: 500 });
    }
}