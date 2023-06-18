import { useSession } from 'next-auth/react';
import Layout from '../components/layout';

export default function AdminPage() {
    const { data: session } = useSession();
    return (
        <Layout headerText='Calendar View'>
            <br />
            You are an admin because you are in the following groups:
            <br />
            <ul>
                {
                    session?.user?.groups?.map((group: string, index: number) => (
                        <li key={index}>{group}</li>
                    ))
                }
            </ul>
        </Layout>
    );
}
