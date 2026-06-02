export default function Spinner({ size = 'md', className = '' }) {
  const s = { sm: 'h-4 w-4 border-2', md: 'h-8 w-8 border-2', lg: 'h-12 w-12 border-[3px]' }[size]
  return (
    <div className={`${s} ${className} animate-spin rounded-full border-stone-200 dark:border-stone-700 border-t-ink-500`} />
  )
}
