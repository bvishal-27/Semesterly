import { ExternalLink, Download, Eye, BookOpen, FileText, CheckCircle2 } from 'lucide-react'

// 12 beautiful gradient pairs — cards cycle through these
const GRADIENTS = [
  { from: '#FF7F50', to: '#FF5733', text: '#fff', badge: 'rgba(255,255,255,0.25)', subjectBg: 'rgba(0,0,0,0.18)' },
  { from: '#54a0ff', to: '#2e86de', text: '#fff', badge: 'rgba(255,255,255,0.25)', subjectBg: 'rgba(0,0,0,0.18)' },
  { from: '#80ed99', to: '#38d68a', text: '#1a3a2a', badge: 'rgba(0,0,0,0.12)', subjectBg: 'rgba(0,0,0,0.12)' },
  { from: '#ffd32a', to: '#ffa502', text: '#3a2800', badge: 'rgba(0,0,0,0.12)', subjectBg: 'rgba(0,0,0,0.12)' },
  { from: '#c56ef3', to: '#9b59b6', text: '#fff', badge: 'rgba(255,255,255,0.25)', subjectBg: 'rgba(0,0,0,0.18)' },
  { from: '#fd79a8', to: '#e84393', text: '#fff', badge: 'rgba(255,255,255,0.25)', subjectBg: 'rgba(0,0,0,0.18)' },
  { from: '#00cec9', to: '#00a8a8', text: '#fff', badge: 'rgba(255,255,255,0.25)', subjectBg: 'rgba(0,0,0,0.18)' },
  { from: '#a29bfe', to: '#6c5ce7', text: '#fff', badge: 'rgba(255,255,255,0.25)', subjectBg: 'rgba(0,0,0,0.18)' },
  { from: '#55efc4', to: '#00b894', text: '#1a3a30', badge: 'rgba(0,0,0,0.12)', subjectBg: 'rgba(0,0,0,0.12)' },
  { from: '#fdcb6e', to: '#e17055', text: '#fff', badge: 'rgba(255,255,255,0.25)', subjectBg: 'rgba(0,0,0,0.18)' },
  { from: '#74b9ff', to: '#0984e3', text: '#fff', badge: 'rgba(255,255,255,0.25)', subjectBg: 'rgba(0,0,0,0.18)' },
  { from: '#ff7675', to: '#d63031', text: '#fff', badge: 'rgba(255,255,255,0.25)', subjectBg: 'rgba(0,0,0,0.18)' },
]

// Pick a consistent gradient per subject name (same subject = same color always)
function getGradient(subject = '') {
  let hash = 0
  for (let i = 0; i < subject.length; i++) hash = subject.charCodeAt(i) + ((hash << 5) - hash)
  return GRADIENTS[Math.abs(hash) % GRADIENTS.length]
}

const TYPE_ICON = {
  notes:  { label: 'Notes',   Icon: BookOpen },
  qpaper: { label: 'Q-Paper', Icon: FileText },
  solved: { label: 'Solved',  Icon: CheckCircle2 },
}

export default function ResourceCard({ resource, index = 0 }) {
  const g = getGradient(resource.subject)
  const t = TYPE_ICON[resource.type] || TYPE_ICON.notes
  const { Icon } = t

  return (
    <article
      className="animate-fade-up group flex flex-col rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-200 cursor-default"
      style={{
        background: `linear-gradient(135deg, ${g.from} 0%, ${g.to} 100%)`,
        animationDelay: `${index * 0.05}s`,
      }}
    >
      <div className="p-5 flex flex-col gap-4 flex-1">

        {/* Top row — type badge + semester */}
        <div className="flex items-center justify-between gap-2">
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-wide"
            style={{ background: g.badge, color: g.text }}>
            <Icon className="w-3 h-3" />
            {t.label}
          </span>
          <span
            className="text-[11px] font-bold font-mono px-2 py-0.5 rounded-lg"
            style={{ background: g.badge, color: g.text }}>
            Sem {resource.semester}
          </span>
        </div>

        {/* Subject code — pill/cylinder shape */}
        <div className="flex-1 space-y-2">
          <div
            className="inline-flex items-center px-3 py-1 rounded-full font-mono text-[11px] font-black tracking-widest uppercase"
            style={{ background: g.subjectBg, color: g.text, letterSpacing: '0.12em' }}>
            ● {resource.subject}
          </div>

          {/* Title */}
          <h3
            className="text-[15px] font-black leading-snug line-clamp-2 tracking-tight"
            style={{ color: g.text }}>
            {resource.title}
          </h3>

          {/* Description */}
          {resource.description && (
            <p className="text-[12px] leading-relaxed line-clamp-2 opacity-80"
              style={{ color: g.text }}>
              {resource.description}
            </p>
          )}
        </div>

        {/* Meta row */}
        <div className="flex items-center justify-between text-[11px] font-semibold opacity-75"
          style={{ color: g.text }}>
          <div className="flex items-center gap-2">
            {resource.branch && (
              <span className="px-2 py-0.5 rounded-md font-bold"
                style={{ background: g.subjectBg }}>
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
          <a
            href={resource.fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-2xl text-[13px] font-black transition-all active:scale-95 hover:scale-[1.02]"
            style={{ background: 'rgba(0,0,0,0.22)', color: g.text }}>
            <ExternalLink className="w-3.5 h-3.5" />
            Open
          </a>
          <a
            href={resource.fileUrl}
            download
            title="Download"
            className="flex items-center justify-center w-10 h-10 rounded-2xl transition-all active:scale-95 hover:scale-110"
            style={{ background: 'rgba(0,0,0,0.22)', color: g.text }}>
            <Download className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </article>
  )
}
