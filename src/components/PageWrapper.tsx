import Image from "next/image";
import { ReactNode } from "react";

import companyLogo from "../../public/images/logo.svg";

import Meta from "./Meta";

interface MetaProps {
    title?: string;
    description?: string;
    children?: ReactNode;
}

export default function PageWrapper({ title, description, children }: MetaProps) {
    return (
        <div className="container mx-auto flex min-h-screen flex-col">
            <Meta title={title} description={description} />

            <header className="mx-auto flex h-28 w-full justify-between border-b-2 border-gray-200">
                <Image src={companyLogo} height={25} alt="Bejamas logo" />
            </header>

            <main className="mx-auto flex w-full grow flex-col p-12 xl:px-32">{children}</main>
        </div>
    );
}
