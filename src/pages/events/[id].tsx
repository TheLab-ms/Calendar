import { GetServerSideProps } from 'next';
import Layout from '../../components/layout';
import { prisma } from '@/helpers/db';
import { CompleteEvent } from '@/schemas';

interface EventDetailsProps {
	event: CompleteEvent;
}

const EventDetails = ({
	event,
}: EventDetailsProps) => {
	const { title, category: { title: categoryName }, location: { title: locationName }, startTime, endTime, reqMaterials, description } = event;
	const dateOptions: Intl.DateTimeFormatOptions = { weekday: 'long', month: 'long', day: 'numeric' };
	const timeOptions: Intl.DateTimeFormatOptions = { hour: 'numeric', minute: 'numeric', hour12: true };
	const formattedStartDate = new Date(startTime).toLocaleDateString('en-US', dateOptions).replace(/\d{1,2}(st|nd|rd|th)/, '$& ');
	const formattedStartTime = new Date(startTime).toLocaleTimeString('en-US', timeOptions);
	const formattedEndTime = new Date(endTime).toLocaleTimeString('en-US', timeOptions);
	return (
		<Layout headerText={title} >
			<div className="header">
				<div className="container">
					{/* <h1 className="text-2xl font-bold mt-3 ml-2">{title}</h1> */}
					<h2 className="text-sm mb-3 ml-2" style={{ color: "#5BA1C9" }}>{categoryName}</h2>
					<div className="grid grid-cols-2">
						<div>
							<h3 className="text-base ml-2"><u>Date</u>: {formattedStartDate}</h3>
							<h3 className="text-base ml-2"><u>Time</u>: {formattedStartTime} - {formattedEndTime}</h3>
							<h3 className="text-base ml-2 mb-3"><u>Location</u>: {locationName}</h3>
							<h3 className="text-base ml-2"><u>Exclusivity</u>: Members</h3>
							<h3 className="text-base ml-2 mb-3"><u>Prerequisites</u>: N/A</h3>
							<h3 className="text-base ml-2"><u>Required</u>:</h3>
							<h3 className="text-base ml-2 mb-3">{reqMaterials}</h3>
						</div>
						<div>
							<h3 className="text-base ml-2"><u>Description</u>:</h3>
							<h3 className="text-base ml-2">{description}</h3>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export const getServerSideProps: GetServerSideProps = async (context) => {

	if (!context.params || !context.params.id) {
		return {
			notFound: true,
		};
	}

	const { id } = context.params;

	if (typeof id !== 'string') {
		return {
			notFound: true,
		};
	}
	// Make a prisma call that gets an event by id and includes the category title
	const event = await prisma.event.findUnique({
		where: { id },
		include: {
			category: {
				select: {
					title: true,
				},
			},
			location: {
				select: {
					title: true,
					maxSeating: true,
				},
			}
		},
	});
	const fixedEvent = JSON.parse(JSON.stringify(event));
	return {
		props: { event: fixedEvent },
	};
};

export default EventDetails;
