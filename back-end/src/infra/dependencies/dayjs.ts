import * as dayjs from 'dayjs';

export function generateExpirationTime(
  value: number,
  unit: dayjs.ManipulateType,
) {
  return dayjs().add(value, unit).unix();
}

export function hasExpired(unix: number) {
  return dayjs().isAfter(dayjs.unix(unix));
}
