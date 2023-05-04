import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../helpers/db';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const currentDate = new Date();
	const events = await prisma.event.findMany({
		where: { startTime: { gt: currentDate } },
		orderBy: { startTime: 'asc' },
	});

	res.status(200).json(events);
}
