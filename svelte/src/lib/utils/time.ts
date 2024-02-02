export function zeroPadded(number: number) {
  return number >= 10 ? number.toString() : `0${number}`;
}

export function formatTime(milliseconds: number) {
  const mm = zeroPadded(Math.floor(milliseconds / 1000 / 60));
  const ss = zeroPadded(Math.floor(milliseconds / 1000) % 60);
  return `${mm}:${ss}`;
}