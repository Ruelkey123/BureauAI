'use client'

import { useState } from 'react'
import Sidebar from './_components/Sidebar'
import Overview from './_components/Overview'
import Deadlines from './_components/Deadlines'
import Documents from './_components/Documents'
import Audit from './_components/Audit'
import Incentives from './_components/Incentives'
import Financials from './_components/Financials'
import Rights from './_components/Rights'
import Prepare from './_components/Prepare'

type Tab = 'overview' | 'deadlines' | 'documents' | 'audit' | 'incentives' | 'financials' | 'prepare' | 'rights'

const PAGE_TITLES: Record<Tab, string> = {
  overview: 'Overview',
  deadlines: 'Deadlines',
  documents: 'Documents',
  audit: 'AI Audit',
  incentives: 'Incentives & Tax Credits',
  financials: 'Financials',
  prepare: 'Prepare',
  rights: 'Your Rights',
}

export default function DashboardPage() {
  const [tab, setTab] = useState<Tab>('overview')

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: '#06090e' }}>
      <Sidebar tab={tab} setTab={setTab} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="px-6 h-11 flex items-center justify-between flex-shrink-0" style={{ borderBottom: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.02)' }}>
          <span className="font-semibold text-sm" style={{ color: '#e8e8e0' }}>{PAGE_TITLES[tab]}</span>
          <div className="flex items-center gap-3">
            <span className="text-xs" style={{ color: 'rgba(232,232,224,0.4)' }}>Joe&apos;s Deli · Midtown, Manhattan</span>
            <span className="text-[10px] font-semibold px-3 py-1 rounded-full" style={{ background: 'rgba(77,186,128,0.12)', color: '#4dba80', border: '1px solid rgba(77,186,128,0.2)' }}>
              Good Standing
            </span>
          </div>
        </div>
        <div className="flex-1 overflow-auto" style={{ background: '#06090e' }}>
          {tab === 'overview' && <Overview />}
          {tab === 'deadlines' && <Deadlines />}
          {tab === 'documents' && <Documents />}
          {tab === 'audit' && <Audit />}
          {tab === 'incentives' && <Incentives />}
          {tab === 'financials' && <Financials />}
          {tab === 'prepare' && <Prepare />}
          {tab === 'rights' && <Rights />}
        </div>
      </div>
    </div>
  )
}
