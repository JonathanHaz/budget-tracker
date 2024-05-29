import Image from "next/image";
import { IoIosStats } from "react-icons/io";

export default function Navbar() {
  return (
    <div>
      <div className="bg-slate-600 p-4">
      <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="rounded-full h-[40px] w-[40px] bg-slate-50 flex object-cover">
        <Image src={"/vercel.svg"} alt="profileimg" width={35} height={35}/>
        </div>
        <small>Hi, Username</small>
      </div>
      <nav className="flex items-center gap-4">
        <div><IoIosStats className="text-3xl hover:scale-110 cursor-pointer transition-all duration-100"/></div>
        <div>
          <button className="px-4 py-2 text-sm capitalize rounded-2xl bg-red-500 border-red-500 hover:scale-105 transition-all duration-100">Sign Out</button>
        </div>
      </nav>
      </div>
    </div>
    </div>
  )
}
