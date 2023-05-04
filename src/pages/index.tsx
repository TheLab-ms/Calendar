import Calendar from '@/components/Calendar';
import Layout from '../components/layout';

export default function IndexPage() {
	return (
		<Layout>
			<div style={{ width: '100%' }}>
				<br></br>
				<Calendar />
				<br></br>
				<br></br>
			</div>
		</Layout>
	);
}
