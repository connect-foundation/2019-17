import { Idate } from 'react-components.d';

export const getDate = (date: Idate): Date => {
  if (
    !date ||
    !date.year ||
    !date.month ||
    !date.day ||
    !date.hour ||
    !date.minute ||
    !date.second
  )
    return new Date();
  const dateob = new Date(
    date.year,
    date.month - 1,
    date.day,
    date.hour + 9,
    date.minute,
    date.second,
    Number(String(date.nanosecond).substr(0, 3))
  );
  return dateob;
};
