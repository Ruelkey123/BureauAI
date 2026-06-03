export type Status = 'Urgent' | 'Prep needed' | 'On track' | 'Compliant'

export interface Deadline {
  id: string
  req: string
  agency: string
  due: string
  days: number
  status: Status
  statusClass: string
  fee: string
  type: 'inspection' | 'permit' | 'license' | 'review'
}

export const DEADLINES: Deadline[] = [
  {
    id: 'doh-permit',
    req: 'Food Service Permit Renewal',
    agency: 'DOHMH',
    due: 'Jun 30',
    days: 18,
    status: 'Urgent',
    statusClass: 'bg-amber-100 text-amber-700',
    fee: '$280',
    type: 'permit',
  },
  {
    id: 'fdny-inspection',
    req: 'Annual Fire Inspection',
    agency: 'FDNY',
    due: 'Jul 15',
    days: 33,
    status: 'Prep needed',
    statusClass: 'bg-amber-100 text-amber-700',
    fee: '$150',
    type: 'inspection',
  },
  {
    id: 'dcwp-license',
    req: 'Business License Renewal',
    agency: 'DCWP',
    due: 'Aug 1',
    days: 50,
    status: 'On track',
    statusClass: 'bg-gray-100 text-bureau-muted',
    fee: '$110',
    type: 'license',
  },
  {
    id: 'dob-review',
    req: 'DOB Certificate of Occupancy Review',
    agency: 'DOB',
    due: 'Aug 20',
    days: 69,
    status: 'Compliant',
    statusClass: 'bg-green/10 text-green',
    fee: '$200',
    type: 'review',
  },
  {
    id: 'dcwp-cafe',
    req: 'Sidewalk Café Permit Renewal',
    agency: 'DCWP',
    due: 'Sep 1',
    days: 82,
    status: 'Compliant',
    statusClass: 'bg-green/10 text-green',
    fee: '$445',
    type: 'permit',
  },
]

