"use client"

import {redirect} from "next/navigation";
import PostList from "@/components/posts/post-list";

interface SearchPageProps {
    searchParams: {
        term: string
    }
}

export default function SearchPage({searchParams}: SearchPageProps) {
    const {term} = searchParams
    if (!term) {
        redirect("/")
    }
    return (
        // <div>{term}</div>
        <div><PostList action={() => fetch(`api/search?term=${term}`)}/></div>
    )
}