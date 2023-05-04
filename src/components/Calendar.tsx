import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import styles from './Calendar.module.css';
import { EventSourceInput } from '@fullcalendar/core';

const Calendar = ({ events }: { events: EventSourceInput }) => {
	return (
		<div>
			<FullCalendar
				plugins={[dayGridPlugin]}
				initialView="dayGridMonth"
				events={events}
			/>
		</div>
	);
};

export default Calendar;
