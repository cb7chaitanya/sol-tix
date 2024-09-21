import { getServerSession } from "next-auth";
import Link from "next/link";
import { IoTicketOutline } from "react-icons/io5";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import axios from "axios";

const Appbar = async() => {
  const session = await getServerSession();
  console.log(session)

  const getUserId = async() => {
    const user = await axios.post('http://localhost:3000/api/user', {
      email: session?.user?.email
    })
    return user.data.user.id
  }
  const userId = await getUserId()
  return (
    <div className="w-full flex justify-between px-16 py-5">
          <div>
            <Link href={"/"}><IoTicketOutline className="text-3xl text-zinc-200 hover:text-zinc-300 duration-200 cursor-pointer" /></Link>
          </div>
          <div className="flex items-center gap-8">
          <p className="hover:text-zinc-300 duration-200 font-semibold tracking-wide text-zinc-200 cursor-pointer">Explore</p>
          {session ? <DropdownMenu>
          <DropdownMenuTrigger className="bg-white text-black p-2 font-semibold rounded-full focus:outline-none">{session.user?.name?.split(" ").map((name) => name[0]).join("")}</DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem><Link href={`/profile/${userId}`}>Profile</Link></DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuItem>Team</DropdownMenuItem>
              <DropdownMenuItem>Subscription</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        : <Link href={"/api/auth/signin"}><button className="bg-zinc-200 rounded-full px-2 py-1 hover:bg-zinc-500 hover:text-white text-zinc-500 font-semibold duration-200">Sign in</button></Link>}
          </div>
    </div>
  )
}

export default Appbar