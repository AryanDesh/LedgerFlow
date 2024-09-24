import * as React from "react";

export function Button({
    children,
    variant = "default",
    size = "md",
    ...props
}: {
    children: React.ReactNode;
    variant?: "default" | "ghost";
    size?: "sm" | "md" | "lg";
    [key: string]: any;
}) {
    const variants = {
        default: "bg-blue-600 text-white hover:bg-blue-700",
        ghost: "bg-transparent hover:bg-gray-100",
    };

    const sizes = {
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2",
        lg: "px-5 py-2.5 text-lg",
    };

    return (
        <button
            className={`rounded-lg ${variants[variant]} ${sizes[size]} focus:outline-none focus:ring focus:ring-blue-300`}
            {...props}
        >
            {children}
        </button>
    );
}
