"use client";

import { cn } from "@/lib/utils";
import {
    ArrowLeft,
    ArrowRight,
    Car,
    HomeIcon,
    SettingsIcon,
    LogOut,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import Logo from '../../../../public/Logo.svg';
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ModeToggle } from "../theme/ModeToggle";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";

// Define the sidebar links with categories
export const sidebarLinks = [
    {
        category: "Dashboard",
        links: [
            { id: 0, name: "Dashboard", href: "/dashboard", icon: HomeIcon },
        ],
    },
    {
        category: "Cars",
        links: [
            { id: 0, name: "All Cars", href: "/cars", icon: Car },
            { id: 1, name: "My Cars", href: "/my-cars", icon: Car },
        ],
    },
    {
        category: "Settings",
        links: [
            { id: 0, name: "Profile Settings", href: "/profile", icon: SettingsIcon },
        ],
    },
];

export const Sidebar = () => {
    const [isExpand, setIsExpand] = useState(true);
    const pathname = usePathname();

    return (
        <ScrollArea className="w-fit relative h-full z-0">
            <TooltipProvider>
                <div className={cn("hidden w-[200px] shrink-0 px-2 md:block", { "w-fit": !isExpand })}>
                    {/* Toggle button to collapse/expand the sidebar */}
                    <Button
                        size={"icon"}
                        className="absolute rounded-r-none size-6 right-0 top-80 z-30"
                        onClick={() => setIsExpand(!isExpand)}
                    >
                        {isExpand ? <ArrowLeft /> : <ArrowRight />}
                    </Button>

                    <div className="flex h-full max-h-screen flex-col gap-2 pt-2">
                        {/* Logo section */}
                        <div className="flex h-14 justify-center gap-2 items-center border-b py-2 lg:h-[60px]">
                            <Link href="/home" className="flex items-center gap-2 font-semibold">
                                <Image src={Logo} alt="Logo" className="size-8" />
                                {isExpand ? (
                                    <p className="text-xl font-bold">
                                        PrepTrack
                                    </p>
                                ) : null}
                            </Link>
                            <div className={`${!isExpand ? 'hidden': 'flex'}`}>
                                <ModeToggle />
                            </div>
                        </div>

                        {/* Navigation section */}
                        <div className="flex-1 mt-6">
                            <nav className="grid items-start text-sm font-medium px-2">
                                {sidebarLinks.map((category, index) => (
                                    <div key={index} className="mb-6">
                                        <p className="text-xs font-semibold uppercase mb-2">
                                            {isExpand && category.category}
                                        </p>
                                        <div className="space-y-2">
                                            {category.links.map((link) => (
                                                <Tooltip key={link.id}>
                                                    <TooltipTrigger asChild>
                                                        <Link
                                                            href={link.href}
                                                            className={cn(
                                                                "flex items-center text-muted-foreground gap-3 p-2 rounded-md hover:bg-muted",
                                                                pathname.includes(link.href) ? "bg-muted" : ""
                                                            )}
                                                        >
                                                            <link.icon className="size-4" />
                                                            {isExpand && <span>{link.name}</span>}
                                                        </Link>
                                                    </TooltipTrigger>
                                                    {!isExpand && (
                                                        <TooltipContent>
                                                            <span>{link.name}</span>
                                                        </TooltipContent>
                                                    )}
                                                </Tooltip>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </nav>
                        </div>

                        {/* Logout button */}
                        <div className="absolute right-2 left-2 bottom-2 z-30">
                            <LogoutLink>
                                <Button className="w-full flex items-center justify-center gap-2">
                                    <LogOut className="w-4 h-4" />
                                    {isExpand && <span>Logout</span>}
                                </Button>
                            </LogoutLink>
                        </div>
                    </div>
                </div>
            </TooltipProvider>
        </ScrollArea>
    );
};
