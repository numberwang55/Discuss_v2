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
        // <Button type="submit" isLoading={pending} spinnerPlacement="end">
        //     {children}
        // </Button>
        <button
            type="submit"
            disabled={pending}
            className={`relative flex items-center justify-center gap-2 px-4 py-2 rounded text-white transition ${
                pending ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
        >
            {pending && (
                <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    ></circle>
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                </svg>
            )}
            <span>{pending ? "Saving..." : children}</span>
        </button>

    )

    // return (<button type="submit" disabled={pending}>
    //     {pending ? "Saving..." : children}
    // </button>)
}