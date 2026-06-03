import React from 'react'
import { DEADLINES } from '../_data/deadlines'

const card: React.CSSProperties = {
  background: 'rgba(255,255,255,0.03)',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: '10px',
  padding: '16px',
}

const label: React.CSSProperties = {
  fontSize: '9px', fontWeight: '600', letterSpacing: '0.1em',
  textTransform: 'uppercase', color: 'rgba(232,232,224,0.3)', marginBottom: '10px',
}

const sectionTitle: React.CSSProperties = {
  fontSize: '11px', fontWeight: '600', color: 'rgba(232,232,224,0.5)',
  letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '2px',
}

const viewLink: React.CSSProperties = {
  fontSize: '10px', color: '#4dba80', cursor: 'pointer',
}

const AGENCIES = [
  { name: 'DOHMH', status: 'Compliant', color: '#4dba80' },
  { name: 'FDNY', status: 'Action Needed', color: '#f59e0b' },
  { name: 'DOB', status: 'Compliant', color: '#4dba80' },
  { name: 'DCWP', status: 'Compliant', color: '#4dba80' },
  { name: 'SLA', status: 'N/A', color: 'rgba(232,232,224,0.25)' },
]

const DOCS_SUMMARY = [
  { name: 'Food Service Permit', ok: true },
  { name: 'Business License', ok: true },
  { name: 'Fire Inspection Report', ok: true },
  { name: 'Certificate of Occupancy', ok: false },
  { name: 'Lease Agreement', ok: false },
  { name: 'Liability Insurance', ok: true },
]

const TIMELINE = [
  { label: 'Jun 30', agency: 'DOHMH', color: '#ef4444', offset: 0 },
  { label: 'Jul 15', agency: 'FDNY', color: '#f59e0b', offset: 21 },
  { label: 'Aug 1', agency: 'DCWP', color: 'rgba(232,232,224,0.2)', offset: 37 },
  { label: 'Aug 20', agency: 'DOB', color: 'rgba(232,232,224,0.2)', offset: 56 },
  { label: 'Sep 1', agency: 'DCWP', color: 'rgba(232,232,224,0.2)', offset: 68 },
]

const PREP_READINESS = [
  { item: 'DOH Permit Renewal', ready: 60, color: '#f59e0b' },
  { item: 'FDNY Inspection', ready: 30, color: '#ef4444' },
  { item: 'DCWP License', ready: 90, color: '#4dba80' },
]

const RIGHTS_PREVIEW = [
  'Right to see inspector credentials',
  'Right to a hearing before any fine',
  'Right to appeal a license denial',
]

