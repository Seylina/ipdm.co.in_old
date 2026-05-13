import { MEETING_URL } from "./constants";

export function openMeeting() {
  // Register click and send email notification
  fetch('/api/notify-consultation', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  }).catch(console.error);

  window.open(MEETING_URL, "_blank");
}
