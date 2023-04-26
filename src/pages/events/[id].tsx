import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { PrismaClient } from '@prisma/client';
import Layout from '../../components/layout';

const EventDetails = ({
	event,
}: {
	event: {
		id: number;
		creatorId: number;
		title: string;
		categoryId: number;
		locationId: number;
		startTime: Date;
		endTime: Date;
		allDay: boolean;
		exclusivity: number;
		minAttendence: number;
		maxAttendence: number;
		minAge?: number;
		description: string;
		specialNotes?: string;
		reqMaterials?: string;
		pending: boolean;
		approved: boolean;
	};
}) => {
	return (
		<Layout>
			<h1>{event.title}</h1>
		</Layout>
	);
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	const prisma = new PrismaClient();

	if (!context.params || !context.params.id) {
		return {
			notFound: true,
		};
	}

	const { id } = context.params;
	const event = await prisma.event.findUnique({ where: { id: Number(id) } });

	return {
		props: { event },
	};
};

export default EventDetails;
