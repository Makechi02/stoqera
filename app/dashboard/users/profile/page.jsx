import ProfileDetails from "@/components/dashboard/users/profile/ProfileDetails";
import {getCurrentLoggedInUser} from "@/lib/users/queryUsers";
import {getCurrentOrganization} from "@/lib/organization/queryOrganizations";

export default async function Page() {
    const user = await getCurrentLoggedInUser();
    const organization = await getCurrentOrganization();

    return (
        <div>
            <ProfileDetails user={user} organization={organization}/>
        </div>
    )
}