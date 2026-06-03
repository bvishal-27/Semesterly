import Navbar from './Navbar'
import Footer from './Footer'
export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#f9fafb] dark:bg-[#0f1117]">
      <Navbar />
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-10">
        {children}
      </main>
      <Footer />
    </div>
  )
}
