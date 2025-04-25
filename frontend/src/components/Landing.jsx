import { motion } from 'framer-motion';
import React from 'react'
import { GoArrowUpRight } from "react-icons/go";
import { IoIosArrowDown } from "react-icons/io";
import Tooltip from './UI/Tooltip';
import { Link } from 'react-router-dom';

function Landing() {
  return (
    <div data-scroll data-scroll-section data-scroll-speed="-.3" className='w-full text-black h-screen bg-[#F4F2EE] pt-1'>
        <div className='textstructure mt-40 px-20 flex'>
          <div className='flex-1'>
            {["Unlock", " AI- Powered", "Career Insights"].map((item, index) => (
              <div className='masker' key={index}>
                <div className='w-fit flex'>
                  {index === 1 && (
                    <motion.img 
                      initial={{width: 0}} 
                      animate={{width: "5.9vw"}} 
                      transition={{ease: [0.76, 0, 0.24, 1], duration:1}} 
                      src={"1.png"} 
                      alt="Description of image" 
                      className='mr-[1vw] rounded-md w-[10vw] h-[6vw] relative top-[1.1vw]'
                    />
                  )}
                  <h1 className='uppercase text-[9vw] leading-[7vw] tracking-tight font-["Test_Founders_Grotesk_X-Condensed"]'>{item}</h1>
                </div>
              </div>
            ))}
          </div>
          
          {/* Replaced "hello" div with image */}
          <div className='flex items-center w-[30vw]'>
            <img 
              src="r1.png" 
              alt="Descriptive text about the image"
              className='w-full h-auto max-h-[30vh] object-contain rounded-lg'
            />
          </div>
        </div>

        <div className="border-t-[1px] border-zinc-300 font-[Neue_Montreal] mt-20 flex justify-between items-center py-5 px-20">
            {[
                "For students and experienced professionals.", 
                "From initial career exploration to advanced career transitions.",
                ].map((item, index) => (
                <p key={index} className="text-md font-light tracking-tight capitalize leading-none">{item}</p>
                ))}
                
                <div className="start flex items-center gap-5">
                    <Tooltip text="Use arrow and get quick recommendations">
                    <div className="px-5 py-1 border-[1px] border-zinc-300 rounded-full text-md uppercase">Quick Recommendations</div>
                    </Tooltip>

                    <Link
                    to="/aipage"
                    className="w-8 h-8 flex items-center justify-center border-[1px] border-zinc-300 rounded-full transition group hover:bg-[#0E71D3] hover:border-none"
                    >
                    <GoArrowUpRight className="text-black group-hover:text-white transition" />
                    </Link>
                </div>
        </div>

        <div className='mt-8 flex justify-center text-md text-zinc-400 font-light tracking-tight leading-none gap-2'>Scroll Down <IoIosArrowDown /> </div>
    </div>
  )
}

export default Landing