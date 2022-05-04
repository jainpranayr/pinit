import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import { Spinner } from '../components'
import {
  userCreatedPinsQuery,
  userQuery,
  userSavedPinsQuery,
} from '../utils/data'
import { client } from '../client'
import { GoogleLogout } from 'react-google-login'
import { AiOutlineLogout } from 'react-icons/ai'
import MasonryLayout from './MasonryLayout'
import DarkModeToggle from './DarkModeToggle'

const coverImage = 'https://source.unsplash.com/1600x900/?nature,technology'

const UserProfile = () => {
  // user state
  const [user, setUser] = useState(null)
  // user saved or created pins
  const [pins, setPins] = useState(null)
  // created or saved tab text state
  const [text, setText] = useState('Created')
  // created or saved active tab state
  const [activeBtn, setActiveBtn] = useState('created')

  // setup navigation
  const navigate = useNavigate()
  // get uerId from url
  const { userId } = useParams()
  // fetch user data from sanity
  useEffect(() => {
    const query = userQuery(userId)
    client.fetch(query).then(data => {
      setUser(data[0])
    })
  }, [userId])

  // fetch saved and created pins
  useEffect(() => {
    if (text === 'Created') {
      // fetch created pins
      const created = userCreatedPinsQuery(userId)
      client.fetch(created).then(data => setPins(data))
    } else {
      // fetch saved pins
      const saved = userSavedPinsQuery(userId)
      client.fetch(saved).then(data => setPins(data))
    }
  }, [text, userId])

  // logout function
  const logout = () => {
    // clrar user data from localstorage
    localStorage.clear()
    // redirect to login page
    navigate('/login')
  }

  // if user does'nt exist show spinner
  if (!user) {
    return <Spinner message='loading user profile' />
  }

  return (
    <div className='relative pb-2 h-full justify-center items-center'>
      <div className='flex flex-col pb-5'>
        <div className='relative flex flex-col mb-7'>
          <div className='flex flex-col justify-center items-center'>
            {/* cover image */}
            <img
              src={coverImage}
              alt='profile cover'
              className='w-full h-370 2xl:h-420 shadow-lg object-cover'
            />

            {/* User image */}
            <img
              src={user?.image}
              alt={user?.username || 'user dp'}
              className='rounded-full w-20 h-20 -mt-10 shadow-xl object-cover border-2'
            />

            {/* User name */}
            <h1 className='font-bold text-3xl text-center'>{user?.username}</h1>

            {/* logout button */}
            <div className='absolute top-0 z-1 right-0 p-2 flex gap-2'>
              <DarkModeToggle />
              {userId === user._id && (
                <GoogleLogout
                  clientId={process.env.REACT_APP_GOOGLE_ID}
                  render={renderProps => (
                    <button
                      type='button'
                      className='rounded-lg flex justify-center items-center w-12 h-12 dark:bg-white dark:text-slate-900 bg-slate-900 text-gray-50 border-none outline-none focus-within:shadow-sm'
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}>
                      <AiOutlineLogout />
                    </button>
                  )}
                  onLogoutSuccess={logout}
                  cookiePolicy='single_host_origin'
                />
              )}
            </div>
          </div>

          {/* Created and Saved buttons */}
          <div className='text-center mb-7 mt-2 flex justify-center items-center gap-2'>
            {/* Created button */}
            <button
              type='button'
              onClick={e => {
                setText(e.target.textContent)
                setActiveBtn('created')
              }}
              className={`${
                activeBtn === 'created'
                  ? 'activeBtnStyles'
                  : 'notActiveBtnStyles'
              }`}>
              Created
            </button>

            {/* Saved button */}
            <button
              type='button'
              onClick={e => {
                setText(e.target.textContent)
                setActiveBtn('saved')
              }}
              className={`${
                activeBtn === 'saved' ? 'activeBtnStyles' : 'notActiveBtnStyles'
              }`}>
              Saved
            </button>
          </div>

          {/* render pins */}
          {pins?.length ? (
            <div className='px-2'>
              <MasonryLayout pins={pins} />
            </div>
          ) : (
            // if no pins created or saved render message
            <div className='flex justify-center items-center font-bold w-full text-xl mt-2'>
              No pins {text}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default UserProfile
