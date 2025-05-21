// import PostCreateForm from "@/components/posts/post-create-form";
// import {fetchPostsByTopicSlug} from "@/db/queries/posts";
// import PostList from "@/components/posts/post-list";
//
// interface TopicShowPageProps {
//     params: {
//         slug: string
//     }
// }
//
// export default async function TopicShowPage({params}: TopicShowPageProps) {
//     const {slug} = params
//     return (
//         <div className="grid grid-cols-4 gap-4 p-4">
//             <div className="col-span-3">
//                 <h1 className="text-2xl font-bold mb-2">{slug}</h1>
//                 {/*<PostList fetchData={() => fetchPostsByTopicSlug(slug)}></PostList>*/}
//                 <PostList topicSlug={slug}></PostList>
//             </div>
//             <div>
//                 <PostCreateForm slug={slug}/>
//             </div>
//         </div>
//     )
// }

"use client";

import { useParams } from 'next/navigation';
import PostCreateForm from "@/components/posts/post-create-form";
import PostList from "@/components/posts/post-list";

interface TopicShowPageProps {
    params: {
        slug: string | string[] | undefined; // Update the type to reflect possible array
    }
}

export default function TopicShowPage() {
    const { slug } = useParams();

    // Safely get the slug as a string
    const topicSlug = Array.isArray(slug) ? slug[0] : slug;

    if (!topicSlug) {
        return <div>Loading topic...</div>; // Or some other fallback UI
    }

    return (
        <div className="grid grid-cols-4 gap-4 p-4">
            <div className="col-span-3">
                <h1 className="text-2xl font-bold mb-2">{topicSlug}</h1>
                {/*<PostList topicSlug={topicSlug} />*/}
                <PostList action={() => fetch(`/api/posts/${topicSlug}`)} />
            </div>
            <div>
                <PostCreateForm slug={topicSlug} />
            </div>
        </div>
    );
}