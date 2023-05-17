import type { ReactNode } from "react"
import Header from "./header"

interface LayoutProps {
    children: ReactNode;
    headerText: string;
}

export default function Layout({ children, headerText }: LayoutProps) {
    return (
        <>
            <Header title={headerText} />
            <div className="flex flex-col mx-auto max-w-7xl" id="contents">
                {children}
            </div>
        </>
    )
}
