import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import styles from './Calendar.module.css';

const Calendar = () => {
	return (
		<FullCalendar
			plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
			initialView="dayGridMonth"
			headerToolbar={{
				left: 'prev,today,next',
				center: 'title',
				right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth',
			}}
		/>
	);
};

export default Calendar;
