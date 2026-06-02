const BRANCHES = [
  { key: 'CSE', label: 'Computer Science', short: 'CSE', emoji: '💻', color: 'from-blue-500 to-indigo-600' },
  { key: 'ECE', label: 'Electronics & Comm.', short: 'ECE', emoji: '📡', color: 'from-violet-500 to-purple-600' },
  { key: 'ME',  label: 'Mechanical Engg.',   short: 'ME',  emoji: '⚙️',  color: 'from-orange-500 to-amber-600' },
  { key: 'CE',  label: 'Civil Engg.',         short: 'CE',  emoji: '🏗️',  color: 'from-emerald-500 to-teal-600' },
  { key: 'EEE', label: 'Electrical Engg.',    short: 'EEE', emoji: '⚡',  color: 'from-yellow-500 to-orange-500' },
  { key: 'IT',  label: 'Information Tech.',   short: 'IT',  emoji: '🌐',  color: 'from-cyan-500 to-sky-600' },
]

export default function BranchGrid({ selected, onSelect }) {
  return (
    <div className="space-y-2">
      <h2 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest">
        Browse by Branch
      </h2>
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
        {BRANCHES.map(b => (
          <button key={b.key} onClick={() => onSelect(selected === b.key ? 'all' : b.key)}
            className={`relative flex flex-col items-center gap-1.5 p-3 rounded-2xl border-2 transition-all duration-150 active:scale-95
              ${selected === b.key
                ? `bg-gradient-to-br ${b.color} border-transparent text-white shadow-lg scale-105`
                : 'bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
              }`}>
            <span className="text-xl leading-none">{b.emoji}</span>
            <span className="font-display font-bold text-xs">{b.short}</span>
            <span className={`text-center leading-tight hidden sm:block font-medium
              ${selected === b.key ? 'text-white/80 text-[9px]' : 'text-gray-400 dark:text-gray-500 text-[9px]'}`}>
              {b.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
