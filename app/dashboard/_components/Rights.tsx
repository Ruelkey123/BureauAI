import React from 'react'

const SECTIONS = [
  {
    situation: 'During an Inspection',
    agency: 'DOHMH · FDNY · DOB',
    color: '#4d9eba',
    rights: [
      {
        title: 'Right to see inspector credentials',
        body: 'Any inspector must present their official ID and agency credentials before entering. You can ask for their name, badge number, and the specific authority under which they are inspecting.',
        cite: 'NYC Admin. Code §20-104',
      },
      {
        title: 'Right to be present during inspection',
        body: 'You or an authorized representative have the right to accompany the inspector throughout the entire inspection and observe what is being examined.',
        cite: 'NYC Health Code §81.07',
      },
      {
        title: 'Right to a written inspection report',
        body: 'After any inspection that results in violations, you are entitled to a written copy of the inspection report before the inspector leaves your premises.',
        cite: 'NYC Admin. Code §17-145',
      },
      {
        title: 'Right to correct conditions on the spot',
        body: 'For certain minor violations, you have the right to correct the condition immediately during the inspection. If corrected, the violation may be dismissed at a subsequent hearing.',
        cite: 'NYC Health Code §81.09',
      },
    ],
  },
  {
    situation: 'After Receiving a Violation',
    agency: 'ECB · DOHMH · FDNY',
    color: '#f59e0b',
    rights: [
      {
        title: 'Right to a hearing before paying any fine',
        body: 'You cannot be required to pay a violation fine without first having the opportunity to contest it at an Environmental Control Board (ECB) hearing. You have the right to present evidence and testimony.',
        cite: 'NYC Admin. Code §1049-a',
      },
      {
        title: 'Right to adjourn a hearing once',
        body: 'If you need more time to prepare your case, you are entitled to adjourn your scheduled ECB hearing one time without cause. Request this in writing before your hearing date.',
        cite: 'ECB Rules §6-22',
      },
      {
        title: 'Right to appeal a decision',
        body: 'If your ECB hearing results in an unfavorable decision, you have 30 days to file an appeal with the ECB Appeals Board. Further appeals can be made to the NYC Civil Court.',
        cite: 'NYC Charter §1048',
      },
      {
        title: 'Right to a default dismissal',
        body: 'If the issuing agency fails to appear at your hearing, you are entitled to have the violation dismissed by default.',
        cite: 'ECB Rules §6-19',
      },
    ],
  },
  {
    situation: 'License Applications & Renewals',
    agency: 'DCWP · DOHMH · SLA',
    color: '#4dba80',
    rights: [
      {
        title: 'Right to a decision within 55 business days',
        body: 'DCWP must approve or deny a complete license application within 55 business days. If they fail to act, your application is deemed approved by operation of law.',
        cite: 'NYC Admin. Code §20-104(b)',
      },
      {
        title: 'Right to operate while renewal is pending',
        body: 'If you timely file a renewal application before your license expires, you may continue to operate under your existing license while the renewal is being processed.',
        cite: 'NYC Admin. Code §20-105',
      },
      {
        title: 'Right to know why an application was denied',
        body: 'Any agency that denies your license application must provide you with a written statement of the specific reasons for denial, and inform you of your right to appeal.',
        cite: 'NYC Admin. Code §20-106',
      },
      {
        title: 'Right to appeal a denial',
        body: 'You have the right to appeal a license denial to the agency head within 30 days of the denial. You may also seek Article 78 review in the Supreme Court of NY.',
        cite: 'NYC Admin. Code §20-107',
      },
    ],
  },
  {
    situation: 'Health & Safety Closures',
    agency: 'DOHMH',
    color: '#ff7c4d',
    rights: [
      {
        title: 'Right to an immediate hearing after emergency closure',
        body: 'If DOHMH closes your establishment under an emergency order, you are entitled to a hearing within 3 business days to contest the closure order.',
        cite: 'NYC Health Code §3.13',
      },
      {
        title: 'Right to re-open after correcting violations',
        body: 'Once you have corrected all conditions that led to an emergency closure and passed a re-inspection, you have the right to immediate reinstatement of your operating permit.',
        cite: 'NYC Health Code §81.51',
      },
      {
        title: 'Right to contest a sanitary grade',
        body: 'You may request a re-inspection to obtain a letter grade if you are initially graded below an A. The lower grade is not posted until after this second inspection.',
        cite: 'NYC Health Code §81.51(d)',
      },
    ],
  },
]

export default function Rights() {
  return (
    <div className="p-4 flex flex-col gap-4">
      <div className="flex items-start justify-between mb-1">
        <div>
          <h2 className="font-semibold text-sm mb-1" style={{ color: '#e8e8e0' }}>Your Legal Rights</h2>
          <p className="text-xs" style={{ color: 'rgba(232,232,224,0.4)' }}>
            Plain-English summaries of your rights as an NYC business owner. Always consult an attorney for specific legal advice.
          </p>
        </div>
      </div>

      {SECTIONS.map(({ situation, agency, color, rights }) => (
        <div key={situation} className="bg-white border border-bureau-border rounded-lg overflow-hidden" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
          {/* Section header */}
          <div className="px-5 py-3 flex items-center justify-between" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}>
            <div className="flex items-center gap-3">
              <div style={{ width: '3px', height: '20px', background: color, borderRadius: '2px' }} />
              <div>
                <div className="font-semibold text-sm" style={{ color: '#e8e8e0' }}>{situation}</div>
                <div className="text-[10px] mt-0.5" style={{ color: 'rgba(232,232,224,0.35)', letterSpacing: '0.06em' }}>{agency}</div>
              </div>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: `${color}15`, color, border: `1px solid ${color}30` }}>
              {rights.length} rights
            </span>
          </div>

          {/* Rights list */}
          <div>
            {rights.map(({ title, body, cite }, i) => (
              <div key={title} className="px-5 py-4" style={{ borderBottom: i < rights.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                <div className="flex items-start gap-3">
                  <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: `${color}15`, border: `1px solid ${color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '1px' }}>
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                      <path d="M1.5 4L3.5 6L6.5 2" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-xs mb-1.5" style={{ color: '#e8e8e0' }}>{title}</div>
                    <p className="text-xs leading-relaxed" style={{ color: 'rgba(232,232,224,0.5)' }}>{body}</p>
                    <div className="mt-2 text-[10px]" style={{ color: 'rgba(232,232,224,0.25)', fontFamily: 'monospace' }}>{cite}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="text-center text-[10px] py-2" style={{ color: 'rgba(232,232,224,0.2)' }}>
        This is general information, not legal advice. Rights may vary by situation. Consult a licensed NYC attorney for your specific case.
      </div>
    </div>
  )
}
