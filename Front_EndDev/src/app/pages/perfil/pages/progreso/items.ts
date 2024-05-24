export default function calendarItems(
  firstDayName: any,
  arrDays: any,
  daysInPreviousMonth: any,
  daysInMonth: any
) {
  arrDays = []
  if (firstDayName === 'Lu') {
    arrDays.push(daysInPreviousMonth);
  }
  if (firstDayName === 'Ma') {
    arrDays.push(daysInPreviousMonth - 1);
    arrDays.push(daysInPreviousMonth);
  }
  if (firstDayName === 'Mi') {
    arrDays.push(daysInPreviousMonth - 2);
    arrDays.push(daysInPreviousMonth - 1);
    arrDays.push(daysInPreviousMonth);
  }
  if (firstDayName === 'Ju') {
    arrDays.push(daysInPreviousMonth - 3);
    arrDays.push(daysInPreviousMonth - 2);
    arrDays.push(daysInPreviousMonth - 1);
    arrDays.push(daysInPreviousMonth);
  }
  if (firstDayName === 'Vi') {
    arrDays.push(daysInPreviousMonth - 4);
    arrDays.push(daysInPreviousMonth - 3);
    arrDays.push(daysInPreviousMonth - 2);
    arrDays.push(daysInPreviousMonth - 1);
    arrDays.push(daysInPreviousMonth);
  }
  if (firstDayName === 'Sa') {
    arrDays.push(daysInPreviousMonth - 5);
    arrDays.push(daysInPreviousMonth - 4);
    arrDays.push(daysInPreviousMonth - 3);
    arrDays.push(daysInPreviousMonth - 2);
    arrDays.push(daysInPreviousMonth - 1);
    arrDays.push(daysInPreviousMonth);
  }
  for (let index = 1; index < daysInMonth + 1; index++) {
    arrDays.push(index);
  }
  if (arrDays.length === 34) {
    arrDays.push(1);
  } else if (arrDays.length === 33) {
    arrDays.push(1);
    arrDays.push(2);
  } else if (arrDays.length === 32) {
    arrDays.push(1);
    arrDays.push(2);
    arrDays.push(3);
  } else if (arrDays.length === 31) {
    arrDays.push(1);
    arrDays.push(2);
    arrDays.push(3);
    arrDays.push(4);
  } else if (arrDays.length === 30) {
    arrDays.push(1);
    arrDays.push(2);
    arrDays.push(3);
    arrDays.push(4);
    arrDays.push(5);
  } else if (arrDays.length === 29) {
    arrDays.push(1);
    arrDays.push(2);
    arrDays.push(3);
    arrDays.push(4);
    arrDays.push(5);
    arrDays.push(6);
  } else if (arrDays.length === 28) {
    arrDays.push(1);
    arrDays.push(2);
    arrDays.push(3);
    arrDays.push(4);
    arrDays.push(5);
    arrDays.push(6);
    arrDays.push(7);
  }
  return arrDays;
}
