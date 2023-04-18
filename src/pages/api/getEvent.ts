import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
): Promise<void> {
	if (req.method === 'GET') {
		const eventId = req.query.id as string;

		// Retrieve the event from the database using Prisma
		const event = await prisma.event.findUnique({
			where: {
				id: parseInt(eventId),
			},
			include: {
				category: true,
				location: true,
			},
		});

		// Send the event back in the response
		res.status(200).json(event);
	} else {
		res.status(405).end();
	}
}
