"use client"
import React from 'react'
import MindfulnessBanner from '../MindfulnessBanner'
import { useRouter } from 'next/navigation';

const MindFulnessBannerAboutUs = () => {
  const router = useRouter();

  return (
    <div className="-mt-20">
    {" "}
    <MindfulnessBanner onClick={()=>router.push("/home/formSection")} />
  </div>
  )
}

export default MindFulnessBannerAboutUs
