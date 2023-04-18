import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
): Promise<void> {
	if (req.method === 'PUT') {
		const eventId = parseInt(req.query.id as string);

		// Retrieve the existing event from the database using Prisma
		const existingEvent = await prisma.event.findUnique({
			where: {
				id: eventId,
			},
		});

		// If the event doesn't exist, return a 404 error
		if (!existingEvent) {
			res.status(404).end();
			return;
		}

		// Extract the updated event data from the request body
		const updatedEvent = req.body;

		// Update the event in the database using Prisma
		const updatedEventData = await prisma.event.update({
			where: {
				id: eventId,
			},
			data: {
				title: updatedEvent.title ?? existingEvent.title,
				categoryId: updatedEvent.categoryId ?? existingEvent.categoryId,
				locationId: updatedEvent.locationId ?? existingEvent.locationId,
				startTime: updatedEvent.startTime ?? existingEvent.startTime,
				endTime: updatedEvent.endTime ?? existingEvent.endTime,
				allDay: updatedEvent.allDay ?? existingEvent.allDay,
				exclusivity: updatedEvent.exclusivity ?? existingEvent.exclusivity,
				minAttendence:
					updatedEvent.minAttendence ?? existingEvent.minAttendence,
				maxAttendence:
					updatedEvent.maxAttendence ?? existingEvent.maxAttendence,
				minAge: updatedEvent.minAge ?? existingEvent.minAge,
				description: updatedEvent.description ?? existingEvent.description,
				specialNotes: updatedEvent.specialNotes ?? existingEvent.specialNotes,
				reqMaterials: updatedEvent.reqMaterials ?? existingEvent.reqMaterials,
				pending: updatedEvent.pending ?? existingEvent.pending,
				approved: updatedEvent.approved ?? existingEvent.approved,
			},
			include: {
				category: true,
				location: true,
			},
		});

		// Send the updated event back in the response
		res.status(200).json(updatedEventData);
	} else {
		res.status(405).end();
	}
}
