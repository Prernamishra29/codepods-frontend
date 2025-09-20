interface StatWidgetProps {
  title: string
  value: string | number
  icon?: React.ReactNode
  className?: string
}

export default function StatWidget({ title, value, icon, className = '' }: StatWidgetProps) {
  return (
    <div className={`bg-gray-800 p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow flex items-center gap-4 ${className}`}>
      {icon && <div className="text-3xl text-indigo-500">{icon}</div>}
      <div>
        <p className="text-gray-400 text-sm">{title}</p>
        <p className="text-white font-bold text-xl">{value}</p>
      </div>
    </div>
  )
}
