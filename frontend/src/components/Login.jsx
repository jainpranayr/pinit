import GoogleLogin from "react-google-login"
import { useNavigate } from "react-router-dom"
import { FcGoogle } from "react-icons/fc"

import backgroundVideo from "../assets/bg.mp4"
import logo from "../assets/logo-light.svg"
import { client } from "../client"

const Login = () => {
  const navigate = useNavigate()

  const loginResponse = response => {
    localStorage.setItem("user", JSON.stringify(response.profileObj))
    const { googleId, name, imageUrl } = response.profileObj

    // user data that will be sent to sanity
    const doc = {
      _id: googleId,
      _type: "user",
      username: name,
      image: imageUrl,
    }

    client.createIfNotExists(doc).then(() => navigate("/", { replace: true }))
  }

  return (
    <div className='flex justify-start items-center flex-col h-screen'>
      <div className='relative w-full h-full'>
        {/* background vide[o] */}
        <video
          src={backgroundVideo}
          type='video/mp4'
          loop
          controls={false}
          muted
          autoPlay
          className='w-full h-full object-cover'
        ></video>

        {/* Main Content */}
        <div className='absolute flex flex-col justify-center items-center inset-0 bg-blackOverlay'>
          <div className='p-5 space-y-3'>
            {/* Logo */}
            <img src={logo} alt='logo' />

            {/* Set up Google Auth */}
            <div className='shadow-2xl'>
              <GoogleLogin
                clientId={process.env.REACT_APP_GOOGLE_ID}
                render={renderProps => (
                  <button
                    type='button'
                    className='bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none'
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                  >
                    <FcGoogle className='mr-4' />
                    Sign in with Google
                  </button>
                )}
                onSuccess={loginResponse}
                onFailure={loginResponse}
                cookiePolicy='single_host_origin'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
