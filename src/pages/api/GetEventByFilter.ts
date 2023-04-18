import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { category, location } = req.query;

	try {
		const events = await prisma.event.findMany({
			where: {
				category: { title: category as string },
				location: { title: location as string },
			},
			include: {
				category: true,
				location: true,
			},
		});
		res.status(200).json(events);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Error retrieving events' });
	}
}
