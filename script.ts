import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
	const event = await prisma.event.create({
		data: {
			creatorId: 1,

			title: 'Woodworking I',

			category: {
				connect: {
					id: 1, // Replace with the ID of the existing Location record
				},
			},

			location: {
				connect: {
					id: 1, // Replace with the ID of the existing Location record
				},
			},

			startTime: new Date('2023-02-20T16:00:00.000Z'),
			endTime: new Date('2023-02-20T17:00:00.000Z'),
			allDay: false,

			exclusivity: 0,

			minAttendence: 2,
			maxAttendence: 10,
			minAge: 16,

			description:
				'Join the great instructor Don Herring in his lesson on the basics of woodworking!',
			specialNotes:
				'Takes about 10 minutes to clean up after the workshop as a heads up',
			reqMaterials: 'No flip flops or sandals, wear some sort of glasses',

			pending: true,
			approved: false,
		},
	});
	console.log(event);
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
