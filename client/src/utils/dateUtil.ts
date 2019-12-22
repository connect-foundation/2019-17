import { Idate } from 'react-components.d';
import moment from 'moment';

export const getDate = (date: Idate): Date => {
  if (
    !date ||
    !date.year ||
    !date.month ||
    !date.day ||
    !date.hour ||
    !date.minute ||
    !date.second
  ) {
    return new Date();
  }
  return new Date(
    date.year,
    date.month - 1,
    date.day,
    date.hour + 9,
    date.minute,
    date.second,
    Number(String(date.nanosecond).substr(0, 3))
  );
};

export const fullDateFormat = (date: Date): string => {
  const momentDate = moment(date);

  return momentDate.format('YYYY년MM월DD일 HH:mm:ss ');
};

/**
 * string을 db용 datetime string 타입으로 변경
 * @param date
 */
export const dateToISO = (date: Date): string => {
  const momentTime = moment(date);
  return momentTime.format('YYYY-MM-DDTHH:mm:ss.SSSSSSSSS');
};

/**
 * Idate object를 Date type으로 변환
 * @param date
 */
export const objToDate = (date: Idate) => {
  if (
    !date ||
    !date.year ||
    !date.month ||
    !date.day ||
    !date.hour ||
    !date.minute ||
    !date.second ||
    !date.nanosecond
  ) {
    return new Date();
  }

  return new Date(
    date.year,
    date.month - 1,
    date.day,
    date.hour + 9,
    date.minute,
    date.second,
    Number(String(date.nanosecond).substr(0, 3))
  );
};
