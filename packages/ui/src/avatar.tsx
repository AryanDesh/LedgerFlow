import * as React from "react";

export function Avatar({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-200">
            {children}
        </div>
    );
}

export function AvatarImage({ src, alt }: { src: string; alt: string }) {
    return <img className="w-full h-full rounded-full object-cover" src={src} alt={alt} />;
}

export function AvatarFallback({ children }: { children: React.ReactNode }) {
    return <div className="absolute inset-0 flex items-center justify-center">{children}</div>;
}
