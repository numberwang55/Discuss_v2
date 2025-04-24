"use client"

import TopicCreateForm from "@/components/topics/topic-create-form";

export default function Home() {
    return <div className="grid grid-cols-4 gap-4 p-4">
        <div className="col-span-3">
            <h1 className="text-xl m-2">Top Posts</h1>
        </div>
        <div>
            <TopicCreateForm />
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
