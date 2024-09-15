import Link from "next/link";
import { IoTicketOutline } from "react-icons/io5";

const Appbar = () => {
  return (
    <div className="flex justify-between px-8 py-3 ">
        <div><IoTicketOutline className="text-3xl text-zinc-200 hover:text-zinc-300 duration-200 cursor-pointer" /></div>
        <div className="flex items-center gap-8">
          <p className="hover:text-zinc-300 duration-200 font-semibold tracking-wide text-zinc-200 cursor-pointer">Explore</p>
          <Link href={"/api/auth/signin"}><button className="bg-zinc-200 rounded-full px-2 py-1 hover:bg-zinc-500 hover:text-white text-zinc-500 font-semibold duration-200">Sign in</button></Link>
        </div>
    </div>
  )
}

export default Appbar