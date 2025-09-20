import Button from '../components/ui/Button'
import TagSelector from '../components/ui/TagSelector'

export default function Signup() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Create an Account</h2>
        <form className="flex flex-col gap-4">
          <input type="text" placeholder="Full Name" className="p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
          <input type="email" placeholder="Email" className="p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
          <input type="password" placeholder="Password" className="p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
          <TagSelector />
          <Button type="submit">Sign Up</Button>
        </form>
        <p className="text-gray-400 text-sm mt-4 text-center">
          Already have an account? <a href="/login" className="text-indigo-500">Login</a>
        </p>
      </div>
    </div>
  )
}
