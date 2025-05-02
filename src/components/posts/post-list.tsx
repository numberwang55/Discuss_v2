// import type {Post, User, Topic} from '@prisma/client';
// import Link from 'next/link';
// import paths from '@/paths';
// import type {PostWithData} from '@/db/queries/posts';
//
// interface PostListProps {
//     fetchData: () => Promise<PostWithData[]>;
// }
//
// // TODO: Get list of posts into this component somehow
// export default async function PostList({fetchData}: PostListProps) {
//     const posts = await fetchData();
//
//     const renderedPosts = posts.map((post) => {
//         const topicSlug = post.topic.slug;
//
//         if (!topicSlug) {
//             throw new Error('Need a slug to link to a post');
//         }
//
//         return (
//             <div key={post.id} className="border rounded p-2">
//                 <Link href={paths.postShow(topicSlug, post.id)}>
//                     <h3 className="text-lg font-bold">{post.title}</h3>
//                     <div className="flex flex-row gap-8">
//                         <p className="text-xs text-gray-400">By {post.user.name}</p>
//                         <p className="text-xs text-gray-400">
//                             {post._count.comments} comments
//                         </p>
//                     </div>
//                 </Link>
//             </div>
//         );
//     });
//
//     return <div className="space-y-2">{renderedPosts}</div>;
// }

"use client"

import type {Post, User, Topic} from '@prisma/client';
import Link from 'next/link';
import paths from '@/paths';
import type {PostWithData} from '@/db/queries/posts';
import { useEffect, useState } from 'react';

interface PostListProps {
    fetchData: () => Promise<PostWithData[]>;
}

// TODO: Get list of posts into this component somehow
export default function PostList({fetchData}: PostListProps) {
    const [posts, setPosts] = useState<PostWithData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchPosts() {
            try {
                const data = await fetch('/api/posts');;
                setPosts(data);
                setLoading(false);
            } catch (e: any) {
                setError(e.message || "Failed to fetch posts");
                setLoading(false);
            }
        }

        fetchPosts();
    }, [fetchData]);

    if (loading) {
        return <div>Loading topics...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const renderedPosts = posts.map((post) => {
        const topicSlug = post.topic.slug;

        if (!topicSlug) {
            throw new Error('Need a slug to link to a post');
        }

        return (
            <div key={post.id} className="border rounded p-2">
                <Link href={paths.postShow(topicSlug, post.id)}>
                    <h3 className="text-lg font-bold">{post.title}</h3>
                    <div className="flex flex-row gap-8">
                        <p className="text-xs text-gray-400">By {post.user.name}</p>
                        <p className="text-xs text-gray-400">
                            {post._count.comments} comments
                        </p>
                    </div>
                </Link>
            </div>
        );
    });

    return <div className="space-y-2">{renderedPosts}</div>;
}
