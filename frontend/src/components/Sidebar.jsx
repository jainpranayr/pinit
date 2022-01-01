import { Link } from "react-router-dom"
import { NavLink } from "react-router-dom"
import { RiHomeFill } from "react-icons/ri"

import logo from "../assets/logo-dark.svg"
import { categories } from "../utils/data" // actual cayegories array

// styles for active and non-active links
const isNotActiveStyle =
  "flex items-center px-5 gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize"
const isActiveStyle =
  "flex items-center px-5 gap-3 font-extrabold border-r-2 border-black  transition-all duration-200 ease-in-out capitalize"

const Sidebar = ({ user, closeToggle }) => {
  // toggle setToggle state when clicked
  const handleCloseSidebar = () => {
    if (closeToggle) closeToggle(false)
  }

  return (
    <div className='flex flex-col justify-between bg-white h-full overflow-y-scroll min-w-210 hide-scrollbar'>
      <div className='flex flex-col'>
        {/* logo */}
        <Link
          to='/'
          className='flex px-5 gap-2 my-6 pt-1 w-190 items-center'
          onClick={handleCloseSidebar}
        >
          <img src={logo} alt='logo' />
        </Link>

        {/* Home Link */}
        <div className='flex flex-col gap-5'>
          <NavLink
            to='/'
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }
            onClick={handleCloseSidebar}
          >
            <RiHomeFill />
            Home
          </NavLink>

          {/* Categories */}
          <h3 className='mt-2 px-5 text-neutral-800'>Discover Categories</h3>

          {/* mapping over categories array and adding them as links in sidebar */}
          {categories.slice(0, categories.length - 1).map(category => (
            <NavLink
              to={`/category/${category.name}`}
              className={({ isActive }) =>
                isActive ? isActiveStyle : isNotActiveStyle
              }
              onClick={handleCloseSidebar}
              key={category.name}
            >
              {category.name}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Sidebar
