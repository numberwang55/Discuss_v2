// import { NextResponse } from 'next/server';
// import { db } from '@/db';
//
// export async function GET() {
//     try {
//         const posts = await db.post.findMany({
//             orderBy: [{
//                 comments: {
//                     _count: 'desc'
//                 }
//             }],
//             include: {
//                 topic: {select: {slug: true}},
//                 user: {select: {name: true, image: true}},
//                 _count: {select: {comments: true}},
//             },
//             take: 5
//         })
//         return NextResponse.json(posts);
//     } catch (error) {
//         console.error("Error fetching topics:", error);
//         return NextResponse.json({ error: "Failed to fetch topics" }, { status: 500 });
//     }
// }

// src/app/api/topics/[slug]/posts/route.ts
import { NextResponse } from 'next/server';
import { db } from '@/db';

interface Params {
    slug?: string;
}

export async function GET(request: Request, {slug}: Params) {
    if (!slug) {
        return NextResponse.json({ error: "Missing topic slug" }, { status: 400 });
    }

    console.log("slug in GET req is: ", slug)

    try {
        const posts = await db.post.findMany({
            where: { topic: { slug: slug } },
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