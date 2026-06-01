'use client'

import { useState } from 'react'
import Sidebar from './_components/Sidebar'
import Overview from './_components/Overview'
import Deadlines from './_components/Deadlines'
import Documents from './_components/Documents'
import Audit from './_components/Audit'
import Incentives from './_components/Incentives'
import Financials from './_components/Financials'

type Tab = 'overview' | 'deadlines' | 'documents' | 'audit' | 'incentives' | 'financials'

const PAGE_TITLES: Record<Tab, string> = {
  overview: 'Overview',
  deadlines: 'Deadlines',
  documents: 'Documents',
  audit: 'AI Audit',
  incentives: 'Incentives & Tax Credits',
  financials: 'Financials',
}

export default function DashboardPage() {
  const [tab, setTab] = useState<Tab>('overview')

  return (
    <div className="flex h-screen overflow-hidden bg-[#f8f8f6]">
      <Sidebar tab={tab} setTab={setTab} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="bg-white border-b border-bureau-border px-6 h-11 flex items-center justify-between flex-shrink-0">
          <span className="font-semibold text-navy text-sm">{PAGE_TITLES[tab]}</span>
          <div className="flex items-center gap-3">
            <span className="text-bureau-muted text-xs">Joe&apos;s Deli · Midtown, Manhattan</span>
            <span className="bg-green/10 text-green text-[10px] font-semibold px-3 py-1 rounded-full">
              Good Standing
            </span>
          </div>
        </div>
        <div className="flex-1 overflow-auto">
          {tab === 'overview' && <Overview />}
          {tab === 'deadlines' && <Deadlines />}
          {tab === 'documents' && <Documents />}
          {tab === 'audit' && <Audit />}
          {tab === 'incentives' && <Incentives />}
          {tab === 'financials' && <Financials />}
        </div>
      </div>
    </div>
  )
}
