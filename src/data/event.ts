// Language-neutral calendar-event facts (dates/times/uid don't translate).
// The human-readable title/description live in the i18n content (t.calendar).
//
// Times stored in UTC so calendars convert to each guest's local time. Sweden
// is on CEST (UTC+2) in early September, so 17:00 local = 15:00 UTC. To shift
// the end time, change `endUtc` + `endIso` only.
export const event = {
  startUtc: '20260905T150000Z', // 17:00 CEST
  endUtc: '20260905T210000Z', //   23:00 CEST
  startIso: '2026-09-05T17:00:00+02:00',
  endIso: '2026-09-05T23:00:00+02:00',
  timezone: 'Europe/Stockholm',
  uid: 'hani-roaa-wedding-20260905@magicevents.se',
}
