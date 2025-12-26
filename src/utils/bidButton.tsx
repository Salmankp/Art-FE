const rerenderingButton = (autoRerender, isLoggedIn) => {
  if (!autoRerender) {
    return 'COMING SOON';
  }
  if (autoRerender && !isLoggedIn) {
    return 'LOGIN TO BUY';
  }
  return 'BUY NOW';
};

export function bidButton(
  isLoggedIn: any,
  issold: boolean,
  isDropFinished: boolean,
  isComingSoon: boolean,
) {
  const timeLeft: any = {};

  if (!isComingSoon && !isDropFinished && !issold) {
    timeLeft.disabled = issold;
    timeLeft.background = '#3fb5f5';
    timeLeft.title = isLoggedIn ? 'BUY NOW' : 'LOGIN TO BUY';
    return timeLeft;
  }
  if (isComingSoon) {
    timeLeft.disabled = isLoggedIn ? issold : true;
    timeLeft.background = '#F8A21C';
    timeLeft.title = 'COMING SOON';
    return timeLeft;
  }
  if (isDropFinished) {
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
