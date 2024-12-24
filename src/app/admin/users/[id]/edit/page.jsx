import {BackBtn} from "@/components/ui/dashboard/Buttons";
import {getUserById} from "@/lib/userActions";
import UpdateUserForm from "@/app/admin/users/[id]/edit/UpdateUserForm";

export async function generateMetadata(props) {
    const params = await props.params;
    const user = await getUserById(params.id);

    return {
        title: `${user.name} - Finviq`
    }
}

export default async function Page(props) {
    const params = await props.params;
    const user = await getUserById(params.id);

    return (
        <main>
            <div className={`p-8 border-b`}>
                <div className={`flex gap-4 items-center`}>
                    <BackBtn/>
                    <h1 className={`page-heading`}>Edit user</h1>
                </div>
            </div>

            <div className={`my-4 max-w-screen-md mx-8`}>
                <UpdateUserForm user={user}/>
            </div>
        </main>
    )
}
