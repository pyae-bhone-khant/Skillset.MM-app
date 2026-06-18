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
        router.push("/login");
        return;
      }
      
      try {
        const user = JSON.parse(userStr);
        if (user.role !== "TEACHER") {
          router.push("/login");
        }
      } catch (error) {
        router.push("/login");
      }
    }, [router]);
  return (
   <div className='w-full'> 
   <AdminNavbar />
   {children}
   </div>
  );
}
