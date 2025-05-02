// import Link from "next/link";
// import {Chip} from "@nextui-org/react";
// import {db} from "@/db";
// import paths from "@/paths";
//
// export default async function TopicList() {
//     const topics = await db.topic.findMany()
//
//     const renderedTopics = topics.map((topic) => {
//         return (
//             <div key={topic.id}>
//                 <Link href={paths.topicShow(topic.slug)}>
//                     <Chip color="warning" variant="shadow">
//                         {topic.slug}
//                     </Chip>
//                 </Link>
//             </div>
//         )
//     })
//
//     return (
//         <div className='flex flex-row gap-2 flex-wrap'>
//             {renderedTopics}
//         </div>
//     )
// }

"use client"

import Link from "next/link";
import { Chip } from "@nextui-org/react";
import paths from "@/paths";
import { useEffect, useState } from 'react';

interface Topic {
    id: string;
    slug: string;
}

export default function TopicList() {
    const [topics, setTopics] = useState<Topic[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchTopics() {
            try {
                const response = await fetch('/api/topics'); // Adjust the URL if needed
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data: Topic[] = await response.json();
                setTopics(data);
                setLoading(false);
            } catch (e: any) {
                setError(e.message || "Failed to fetch topics");
                setLoading(false);
            }
        }

        fetchTopics();
    }, []);

    if (loading) {
        return <div>Loading topics...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const renderedTopics = topics.map((topic) => {
        return (
            <div key={topic.id}>
                <Link href={paths.topicShow(topic.slug)}>
                    <Chip color="warning" variant="shadow">
                        {topic.slug}
                    </Chip>
                </Link>
            </div>
        );
    });

    return (
        <div className='flex flex-row gap-2 flex-wrap'>
            {renderedTopics}
        </div>
    );
}