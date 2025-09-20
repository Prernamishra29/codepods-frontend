interface CardProps {
  children: React.ReactNode
  className?: string
}

export default function Card({ children, className = '' }: CardProps) {
  return (
    <div className={`bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow ${className}`}>
      {children}
    </div>
  )
}
