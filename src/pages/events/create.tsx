import { GetServerSideProps } from 'next';
import Layout from '../../components/layout';
import { prisma } from '@/helpers/db';
import { Category, Location } from '@prisma/client';
import { useState } from 'react';

enum UserType {
	GUEST = 0,
	MEMBER = 1,
	LEADERSHIP = 2
}

interface CreateEventPageProps {
	categories: Category[];
	locations: Location[];
}

interface FormState {
	title: string;
	categoryId: string;
	locationId: string;
	startTime: string;
	endTime: string;
	description: string;
	reqMaterials: string;
	minAttendence: number;
	maxAttendence: number;
	minAge: number;
	exclusivity: UserType;
}

export const getServerSideProps: GetServerSideProps<CreateEventPageProps> = async () => {
	const categories = await prisma.category.findMany({});
	const locations = await prisma.location.findMany({});
	return {
		props: {
			categories,
			locations
		}
	}
};


function CreateEventPage(props: CreateEventPageProps) {
	const { categories, locations } = props;
	const [formData, setFormData] = useState<FormState>({
		title: "",
		categoryId: categories[0].id.toString(),
		locationId: locations[0].id.toString(),
		startTime: "",
		endTime: "",
		description: "",
		reqMaterials: "",
		minAttendence: 1,
		maxAttendence: 0,
		minAge: 0,
		exclusivity: UserType.GUEST
	});

	const handleChange = (e: { target: { name: any; value: any; }; }) => {
		const { name, value } = e.target;
		setFormData((prevState) => ({ ...prevState, [name]: value }));
	};

	// convert usertype to array of strings
	const userTypes = Object.keys(UserType).filter(k => typeof UserType[k as any] === "number");

	return (
		<Layout>
			<div className="flex flex-row overflow-x-auto my-8">
				<form className="flex flex-col w-full">
					<div className="flex h-full">
						<div className="w-2/5 pr-4 flex flex-col">
							<label htmlFor="title" className="block text-sm font-semibold mb-2">Event Name:</label>
							<input id="title" name="title" type="text" className="w-full px-4 py-2 border border-gray-300 rounded" onChange={handleChange} />

							<label htmlFor="categoryId" className="block text-sm font-semibold mt-4 mb-2">Category:</label>
							<select id="categoryId" name="categoryId" className="w-full px-4 py-2 border border-gray-300 rounded" defaultValue={formData.categoryId} onChange={handleChange}>
								{categories.map((category, index) => {
									return <option key={index} value={category.id}>{category.title}</option>;
								})}
							</select>

							<label htmlFor="locationId" className="block text-sm font-semibold mt-4 mb-2">Location:</label>
							<select id="locationId" name="locationId" className="w-full px-4 py-2 border border-gray-300 rounded" defaultValue={formData.locationId} onChange={handleChange}>
								{locations.map((location, index) => {
									return <option key={index} value={location.id}>{location.title}</option>;
								})}
							</select>

							<label htmlFor="date" className="block text-sm font-semibold mt-4 mb-2">Date:</label>
							<input id="date" type="date" className="w-full px-4 py-2 border border-gray-300 rounded" onChange={handleChange} />

							<label htmlFor="time_start" className="block text-sm font-semibold mt-4 mb-2">Time:</label>
							<div className="flex">
								<input id="time_start" type="time" className="w-full px-4 py-2 border border-gray-300 rounded" onChange={handleChange} />
								<span className="mx-2 self-center">to</span>
								<input id="time_end" type="time" className="w-full px-4 py-2 border border-gray-300 rounded" onChange={handleChange} />
							</div>

							<label htmlFor="exclusivity" className="block text-sm font-semibold mt-4 mb-2">Exclusivity:</label>
							<div className="relative w-full">
								<input id="exclusivity" name="exclusivity" type="range" min="1" max={userTypes.length} step="1" className="w-full" defaultValue={formData.exclusivity} onChange={handleChange} />
								<div className="flex justify-between mt-2">
									{userTypes.map((userType, index) => {
										return <span key={index} className="text-xs">{userType}</span>;
									})}
								</div>
							</div>

						</div>
						<div className="w-3/5 pl-4 flex flex-col">
							<div className="flex">
								<div className="w-1/3 pr-2">
									<label htmlFor="minAttendees" className="block text-sm font-semibold mb-2">Min Attendees:</label>
									<input id="minAttendees" name="minAttendees" type="number" className="w-full px-4 py-2 border border-gray-300 rounded" defaultValue={formData.minAttendence} onChange={handleChange} />
								</div>
								<div className="w-1/3 px-1">
									<label htmlFor="maxAttendees" className="block text-sm font-semibold mb-2">Max Attendees:</label>
									<input id="maxAttendees" name="maxAttendees" type="number" className="w-full px-4 py-2 border border-gray-300 rounded" defaultValue={formData.maxAttendence} onChange={handleChange} />
								</div>
								<div className="w-1/3 pl-2">
									<label htmlFor="minAge" className="block text-sm font-semibold mb-2">Minimum Age:</label>
									<select id="minAge" name="minAge" className="w-full px-4 py-2 border border-gray-300 rounded" onChange={handleChange}>
										<option>No restriction</option>
										<option>18+</option>
										<option>21+</option>
									</select>
								</div>
							</div>

							<div className="flex mt-4">
								<div className="w-1/2 pr-2">
									<label htmlFor="description" className="block text-sm font-semibold mb-2">Description:</label>
									<textarea id="description" name="description" rows={4} className="w-full px-4 py-2 border border-gray-300 rounded" onChange={handleChange}></textarea>
								</div>
								<div className="w-1/2 pl-2">
									<label htmlFor="specialNotes" className="block text-sm font-semibold mb-2">Special Notes:</label>
									<textarea id="specialNotes" name="specialNotes" rows={4} className="w-full px-4 py-2 border border-gray-300 rounded" onChange={handleChange}></textarea>
								</div>
							</div>

							<div className="mt-4">
								<label htmlFor="reqMaterials" className="block text-sm font-semibold mb-2">Required Materials:</label>
								<textarea id="reqMaterials" name="reqMaterials" rows={4} className="w-full px-4 py-2 border border-gray-300 rounded" onChange={handleChange}></textarea>
							</div>

							<div className="flex mt-4">
								<button className="w-1/2 px-4 py-2 bg-blue-500 text-white font-semibold rounded mr-2" disabled={true}>Save Event as Template</button>
								<select className="w-1/2 px-4 py-2 border border-gray-300 rounded ml-2">
									<option>Browse Templates</option>
								</select>
							</div>
						</div>
					</div>
					<button className="mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded self-end">Create Event</button>
				</form>
			</div>
		</Layout>
	);
}

export default CreateEventPage;
