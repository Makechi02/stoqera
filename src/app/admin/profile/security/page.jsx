import UpdatePasswordForm from "@/components/ui/dashboard/UpdatePasswordForm";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";

const Page = async () => {
    const {user} = await getServerSession(authOptions);

    return (
        <div>
            <h2 className={`font-gfs_didot font-bold text-2xl`}>Security</h2>
            <p className={`text-sm text-gray-600`}>Manage your security preferences</p>

            <UpdatePasswordForm userId={user.id} role={user.role} />
        </div>
    )
}

export default Page;
