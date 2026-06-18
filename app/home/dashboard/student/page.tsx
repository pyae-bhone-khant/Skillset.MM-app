
"use client";
import StillDeveloping from "@/components/HomePageComponent/StillDeveloping";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Student() {
       const router = useRouter();
    
      useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user")!);
        const token = localStorage.getItem("token");
        
        // Role စစ်ဆေးခြင်း
        if (!token || user.role !== "STUDENT") {
            if (user.role === "TEACHER") {
                router.push("/home/dashboard/teacher");
            } else if (user.role === "ADMIN") {
                router.push("/home/dashboard/admin");
            }
            router.push("/login");
        }
      }, []);
    return (
        <div>
           <StillDeveloping />
        </div>
    )
}