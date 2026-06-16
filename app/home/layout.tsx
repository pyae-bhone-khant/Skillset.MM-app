import { ReactNode } from 'react';
import Navbar from '@/components/HomePageComponent/Navbar';
import { Separator } from '@/components/ui/separator';
import SecondNav from '@/components/HomePageComponent/SecondNav';
import Footer from '@/components/HomePageComponent/footer';

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
   <div className='w-full'> 
    <Navbar /> 

   
    <div className='flex'>
        <div className='w-74'>
        <SecondNav />
        </div>
    <div className="pt-16 flex-1">
      <div>
        {children}
      </div>
      <div>
        <Footer />
      </div>
    </div>
    </div>
   </div>
  );
}
