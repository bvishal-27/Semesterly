import { FileSearch } from 'lucide-react'
export default function EmptyState({ title = 'No results', desc = '' }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
      <div className="w-16 h-16 rounded-3xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
        <FileSearch className="w-7 h-7 text-gray-400" />
      </div>
      <div>
        <p className="font-bold text-gray-700 dark:text-gray-300">{title}</p>
        {desc && <p className="text-sm text-gray-400 dark:text-gray-500 mt-1 max-w-xs">{desc}</p>}
      </div>
    </div>
  )
}
