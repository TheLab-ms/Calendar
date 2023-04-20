import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
	// Create Categories
	const electronics = await prisma.category.create({
		data: { title: 'Electronics' },
	});

	const woodworking = await prisma.category.create({
		data: { title: 'Woodworking' },
	});

	// Create Locations
	const classroom = await prisma.location.create({
		data: { title: 'Classroom', roomId: 'A101', maxSeating: 30 },
	});

	const workshop = await prisma.location.create({
		data: { title: 'Workshop', roomId: 'B201', maxSeating: 15 },
	});

	// Create Events
	await prisma.event.create({
		data: {
			creatorId: 1,
			title: 'Introduction to Arduino',
			categoryId: electronics.id,
			locationId: classroom.id,
			startTime: new Date('2023-05-01T10:00:00.000Z'),
			endTime: new Date('2023-05-01T12:00:00.000Z'),
			allDay: false,
			exclusivity: 0,
			minAttendence: 5,
			maxAttendence: 20,
			minAge: 16,
			description: 'Learn the basics of Arduino programming and electronics.',
			specialNotes: 'Please bring your own Arduino board and a laptop.',
			reqMaterials: 'Arduino board, laptop',
			pending: false,
			approved: true,
		},
	});

	await prisma.event.create({
		data: {
			creatorId: 2,
			title: 'Woodworking Basics',
			categoryId: woodworking.id,
			locationId: workshop.id,
			startTime: new Date('2023-05-02T14:00:00.000Z'),
			endTime: new Date('2023-05-02T17:00:00.000Z'),
			allDay: false,
			exclusivity: 0,
			minAttendence: 3,
			maxAttendence: 10,
			minAge: 18,
			description: 'Learn essential woodworking techniques and tools.',
			specialNotes: 'Safety goggles and closed-toe shoes are required.',
			reqMaterials: 'Safety goggles, closed-toe shoes',
			pending: false,
			approved: true,
		},
	});
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
