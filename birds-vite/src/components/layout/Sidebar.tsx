import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-[307px] border-r border-blue-mist-100 bg-[#FBFCFF] p-4 space-y-4">
      <div>
        <h2 className="text-blue-tide-900 text-base font-medium">The Birds App</h2>
        <p className="text-sm text-blue-tide-300">By Copilot</p>
      </div>
      <nav className="space-y-2">
        <Link to="/" className="block px-3 py-2 rounded-md bg-[#4D76A714] text-gray-900 text-sm font-semibold">
          Home
        </Link>
      </nav>
    </div>
  )
}
