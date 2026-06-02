import { FileSearch } from 'lucide-react'
export default function EmptyState({ title = 'No results', desc = 'Try adjusting your filters.' }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
      <div className="p-5 rounded-3xl bg-stone-100 dark:bg-stone-800">
        <FileSearch className="w-8 h-8 text-stone-400 dark:text-stone-500" />
      </div>
      <div className="space-y-1">
        <p className="font-display font-bold text-stone-700 dark:text-stone-300">{title}</p>
        <p className="text-sm text-stone-400 dark:text-stone-500 max-w-xs">{desc}</p>
      </div>
    </div>
  )
}
