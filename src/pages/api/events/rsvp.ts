import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import { prisma } from '@/helpers/db';
import { CreateRSVPSchema } from '@/schemas/api/createRSVP';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (!req.method || (req.method !== 'POST' && req.method !== 'DELETE')) {
		res.status(405).json({ message: 'Method not allowed' });
		return;
	}

	const session = await getServerSession(req, res, authOptions);
	if (!session) {
		res.status(401).json({ message: 'Unauthorized' });
		return;
	}
	let rsvpData = null;
	try {
		rsvpData = CreateRSVPSchema.parse(JSON.parse(req.body));
	} catch (error) {
		console.log(error);
		res.status(400).json({
			message: 'The data sent is not JSON',
		});
		return;
	}
	const { eventId, operation } = rsvpData;

	const event = await prisma.event.findUnique({
		where: {
			id: eventId,
		},
	});

	if (!event) {
		res.status(404).json({ message: 'Event not found' });
		return;
	}
	console.log(
		`Attempting to ${operation} RSVP for event ${eventId} for user ${session.user.id}`
	);
	if (operation === 'create') {
		const rsvp = await prisma.rSVP.create({
			data: {
				eventId: rsvpData.eventId,
				accountId: session.user.id,
			},
		});
		res.status(200).send(true);
		return;
	}

	if (operation === 'remove') {
		const rsvp = await prisma.rSVP.delete({
			where: {
				eventId_accountId: {
					eventId: eventId,
					accountId: session.user.id,
				},
			},
		});
		res.status(200).send(true);
		return;
	}
}
