import Sidebar from "@/components/dashboard/Sidebar";
import {notFound} from "next/navigation";
import {getOrganizationBySlug} from "@/lib/queryOrganizations";

export async function generateMetadata({params}) {
    const {slug} = await params;
    const organization = await getOrganizationBySlug(slug);

    return {
        title: `${organization?.name} | Finviq`
    }
}

export default async function Layout({children, params}) {
    const {slug} = await params;

    const organization = await getOrganizationBySlug(slug);

    if (!organization) notFound();

    return (
        <>
            <Sidebar organization={organization} children={children}/>
        </>
    )
}