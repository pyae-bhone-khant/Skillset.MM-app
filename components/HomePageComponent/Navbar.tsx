
"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import api from "@/lib/axios"

export default function Navbar() {
    const pathname = usePathname()

    const isActive = (href: string) => pathname === href 
    const router = useRouter();

    const handleLogout = async () => {
        try {
            // Backend ဆီသို့ Logout request ပို့ခြင်း
            await api.post("/auth/logout");
        } catch (error) {
            console.error("Logout failed:", error);
        } finally {
            // Server က error တက်ရင်တောင် client ဘက်က data တွေကို ရှင်းထုတ်ပေးပါ
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            
            // Login စာမျက်နှာသို့ ပြန်ပို့ပါ
            router.push("/login");
            router.refresh(); // လိုအပ်ပါက page ကို refresh လုပ်ပါ
        }
    };

    return (
        <div className="w-full fixed top-0 left-0 right-0 z-50 h-16 flex flex-col items-center justify-between bg-linear-to-b from-app-bg to-app-bg-dark ">
            <div className="w-full flex items-center justify-between mt-2 px-8">
                <div className="flex items-center gap-2"> 
                    <Image src="/logo.png" alt="Logo" width={50} height={50} />
                    <h1 className="font-extrabold  text-pretty  bg-gradient-to-r from-blue-600 to-white bg-clip-text text-transparent text-3xl">SkillHub MM</h1>
                </div>
                <div className="flex items-center gap-4 text-app-text-primary">
                    <Link 
                        href="/home/dashboard/admin" 
                        className={`px-3 py-1 rounded-md transition-colors ${isActive("/home/dashboard/admin") ? "bg-app-accent-500 text-white" : "hover:bg-[#1e1e30]"}`}
                    >
                        Dashboard
                    </Link>
                    <Link 
                        href="/home/course" 
                        className={`px-3 py-1 rounded-md transition-colors ${isActive("/home/course") ? "bg-app-accent-500 text-white" : "hover:bg-[#1e1e30]"}`}
                    >
                        Course
                    </Link>
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Avatar className="cursor-pointer hover:opacity-80 transition-opacity">
                            <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold">U</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-app-card border-[#2a2a3c] text-app-text-primary min-w-[160px]">
                        <DropdownMenuItem asChild className="hover:bg-[#1e1e30] focus:bg-[#1e1e30] cursor-pointer">
                            <Link href="/home/profile">Profile</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                         onClick={handleLogout}
                         variant="destructive" className="text-red-400 hover:bg-red-500/10 hover:text-red-300 focus:bg-red-500/10 focus:text-red-300 cursor-pointer">
                            Logout
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="border-t border-gray-700 w-full"></div>
        </div>
    )
}