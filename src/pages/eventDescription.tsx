import Layout from "../components/layout"

export default function EventDescription() {
  return (
    <Layout>
      <div className="header">
        <div className="container">
          <h1 className="text-2xl font-bold mt-3 ml-2">Woodworking I Class</h1>
          <h2 className="text-sm mb-3 ml-2" style={{ color: "#5BA1C9" }}>Workshop/Class</h2>
          <div className="grid grid-cols-2">
            <div>
              <h3 className="text-base ml-2"><u>Date</u>: Thursday February 23rd, 2023</h3>
              <h3 className="text-base ml-2"><u>Time</u>: 3:00PM - 4:00PM</h3>
              <h3 className="text-base ml-2 mb-3"><u>Location</u>: Workshop → Cutting Operations</h3>
              <h3 className="text-base ml-2"><u>Exclusivity</u>: Members</h3>
              <h3 className="text-base ml-2 mb-3"><u>Prerequisites</u>: N/A</h3>
              <h3 className="text-base ml-2"><u>Required</u>:</h3>
              <h3 className="text-base ml-2 mb-3">Clothes that can get messy; closed-toe shoes.</h3>
            </div>
            <div>
              <h3 className="text-base ml-2"><u>Description</u>:</h3>
              <h3 className="text-base ml-2">Join our instructor in laser cutting pieces of wood!</h3>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
