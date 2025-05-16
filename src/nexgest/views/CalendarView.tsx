// src/views/CalendarView.tsx

import '@schedule-x/theme-shadcn/dist/index.css';
import { ScheduleXCalendar, useNextCalendarApp } from '@schedule-x/react';
import {
  createViewWeek,
  createViewDay,
  createViewMonthAgenda,
  createViewMonthGrid,
} from '@schedule-x/calendar';


export const CalendarView = () => {
  const calendarApp = useNextCalendarApp({
    views: [
      createViewWeek(),
      createViewDay(),
      createViewMonthAgenda(),
      createViewMonthGrid(),
    ],
    theme: 'shadcn',
    events: [
      {
        id: '1',
        title: 'Reunión de equipo',
        start: '2025-05-16',
        end: '2025-05-16',
      },
    ],
  });

  return (
    <div className="w-full h-screen p-4 box-border overflow-hidden">
      <ScheduleXCalendar calendarApp={calendarApp} />
    </div>
  );
};