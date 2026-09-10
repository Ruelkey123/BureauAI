'use client'

import { useState } from 'react'
import Link from 'next/link'
import Sidebar from './_components/Sidebar'
import Overview from './_components/Overview'
import Deadlines from './_components/Deadlines'
import Documents from './_components/Documents'
import Audit from './_components/Audit'
import Incentives from './_components/Incentives'
import Financials from './_components/Financials'
import Rights from './_components/Rights'
import Prepare from './_components/Prepare'
import BusinessProfile from './_components/BusinessProfile'

type Tab = 'overview' | 'deadlines' | 'documents' | 'audit' | 'incentives' | 'financials' | 'prepare' | 'rights'

/* Must match the Sidebar labels exactly — the header names the same place the
   nav does, and both speak in the service voice: we hold this, not you. */
const PAGE_TITLES: Record<Tab, string> = {
  overview: 'Overview',
  deadlines: "We're Managing",
  documents: 'Filed & Tracked',
  audit: 'Our Latest Audit',
  incentives: 'Your Credits',
  financials: 'Financials',
  prepare: 'Action Items',
  rights: 'Your Rights',
}

export default function DashboardPage() {
  const [tab, setTab] = useState<Tab>('overview')
  const [profileOpen, setProfileOpen] = useState(false)

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: 'var(--void)' }}>
      <Sidebar tab={tab} setTab={setTab} onProfileClick={() => setProfileOpen(true)} />
      <BusinessProfile open={profileOpen} onClose={() => setProfileOpen(false)} />
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* This department runs on synthetic data. Say so, unmissably. */}
        <div
          className="flex flex-shrink-0 flex-wrap items-center justify-between gap-x-4 gap-y-1 px-6 py-2"
          style={{ background: 'var(--panel)', borderBottom: '1px solid var(--hair)' }}
        >
          <p className="font-mono text-[0.64rem] uppercase tracking-[0.1em]" style={{ color: 'var(--ink-2)' }}>
            Demo · synthetic business, not a real customer
          </p>
          <Link
            href="/audit"
            className="font-mono text-[0.64rem] uppercase tracking-[0.1em] underline"
            style={{ color: 'var(--ink-2)' }}
          >
            Run it on your business
          </Link>
        </div>

        <div className="px-6 h-11 flex items-center justify-between flex-shrink-0" style={{ borderBottom: '1px solid var(--hair)', background: 'var(--panel)' }}>
          <span className="font-semibold text-sm" style={{ color: 'var(--ink)' }}>{PAGE_TITLES[tab]}</span>
          <div className="flex items-center gap-3">
            <span className="text-xs" style={{ color: 'var(--ink-2)' }}>Joe&apos;s Deli · Midtown, Manhattan</span>
            <span className="text-micro font-semibold px-3 py-1 rounded-none" style={{ background: 'var(--signal-wash)', color: 'var(--signal)', border: '1px solid var(--signal-hair)' }}>
              Good Standing
            </span>
          </div>
        </div>
        <div className="flex-1 overflow-auto" style={{ background: 'var(--void)' }}>
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
