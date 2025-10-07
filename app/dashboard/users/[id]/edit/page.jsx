import {getUserById} from "@/lib/users/queryUsers";
import EditUserPage from "@/components/dashboard/users/EditUserPage";
import {getLocationsForCurrentOrganization} from "@/lib/queryLocations";

export default async function Page({params}) {
    const {id} = await params;

    const user = await getUserById(id);
    const locations = await getLocationsForCurrentOrganization();

    return (
        <div>
            <EditUserPage user={user} locations={locations}/>
        </div>
    )
}