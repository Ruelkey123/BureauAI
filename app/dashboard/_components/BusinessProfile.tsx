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
      <div className="fixed inset-0 z-40" onClick={onClose} style={{ background: 'rgba(0,0,0,0.4)' }} />

      {/* Panel */}
      <div className="fixed left-14 top-0 bottom-0 z-50 w-80 flex flex-col" style={{ background: '#0a1018', borderRight: '1px solid rgba(255,255,255,0.08)', boxShadow: '4px 0 24px rgba(0,0,0,0.5)' }}>

        {/* Business header */}
        <div className="p-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              {/* Business avatar */}
              <div style={{
                width: '44px', height: '44px', borderRadius: '10px',
                background: 'linear-gradient(135deg, #0d2218, #1a4d30)',
                border: '1px solid rgba(77,186,128,0.25)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '16px', fontWeight: '700', color: '#4dba80',
                fontFamily: 'Georgia, serif',
              }}>
                J
              </div>
              <div>
                <div className="font-semibold text-sm" style={{ color: '#e8e8e0' }}>Joe's Deli</div>
                <div className="text-[10px] mt-0.5" style={{ color: 'rgba(232,232,224,0.4)' }}>Restaurant · Midtown, Manhattan</div>
              </div>
            </div>
            <button onClick={onClose} className="text-xs transition-colors" style={{ color: 'rgba(232,232,224,0.3)' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#e8e8e0' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(232,232,224,0.3)' }}
            >✕</button>
          </div>

          {/* Status badges */}
          <div className="flex gap-2 flex-wrap">
            <span className="text-[9px] px-2 py-1 rounded-full font-medium" style={{ background: 'rgba(77,186,128,0.12)', color: '#4dba80', border: '1px solid rgba(77,186,128,0.2)' }}>Good Standing</span>
            <span className="text-[9px] px-2 py-1 rounded-full font-medium" style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(232,232,224,0.45)', border: '1px solid rgba(255,255,255,0.08)' }}>Est. 2018</span>
            <span className="text-[9px] px-2 py-1 rounded-full font-medium" style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(232,232,224,0.45)', border: '1px solid rgba(255,255,255,0.08)' }}>12 employees</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex px-3 pt-3 gap-1" style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
          {([
            ['overview', 'Overview'],
            ['documents', 'Docs'],
            ['contacts', 'Contacts'],
            ['notes', 'Notes'],
          ] as [PanelTab, string][]).map(([id, label]) => (
            <button key={id} onClick={() => setTab(id)}
              className="px-3 pb-3 text-[11px] font-medium transition-colors"
              style={{
                color: tab === id ? '#4dba80' : 'rgba(232,232,224,0.4)',
                borderBottom: tab === id ? '2px solid #4dba80' : '2px solid transparent',
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
                <div key={key} className="flex justify-between items-start py-2" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <span className="text-[10px]" style={{ color: 'rgba(232,232,224,0.35)' }}>{key}</span>
                  <span className="text-[11px] font-medium text-right max-w-[55%]" style={{ color: '#e8e8e0' }}>{val}</span>
                </div>
              ))}
            </div>
          )}

          {tab === 'documents' && (
            <div className="flex flex-col gap-2">
              <p className="text-[10px] mb-2" style={{ color: 'rgba(232,232,224,0.35)' }}>Keep your key documents in one place for quick access during inspections.</p>
              {DOCS.map(({ name, status, date }) => (
                <div key={name} className="flex items-center justify-between p-3 rounded-lg" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <div className="flex items-center gap-2.5">
                    <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: status === 'uploaded' ? 'rgba(77,186,128,0.1)' : 'rgba(255,255,255,0.04)', border: `1px solid ${status === 'uploaded' ? 'rgba(77,186,128,0.2)' : 'rgba(255,255,255,0.08)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M2 1h5.5L10 3.5V11H2V1z" stroke={status === 'uploaded' ? '#4dba80' : 'rgba(232,232,224,0.25)'} strokeWidth="1"/>
                        <path d="M7 1v3h3" stroke={status === 'uploaded' ? '#4dba80' : 'rgba(232,232,224,0.25)'} strokeWidth="1"/>
                      </svg>
                    </div>
                    <div>
                      <div className="text-[11px] font-medium" style={{ color: status === 'uploaded' ? '#e8e8e0' : 'rgba(232,232,224,0.4)' }}>{name}</div>
                      {date && <div className="text-[9px]" style={{ color: 'rgba(232,232,224,0.3)' }}>Uploaded {date}</div>}
                    </div>
                  </div>
                  {status === 'uploaded'
                    ? <span className="text-[9px]" style={{ color: '#4dba80' }}>View →</span>
                    : <span className="text-[9px] px-2 py-1 rounded" style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(232,232,224,0.35)', border: '1px solid rgba(255,255,255,0.08)', cursor: 'pointer' }}>Upload</span>
                  }
                </div>
              ))}
            </div>
          )}

          {tab === 'contacts' && (
            <div className="flex flex-col gap-3">
              <p className="text-[10px] mb-1" style={{ color: 'rgba(232,232,224,0.35)' }}>Key people to call when compliance issues come up.</p>
              {CONTACTS.map(({ role, name, phone, email }) => (
                <div key={role} className="p-3 rounded-lg" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <div className="text-[9px] uppercase tracking-wider mb-1" style={{ color: 'rgba(232,232,224,0.3)' }}>{role}</div>
                  <div className="font-semibold text-sm mb-2" style={{ color: '#e8e8e0' }}>{name}</div>
                  <div className="flex flex-col gap-1">
                    <div className="text-[10px]" style={{ color: 'rgba(232,232,224,0.45)' }}>{phone}</div>
                    <div className="text-[10px]" style={{ color: 'rgba(232,232,224,0.45)' }}>{email}</div>
                  </div>
                </div>
              ))}
              <button className="w-full p-3 rounded-lg text-[11px] font-medium transition-all" style={{ background: 'transparent', border: '1px dashed rgba(255,255,255,0.12)', color: 'rgba(232,232,224,0.35)', cursor: 'pointer' }}>
                + Add contact
              </button>
            </div>
          )}

          {tab === 'notes' && (
            <div className="flex flex-col gap-3 h-full">
              <div className="flex items-center justify-between">
                <p className="text-[10px]" style={{ color: 'rgba(232,232,224,0.35)' }}>Free-form notes about your business.</p>
                <button onClick={() => setEditingNotes(!editingNotes)} className="text-[10px] px-2 py-1 rounded transition-all"
                  style={{ background: editingNotes ? 'rgba(77,186,128,0.12)' : 'rgba(255,255,255,0.05)', color: editingNotes ? '#4dba80' : 'rgba(232,232,224,0.4)', border: `1px solid ${editingNotes ? 'rgba(77,186,128,0.2)' : 'rgba(255,255,255,0.08)'}` }}>
                  {editingNotes ? 'Save' : 'Edit'}
                </button>
              </div>
              {editingNotes
                ? <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={14}
                    className="flex-1 resize-none text-xs leading-relaxed outline-none p-3 rounded-lg"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(77,186,128,0.2)', color: '#e8e8e0' }}
                  />
                : <div className="text-xs leading-relaxed whitespace-pre-wrap p-3 rounded-lg" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', color: 'rgba(232,232,224,0.6)', minHeight: '200px' }}>
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
