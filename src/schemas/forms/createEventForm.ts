import { z } from 'zod';
import { EventModel } from '../index';

export const CreateEventForm = EventModel.omit({
	startTime: true,
	endTime: true,
	id: true,
	creatorId: true,
	allDay: true,
	pending: true,
	approved: true,
	minAttendence: true,
	maxAttendence: true,
	title: true,
	locationId: true,
	categoryId: true,
	minAge: true,
}).extend({
	title: z.string().min(3).max(100),
	startDate: z.string(),
	endDate: z.string(),
	startTime: z.string(),
	endTime: z.string(),
	minAttendence: z.number().int().min(0).max(1000),
	maxAttendence: z.number().int().min(1).max(1000),
	locationId: z.string().refine((val) => val !== ' ', {
		message: 'Please select a location',
	}),
	categoryId: z.string().refine((val) => val !== ' ', {
		message: 'Please select a category',
	}),
	minAge: z.string(),
});

export interface CreateEventFormType extends z.infer<typeof CreateEventForm> {}
