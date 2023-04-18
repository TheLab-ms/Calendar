import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
): Promise<void> {
	if (req.method === 'GET') {
		const locationId = req.query.id as string;

		// Retrieve the location from the database using Prisma
		const location = await prisma.location.findUnique({
			where: {
				id: parseInt(locationId),
			},
			include: {
				Event: true,
			},
		});

		// Send the location back in the response
		res.status(200).json(location);
	} else {
		res.status(405).end();
	}
}
