import { FileSearch } from 'lucide-react'

export default function EmptyState({ title = 'No results', desc = 'Try adjusting your filters.' }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-3 text-center">
      <div className="p-4 rounded-2xl bg-gray-100 dark:bg-gray-800">
        <FileSearch className="w-8 h-8 text-gray-400" />
      </div>
      <p className="font-display font-semibold text-gray-700 dark:text-gray-300">{title}</p>
      <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs">{desc}</p>
    </div>
  )
}
