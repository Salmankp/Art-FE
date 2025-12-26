export function bidElmoreButton(
  isLoggedIn: any,
  issold: boolean,
  isDropFinished: boolean,
  isComingSoon: boolean,
) {
  const timeLeft: any = {};

  if (!isComingSoon && !isDropFinished && !issold) {
    // console.log('This Condition renders for new Drop');
    timeLeft.disabled = issold;
    timeLeft.background = !isLoggedIn ? '#61BB07' : '#3fb5f5';
    timeLeft.title = !isLoggedIn ? 'JOIN NOW' : 'BUY NOW';
    return timeLeft;
  }
  if (isComingSoon) {
    timeLeft.disabled = isLoggedIn ? issold : true;
    timeLeft.background = !isLoggedIn ? '#3FB5F5' : '#F8A21C';
    timeLeft.title = !isLoggedIn ? 'JOIN NOW' : 'COMING SOON';
    return timeLeft;
  }
  if (isDropFinished) {
    timeLeft.disabled = isLoggedIn ? issold : true;
    timeLeft.background = '#ef0000';
    timeLeft.title = issold ? 'SOLD OUT' : 'DROP ENDED';
    return timeLeft;
  }
  if (!isComingSoon && !isDropFinished && !issold) {
    timeLeft.disabled = isLoggedIn ? issold : true;
    timeLeft.background = '#ef0000';
    timeLeft.title = issold ? 'SOLD OUT' : 'DROP ENDED';
    return timeLeft;
  }
  timeLeft.disabled = true;
  timeLeft.background = '#ef0000';
  timeLeft.title = 'SOLD OUT';

  return timeLeft;
}
