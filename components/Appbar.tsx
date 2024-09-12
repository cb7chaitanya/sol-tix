import { IoTicketOutline } from "react-icons/io5";

const Appbar = () => {
  return (
    <div className="flex justify-between p-3 ">
        <div><IoTicketOutline className="text-3xl text-zinc-400 hover:text-black duration-200" /></div>
        <div className="flex items-center gap-4"><p className="hover:text-black duration-200 font-semibold tracking-wide text-zinc-400">Explore</p><button className="bg-zinc-300/60 rounded-full px-2 py-1 hover:bg-zinc-500 hover:text-white text-zinc-500 font-semibold duration-200">Sign in</button></div>
    </div>
  )
}

export default Appbar