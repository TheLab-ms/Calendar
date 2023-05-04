import Layout from '../components/layout';
import Calendar from '../components/Calendar';
import { prisma } from '@/helpers/db';
import { GetServerSideProps } from 'next';
import { EventInput } from '@fullcalendar/core';

export const getServerSideProps: GetServerSideProps = async () => {
	const events = await prisma.event.findMany({});
	const conformedEvents = events.map((calEvent) => {
		const fullCalEvent: EventInput = {
			title: calEvent.title,
			start: calEvent.startTime.toISOString(),
			end: calEvent.endTime.toISOString(),
		};
		return fullCalEvent;
	});
	return {
		props: {
			events: conformedEvents,
		},
	};
};

export default function IndexPage({ events }: { events: EventInput[] }) {
	return (
		<Layout>
			<div style={{ width: '100%' }}>
				<Calendar events={events} />
			</div>
		</Layout>
	);
}
