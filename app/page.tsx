import { Button } from "@/components/ui/button";
import { Spotlight } from "@/components/ui/spotlight";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center text-center">
      <div className="min-h-screen flex flex-col justify-center items-center md:w-5/6 z-1">
          <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="#162452ff" />
          <h1 className="text-4xl font-semibold text-fuchsia-500 leading-normal tracking-tighter md:text-6xl ">Sol Tix</h1>
          <p className="text-5xl font-normal text-white flex flex-col justify-center items-center p-4 md:text-6xl">Seamless Access to <span className="text-fuchsia-500">Extraordinary Events.</span></p>
          <div className="text-center text-lg font-normal text-zinc-300 p-4 md:text-xl">Set up events, share invites, and sell tickets—make your moments unforgettable.</div>
          <Link href='/create'><Button className="bg-zinc-800 text-white px-4 py-2 text-lg md:text-xl rounded-xl hover:bg-zinc-700 duration-300">Create a new event</Button></Link>
      </div>
    </div>
  );
}
