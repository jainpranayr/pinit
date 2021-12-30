import { IoMdAdd, IoMdSearch } from "react-icons/io"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"

const Navbar = ({ searchTerm, setSearchTerm, user }) => {
  // navigate to search component
  const navigate = useNavigate()

  // if user not logged in return
  if (!user) return null

  return (
    <div className='flex gap-2 md:gap-5 w-full mt-5 pb-7'>
      {/* Search bar */}
      <div className='flex justify-start items-center w-full px-2 rounded-md bg-white border-none outline-none focus-within:shadow-sm'>
        <IoMdSearch fontSize={21} className='ml-1' />
        <input
          type='text'
          onChange={e => setSearchTerm(e.target.value)}
          placeholder='Search pins...'
          value={searchTerm}
          onFocus={() => navigate("/search")}
          className='w-full p-2 bg-white outline-none'
        />
      </div>

      <div className='flex gap-3'>
        {/* User Profile */}
        <Link to={`user-profile/${user?._id}`} className='hidden md:block'>
          <img
            src={user?.image}
            alt={user?.username || "user profile"}
            className='w-14 h-12 rounded-lg'
          />
        </Link>

        {/* Create Pin Button */}
        <Link
          to='create-pin'
          className='bg-black text-white rounded-lg h-12 w-12 md:w-14 flex justify-center items-center'
        >
          <IoMdAdd />
        </Link>
      </div>
    </div>
  )
}

export default Navbar
