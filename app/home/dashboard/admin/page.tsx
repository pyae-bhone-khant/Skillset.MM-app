
"use client";
import StillDeveloping from "@/components/HomePageComponent/StillDeveloping";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminPage() {
    const router = useRouter();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user")!);
    const token = localStorage.getItem("token");
    
    // Role စစ်ဆေးခြင်း
    if (!token || user.role !== "ADMIN") {
      if (user.role === "TEACHER") {
        router.push("/home/dashboard/teacher");
      } else if (user.role === "STUDENT") {
        router.push("/home/dashboard/student");
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