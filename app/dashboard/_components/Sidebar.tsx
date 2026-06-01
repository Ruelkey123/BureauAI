'use client'

type Tab = 'overview' | 'deadlines' | 'documents' | 'audit' | 'incentives' | 'financials'

interface SidebarProps {
  tab: Tab
  setTab: (tab: Tab) => void
}

const navItems: { id: Tab; label: string; icon: React.ReactNode }[] = [
  {
    id: 'overview',
    label: 'Overview',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="2" y="2" width="5" height="5" rx="1" fill="currentColor" />
        <rect x="9" y="2" width="5" height="5" rx="1" fill="currentColor" opacity="0.4" />
        <rect x="2" y="9" width="5" height="5" rx="1" fill="currentColor" opacity="0.4" />
        <rect x="9" y="9" width="5" height="5" rx="1" fill="currentColor" opacity="0.4" />
      </svg>
    ),
  },
  {
    id: 'deadlines',
    label: 'Deadlines',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="2" y="3" width="12" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M5 2v2M11 2v2M2 7h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'documents',
    label: 'Documents',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M4 2h5.5L12 4.5V14H4V2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M9 2v3h3" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    id: 'audit',
    label: 'AI Audit',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M6 8l1.5 1.5L10 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 'incentives',
    label: 'Incentives',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M8 2l1.5 3.5H13l-2.8 2 1 3.5L8 9l-3.2 2 1-3.5L3 5.5h3.5L8 2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 'financials' as Tab,
    label: 'Financials',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="2" y="10" width="2.5" height="4" rx="0.5" fill="currentColor" />
        <rect x="6.5" y="7" width="2.5" height="7" rx="0.5" fill="currentColor" />
        <rect x="11" y="4" width="2.5" height="10" rx="0.5" fill="currentColor" />
        <path d="M3 6l3.5-3 3 2.5L13 2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
]

export default function Sidebar({ tab, setTab }: SidebarProps) {
  return (
    <aside className="w-14 bg-navy flex flex-col items-center py-4 gap-1 flex-shrink-0">
      <div className="w-7 h-7 bg-green rounded-md flex items-center justify-center mb-3">
        <div className="w-3 h-3 border-2 border-cream rounded-sm" />
      </div>
      {navItems.map(({ id, label, icon }) => (
        <button
          key={id}
          onClick={() => setTab(id)}
          title={label}
          className={`w-9 h-9 rounded-md flex items-center justify-center transition-colors text-cream ${
            tab === id
              ? 'bg-white/10 border border-white/20'
              : 'opacity-40 hover:opacity-70'
          }`}
        >
          {icon}
        </button>
      ))}
      <div className="mt-auto w-7 h-7 rounded-full bg-green/30 flex items-center justify-center text-cream text-[10px] font-bold">
        JD
      </div>
    </aside>
  )
}
