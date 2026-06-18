"use client";

import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminNavbar from '@/components/HomePageComponent/adminPageComponent/adminNavbar';

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
    const router = useRouter();
    
    useEffect(() => {
      const token = localStorage.getItem("token");
      const userStr = localStorage.getItem("user");
      
      if (!token || !userStr) {
        console.log("🔴 ADMIN LAYOUT: Redirecting to test (missing token/user)");
        router.push("/test-redirect");
        return;
      }
      
      try {
        const user = JSON.parse(userStr);
        if (user.role !== "ADMIN") {
          console.log("🔴 ADMIN LAYOUT: Redirecting to test (wrong role)");
          router.push("/test-redirect");
        }
      } catch (error) {
        console.log("🔴 ADMIN LAYOUT: Redirecting to test (parse error)");
        router.push("/test-redirect");
      }
    }, [router]);
      
  return (
   <div className='w-full'> 
   <AdminNavbar />
   {children}
   </div>
  );
}
