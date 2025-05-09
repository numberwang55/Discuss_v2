"use client"

import {Divider} from "@nextui-org/react";
import TopicCreateForm from "@/components/topics/topic-create-form";
import TopicList from "@/components/topics/topic-list";
import PostList from "@/components/posts/post-list";
import {fetchTopPosts} from "@/db/queries/posts";

export default function Home() {
    return <div className="grid grid-cols-4 gap-4 p-4">
        <div className="col-span-3">
            <h1 className="text-xl m-2">Top Posts</h1>
            {/*<PostList fetchData={fetchTopPosts} />*/}
            <PostList />
        </div>
        <div className="border shadow py-3 px-2">
            <TopicCreateForm />
            <Divider className="my-2" />
            <h3 className="text-lg">Topics</h3>
            <TopicList />
        </div>
    </div>
}


// // app/page.tsx - THIS IS A SERVER COMPONENT - NOT USING NEXTUI BUTTON
// import * as actions from "@/actions";
// import {auth} from "@/auth";
//
// export default async function Home() {
//     const session = await auth()
//     return (
//         <div>
//             <form action={actions.signIn}>
//                 <button type="submit">Sign in</button>
//             </form>
//             <form action={actions.signOut}>
//                 <button type="submit">Sign out</button>
//             </form>
//             {
//                 session?.user ? <div>{JSON.stringify(session.user)}</div> : <div>Signed Out</div>
//             }
//         </div>
//     );
// }
