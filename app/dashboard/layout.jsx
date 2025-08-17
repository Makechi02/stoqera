import Sidebar from "@/components/dashboard/Sidebar";
import {notFound} from "next/navigation";
import {getCurrentOrganization} from "@/lib/queryOrganizations";

export async function generateMetadata() {
    const organization = await getCurrentOrganization();

    return {
        title: `${organization?.name} | Finviq`
    }
}

export default async function Layout({children}) {
    const organization = await getCurrentOrganization();
    if (!organization) notFound();

    return (
        <>
            <Sidebar organization={organization} children={children}/>
        </>
    )
}