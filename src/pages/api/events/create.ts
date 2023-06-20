import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import { prisma } from '@/helpers/db';
import { CreateEventSchema } from '@/schemas/api/createEvent';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== 'POST') {
		res.status(405).json({ message: 'Method not allowed' });
	}
	const session = await getServerSession(req, res, authOptions);
	if (!session) {
		res.status(401).json({ message: 'Unauthorized' });
		return;
	}
	const data = req.body;
	try {
		const safeData = CreateEventSchema.parse(JSON.parse(data));

		const event = await prisma.event.create({
			data: {
				...safeData,
				creatorId: session.user.id,
			},
		});
		res.status(200).json(event);
	} catch (error) {
		console.log(error);
		res.status(400).json({
			message: 'Invalid data provided. Please check your input and try again.',
		});
	}
}
