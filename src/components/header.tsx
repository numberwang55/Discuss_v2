"use client"

import Link from "next/link"
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Button,
    Avatar,
    Popover,
    PopoverTrigger,
    PopoverContent,
} from "@nextui-org/react";
// import {auth} from "@/auth"
import {useSession} from "next-auth/react"
import * as actions from "@/actions"
import SearchInput from "@/components/search-input";
import {Suspense} from "react";

export default function Header() {
    const session = useSession()
    let authContent: React.ReactNode;
    if (session.status === "loading"){
        authContent = null
    } else if (session?.data?.user) {
        authContent = <Popover placement="left">
            <PopoverTrigger>
                <Avatar src={session?.data?.user?.image || ""}/>
            </PopoverTrigger>
            <PopoverContent>
                <div className="p-4">
                    <form action={actions.signOut}>
                        <Button type="submit">Sign Out</Button>
                    </form>
                </div>
            </PopoverContent>
        </Popover>
    } else {
        authContent = <>
            <NavbarItem>
                <form action={actions.signIn}>
                    <Button type="submit" color="secondary" variant="bordered">Sign In</Button>
                </form>
            </NavbarItem>
            <NavbarItem>
                <form action={actions.signIn}>
                    <Button type="submit" color="primary" variant="flat">Sign Up</Button>
                </form>
            </NavbarItem>
        </>
    }

    return (
        <Navbar className="shadow mb-6">
            <NavbarBrand>
                <Link href="/" className="font-bold">Discuss</Link>
            </NavbarBrand>
            <NavbarContent justify="center">
                <NavbarItem>
                    <Suspense>
                        <SearchInput/>
                    </Suspense>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">
                {authContent}
            </NavbarContent>
        </Navbar>
    )
}