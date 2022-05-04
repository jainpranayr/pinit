import { useDarkMode } from '../context'

const DarkModeToggle = () => {
  const { darkMode, handleDarkMode } = useDarkMode()

  return (
    <div
      className={` ${
        darkMode ? 'dark' : ''
      } rounded-lg flex justify-center items-center`}>
      <button
        onClick={handleDarkMode}
        className='rounded-lg flex justify-center items-center w-12 h-12  dark:bg-white dark:text-slate-900 bg-slate-900 text-gray-50 border-none outline-none focus-within:shadow-sm'>
        {darkMode ? (
          <svg
            className='w-5 h-5'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z'
            />
          </svg>
        ) : (
          <svg
            className='w-5 h-5'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z'
            />
          </svg>
        )}
      </button>
    </div>
  )
}

export default DarkModeToggle
