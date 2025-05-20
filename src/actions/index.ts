export {signIn} from "./sign-in";
export {signOut} from "./sign-out";
export {createPost} from "./create-post";
export {createTopic} from "./create-topic";
export {createComment} from "./create-comment";
export {search} from "./search";


// // actions/index.ts
// "use server"
//
// import { signIn as nextAuthSignIn, signOut as nextAuthSignOut } from "next-auth/react";
//
// export async function signIn() {
//     return nextAuthSignIn("github");
// }
//
// export async function signOut() {
//     return nextAuthSignOut();
// }

// // actions/index.ts
// "use server"
//
// import { redirect } from "next/navigation";
// import {auth} from "@/auth";
//
// export async function signIn() {
//     return redirect("/api/auth/signin/github");
// }
//
// export async function signOut() {
//     return redirect("/api/auth/signout");
// }