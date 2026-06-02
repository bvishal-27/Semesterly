import { ExternalLink, FileText, BookOpen, CheckCircle2, Download, Eye } from 'lucide-react'

const TYPE_CONFIG = {
  notes:  { label: 'Notes',   icon: BookOpen,     bg: 'bg-emerald-500', badge: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300' },
  qpaper: { label: 'Q-Paper', icon: FileText,     bg: 'bg-amber-500',   badge: 'bg-amber-100  text-amber-700  dark:bg-amber-900/50  dark:text-amber-300'  },
  solved: { label: 'Solved',  icon: CheckCircle2, bg: 'bg-blue-500',    badge: 'bg-blue-100   text-blue-700   dark:bg-blue-900/50   dark:text-blue-300'   },
}

export default function ResourceCard({ resource }) {
  const cfg = TYPE_CONFIG[resource.type] || TYPE_CONFIG.notes
  const Icon = cfg.icon

  return (
    <div className="group bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 flex flex-col overflow-hidden">

      {/* Color top strip */}
      <div className={`h-1 ${cfg.bg}`} />

      <div className="p-4 flex flex-col gap-3 flex-1">
        {/* Header row */}
        <div className="flex items-start justify-between gap-2">
          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${cfg.badge}`}>
            <Icon className="w-3 h-3" />
            {cfg.label}
          </span>
          <div className="text-right shrink-0">
            <span className="text-xs font-mono font-bold text-gray-400 dark:text-gray-500">
              Sem {resource.semester}
            </span>
          </div>
        </div>

        {/* Title */}
        <div className="flex-1">
          {/* Subject code — prominent */}
          <p className="text-xs font-mono font-bold text-brand-600 dark:text-brand-400 mb-0.5 uppercase tracking-wide">
            {resource.subject}
          </p>
          <h3 className="font-display font-semibold text-gray-900 dark:text-gray-100 text-sm leading-snug line-clamp-2">
            {resource.title}
          </h3>
          {resource.description && (
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1 line-clamp-2 leading-relaxed">
              {resource.description}
            </p>
          )}
        </div>

        {/* Meta row */}
        <div className="flex items-center justify-between text-xs text-gray-400 dark:text-gray-500">
          <div className="flex items-center gap-2">
            {resource.branch && (
              <span className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 font-medium text-gray-600 dark:text-gray-400">
                {resource.branch}
              </span>
            )}
            {resource.year && <span className="font-mono">{resource.year}</span>}
          </div>
          {resource.views > 0 && (
            <span className="flex items-center gap-1">
              <Eye className="w-3 h-3" />{resource.views}
            </span>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex gap-2 pt-1">
          <a href={resource.fileUrl} target="_blank" rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 active:scale-95 text-white text-xs font-semibold transition-all shadow-sm">
            <ExternalLink className="w-3.5 h-3.5" /> Open
          </a>
          <a href={resource.fileUrl} download
            className="flex items-center justify-center px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 active:scale-95 transition-all"
            title="Download">
            <Download className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  )
}
