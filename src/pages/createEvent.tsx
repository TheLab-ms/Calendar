import Layout from '../components/layout';

export default function CreateEventPage() {
	return (
		<Layout>
			<div className="flex flew-row centered-contents">
				<div className="basis-5/12">
					<input
						className="eventName"
						type="text"
						id="eventName"
						name="eventName"
						style={{
							width: '100%',
							height: '32px',
							borderBottom: '1px solid gray',
						}}
						placeholder=" Event Name"
					></input>
					<br></br>
					<p
						className="font-semibold"
						style={{ fontSize: '15px', lineHeight: '2.1' }}
					>
						Category
					</p>
					<select
						style={{
							width: '100%',
							height: '35px',
							border: '1px solid gray',
							borderRadius: '6px',
						}}
					>
						<option></option>
						<option value="3d">3D Printing</option>
						<option value="cnc">CNC</option>
						<option value="dye">Dye-Sublimation</option>
						<option value="electronic">Electronics</option>
						<option value="facilities">Facilities</option>
						<option value="stitich">Stitch Lab</option>
						<option value="glass">Glass</option>
						<option value="vinyl">Vinyl</option>
						<option value="laser">Laser</option>
						<option value="wood">Woodshop</option>
					</select>
					<p
						className="font-semibold"
						style={{ fontSize: '15px', lineHeight: '2.1' }}
					>
						Location
					</p>
					<select
						style={{
							width: '100%',
							height: '35px',
							border: '1px solid gray',
							borderRadius: '6px',
						}}
					>
						<option></option>
						<option value="classroom">Classroom</option>
						<option value="parking">Rear Parking Lot</option>
						<option value="breakKitchen">Break Room / Kitchenette</option>
						<optgroup label="Atrium">
							<option value="opentable">Open Table</option>
							<option value="printingArea">Printing Area</option>
						</optgroup>
						<optgroup label="Vent Room">
							<option value="laserArea">Laser Area</option>
							<option value="3dArea">3D Printing Area</option>
						</optgroup>
						<optgroup label="Clean / Community Room">
							<option value="fiberCraft">Fiber Crafting</option>
							<option value="sewing">Sewing</option>
							<option value="vinylRoom">Vinyl</option>
							<option value="boardTable">Board Table</option>
						</optgroup>
						<optgroup label="Workshop">
							<option value="latheArea">Lathe Area</option>
							<option value="cncArea">CNC Area</option>
							<option value="cuttingOp">Cutting Operations</option>
							<option value="finish">Finishing Area</option>
						</optgroup>
					</select>
					<p
						className="font-semibold"
						style={{ fontSize: '15px', lineHeight: '2.1' }}
					>
						Date
					</p>
					<select
						style={{
							width: '100%',
							height: '35px',
							border: '1px solid gray',
							borderRadius: '6px',
						}}
					>
						<option></option>
						<option>Calendar</option>
					</select>
					<br></br>
					<p style={{ lineHeight: '0.5' }}>&nbsp;</p>
					<div className="flex flew-row" style={{ textAlign: 'center' }}>
						<div className="basis-1/4">
							<input
								type="time"
								id="startTime"
								name="startTime"
								style={{
									width: '93px',
									fontSize: '14.5px',
									backgroundColor: 'lightgrey',
									borderRadius: '6px',
								}}
							></input>
						</div>
						<div className="basis-9">
							<p>to</p>
						</div>
						<div className="basis-1/4">
							<input
								type="time"
								id="endTime"
								name="endTime"
								style={{
									width: '93px',
									fontSize: '14.5px',
									backgroundColor: 'lightgrey',
									borderRadius: '6px',
								}}
							></input>
						</div>
						<div className="basis-1"></div>
						<div className="basis-1/4">
							<button
								id="allDay"
								name="allDay"
								type="button"
								style={{
									width: '51px',
									height: '25px',
									fontSize: '14.5px',
									backgroundColor: 'lightgrey',
									borderRadius: '6px',
								}}
							>
								All Day
							</button>
						</div>
					</div>
					<p
						className="font-semibold"
						style={{ fontSize: '15px', lineHeight: '2.1' }}
					>
						Exculsivity
					</p>
					<div className="flex flew-row" style={{ textAlign: 'center' }}>
						<div className="basis-1"></div>
						<div className="basis-auto">
							<input
								id="guest"
								name="guest"
								value="Guest"
								type="checkbox"
							></input>
							<label>&nbsp;Guest</label>
						</div>
						<div className="basis-5"></div>
						<div className="basis-auto">
							<input
								id="member"
								name="member"
								value="Member"
								type="checkbox"
							></input>
							<label>&nbsp;Member</label>
						</div>
						<div className="basis-4"></div>
						<div className="basis-auto">
							<input
								id="leader"
								name="leader"
								value="Leader"
								type="checkbox"
							></input>
							<label>&nbsp;Leadership</label>
						</div>
					</div>
				</div>

				<div className="basis-4"></div>

				<div className="basis-50" style={{ textAlign: 'center' }}>
					<div className="flex flew-row" style={{ textAlign: 'center' }}>
						<div className="basis-1/3">
							<p
								className="font-semibold"
								style={{ width: '100%', fontSize: '13.5px' }}
							>
								Min Attendees
							</p>
							<input
								id="minAttend"
								name="minAttend"
								type="number"
								placeholder=" N/A"
								style={{
									width: '70px',
									height: '40px',
									border: '1px solid gray',
									borderRadius: '6px',
								}}
							></input>
						</div>
						<div className="basis-1/3">
							<p
								className="font-semibold"
								style={{ width: '100%', fontSize: '13.5px' }}
							>
								Max Attendees
							</p>
							<input
								id="maxAttend"
								name="maxAttend"
								type="number"
								placeholder=" N/A"
								style={{
									width: '70px',
									height: '40px',
									border: '1px solid gray',
									borderRadius: '6px',
								}}
							></input>
						</div>
						<div className="basis-1/3">
							<p
								className="font-semibold"
								style={{ width: '100%', fontSize: '13.5px' }}
							>
								Min Age
							</p>
							<input
								id="minAge"
								name="minAge"
								type="number"
								placeholder=" N/A"
								style={{
									width: '70px',
									height: '40px',
									border: '1px solid gray',
									borderRadius: '6px',
								}}
							></input>
						</div>
					</div>
					<div
						className="flex flew-row"
						style={{ fontSize: '15px', lineHeight: '2.1', textAlign: 'left' }}
					>
						<div className="basis-7/12">
							<p className="font-semibold">Description</p>
							<input
								id="description"
								name="description"
								type="text"
								style={{
									width: '100%',
									height: '105px',
									backgroundColor: 'whitesmoke',
									borderRadius: '6px',
								}}
							></input>
						</div>
						<div className="basis-2"></div>
						<div className="basis-5/12">
							<p className="font-semibold">Special Note</p>
							<input
								id="description"
								name="description"
								type="text"
								style={{
									width: '100%',
									height: '105px',
									backgroundColor: 'whitesmoke',
									borderRadius: '6px',
								}}
							></input>
						</div>
					</div>
					<p
						className="font-semibold"
						style={{ fontSize: '15px', lineHeight: '2.1', textAlign: 'left' }}
					>
						Required Materials
					</p>
					<input
						id="materials"
						name="materials"
						type="text"
						style={{
							width: '100%',
							height: '60px',
							backgroundColor: 'whitesmoke',
							borderRadius: '6px',
						}}
					></input>
					<br></br>
					<p style={{ lineHeight: '0.5' }}>&nbsp;</p>
					<button
						id="subTemplate"
						name="subTemplate"
						type="button"
						style={{
							width: '170px',
							height: '25px',
							float: 'left',
							fontSize: '14px',
							backgroundColor: 'lightgrey',
							borderRadius: '6px',
						}}
					>
						Submit Event as Template
					</button>
					<p style={{ float: 'left' }}>&nbsp;</p>
					<select
						id="template"
						name="template"
						style={{
							width: '185px',
							border: '1px solid grey',
							borderRadius: '6px',
						}}
					></select>
				</div>
			</div>
		</Layout>
	);
}
