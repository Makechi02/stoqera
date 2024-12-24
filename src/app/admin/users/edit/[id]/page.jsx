import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import UpdateUserForm from "@/app/admin/users/edit/[id]/UpdateUserForm";
import {BackBtn} from "@/components/ui/dashboard/Buttons";

async function getUserById(id) {
    const {accessToken} = await getServerSession(authOptions);

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/${id}`, {
        cache: 'no-store',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        }
    });

    if (!response.ok) {
        console.error(response);
        throw new Error('Failed to fetch user');
    }

    return await response.json();
}

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
                {user.name ? <UpdateUserForm user={user}/> : <p>Loading...</p>}
            </div>
        </main>
    )
}
