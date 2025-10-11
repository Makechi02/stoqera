import {getCurrentLoggedInUser} from "@/lib/users/queryUsers";
import ProfileDetails from "@/components/dashboard/users/profile/ProfileDetails";

export default async function Page() {
    const user = await getCurrentLoggedInUser();

    return (
        <div>
            <ProfileDetails user={user}/>
        </div>
    )
}