import { z } from 'zod';
import { EventModel } from '../index';

export const CreateEventSchema = EventModel.omit({
	id: true,
	creatorId: true,
	pending: true,
	approved: true,
	allDay: true,
	startTime: true,
	endTime: true,
}).extend({
	startTime: z
		.string()
		.or(z.date())
		.transform((val) => new Date(val)),
	endTime: z
		.string()
		.or(z.date())
		.transform((val) => new Date(val)),
});

export interface CreateEventSchemaType
	extends z.infer<typeof CreateEventSchema> {}
