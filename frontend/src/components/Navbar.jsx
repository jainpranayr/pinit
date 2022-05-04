import { IoMdAdd, IoMdSearch } from 'react-icons/io'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useDarkMode } from '../context'
import DarkModeToggle from './DarkModeToggle'

const Navbar = ({ searchTerm, setSearchTerm, user }) => {
  // navigate to search component
  const navigate = useNavigate()
  // get darkMode from useDarkMode
  const { darkMode } = useDarkMode()

  // if user not logged in return
  if (!user) return null

  return (
    <div
      className={`${
        darkMode ? 'dark' : ''
      }   flex gap-2 md:gap-5 w-full mt-5 mb-3`}>
      {/* Search bar */}
      <div className='flex justify-start items-center w-full px-2 rounded-md dark:bg-white dark:text-slate-900 bg-slate-900 text-gray-50 border-none outline-none focus-within:shadow-sm'>
        <IoMdSearch fontSize={21} className='ml-1' />
        <input
          type='text'
          onChange={e => setSearchTerm(e.target.value)}
          placeholder='Search pins...'
          value={searchTerm}
          onFocus={() => navigate('/search')}
          className='w-full p-2  dark:bg-white dark:text-slate-900 bg-slate-900 text-gray-50 outline-none'
        />
      </div>

      <div className='flex gap-3'>
        {/* Create Pin Button */}
        <Link
          to='/create-pin'
          className=' dark:bg-white dark:text-slate-900 bg-slate-900 text-gray-50 rounded-lg h-12 w-12 flex justify-center items-center'>
          <IoMdAdd fontSize={21} />
        </Link>

        {/* dark/light mode toggle */}
        <DarkModeToggle />

        {/* User Profile */}
        <Link
          to={`/user-profile/${user?._id}`}
          className='hidden md:block w-12 h-12'>
          <img
            src={user?.image}
            alt={user?.username || 'user profile'}
            className='w-12 h-12 rounded-lg'
          />
        </Link>
      </div>
    </div>
  )
}

export default Navbar
