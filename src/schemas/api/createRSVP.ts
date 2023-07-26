import { z } from 'zod';
import { RSVPModel } from '../';

export const CreateRSVPSchema = RSVPModel.omit({
	id: true,
	accountId: true,
	createdAt: true,
}).extend({
	operation: z.enum(['create', 'remove']),
});
