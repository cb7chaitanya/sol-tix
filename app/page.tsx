import Appbar from "@/components/Appbar";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Appbar />
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="flex flex-col justify-center items-center">
          <h1 className="text-4xl font-semibold dark:text-white leading-normal tracking-tight text-pink-500">Sol Tix</h1>
          <p className="text-5xl font-normal dark:text-white flex flex-col justify-center items-center p-4">Seamless Access to <span className="text-fuchsia-500">Extraordinary Events.</span></p>
          <div className="text-center text-lg font-normal dark:text-white text-zinc-500 p-4">Set up events, share invites, and sell tickets—make your moments unforgettable.</div>
          <button className="bg-zinc-800 text-white px-4 py-2 text-xl rounded-xl hover:bg-zinc-700 duration-300">Create a new event</button>
      </div>
    </div>
    </div>
  );
}
