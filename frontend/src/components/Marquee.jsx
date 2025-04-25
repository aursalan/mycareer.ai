import { motion } from 'framer-motion'
import React from 'react'

function Marquee() {
  return (
    <div data-scroll data-scroll-section data-scroll-speed=".1" className='w-full py-20 rounded-tl-3xl rounded-tr-3xl bg-[#0A66C2]'>
        <div className='text border-t-2 border-b-2 border-[#0E71D3] flex overflow-hidden whitespace-nowrap'>
            <motion.h1 initial={{x: "0"}} animate={{x: "-100%"}} transition={{repeat: Infinity, ease: "linear", duration: 10}} className='text-[25vw] leading-none font-["Test_Founders_Grotesk_X-Condensed"] uppercase pt-10 -mt-[6vw] -mb-[0.8vw] pr-20'>AI Based career counselling</motion.h1>
            <motion.h1 initial={{x: "0"}} animate={{x: "-100%"}} transition={{repeat: Infinity, ease: "linear", duration: 10}} className='text-[25vw] leading-none font-["Test_Founders_Grotesk_X-Condensed"] uppercase pt-10 -mt-[6vw] -mb-[0.8vw] pr-20'>ai based career counselling</motion.h1>

        </div>
    </div>
  )
}

export default Marquee