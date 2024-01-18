import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

const getFilteredDays = () => {
  const today = new Date();
  const currentYear = today.getFullYear();
  const startDate = new Date(currentYear, 0, 1); // January 1st of the current year
  const endDate = new Date(currentYear, 11, 31); // December 31st of the current year

  const filteredDays = [];

  for (let date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
    const dayOfWeek = date.getDay();
    if (dayOfWeek === 3 || dayOfWeek === 4 || dayOfWeek === 6) {
      filteredDays.push(date.toISOString().split('T')[0]);
    }
  }

  return filteredDays;
};

const Calendar = () => {
  const events = getFilteredDays().map(date => ({
    title: 'Available',
    start: date,
  }));

  return (
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      events={events}
    />
  );
};

export default Calendar;
