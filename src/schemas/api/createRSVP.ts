import { RSVPModel } from '../';

export const CreateRSVPSchema = RSVPModel.omit({
	id: true,
	accountId: true,
	createdAt: true,
});
