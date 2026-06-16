import { ReactNode } from 'react';
import Navbar from '@/components/HomePageComponent/Navbar';
import { Separator } from '@/components/ui/separator';
import SecondNav from '@/components/HomePageComponent/SecondNav';

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
   <div className='w-full'> 
    {children}
   </div>
  );
}
