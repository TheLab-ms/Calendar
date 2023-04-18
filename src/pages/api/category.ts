import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
): Promise<void> {
	if (req.method === 'GET') {
		const categoryId = req.query.id as string;

		// Retrieve the category from the database using Prisma
		const category = await prisma.category.findUnique({
			where: {
				id: parseInt(categoryId),
			},
			include: {
				Event: true,
			},
		});

		// Send the category back in the response
		res.status(200).json(category);
	} else {
		res.status(405).end();
	}
}
