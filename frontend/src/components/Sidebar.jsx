import { Link } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { RiHomeFill } from 'react-icons/ri'

import Logo from './Logo'
import { categories } from '../utils/data' // actual cayegories array
import { useDarkMode } from '../context'

const Sidebar = ({ user, closeToggle }) => {
  // get darkMode from useDsrkMode
  const { darkMode } = useDarkMode()
  // toggle setToggle state when clicked
  const handleCloseSidebar = () => {
    if (closeToggle) closeToggle(false)
  }

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className='flex flex-col justify-between dark:bg-white dark:text-slate-900 bg-slate-900 text-gray-50  h-full overflow-y-scroll min-w-210 hide-scrollbar'>
        <div className='flex flex-col'>
          {/* logo */}
          <Link
            to='/'
            className='flex px-5 gap-2 my-6 pt-1 w-190 items-center'
            onClick={handleCloseSidebar}>
            <Logo />
          </Link>
          {/* Home Link */}
          <div className='flex flex-col gap-5'>
            <NavLink
              to='/'
              className={({ isActive }) =>
                isActive ? 'isActiveStyle' : 'isNotActiveStyle'
              }
              onClick={handleCloseSidebar}>
              <RiHomeFill />
              Home
            </NavLink>
            {/* Categories */}
            <h3 className='mt-2 px-5 dark:text-neutral-800 text-neutral-200'>
              Discover Categories
            </h3>
            {/* mapping over categories array and adding them as links in sidebar */}
            {categories.slice(0, categories.length - 1).map(category => (
              <NavLink
                to={`/category/${category.name}`}
                className={({ isActive }) =>
                  isActive ? 'isActiveStyle' : 'isNotActiveStyle'
                }
                onClick={handleCloseSidebar}
                key={category.name}>
                <img
                  src={category?.image}
                  alt='category'
                  className='w-8 h-8 rounded-full shadow-sm'
                />
                {category.name}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
