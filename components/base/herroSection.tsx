import React from 'react'
import Image from 'next/image'
import { Button } from '../ui/button'
import Link from 'next/link'
function HerroSection() {
  return ( 
    <div className="w-full flex  flex-col h-screen justify-center items-center">  
     <div>
        <Image src="/bunner.svg" width={600} height={600} alt="banner"></Image>
     </div> 
     <div className="flex flex-col items-center mt-5">
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-extrabold  text-pretty  bg-gradient-to-r from-blue-600 to-white bg-clip-text text-transparent">
            SkillHub MM
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl text-center text-app-text-primary mt-4 font-bold ">
          Discover the better choice , together
        </p> 
        <Link href="/login" className='mt-2'>
        <Button className='mt-4 bg-gradient-to-r from-blue-600 to-white text-black text-2xl px-2 py-4 cursor-pointer'>Start free</Button>
        </Link>
     </div>

    </div>
  )
}

export default HerroSection