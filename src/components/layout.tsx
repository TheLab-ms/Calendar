import type { ReactNode } from "react"
import Header from "./header"

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <>
            <Header />
            <div className="flex flex-col mx-auto max-w-7xl" id="contents">
                {children}
            </div>
        </>
    )
}
