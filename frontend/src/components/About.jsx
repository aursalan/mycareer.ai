import React from 'react'
import { Link } from 'react-router-dom'

function About() {
  return (
    <div data-scroll data-scroll-section data-scroll-speed=".5" className='w-full bg-[#FFFFFF] rounded-3xl text-black -mt-60'>
        <h1 className='pr-20 pl-20 pt-20 font-["Neue_Montreal"] text-[3vw] leading-[3.8vw] tracking-tight' >Welcome to the future of
          career exploration. We understand that your career journey is deeply personal and constantly evolving. 
          That's why we've developed an AI-driven platform that goes beyond traditional assessments.
        </h1>

        <div className='w-full flex gap-5 border-t-[1px] pt-10 mt-20 border-zinc-300'>
            <div className='w-1/2 p-20 '>
                <h1 className='text-6xl font-["Neue_Montreal"]' >Our Approach</h1>
                <Link to="/hiw" className="flex items-center uppercase text-md border hover:bg-[#F1F1F1] px-7 py-2 mt-10 w-40 rounded-full transition-all">
                Read More
                </Link>
            </div>
            <div className='w-1/2 h-[70vh] p-20'>
  <div className='w-full h-full bg-zinc-500 rounded-2xl overflow-hidden'>
    <img
      src="About.png"
      alt="Description"
      className="w-full h-full object-fill"
    />
  </div>
</div>
        </div>
    </div>
  )
}

export default About