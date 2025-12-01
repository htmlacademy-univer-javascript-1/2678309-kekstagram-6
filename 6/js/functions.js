function parseTime(time) {
  const [hours, minutes] = time.split(':');
  return Number(hours) * 60 + Number(minutes);
}

function isMeeting(startWorkTime, endWorkTime, meetingStartTime, meetingDuration) {
  const workStart = parseTime(startWorkTime);
  const workEnd = parseTime(endWorkTime);
  const meetingStart = parseTime(meetingStartTime);
  const meetingEnd = meetingStart + meetingDuration;

  return meetingStart >= workStart && meetingEnd <= workEnd;
}
