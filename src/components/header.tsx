<<<<<<< Updated upstream
import Link from "next/link"
import { useSession } from "next-auth/react"
import Image from "next/image"

export default function Header() {
  const { data: session, status } = useSession();
  return (
    <header>
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5">
            <span className="sr-only">TheLab.ms</span>
            <Image src="/images/glider.svg" className="h-12 w-auto" alt="TheLab.ms Logo" width={1} height={1} />
          </Link>
        </div>
        <div className="max-w-7xl lg:flex lg:flex-1 lg:justify-end">
          <div className="flex items-center">
            <a href="#" className="text-sm font-semibold leading-6 text-gray-900 mr-3">Welcome Guest, Log in</a>
            <a href="#" className="fab fa-facebook-f mr-2 text-gray-900"></a>
            <a href="#" className="fab fa-meetup mr-2 text-gray-900"></a>
            <a href="#" className="fab fa-twitter mr-2 text-gray-900"></a>
            <a href="#" className="fab fa-linkedin-in mr-2 text-gray-900"></a>
          </div>
        </div>
      </nav>
=======
import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';
import Image from 'next/image';

export default function Header() {
	const { data: session, status } = useSession();
	return (
		<header>
			<nav
				className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
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
				<div className="max-w-7xl lg:flex lg:flex-1 lg:justify-end">
					<div className="flex items-center">
						{session ? (
							<span className="text-sm font-semibold leading-6 text-gray-900 mr-3">
								Welcome {session.user.name.split(' ')[0]},{' '}
								<button onClick={() => signOut()}>Log out</button>
							</span>
						) : (
							<span className="text-sm font-semibold leading-6 text-gray-900 mr-3">
								Welcome Guest, <button onClick={() => signIn()}>Log in</button>
							</span>
						)}
						<a href="#" className="fab fa-facebook-f mr-2 text-gray-900"></a>
						<a href="#" className="fab fa-meetup mr-2 text-gray-900"></a>
						<a href="#" className="fab fa-twitter mr-2 text-gray-900"></a>
						<a href="#" className="fab fa-linkedin-in mr-2 text-gray-900"></a>
					</div>
				</div>
			</nav>
>>>>>>> Stashed changes

			<div className="mx-auto flex w-full max-w-7xl items-center justify-between rounded-md primary p-2 lg:px-8">
				<h1 className="text-2xl lg:mb-0 font-bold text-white pt-0 pb-0">
					Test
				</h1>
				<div className="text-white">
					<i className="fas fa-calendar-alt"></i>
				</div>
			</div>
		</header>
	);
}
