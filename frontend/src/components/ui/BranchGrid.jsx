const BRANCHES = [
  { key: 'CSE', short: 'CSE', label: 'Computer Science',     emoji: '💻', bg: 'hover:bg-violet-50 dark:hover:bg-violet-900/20', active: 'bg-violet-600 text-white border-violet-600', ring: 'border-violet-200 dark:border-violet-800' },
  { key: 'ECE', short: 'ECE', label: 'Electronics & Comm.',  emoji: '📡', bg: 'hover:bg-blue-50   dark:hover:bg-blue-900/20',   active: 'bg-blue-600   text-white border-blue-600',   ring: 'border-blue-200   dark:border-blue-800'   },
  { key: 'ME',  short: 'ME',  label: 'Mechanical',           emoji: '⚙️',  bg: 'hover:bg-orange-50 dark:hover:bg-orange-900/20', active: 'bg-orange-500 text-white border-orange-500', ring: 'border-orange-200 dark:border-orange-800' },
  { key: 'CE',  short: 'CE',  label: 'Civil',                emoji: '🏗️',  bg: 'hover:bg-teal-50   dark:hover:bg-teal-900/20',   active: 'bg-teal-600   text-white border-teal-600',   ring: 'border-teal-200   dark:border-teal-800'   },
  { key: 'EEE', short: 'EEE', label: 'Electrical',           emoji: '⚡',  bg: 'hover:bg-yellow-50 dark:hover:bg-yellow-900/20', active: 'bg-yellow-500 text-white border-yellow-500', ring: 'border-yellow-200 dark:border-yellow-800' },
  { key: 'IT',  short: 'IT',  label: 'Info. Technology',     emoji: '🌐', bg: 'hover:bg-cyan-50   dark:hover:bg-cyan-900/20',   active: 'bg-cyan-600   text-white border-cyan-600',   ring: 'border-cyan-200   dark:border-cyan-800'   },
]

export default function BranchGrid({ selected, onSelect }) {
  return (
    <div className="space-y-3">
      <p className="text-xs font-semibold text-stone-400 dark:text-stone-500 uppercase tracking-widest">Branch</p>
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
        {BRANCHES.map(b => {
          const isActive = selected === b.key
          return (
            <button key={b.key} onClick={() => onSelect(isActive ? 'all' : b.key)}
              className={`flex flex-col items-center gap-2 p-3 sm:p-4 rounded-2xl border-2 font-semibold
                          transition-all duration-150 active:scale-95 select-none
                          ${isActive
                            ? b.active + ' shadow-md scale-[1.02]'
                            : `bg-white dark:bg-canvas-800 ${b.ring} ${b.bg} text-stone-700 dark:text-stone-300`
                          }`}>
              <span className="text-2xl leading-none">{b.emoji}</span>
              <div className="text-center">
                <p className="font-display text-xs font-bold leading-tight">{b.short}</p>
                <p className={`text-[10px] leading-tight mt-0.5 hidden sm:block font-medium
                  ${isActive ? 'text-white/80' : 'text-stone-400 dark:text-stone-500'}`}>
                  {b.label}
                </p>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
