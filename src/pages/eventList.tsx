import Layout from "../components/layout"

export default function EventListPage() {
  return (
    <Layout>
      <div style={{ width: '100%' }}>
      <table className="table-auto flex-1">
				<thead className="px-4">
					<tr>
						<th className="px-4 py-2 text-left">Name</th>
						<th className="px-4 py-2 text-left">Event Date</th>
						<th className="px-4 py-2 text-left">Signups</th>
						<th className="px-4 py-2 text-left">Date Submitted</th>
						<th className="px-4 py-2 text-left">Status</th>
					</tr>
				</thead>
				<tbody className="px-4">
					<tr>
						<td className="border px-4 py-2">
							<a href="#">Intro to Woodworking I</a>
						</td>
						<td className="border px-4 py-2">03/03/23</td>
						<td className="border px-4 py-2">5/10</td>
						<td className="border px-4 py-2">02/28/23</td>
						<td className="border px-4 py-2">
							<span className="hidden sm:inline">Rejected</span> 🔴
						</td>
					</tr>
					<tr>
						<td className="border px-4 py-2">
							<a href="#">Intro to Woodworking I</a>
						</td>
						<td className="border px-4 py-2">03/03/23</td>
						<td className="border px-4 py-2">5/10</td>
						<td className="border px-4 py-2">02/28/23</td>
						<td className="border px-4 py-2">
							<span className="hidden sm:inline">Approved</span> 🟢
						</td>
					</tr>
				</tbody>
			</table>
      </div>
    </Layout>
  )
}
