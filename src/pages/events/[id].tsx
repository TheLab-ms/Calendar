import { GetServerSideProps } from 'next';
import Layout from '../../components/layout';
import { prisma } from '@/helpers/db';
import { CompleteEvent } from '@/schemas';
import { useSession } from 'next-auth/react';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]';
import { useState } from 'react';
import { toast } from 'react-toastify';


interface EventDetailsProps {
	event: CompleteEvent;
	isRSVPed: boolean;
	isOwner: boolean;
}

const EventDetails = ({
	event,
	isRSVPed,
	isOwner
}: EventDetailsProps) => {
	const session = useSession();
	const [userRSVPed, setUserRSVPed] = useState<boolean>(isRSVPed);
	const { title, category: { title: categoryName }, location: { title: locationName }, startTime, endTime, reqMaterials, description, exclusivity, specialNotes } = event;

	const dateOptions: Intl.DateTimeFormatOptions = { weekday: 'long', month: 'long', day: 'numeric' };
	const timeOptions: Intl.DateTimeFormatOptions = { hour: 'numeric', minute: 'numeric', hour12: true };
	const formattedStartDate = new Date(startTime).toLocaleDateString('en-US', dateOptions).replace(/\d{1,2}(st|nd|rd|th)/, '$& ');
	const formattedStartTime = new Date(startTime).toLocaleTimeString('en-US', timeOptions);
	const formattedEndTime = new Date(endTime).toLocaleTimeString('en-US', timeOptions);

	const handleRSVP = () => {
		fetch('/api/events/rsvp', {
			method: 'POST',
			body: JSON.stringify({ eventId: event.id, operation: userRSVPed ? 'remove' : 'create' }),
		}).then((res) => {
			if (res.ok) {
				setUserRSVPed(!userRSVPed);
				toast.success("Successfully RSVP'd", {
					position: "top-center",
				});
			} else {
				toast.error("RSVP failed", {
					position: "top-center",
				});
			}
		}).catch((err) => {
			toast.error("RSVP failed", {
				position: "top-center",
			});
		})
	}
	return (
		<Layout headerText="Event Details" >
			<div className="header">
				<div className="container m-auto p-10">
					<table className="table-auto m-auto">
						<tbody>
							<tr className="border-t border-gray-200">
								<td className="px-4 py-2 font-semibold">Title</td>
								<td className="px-4 py-2">{title}</td>
							</tr>
							<tr className="border-t border-gray-200">
								<td className="px-4 py-2 font-semibold">Location</td>
								<td className="px-4 py-2">{locationName}</td>
							</tr>
							<tr className="border-t border-gray-200">
								<td className="px-4 py-2 font-semibold">Category</td>
								<td className="px-4 py-2">{categoryName}</td>
							</tr>
							<tr className="border-t border-gray-200">
								<td className="px-4 py-2 font-semibold">Start Time</td>
								<td className="px-4 py-2">{formattedStartDate} @ {formattedStartTime} - {formattedEndTime}</td>
							</tr>
							<tr className="border-t border-gray-200">
								<td className="px-4 py-2 font-semibold">Exclusivity</td>
								<td className="px-4 py-2">{exclusivity}</td>
							</tr>
							<tr className="border-t border-gray-200">
								<td className="px-4 py-2 font-semibold">Required Materials</td>
								<td className="px-4 py-2">{reqMaterials}</td>
							</tr>
							<tr className="border-t border-gray-200">
								<td className="px-4 py-2 font-semibold">Description</td>
								<td className="px-4 py-2">{description}</td>
							</tr>
							<tr className="border-t border-gray-200">
								<td className="px-4 py-2 font-semibold">Special Notes</td>
								<td className="px-4 py-2">{specialNotes}</td>
							</tr>
							{session.status === "authenticated" && <tr>
								<td className="px-4 py-2 font-semibold">Actions</td>
								<td className="px-4 py-2">
									{!isOwner && <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mx-2" onClick={handleRSVP}>{userRSVPed ? "Cancel RSVP" : "RSVP"}</button>}
									{isOwner &&
										<>
											<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2">
												Edit
											</button>
											<button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mx-2">
												Delete
											</button>
										</>
									}
								</td>
							</tr>}
						</tbody>
					</table>
				</div>
			</div>
		</Layout>
	);
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	let isUserRSVPed = false;
	let isOwner = false;
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

	// Create the Prisma call promise without awaiting it
	const eventPromise = prisma.event.findUnique({
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

	// Create the session promise without awaiting it
	const sessionPromise = getServerSession(
		context.req,
		context.res,
		authOptions
	);

	// Run the promises in parallel and await the results
	const [event, session] = await Promise.all([eventPromise, sessionPromise]);

	const fixedEvent = JSON.parse(JSON.stringify(event));

	if (!session?.user) {
		return {
			props: {
				event: fixedEvent,
				isRSVPed: false
			}
		}
	}
	if (session?.user?.id === event?.creatorId) {
		isOwner = true;
		isUserRSVPed = true;
	} else {
		const rsvp = await prisma.rSVP.findFirst({
			where: {
				eventId: id,
				accountId: session.user.id,
			}
		})
		if (rsvp) {
			isUserRSVPed = true;
		}
	}
	return {
		props: { event: fixedEvent, isRSVPed: isUserRSVPed, isOwner },
	};
}


export default EventDetails;
