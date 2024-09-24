"use client"

import { useState, useCallback } from "react"
import { useRouter, usePathname } from "next/navigation"
import { X, Menu, Settings, Home, RefreshCw, ArrowRightLeft, Send, User } from "lucide-react"

const navItems = [
  { title: "Overview", href: "/dashboard", icon: Home },
  { title: "Transactions", href: "/transactions", icon: RefreshCw },
  { title: "Transfer", href: "/transfer", icon: ArrowRightLeft },
  { title: "P2P Transfer", href: "/p2p", icon: Send },
  { title: "Settings", href: "/settings", icon: Settings },
  { title: "Accounts", href: "/accounts", icon: User },
]

export const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const toggleSidebar = useCallback(() => setSidebarOpen(prev => !prev), [])

  return (
    <>
      <aside 
        className={`${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } fixed inset-y-0 left-0 z-50 w-64 bg-white p-6 shadow-md transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0`}
      >
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-blue-600">LedgerFlow</h1>
          <button 
            onClick={toggleSidebar} 
            className="lg:hidden" 
            aria-label="Close sidebar"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <nav>
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.title}>
                <SidebarItem href={item.href} title={item.title} Icon={item.icon} />
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      <button 
        className="fixed bottom-4 right-4 z-50 rounded-full bg-blue-600 p-2 text-white shadow-lg lg:hidden" 
        onClick={toggleSidebar}
        aria-label="Open sidebar"
      >
        <Menu className="h-6 w-6" />
      </button>
    </>
  )
}

const SidebarItem = ({
  href,
  title,
  Icon,
}: {
  href: string
  title: string
  Icon: React.ComponentType<{ className?: string }>
}) => {
  const router = useRouter()
  const pathname = usePathname()
  const selected = pathname === href

  const handleClick = useCallback(() => {
    router.push(href)
  }, [router, href])

  return (
    <button
      className={`flex w-full items-center rounded-lg p-2 transition-colors duration-200 hover:bg-gray-100 ${
        selected ? "bg-gray-100 text-blue-600" : "text-gray-700"
      }`}
      onClick={handleClick}
    >
      <Icon className={`mr-3 h-5 w-5 ${selected ? "text-blue-600" : "text-gray-400"}`} />
      <span className={`font-medium ${selected ? "text-blue-600" : ""}`}>
        {title}
      </span>
    </button>
  )
}