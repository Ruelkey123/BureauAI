'use client'

import { useState } from 'react'

interface Props {
  open: boolean
  onClose: () => void
}

const DOCS = [
  { name: 'Food Service Permit', status: 'uploaded', date: 'May 2026' },
  { name: 'Business License (DCWP)', status: 'uploaded', date: 'Mar 2026' },
  { name: 'Certificate of Occupancy', status: 'missing', date: null },
  { name: 'Fire Inspection Report', status: 'uploaded', date: 'Jan 2026' },
  { name: 'Lease Agreement', status: 'missing', date: null },
  { name: 'Liability Insurance', status: 'uploaded', date: 'Apr 2026' },
]

const CONTACTS = [
  { role: 'Expeditor', name: 'Mario Rossi', phone: '(212) 555-0142', email: 'mario@rossiexp.com' },
  { role: 'Attorney', name: 'Sarah Chen, Esq.', phone: '(646) 555-0198', email: 'schen@nyclaw.com' },
  { role: 'Accountant', name: 'David Park CPA', phone: '(718) 555-0167', email: 'dpark@parkfinancial.com' },
]

type PanelTab = 'overview' | 'documents' | 'contacts' | 'notes'

export default function BusinessProfile({ open, onClose }: Props) {
  const [tab, setTab] = useState<PanelTab>('overview')
  const [notes, setNotes] = useState('- Lease renewal due Oct 2027\n- Hood cleaning scheduled every 6 months\n- Regular exterminator: ABC Pest, (212) 555-0199')
  const [editingNotes, setEditingNotes] = useState(false)

  if (!open) return null

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-40" onClick={onClose} style={{ background: 'var(--scrim)' }} />

      {/* Panel */}
      <div className="fixed left-14 top-0 bottom-0 z-50 w-80 flex flex-col" style={{ background: 'var(--void)', borderRight: '1px solid var(--hair)', boxShadow: '4px 0 24px rgba(0,0,0,0.5)' }}>

        {/* Business header */}
        <div className="p-5" style={{ borderBottom: '1px solid var(--hair)' }}>
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              {/* Business avatar */}
              <div style={{
                width: '44px', height: '44px', borderRadius: '0',
                background: 'linear-gradient(135deg, var(--panel), var(--panel-hi))',
                border: '1px solid var(--signal-hair)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 'var(--text-base)', fontWeight: '700', color: 'var(--signal)',
                fontFamily: 'var(--font-archivo), sans-serif',
              }}>
                J
              </div>
              <div>
                <div className="font-semibold text-sm" style={{ color: 'var(--ink)' }}>Joe's Deli</div>
                <div className="text-micro mt-0.5" style={{ color: 'var(--ink-2)' }}>Restaurant · Midtown, Manhattan</div>
              </div>
            </div>
            <button onClick={onClose} aria-label="Close business profile" className="transition-colors" style={{ color: 'var(--ink-3)' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--ink)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--ink-3)' }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" aria-hidden="true">
                <path d="M5 5 19 19M19 5 5 19" />
              </svg>
            </button>
          </div>

          {/* Status badges */}
          <div className="flex gap-2 flex-wrap">
            <span className="text-micro px-2 py-1 rounded-none font-medium" style={{ background: 'var(--signal-wash)', color: 'var(--signal)', border: '1px solid var(--signal-hair)' }}>Good Standing</span>
            <span className="text-micro px-2 py-1 rounded-none font-medium" style={{ background: 'var(--panel-hi)', color: 'var(--ink-2)', border: '1px solid var(--hair)' }}>Est. 2018</span>
            <span className="text-micro px-2 py-1 rounded-none font-medium" style={{ background: 'var(--panel-hi)', color: 'var(--ink-2)', border: '1px solid var(--hair)' }}>12 employees</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex px-3 pt-3 gap-1" style={{ borderBottom: '1px solid var(--hair)' }}>
          {([
            ['overview', 'Overview'],
            ['documents', 'Docs'],
            ['contacts', 'Contacts'],
            ['notes', 'Notes'],
          ] as [PanelTab, string][]).map(([id, label]) => (
            <button key={id} onClick={() => setTab(id)}
              className="px-3 pb-3 text-2xs font-medium transition-colors"
              style={{
                color: tab === id ? 'var(--signal)' : 'var(--ink-2)',
                borderBottom: tab === id ? '2px solid var(--signal)' : '2px solid transparent',
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="flex-1 overflow-auto p-4">

          {tab === 'overview' && (
            <div className="flex flex-col gap-3">
              {[
                ['Business name', "Joe's Deli"],
                ['Legal entity', 'JD Hospitality LLC'],
                ['Business type', 'Restaurant / Food Service'],
                ['Borough', 'Manhattan'],
                ['Neighborhood', 'Midtown West'],
                ['Address', '139 W 33rd St, NY 10001'],
                ['CAMIS number', '50078432'],
                ['EIN', '83-XXXXXXX'],
                ['Opened', 'March 2018'],
                ['Seating capacity', '42'],
              ].map(([key, val]) => (
                <div key={key} className="flex justify-between items-start py-2" style={{ borderBottom: '1px solid var(--panel-hi)' }}>
                  <span className="text-micro" style={{ color: 'var(--ink-3)' }}>{key}</span>
                  <span className="text-2xs font-medium text-right max-w-[55%]" style={{ color: 'var(--ink)' }}>{val}</span>
                </div>
              ))}
            </div>
          )}

          {tab === 'documents' && (
            <div className="flex flex-col gap-2">
              <p className="text-micro mb-2" style={{ color: 'var(--ink-3)' }}>Keep your key documents in one place for quick access during inspections.</p>
              {DOCS.map(({ name, status, date }) => (
                <div key={name} className="flex items-center justify-between p-3 rounded-none" style={{ background: 'var(--panel)', border: '1px solid var(--hair)' }}>
                  <div className="flex items-center gap-2.5">
                    <div style={{ width: '28px', height: '28px', borderRadius: '0', background: status === 'uploaded' ? 'var(--signal-wash)' : 'var(--panel)', border: `1px solid ${status === 'uploaded' ? 'var(--signal-hair)' : 'var(--hair)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M2 1h5.5L10 3.5V11H2V1z" stroke={status === 'uploaded' ? 'var(--signal)' : 'var(--ink-3)'} strokeWidth="1"/>
                        <path d="M7 1v3h3" stroke={status === 'uploaded' ? 'var(--signal)' : 'var(--ink-3)'} strokeWidth="1"/>
                      </svg>
                    </div>
                    <div>
                      <div className="text-2xs font-medium" style={{ color: status === 'uploaded' ? 'var(--ink)' : 'var(--ink-2)' }}>{name}</div>
                      {date && <div className="text-micro" style={{ color: 'var(--ink-3)' }}>Uploaded {date}</div>}
                    </div>
                  </div>
                  {status === 'uploaded'
                    ? <span className="text-micro" style={{ color: 'var(--signal)' }}>View →</span>
                    : <span className="text-micro px-2 py-1 rounded-none" style={{ background: 'var(--panel-hi)', color: 'var(--ink-3)', border: '1px solid var(--hair)', cursor: 'pointer' }}>Upload</span>
                  }
                </div>
              ))}
            </div>
          )}

          {tab === 'contacts' && (
            <div className="flex flex-col gap-3">
              <p className="text-micro mb-1" style={{ color: 'var(--ink-3)' }}>Key people to call when compliance issues come up.</p>
              {CONTACTS.map(({ role, name, phone, email }) => (
                <div key={role} className="p-3 rounded-none" style={{ background: 'var(--panel)', border: '1px solid var(--hair)' }}>
                  <div className="text-micro uppercase tracking-wider mb-1" style={{ color: 'var(--ink-3)' }}>{role}</div>
                  <div className="font-semibold text-sm mb-2" style={{ color: 'var(--ink)' }}>{name}</div>
                  <div className="flex flex-col gap-1">
                    <div className="text-micro" style={{ color: 'var(--ink-2)' }}>{phone}</div>
                    <div className="text-micro" style={{ color: 'var(--ink-2)' }}>{email}</div>
                  </div>
                </div>
              ))}
              <button className="w-full p-3 rounded-none text-2xs font-medium transition-all" style={{ background: 'transparent', border: '1px dashed var(--hair-bright)', color: 'var(--ink-3)', cursor: 'pointer' }}>
                + Add contact
              </button>
            </div>
          )}

          {tab === 'notes' && (
            <div className="flex flex-col gap-3 h-full">
              <div className="flex items-center justify-between">
                <p className="text-micro" style={{ color: 'var(--ink-3)' }}>Free-form notes about your business.</p>
                <button onClick={() => setEditingNotes(!editingNotes)} className="text-micro px-2 py-1 rounded-none transition-all"
                  style={{ background: editingNotes ? 'var(--signal-wash)' : 'var(--panel-hi)', color: editingNotes ? 'var(--signal)' : 'var(--ink-2)', border: `1px solid ${editingNotes ? 'var(--signal-hair)' : 'var(--hair)'}` }}>
                  {editingNotes ? 'Save' : 'Edit'}
                </button>
              </div>
              {editingNotes
                ? <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={14}
                    className="flex-1 resize-none text-xs leading-relaxed outline-none p-3 rounded-none"
                    style={{ background: 'var(--panel)', border: '1px solid var(--signal-hair)', color: 'var(--ink)' }}
                  />
                : <div className="text-xs leading-relaxed whitespace-pre-wrap p-3 rounded-none" style={{ background: 'var(--panel)', border: '1px solid var(--hair)', color: 'var(--ink-2)', minHeight: '200px' }}>
                    {notes}
                  </div>
              }
            </div>
          )}
        </div>
      </div>
    </>
  )
}
