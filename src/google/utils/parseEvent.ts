import { setDate, setMonth, setYear } from 'date-fns';
import EventInterface from '../interfaces/EventInterface';

const parseEvent = (event: string): EventInterface => {
  const {
    groups: { year, month, day, name },
  } = /^(?<day>\d{1,2}).(?<month>\d{1,2}).(?<year>\d{4}) \((?<name>\w+\s\w+)\)$/gm.exec(
    event
  );

  let parsedDate = new Date();
  parsedDate = setYear(parsedDate, Number(year));
  parsedDate = setMonth(parsedDate, Number(month));
  parsedDate = setDate(parsedDate, Number(day));

  return {
    date: parsedDate,
    fullName: name,
  };
};

export default parseEvent;
