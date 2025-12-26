export function calculateTimeLeft(
  actualDateTime: any,
  timeFormat: any = ['days', 'hours', 'minutes', 'seconds'],
) {
  const timeLeft: any = {};
  const difference = +new Date(actualDateTime) - +new Date();

  if (difference > 0) {
    if (timeFormat.includes('days')) {
      timeLeft.days = Math.floor(difference / (1000 * 60 * 60 * 24));
    }
    if (timeFormat.includes('hours')) {
      timeLeft.hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    }
    timeLeft.minutes = Math.floor((difference / 1000 / 60) % 60);
    timeLeft.seconds = Math.floor((difference / 1000) % 60);
  }

  // Padding extra 0 at start
  Object.keys(timeLeft).forEach((x) => {
    if (timeLeft[x] < 10) timeLeft[x] = `0${timeLeft[x]}`;
    else timeLeft[x] = `${timeLeft[x]}`;
  });

  return timeLeft;
}
