"use client"
import React from 'react'
import Navbar from '@/components/Navbar'
import { useRouter } from 'next/navigation'
import FooterPage from '@/components/Home/Footer'
import MainBodyPage from '@/components/Home/MainBody'

const HomePage = () => {
  const router = useRouter();
  const handleTryClick = () => {
    router.push("/ai")
  }

  return (
    <>
      <Navbar />
      <MainBodyPage />
      <FooterPage />
    </>
  )
}

export default HomePage
