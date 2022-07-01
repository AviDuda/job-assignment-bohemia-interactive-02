import Head from "next/head";

interface MetaProps {
    title?: string;
    description?: string;
}

export default function Meta({ title, description }: MetaProps) {
    const siteTitle = "Bohemia Interactive job assignment 02";

    return (
        <Head>
            <title>{title ? `${title} | ${siteTitle}` : siteTitle}</title>
            <meta name="description" content={description ?? title ?? siteTitle} />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </Head>
    );
}
