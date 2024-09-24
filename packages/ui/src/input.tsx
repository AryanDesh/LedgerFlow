import * as React from "react";

export function Input({ className, placeholder }: { className?: string; placeholder: string }) {
    return (
        <input
            type="text"
            className={`border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring focus:ring-blue-300 ${className}`}
            placeholder={placeholder}
        />
    );
}
