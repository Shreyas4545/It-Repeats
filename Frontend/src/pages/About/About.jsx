import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../routes/RouterConfig'

const About = () => {

    const navigate = useNavigate()

    const changeDir = (dir) =>{
        navigate(dir)
    }
    
  return (
    <div className='About'>
    <div className='w-[100%] h-[12px] ' style={{background: 'linear-gradient(90deg, rgba(49, 83, 67, 0.44) 0%, #315343)'}}></div>
        <div className="pt-14 pl-24">
        <p className="text-4xl text-[#222222]  tracking-wider" style={{fontFamily:"Bebas Neue"}}>About Us</p>
        <p className='text-xl text-[#999999]' style={{fontFamily: 'proxima-nova'}}>The Team.</p>
        <div className="mt-20 text-2xl tracking-wider h-36 flex text-white">
           <div className="rounded w-[370px] pl-5 pt-4" style={{background: 'rgba(49, 83, 67, 0.6)'}}>
               <p><span className="font-semibold">Naman </span><span>Anand</span></p>
               <p className="pt-2">2022</p>
               <p className="pt-2">Founder . Flutter . UI/UX</p>
           </div>
           <div className=" ml-2 rounded w-[370px] pl-5 pt-4" style={{background: 'rgba(49, 83, 67, 0.6)'}}>
           <p><span className="font-semibold">Naman </span><span>Anand</span></p>
                <p className="pt-2">2022</p>
                <p className="pt-2">Founder . Flutter . UI/UX</p>
           </div>
        </div>
        </div>
    </div>
  )
}

export default About