import { FaBell } from 'react-icons/fa'
import Avatar from './Avatar'

export default function Topbar() {
  return (
    <div className="flex justify-between items-center bg-gray-900 p-4 shadow-md">
      <div className="text-xl font-bold text-white">Dashboard</div>
      <div className="flex items-center gap-4">
        <FaBell className="text-gray-300 text-lg cursor-pointer" />
        <Avatar name="Prerna Mishra" />
      </div>
    </div>
  )
}
