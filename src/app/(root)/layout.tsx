import React from 'react';
import { Globe } from "@/components/magicui/globe";
import { RetroGrid } from "@/components/magicui/retro-grid";

export default function Layout({
                                   children,
                               }: {
    children: React.ReactNode;
}) {
    return (
        <div className="relative h-screen w-full">
            <div className="absolute inset-0 z-10 p-0 bg-gray-100 overflow-hidden dark">
                <RetroGrid />
            </div>

            <div className="relative z-20" >
                {children}
            </div>
        </div>
    );
}
