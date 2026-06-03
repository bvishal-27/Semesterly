const BRANCHES = [
  { key: 'CSE', emoji: '💻', label: 'Comp. Science',  activeClass: 'bg-violet-500  border-violet-500  text-white' },
  { key: 'ECE', emoji: '📡', label: 'Electronics',    activeClass: 'bg-blue-500    border-blue-500    text-white' },
  { key: 'ME',  emoji: '⚙️',  label: 'Mechanical',    activeClass: 'bg-orange-500  border-orange-500  text-white' },
  { key: 'CE',  emoji: '🏗️',  label: 'Civil',         activeClass: 'bg-teal-500    border-teal-500    text-white' },
  { key: 'EEE', emoji: '⚡',  label: 'Electrical',    activeClass: 'bg-yellow-500  border-yellow-500  text-white' },
  { key: 'IT',  emoji: '🌐', label: 'Info. Tech.',    activeClass: 'bg-cyan-500    border-cyan-500    text-white' },
]

export default function BranchGrid({ selected, onSelect }) {
  return (
    <div className="space-y-3">
      <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest">Browse by Branch</p>
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
        {BRANCHES.map(b => {
          const active = selected === b.key
          return (
            <button key={b.key}
              onClick={() => onSelect(active ? 'all' : b.key)}
              className={`flex flex-col items-center gap-2 py-4 px-2 rounded-2xl border-2 font-semibold
                transition-all duration-150 active:scale-95 select-none
                ${active
                  ? `${b.activeClass} shadow-md scale-[1.03]`
                  : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-700'
                }`}>
              <span className="text-2xl leading-none">{b.emoji}</span>
              <div>
                <p className="text-xs font-bold leading-tight">{b.key}</p>
                <p className={`text-[10px] leading-tight mt-0.5 hidden sm:block
                  ${active ? 'text-white/80' : 'text-gray-400 dark:text-gray-500'}`}>
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
