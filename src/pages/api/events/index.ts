import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/helpers/db';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === 'GET') {
		const currentDate = new Date();
		const events = await prisma.event.findMany({
			where: { startTime: { gt: currentDate } },
			orderBy: { startTime: 'asc' },
		});

		res.status(200).json(events);
	}
	// Route implementation will go here
	if (req.method === 'POST') {
		// Parse the request body to get the event data
		const eventData = req.body;

		// Validate the data and return an error response if necessary
		const modifiedEventData = { ...eventData };
		modifiedEventData.startTime = new Date(eventData.startTime);
		modifiedEventData.endTime = new Date(eventData.endTime);

		// Use Prisma to create the event in the database
		const newEvent = await prisma.event.create({
			data: eventData,
		});

		// Return a success response with the created event data
		res.status(201).json(newEvent);
	} else {
		// Return a 405 response for unsupported request methods
		res.status(405).json({ message: 'Method not allowed' });
	}
	res.status(405).json({ message: 'Method not allowed' });
}
