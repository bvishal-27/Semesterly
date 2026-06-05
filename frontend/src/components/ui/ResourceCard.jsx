import { ExternalLink, Download, Eye, BookOpen, FileText, CheckCircle2 } from 'lucide-react'

const GRADIENTS = [
  { from:'#FF7F50', to:'#ff5e2e', light:false },
  { from:'#54a0ff', to:'#2176ff', light:false },
  { from:'#80ed99', to:'#38d68a', light:true  },
  { from:'#ffd32a', to:'#ffb700', light:true  },
  { from:'#c56ef3', to:'#9b3fd4', light:false },
  { from:'#fd79a8', to:'#e8247a', light:false },
  { from:'#00cec9', to:'#009e9a', light:false },
  { from:'#a29bfe', to:'#6c5ce7', light:false },
  { from:'#55efc4', to:'#00b894', light:true  },
  { from:'#fdcb6e', to:'#e08a00', light:true  },
  { from:'#74b9ff', to:'#0984e3', light:false },
  { from:'#ff7675', to:'#d63031', light:false },
]

function pickGradient(subject = '') {
  let h = 0
  for (let i = 0; i < subject.length; i++) h = subject.charCodeAt(i) + ((h << 5) - h)
  return GRADIENTS[Math.abs(h) % GRADIENTS.length]
}

const TYPE_ICON = {
  notes:  { label:'Notes',   Icon: BookOpen },
  qpaper: { label:'Q-Paper', Icon: FileText },
  solved: { label:'Solved',  Icon: CheckCircle2 },
}

export default function ResourceCard({ resource, index = 0 }) {
  const g = pickGradient(resource.subject)
  const t = TYPE_ICON[resource.type] || TYPE_ICON.notes
  const { Icon } = t

  // Light cards → dark text; dark cards → white text
  const text     = g.light ? '#1a1a1a' : '#ffffff'
  const badgeBg  = g.light ? 'rgba(0,0,0,0.14)' : 'rgba(255,255,255,0.22)'
  const codeBg   = g.light ? 'rgba(0,0,0,0.12)' : 'rgba(0,0,0,0.20)'
  const btnBg    = g.light ? 'rgba(0,0,0,0.18)' : 'rgba(0,0,0,0.25)'
  const metaOpacity = g.light ? '0.65' : '0.75'

  return (
    <article
      className="animate-fade-up flex flex-col rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-200"
      style={{
        background: `linear-gradient(145deg, ${g.from} 0%, ${g.to} 100%)`,
        animationDelay: `${index * 0.05}s`,
      }}
    >
      <div className="p-5 flex flex-col gap-4 flex-1">

        {/* Type badge + Semester */}
        <div className="flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-black"
            style={{ background: badgeBg, color: text }}>
            <Icon className="w-3.5 h-3.5" />
            {t.label}
          </span>
          <span className="text-[12px] font-black font-mono px-2.5 py-0.5 rounded-xl"
            style={{ background: badgeBg, color: text }}>
            Sem {resource.semester}
          </span>
        </div>

        {/* Subject code pill */}
        <div className="space-y-2 flex-1">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full font-mono text-[11px] font-black tracking-[0.12em] uppercase"
            style={{ background: codeBg, color: text }}>
            <span className="w-2 h-2 rounded-full inline-block shrink-0" style={{ background: text, opacity: 0.8 }} />
            {resource.subject}
          </div>

          {/* Title */}
          <h3 className="text-[15px] font-black leading-snug line-clamp-2 tracking-tight"
            style={{ color: text }}>
            {resource.title}
          </h3>

          {/* Description */}
          {resource.description && (
            <p className="text-[12px] font-semibold leading-relaxed line-clamp-2"
              style={{ color: text, opacity: 0.75 }}>
              {resource.description}
            </p>
          )}
        </div>

        {/* Meta row */}
        <div className="flex items-center justify-between text-[11px] font-bold"
          style={{ color: text, opacity: metaOpacity }}>
          <div className="flex items-center gap-2">
            {resource.branch && (
              <span className="px-2 py-0.5 rounded-lg font-black"
                style={{ background: codeBg }}>
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

        {/* Buttons */}
        <div className="flex gap-2">
          <a href={resource.fileUrl} target="_blank" rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl text-[14px] font-black transition-all active:scale-95 hover:scale-[1.02]"
            style={{ background: btnBg, color: text }}>
            <ExternalLink className="w-4 h-4" />
            Open
          </a>
          <a href={resource.fileUrl} download title="Download"
            className="flex items-center justify-center w-11 h-11 rounded-2xl transition-all active:scale-95 hover:scale-110"
            style={{ background: btnBg, color: text }}>
            <Download className="w-4 h-4" />
          </a>
        </div>
      </div>
    </article>
  )
}
