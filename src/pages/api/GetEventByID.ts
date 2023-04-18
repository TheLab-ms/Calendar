import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { id } = req.query;

	try {
		const event = await prisma.event.findUnique({
			where: { id: Number(id) },
			include: {
				category: true,
				location: true,
			},
		});

		if (!event) {
			return res.status(404).json({ error: 'Event not found' });
		}

		res.status(200).json(event);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Error retrieving event' });
	}
}
