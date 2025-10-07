import Sidebar from "@/components/dashboard/Sidebar";
import {notFound} from "next/navigation";
import {getCurrentOrganization} from "@/lib/organization/queryOrganizations";
import {getCurrentLoggedInUser} from "@/lib/users/queryUsers";

export async function generateMetadata() {
    const organization = await getCurrentOrganization();

    return {
        title: `${organization?.name} | Stoqera`
    }
}

export default async function Layout({children}) {
    const organization = await getCurrentOrganization();
    if (!organization) notFound();

    const currentUser = await getCurrentLoggedInUser();

    return (
        <>
            <Sidebar organization={organization} currentUser={currentUser} children={children}/>
        </>
    )
}