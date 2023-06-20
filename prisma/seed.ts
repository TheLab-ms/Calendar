import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function createDateOffset(days: number, hours: number, minutes: number) {
	const date = new Date();
	date.setDate(date.getDate() + days);
	date.setHours(date.getHours() + hours);
	date.setMinutes(date.getMinutes() + minutes);
	return date;
}

async function main() {
	// Create Users
	const exampleUser = await prisma.account.create({
		data: {
			id: '9c38f45a-0f19-11ee-be56-0242ac120002',
			email: 'example@example.com',
			name: 'Test User',
		},
	});

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
			creatorId: exampleUser.id,
			title: 'Introduction to Arduino',
			categoryId: electronics.id,
			locationId: classroom.id,
			startTime: createDateOffset(2, 0, 0),
			endTime: createDateOffset(2, 2, 0),
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
			creatorId: exampleUser.id,
			title: 'Woodworking Basics',
			categoryId: woodworking.id,
			locationId: workshop.id,
			startTime: createDateOffset(3, 0, 0),
			endTime: createDateOffset(3, 2, 0),
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
