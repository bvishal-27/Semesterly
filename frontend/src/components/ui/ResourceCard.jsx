import { ExternalLink, Download, Eye, BookOpen, FileText, CheckCircle2 } from 'lucide-react'

const TYPE = {
  notes:  {
    label: 'Notes', Icon: BookOpen,
    tag: 'tag-notes',
    border: 'border-l-emerald-400',
    dot: 'bg-emerald-400',
  },
  qpaper: {
    label: 'Q-Paper', Icon: FileText,
    tag: 'tag-qpaper',
    border: 'border-l-amber-400',
    dot: 'bg-amber-400',
  },
  solved: {
    label: 'Solved', Icon: CheckCircle2,
    tag: 'tag-solved',
    border: 'border-l-sky-400',
    dot: 'bg-sky-400',
  },
}

export default function ResourceCard({ resource }) {
  const t = TYPE[resource.type] || TYPE.notes
  const { Icon } = t

  return (
    <article className={`
      group animate-fade-up
      bg-white dark:bg-canvas-800
      border border-stone-200/80 dark:border-stone-800
      border-l-4 ${t.border}
      rounded-2xl shadow-card hover:shadow-card-hover
      hover:-translate-y-0.5 transition-all duration-200
      flex flex-col overflow-hidden
    `}>
      <div className="p-4 flex flex-col gap-3 flex-1">

        {/* Type badge + semester */}
        <div className="flex items-center justify-between">
          <span className={`tag ${t.tag}`}>
            <Icon className="w-3 h-3" />
            {t.label}
          </span>
          <span className="font-mono text-xs font-medium text-stone-400 dark:text-stone-500 bg-stone-100 dark:bg-stone-800 px-2 py-0.5 rounded-lg">
            Sem {resource.semester}
          </span>
        </div>

        {/* Subject code + title */}
        <div className="flex-1 space-y-1">
          {resource.subject && (
            <p className="font-mono text-xs font-semibold text-ink-600 dark:text-ink-400 uppercase tracking-wide">
              {resource.subject}
            </p>
          )}
          <h3 className="font-display font-bold text-sm text-stone-900 dark:text-stone-100 leading-snug line-clamp-2">
            {resource.title}
          </h3>
          {resource.description && (
            <p className="text-xs text-stone-400 dark:text-stone-500 line-clamp-2 leading-relaxed">
              {resource.description}
            </p>
          )}
        </div>

        {/* Meta row */}
        <div className="flex items-center justify-between text-xs text-stone-400 dark:text-stone-500">
          <div className="flex items-center gap-1.5 flex-wrap">
            {resource.branch && (
              <span className="px-1.5 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800 font-semibold text-stone-600 dark:text-stone-400 text-[11px]">
                {resource.branch}
              </span>
            )}
            {resource.year && (
              <span className="font-mono text-[11px]">{resource.year}</span>
            )}
          </div>
          {resource.views > 0 && (
            <span className="flex items-center gap-1 text-[11px]">
              <Eye className="w-3 h-3" />{resource.views}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-1">
          <a href={resource.fileUrl} target="_blank" rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl
                       bg-ink-500 hover:bg-ink-600 active:scale-95
                       text-white text-xs font-bold transition-all shadow-sm">
            <ExternalLink className="w-3.5 h-3.5" />
            Open
          </a>
          <a href={resource.fileUrl} download title="Download"
            className="flex items-center justify-center w-10 h-10 rounded-xl
                       border border-stone-200 dark:border-stone-700
                       text-stone-500 dark:text-stone-400
                       hover:bg-stone-100 dark:hover:bg-stone-700
                       active:scale-95 transition-all">
            <Download className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </article>
  )
}