export const PREP_GUIDES: Record<string, {
  checklist: { text: string; critical: boolean }[]
  steps: { step: string; detail: string; timeframe: string }[]
  tips: string[]
}> = {
  'doh-permit': {
    checklist: [
      { text: 'Current permit displayed visibly in establishment', critical: true },
      { text: 'Food handler certificates up to date for all staff', critical: true },
      { text: 'Temperature logs for refrigeration units filled daily', critical: true },
      { text: 'Handwashing stations stocked (soap, paper towels)', critical: true },
      { text: 'All food stored 6 inches off the floor', critical: true },
      { text: 'Pest control contract in place and documented', critical: false },
      { text: 'Allergen menu labeling in place', critical: false },
      { text: 'Last inspection report accessible on premises', critical: false },
    ],
    steps: [
      { step: 'Log into DOHMH eFoodservice portal', detail: 'Create or access your account at nyc.gov/health. Have your CAMIS number ready (on your current permit).', timeframe: 'Now' },
      { step: 'Complete the renewal application', detail: 'Update your menu, seating capacity, and any changes to food preparation methods since last renewal.', timeframe: 'This week' },
      { step: 'Pay the renewal fee', detail: '$280 for most food service establishments. Payment by credit card or ACH online.', timeframe: 'This week' },
      { step: 'Schedule your pre-permit inspection', detail: 'DOHMH will contact you to schedule. Processing takes 2–3 weeks. You cannot operate after expiry without confirmation.', timeframe: '2–3 weeks out' },
    ],
    tips: [
      'File at least 30 days before expiration to avoid a lapse in your permit.',
      'A score above 28 at your inspection will result in a C grade — correct issues before the inspector arrives.',
      'Keep your corrected violations documentation in case you need to contest.',
    ],
  },
  'fdny-inspection': {
    checklist: [
      { text: 'Fire extinguishers inspected within last 12 months (check tags)', critical: true },
      { text: 'Sprinkler system tested and inspection tag current', critical: true },
      { text: 'Emergency exit signs illuminated and unobstructed', critical: true },
      { text: 'Emergency lighting tested and operational', critical: true },
      { text: 'Cooking hood suppression system inspected every 6 months', critical: true },
      { text: 'All exits clear of storage or obstructions', critical: true },
      { text: 'Fire safety plan posted near exits', critical: false },
      { text: 'Staff know location of all fire extinguishers', critical: false },
      { text: 'Grease traps cleaned and documented', critical: false },
    ],
    steps: [
      { step: 'Contact FDNY Bureau of Fire Prevention', detail: 'Call (718) 999-2411 or visit the FDNY online portal to schedule your annual inspection. Book early — slots fill 3–4 weeks out.', timeframe: 'This week' },
      { step: 'Complete your pre-inspection checklist', detail: 'Walk your premises against the checklist above. Address any red items immediately.', timeframe: '1–2 weeks before' },
      { step: 'Have documentation ready', detail: 'Gather your fire suppression test records, extinguisher tags, sprinkler inspection reports, and emergency lighting test logs.', timeframe: 'Day before' },
      { step: 'Be present during the inspection', detail: 'You or a designated manager must accompany the inspector. Take notes on any items mentioned even informally.', timeframe: 'Day of' },
    ],
    tips: [
      'The most common FDNY violation is obstructed exits — do a walkthrough the day before.',
      'Extinguisher inspection tags must show the most recent annual service date.',
      'If you receive a violation, you have the right to correct it immediately to potentially reduce the penalty.',
    ],
  },
  'dcwp-license': {
    checklist: [
      { text: 'Current business license displayed at point of sale', critical: true },
      { text: 'Business address matches license (update if moved)', critical: true },
      { text: 'Ownership information current and accurate', critical: false },
      { text: 'No outstanding DCWP violations or fines', critical: false },
    ],
    steps: [
      { step: 'Log into NYC Business Express', detail: 'Access your license record at businessexpress.nyc.gov. Verify all business details are current before renewing.', timeframe: '4 weeks before' },
      { step: 'Pay the renewal fee', detail: '$110 for most general business licenses. Pay online by credit card.', timeframe: '3 weeks before' },
      { step: 'Receive confirmation', detail: 'DCWP must process within 55 business days. You may continue operating under your current license while renewal is pending.', timeframe: 'Ongoing' },
    ],
    tips: [
      'You can operate legally while your renewal is pending as long as you applied before expiration.',
      'Update your address with DCWP before renewing — address changes require a separate amendment.',
    ],
  },
  'dob-review': {
    checklist: [
      { text: 'Certificate of Occupancy matches current use of space', critical: true },
      { text: 'No unpermitted construction work completed since last review', critical: true },
      { text: 'All open DOB violations resolved or scheduled for resolution', critical: false },
      { text: 'Building owner aware of review and can provide access', critical: false },
    ],
    steps: [
      { step: 'Check DOB NOW for open items', detail: 'Search your address at a.bfrp.nyc.gov to identify any open permits, violations, or complaints that need resolution before review.', timeframe: '6 weeks before' },
      { step: 'Resolve any open violations', detail: 'Address outstanding violations before the review. Unresolved items can delay or fail the review.', timeframe: '3–4 weeks before' },
      { step: 'Confirm space use matches CO', detail: 'Your Certificate of Occupancy must match how you\'re actually using the space. Changes in use require an amendment.', timeframe: '2 weeks before' },
    ],
    tips: [
      'DOB CO reviews are triggered by changes in use or occupancy — if nothing has changed, this is typically straightforward.',
      'An expeditor ($500–$2,000) can significantly speed up complex DOB filings.',
    ],
  },
  'dcwp-cafe': {
    checklist: [
      { text: 'Sidewalk dimensions within approved permit boundaries', critical: true },
      { text: 'Required 8-foot clear pedestrian path maintained at all times', critical: true },
      { text: 'Cafe furniture matches approved specifications', critical: false },
      { text: 'No unlicensed expansion beyond permitted area', critical: false },
    ],
    steps: [
      { step: 'Apply for renewal online', detail: 'Submit renewal application through NYC Business Express. Include current photos of the café setup and measurements.', timeframe: '6 weeks before' },
      { step: 'Pay the renewal fee', detail: '$445 standard renewal fee. Higher for larger footprints.', timeframe: '6 weeks before' },
      { step: 'Await site inspection', detail: 'DCWP may conduct a site inspection to verify compliance with approved dimensions before issuing renewal.', timeframe: '2–4 weeks before' },
    ],
    tips: [
      'Sidewalk café permits are seasonal — apply well before peak season to avoid delays.',
      'Ensure your café boundaries are clearly marked to avoid pedestrian complaints that could trigger early inspection.',
    ],
  },
}
