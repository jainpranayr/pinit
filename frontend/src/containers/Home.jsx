import { useEffect, useRef, useState } from 'react'
import { HiMenu } from 'react-icons/hi'
import { AiFillCloseCircle } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { Routes } from 'react-router-dom'
import { Route } from 'react-router-dom'

import { Sidebar, UserProfile } from '../components'
import { Pins } from '../containers'
import lightLogo from '../assets/logo-dark.svg'
import { userQuery } from '../utils/data'
import { client } from '../client'
import fetchUserFromLocalStorage from '../utils/fetchUserFromLocalStorage'
import { useDarkMode } from '../context'

const Home = () => {
  // state to toggle mobile menu
  const [toggleSideBar, setToggleSideBar] = useState(false)
  // state for setting up user fetched from sanity
  const [user, setUser] = useState(null)
  // state for implementing infinite scrolling
  const scrollRef = useRef()
  // get darkMode from useDsrkMode
  const { darkMode } = useDarkMode()

  const userInfo = fetchUserFromLocalStorage()

  // fetching user details from sanity
  useEffect(() => {
    const query = userQuery(userInfo?.googleId)
    client.fetch(query).then(data => setUser(data[0]))
  }, [userInfo?.googleId])

  // set up scroll to top of page
  useEffect(() => {
    scrollRef.current.scrollTo(0, 0)
  }, [scrollRef])

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className='flex dark:bg-gray-100 dark:text-slate-900 bg-slate-800 text-gray-50 md:flex-row flex-col h-screen transition-height duration-75 ease-out'>
        <div className='hidden md:flex h-screen flex-initial'>
          {/* Desktop sidebar */}
          <Sidebar user={user && user} />
        </div>
        {/* navbar */}
        <div className='flex md:hidden flex-row justify-between dark:bg-white dark:text-slate-900 bg-slate-900 text-gray-50'>
          <div className='p-2 w-full flex flex-row justify-between items-center shadow-md'>
            <div className='flex space-x-1'>
              <HiMenu
                fontSize={30}
                className='cursor-pointer'
                onClick={() => setToggleSideBar(true)}
              />
              <Link to='/'>
                <img src={lightLogo} alt='logo' />
              </Link>
            </div>
            <Link to={`user-profile/${user?._id}`}>
              <img
                src={user?.image}
                alt={user?.username || 'user profile'}
                className='w-[34px] rounded-lg'
              />
            </Link>
          </div>
          {/* mobile menu toggle */}
          {toggleSideBar && (
            <div
              className='fixed w-[56%] dark:bg-white dark:text-slate-900 bg-slate-900 text-gray-50 h-screen overflow-y-auto shadow-md z-10
          animate-slide-in'>
              <div className='absolute w-full flex justify-end items-center p-2'>
                <AiFillCloseCircle
                  fontSize={30}
                  className='cursor-pointer'
                  onClick={() => setToggleSideBar(false)}
                />
              </div>
              {/* Mobile Sidebar */}
              <Sidebar user={user && user} closeToggle={setToggleSideBar} />
            </div>
          )}
        </div>
        {/* Setting up routes */}
        <div className='pb-2 flex-1 h-screen overflow-y-scroll' ref={scrollRef}>
          <Routes>
            <Route path='/user-profile/:userId' element={<UserProfile />} />
            <Route path='/*' element={<Pins user={user && user} />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default Home
