import { useState } from 'react'
import { Route } from 'react-router-dom'
import { Routes } from 'react-router-dom'
import { Navbar, Search, Feed, PinDetails, CreatePin } from '../components'
import { useDarkMode } from '../context'

const Pins = ({ user }) => {
  // search query
  const [searchTerm, setSearchTerm] = useState('')
  // darkMode state
  const { darkMode } = useDarkMode()

  return (
    <div className={`${darkMode ? 'dark' : ''} px-2 md:px-5`}>
      <div className='dark:bg-gray-100 dark:text-slate-900 bg-slate-800 text-gray-50'>
        <Navbar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          user={user && user}
        />
      </div>

      <div className='h-full'>
        {/* setting up routes */}
        <Routes>
          <Route path='/' element={<Feed />} />
          <Route path='/category/:categoryId' element={<Feed />} />
          <Route
            path='/pin-detail/:pinId'
            element={<PinDetails user={user && user} />}
          />
          <Route
            path='/create-pin'
            element={<CreatePin user={user && user} />}
          />
          <Route path='/search' element={<Search searchTerm={searchTerm} />} />
        </Routes>
      </div>
    </div>
  )
}

export default Pins
