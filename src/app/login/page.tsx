import Button from '../components/ui/Button'

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login to CodePods</h2>
        <form className="flex flex-col gap-4">
          <input type="email" placeholder="Email" className="p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
          <input type="password" placeholder="Password" className="p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
          <Button type="submit">Login</Button>
        </form>
        <p className="text-gray-400 text-sm mt-4 text-center">
          Don’t have an account? <a href="/signup" className="text-indigo-500">Sign up</a>
        </p>
      </div>
    </div>
  )
}
