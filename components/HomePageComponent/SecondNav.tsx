"use client"

import { useState } from "react"
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { LayoutDashboard, ClipboardList, BookOpen, ShoppingBag, User, Info, Mail, HelpCircle } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "../../lib/authprovider"

export default function SecondNav() {
    const pathname = usePathname()
    const { user } = useAuth()

    const mainButtons = [ 
        user?.role === "ADMIN" ? 
            { name: "Dashboard", href: "/home/dashboard/admin/overview", icon: LayoutDashboard } : 
            user?.role === "STUDENT" ? 
            { name: "Dashboard", href: "/home/dashboard/student/overview", icon: LayoutDashboard } :  
            user?.role === "TEACHER" ? 
            { name: "Dashboard", href: "/home/dashboard/teacher/overview", icon: LayoutDashboard } : 
            { name: "Dashboard", href: "/", icon: LayoutDashboard },
        { name: "Level Test", href: "/home/level-test", icon: ClipboardList },
        { name: "Course", href: "/home/course", icon: BookOpen },
        { name: "Library Shop", href: "/home/library-shop", icon: ShoppingBag },
    ]

    const accountButtons = [
        { name: "Profile", href: "/home/profile", icon: User },
        { name: "About Us", href: "/home/about", icon: Info },
        { name: "Contact", href: "/home/contact", icon: Mail },
        { name: "FAQ", href: "/home/faq", icon: HelpCircle },
    ]

    const isActive = (href: string) => pathname === href

    return (
        <div className="pt-16 fixed flex justify-between left-0 top-0 h-full w-70 bg-linear-to-b from-app-bg to-app-bg-dark"> 
          <div className="mt-3 px-4 w-full"> 
            <h1 className="text-app-text-primary/40 text-sm font-bold mb-3">MAIN</h1>
            <div className="flex flex-col gap-2 mb-6">
                {mainButtons.map((button) => {
                    const Icon = button.icon
                    return (
                        <Link key={button.name} href={button.href}>
                            <Button
                                variant={isActive(button.href) ? "default" : "ghost"}
                                className={`w-full justify-start gap-3 ${isActive(button.href) ? "bg-app-accent-500 text-white hover:bg-app-accent-600" : "text-app-text-primary hover:bg-[#1e1e30]"}`}
                            >
                                <Icon size={18} />
                                {button.name}
                            </Button>
                        </Link>
                    )
                })}
            </div>

            <h1 className="text-app-text-primary/40 text-sm font-bold mb-3">ACCOUNT</h1>
            <div className="flex flex-col gap-2">
                {accountButtons.map((button) => {
                    const Icon = button.icon
                    return (
                        <Link key={button.name} href={button.href}>
                            <Button
                                variant={isActive(button.href) ? "default" : "ghost"}
                                className={`w-full justify-start gap-3 ${isActive(button.href) ? "bg-app-accent-500 text-white hover:bg-app-accent-600" : "text-app-text-primary hover:bg-[#1e1e30]"}`}
                            >
                                <Icon size={18} />
                                {button.name}
                            </Button>
                        </Link>
                    )
                })}
            </div>
          </div>
        <div className="border-l border-gray-700 h-full"></div>
        </div>
    );
}