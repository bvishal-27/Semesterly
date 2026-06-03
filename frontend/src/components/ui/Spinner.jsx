export default function Spinner({ size = 'md' }) {
  const s = { sm:'w-4 h-4 border-2', md:'w-8 h-8 border-2', lg:'w-12 h-12 border-[3px]' }[size]
  return <div className={`${s} animate-spin rounded-full border-gray-200 dark:border-gray-700 border-t-primary-500`} />
}
