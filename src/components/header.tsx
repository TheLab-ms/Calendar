import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';
import Image from 'next/image';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faMeetup, faTwitter, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";

interface HeaderProps {
	title: string;
}

export default function Header(props: HeaderProps) {
	const { data: session } = useSession();
	return (
		<header>
			<nav
				className="mx-auto flex items-center justify-between p-6 lg:px-8"
				aria-label="Global"
			>
				<div className="flex lg:flex-1">
					<Link href="/" className="-m-1.5">
						<span className="sr-only">TheLab.ms</span>
						<Image
							src="/images/glider.svg"
							className="h-12 w-auto"
							alt="TheLab.ms Logo"
							width={1}
							height={1}
						/>
					</Link>
				</div>
				<div className="lg:flex lg:flex lg:justify-center">
					<div className="flex items-center">
						{session ? (
							<span className="text-sm font-semibold leading-6 text-gray-900 mr-3">
								Welcome {session.user.name.split(' ')[0]},{' '}
								<button onClick={() => signOut()}>Log out</button>
							</span>
						) : (
							<span className="text-sm font-semibold leading-6 text-gray-900 mr-3">
								Welcome Guest, <button onClick={() => signIn("keycloak")}>Log in</button>
							</span>
						)}
						<a href="https://www.facebook.com/thelabms" className="text-gray-900 mr-2">
							<FontAwesomeIcon icon={faFacebookF} />
						</a>
						<a href="https://www.meetup.com/thelab-ms" className="text-gray-900 mr-2">
							<FontAwesomeIcon icon={faMeetup} />
						</a>
						<a href="https://twitter.com/thelab_ms" className="text-gray-900 mr-2">
							<FontAwesomeIcon icon={faTwitter} />
						</a>
						<a href="https://www.linkedin.com/company/thelab-ms" className="text-gray-900 mr-2">
							<FontAwesomeIcon icon={faLinkedinIn} />
						</a>
					</div>
				</div>
			</nav>

			<div className="primary w-full rounded-md p-5">
				<h1 className="text-4xl lg:mb-0 font-bold text-white pt-0 pb-0">
					{props.title || ''}
				</h1>
				<div className="text-white">
					<i className="fas fa-calendar-alt"></i>
				</div>
			</div>
		</header>
	);
}