export default function Overview() {
  const score = 94
  const r = 30
  const circumference = 2 * Math.PI * r
  const svgOffset = circumference * (1 - score / 100)
  const docsUploaded = DOCS_SUMMARY.filter(d => d.ok).length
  const urgentDeadlines = DEADLINES.filter(d => d.days <= 33)

  return (
    <div className="p-4 overflow-auto" style={{ display: 'grid', gap: '12px', gridTemplateColumns: '1fr 1fr 1fr', gridTemplateRows: 'auto' }}>

      {/* ── Score ── */}
      <div style={{ ...card, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', gridColumn: '1' }}>
        <div style={{ ...label, alignSelf: 'flex-start' }}>Compliance Score</div>
        <div style={{ position: 'relative', width: '72px', height: '72px' }}>
          <svg viewBox="0 0 72 72" style={{ width: '72px', height: '72px', transform: 'rotate(-90deg)' }}>
            <circle cx="36" cy="36" r={r} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="7" />
            <circle cx="36" cy="36" r={r} fill="none" stroke="#4dba80" strokeWidth="7"
              strokeDasharray={circumference} strokeDashoffset={svgOffset} strokeLinecap="round" />
          </svg>
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '20px', color: '#e8e8e0', fontFamily: 'Georgia, serif' }}>
            {score}
          </div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '11px', fontWeight: '600', color: '#e8e8e0' }}>Good Standing</div>
          <div style={{ fontSize: '10px', color: '#4dba80', marginTop: '2px' }}>↑ 2 pts this month</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', width: '100%' }}>
          <div style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.15)', borderRadius: '6px', padding: '6px', textAlign: 'center' }}>
            <div style={{ fontWeight: '700', color: '#f59e0b', fontSize: '14px' }}>{urgentDeadlines.length}</div>
            <div style={{ fontSize: '9px', color: 'rgba(232,232,224,0.35)' }}>Due Soon</div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '6px', padding: '6px', textAlign: 'center' }}>
            <div style={{ fontWeight: '700', color: '#e8e8e0', fontSize: '14px' }}>0</div>
            <div style={{ fontSize: '9px', color: 'rgba(232,232,224,0.35)' }}>Violations</div>
          </div>
        </div>
      </div>

      {/* ── Action Required ── */}
      <div style={{ ...card, gridColumn: '2' }}>
        <div style={label}>Action Required</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {urgentDeadlines.map(({ req, due, days }) => (
            <div key={req} style={{ borderLeft: '3px solid #f59e0b', background: 'rgba(245,158,11,0.06)', padding: '8px 10px', borderRadius: '0 6px 6px 0' }}>
              <div style={{ fontSize: '11px', fontWeight: '600', color: '#e8e8e0' }}>{req}</div>
              <div style={{ fontSize: '10px', color: '#f59e0b', marginTop: '2px' }}>Due {due} · {days} days</div>
            </div>
          ))}
          <div style={{ borderLeft: '3px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.02)', padding: '8px 10px', borderRadius: '0 6px 6px 0', fontSize: '10px', color: 'rgba(232,232,224,0.3)' }}>
            + {DEADLINES.length - urgentDeadlines.length} more this quarter
          </div>
        </div>
      </div>

      {/* ── Agency Status ── */}
      <div style={{ ...card, gridColumn: '3' }}>
        <div style={label}>NYC Agency Status</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          {AGENCIES.map(({ name, status, color }) => (
            <div key={name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '5px 8px', borderRadius: '6px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <span style={{ fontSize: '10px', fontWeight: '600', color: '#e8e8e0' }}>{name}</span>
              <span style={{ fontSize: '9px', color }}>{status}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── 90-day Timeline ── */}
      <div style={{ ...card, gridColumn: '1 / 3' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <div style={sectionTitle}>Next 90 Days</div>
          <div style={{ display: 'flex', gap: '10px', fontSize: '9px', color: 'rgba(232,232,224,0.3)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ef4444', display: 'inline-block' }} />Urgent</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#f59e0b', display: 'inline-block' }} />Due soon</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'rgba(232,232,224,0.2)', display: 'inline-block' }} />On track</span>
          </div>
        </div>
        <div style={{ position: 'relative', height: '36px' }}>
          <div style={{ position: 'absolute', top: '10px', left: 0, right: 0, height: '1px', background: 'rgba(255,255,255,0.08)' }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, display: 'flex', justifyContent: 'space-between', fontSize: '9px', color: 'rgba(232,232,224,0.3)' }}>
            {['Jun', 'Jul', 'Aug', 'Sep'].map(m => <span key={m}>{m}</span>)}
          </div>
          {TIMELINE.map(({ label: tLabel, agency, color, offset }) => (
            <div key={tLabel} className="group" style={{ position: 'absolute', left: `${offset}%`, top: '4px' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: color, border: '2px solid rgba(6,9,14,0.8)', transform: 'translateX(-50%)', cursor: 'pointer', boxShadow: `0 0 8px ${color}` }} />
              <div className="hidden group-hover:block" style={{ position: 'absolute', bottom: '100%', left: '50%', transform: 'translateX(-50%)', marginBottom: '4px', background: '#0f1e2e', color: '#e8e8e0', fontSize: '9px', padding: '4px 8px', borderRadius: '4px', whiteSpace: 'nowrap', zIndex: 10, border: '1px solid rgba(255,255,255,0.1)' }}>
                {agency} · {tLabel}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── AI Audit Summary ── */}
      <div style={{ ...card, gridColumn: '3' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <div style={sectionTitle}>AI Audit</div>
          <span style={viewLink}>View →</span>
        </div>
        <div style={{ background: 'rgba(15,30,46,0.6)', borderRadius: '6px', padding: '10px', marginBottom: '8px' }}>
          <div style={{ fontSize: '9px', color: 'rgba(232,232,224,0.3)', marginBottom: '4px' }}>Last run: today, 9:14am</div>
          <div style={{ fontSize: '10px', color: '#e8e8e0', lineHeight: '1.5' }}>2 urgent actions · 4 deadlines tracked</div>
        </div>
        <div style={{ fontSize: '10px', color: '#4dba80', cursor: 'pointer' }}>Run new audit →</div>
      </div>

      {/* ── Documents Summary ── */}
      <div style={{ ...card, gridColumn: '1' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <div style={sectionTitle}>Documents</div>
          <span style={viewLink}>View →</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
          <div style={{ fontSize: '28px', fontWeight: '700', color: '#e8e8e0', fontFamily: 'Georgia, serif' }}>{docsUploaded}</div>
          <div>
            <div style={{ fontSize: '10px', color: 'rgba(232,232,224,0.5)' }}>of {DOCS_SUMMARY.length} docs uploaded</div>
            <div style={{ marginTop: '4px', height: '3px', borderRadius: '2px', background: 'rgba(255,255,255,0.07)', width: '80px' }}>
              <div style={{ width: `${(docsUploaded / DOCS_SUMMARY.length) * 100}%`, height: '100%', borderRadius: '2px', background: '#4dba80' }} />
            </div>
          </div>
        </div>
        {DOCS_SUMMARY.filter(d => !d.ok).map(({ name }) => (
          <div key={name} style={{ fontSize: '10px', color: 'rgba(245,158,11,0.8)', display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '3px' }}>
            <span>⚠</span> {name} missing
          </div>
        ))}
      </div>

      {/* ── Financials Summary ── */}
      <div style={{ ...card, gridColumn: '2' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <div style={sectionTitle}>Financials</div>
          <span style={viewLink}>View →</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '10px', color: 'rgba(232,232,224,0.45)' }}>Fees next 90 days</span>
            <span style={{ fontSize: '11px', fontWeight: '600', color: '#e8e8e0' }}>$1,185</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '10px', color: 'rgba(232,232,224,0.45)' }}>Credits identified</span>
            <span style={{ fontSize: '11px', fontWeight: '600', color: '#4dba80' }}>$14,200</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '10px', color: 'rgba(232,232,224,0.45)' }}>Credits received</span>
            <span style={{ fontSize: '11px', fontWeight: '600', color: '#4d9eba' }}>$4,800</span>
          </div>
        </div>
      </div>

      {/* ── Prepare Readiness ── */}
      <div style={{ ...card, gridColumn: '3' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <div style={sectionTitle}>Prepare</div>
          <span style={viewLink}>View →</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
          {PREP_READINESS.map(({ item, ready, color }) => (
            <div key={item}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
                <span style={{ fontSize: '9px', color: 'rgba(232,232,224,0.45)' }}>{item}</span>
                <span style={{ fontSize: '9px', fontWeight: '600', color }}>{ready}%</span>
              </div>
              <div style={{ height: '3px', borderRadius: '2px', background: 'rgba(255,255,255,0.07)' }}>
                <div style={{ width: `${ready}%`, height: '100%', borderRadius: '2px', background: color, transition: 'width 0.4s ease' }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Upcoming Deadlines ── */}
      <div style={{ ...card, gridColumn: '1 / 3', padding: 0, overflow: 'hidden' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
          <div style={sectionTitle}>Upcoming Deadlines</div>
          <span style={viewLink}>View all →</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 90px 70px 100px' }}>
          {['Requirement', 'Agency', 'Due', 'Status'].map(h => (
            <div key={h} style={{ padding: '8px 14px', fontSize: '9px', fontWeight: '600', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(232,232,224,0.25)', borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.01)' }}>{h}</div>
          ))}
          {DEADLINES.slice(0, 4).map(({ id, req, agency, due, days, status }) => (
            <React.Fragment key={id}>
              <div style={{ padding: '9px 14px', fontSize: '11px', color: '#e8e8e0', borderBottom: '1px solid rgba(255,255,255,0.04)', fontWeight: '500' }}>{req}</div>
              <div style={{ padding: '9px 14px', fontSize: '11px', color: 'rgba(232,232,224,0.4)', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>{agency}</div>
              <div style={{ padding: '9px 14px', fontSize: '11px', fontWeight: '500', color: days <= 33 ? '#f59e0b' : 'rgba(232,232,224,0.4)', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>{due}</div>
              <div style={{ padding: '9px 14px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                <span style={{ fontSize: '9px', padding: '2px 8px', borderRadius: '20px', fontWeight: '500', background: days <= 33 ? 'rgba(245,158,11,0.12)' : 'rgba(255,255,255,0.05)', color: days <= 33 ? '#f59e0b' : 'rgba(232,232,224,0.4)' }}>{status}</span>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* ── Your Rights ── */}
      <div style={{ ...card, gridColumn: '3' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <div style={sectionTitle}>Your Rights</div>
          <span style={viewLink}>View all →</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {RIGHTS_PREVIEW.map((r, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '6px', fontSize: '10px', color: 'rgba(232,232,224,0.5)' }}>
              <span style={{ color: '#4dba80', flexShrink: 0, marginTop: '1px', fontSize: '8px' }}>◆</span>
              {r}
            </div>
          ))}
          <div style={{ marginTop: '4px', fontSize: '10px', color: 'rgba(232,232,224,0.25)' }}>+12 more rights covered</div>
        </div>
      </div>

    </div>
  )
}
