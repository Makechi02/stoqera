import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import UpdateAccountForm from "@/components/ui/dashboard/admin/UpdateAccountForm";

const Page = async () => {
    const {user} = await getServerSession(authOptions);

    return (
        <div>
            <h2 className={`font-gfs_didot font-bold text-2xl`}>Personal Information</h2>
            <p className={`text-sm text-gray-600`}>Manage your account settings</p>

            <div className={`mt-6`}>
                <UpdateAccountForm user={user} />
            </div>
        </div>
    )
}

export default Page;