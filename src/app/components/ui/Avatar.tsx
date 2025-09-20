interface AvatarProps {
  name: string
  size?: number
}

export default function Avatar({ name, size = 40 }: AvatarProps) {
  const initials = name.split(' ').map(n => n[0]).join('')
  return (
    <div
      className="rounded-full bg-indigo-500 text-white flex items-center justify-center font-bold"
      style={{ width: size, height: size }}
    >
      {initials}
    </div>
  )
}
