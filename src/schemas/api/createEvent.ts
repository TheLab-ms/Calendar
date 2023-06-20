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
	minAge: true,
}).extend({
	startTime: z
		.string()
		.or(z.date())
		.transform((val) => new Date(val)),
	endTime: z
		.string()
		.or(z.date())
		.transform((val) => new Date(val)),
	minAge: z
		.string()
		.or(z.number())
		.transform((val) => {
			if (typeof val === 'string') {
				return parseInt(val);
			}
			return val;
		}),
});

export interface CreateEventSchemaType
	extends z.infer<typeof CreateEventSchema> {}
