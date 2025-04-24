"use client"

import {useFormStatus} from "react-dom";
import {Button, Spinner} from "@nextui-org/react";

interface FormButtonProps {
    children: React.ReactNode
}

export default function FormButton({children}: FormButtonProps) {
    const {pending} = useFormStatus()
    console.log("pending:", pending)

    return (
        <Button type="submit" isLoading={pending} spinnerPlacement="end">
            {children}
        </Button>
    )

    // return (<button type="submit" disabled={pending}>
    //     {pending ? "Saving..." : children}
    // </button>)
}