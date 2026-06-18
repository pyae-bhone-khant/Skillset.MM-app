"use client";

import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
   const router = useRouter();
   
   useEffect(() => {
        const token = localStorage.getItem("token");
        const userStr = localStorage.getItem("user");
        
        if (!token || !userStr) {
            console.log("🔴 PARENT DASHBOARD LAYOUT: Redirecting to test (missing token/user)");
            router.push("/test-redirect");
            return;
        }
        
        try {
            const user = JSON.parse(userStr);
            if (!user) {
                console.log("🔴 PARENT DASHBOARD LAYOUT: Redirecting to test (no user)");
                router.push("/test-redirect");
            }
        } catch (error) {
            console.error("🔴 PARENT DASHBOARD LAYOUT: Error parsing user:", error);
            console.log("🔴 PARENT DASHBOARD LAYOUT: Redirecting to test (parse error)");
            router.push("/test-redirect");
        }
    }, [router]);
    
  return (
   <div className='w-full'> 
   {children}
   </div>
  );
}
