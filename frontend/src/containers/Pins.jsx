import { useState } from "react"
import { Route } from "react-router-dom"
import { Routes } from "react-router-dom"
import { Navbar, Search, Feed, PinDetails, CreatePin } from "../components"

const Pins = ({ user }) => {
  // search query
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <div className='px-2 md:px-5'>
      <div className='bg-gray-50'>
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
          <Route
            path='/search'
            element={
              <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            }
          />
        </Routes>
      </div>
    </div>
  )
}

export default Pins
