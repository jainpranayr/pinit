import Loader from 'react-loader-spinner'

import { useDarkMode } from '../context'

const Spinner = ({ message }) => {
  const { darkMode } = useDarkMode()

  return (
    <div className='flex flex-col justify-center  items-center w-full h-full'>
      {/* Spinner Config */}
      <Loader
        type='Circles'
        color={darkMode ? '#000' : '#fff'}
        height={50}
        width={200}
        className='m-5'
      />
      {/* Loading message */}
      <p className='text-lg text-center px-2'>{message}</p>
    </div>
  )
}

export default Spinner
