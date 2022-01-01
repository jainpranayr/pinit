import { AiOutlineMeh } from "react-icons/ai"

const NoPinsFound = () => {
  return (
    <div className='flex flex-col justify-center items-center w-full h-full mt-10'>
      <AiOutlineMeh fontSize={40} />
      <p className="text-lg text-center px-2'">No pins to display!</p>
    </div>
  )
}

export default NoPinsFound
