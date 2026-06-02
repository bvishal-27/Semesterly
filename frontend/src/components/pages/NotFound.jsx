import { Link } from 'react-router-dom'
export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center">
      <span className="font-display text-7xl font-bold text-gray-200 dark:text-gray-800">404</span>
      <h1 className="font-display text-xl font-semibold text-gray-700 dark:text-gray-300">Page not found</h1>
      <Link to="/" className="btn-primary">Go home</Link>
    </div>
  )
}
