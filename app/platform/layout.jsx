import Sidebar from "@/components/dashboard/Sidebar";
import {notFound} from "next/navigation";
import {getCurrentLoggedInUser} from "@/lib/users/queryUsers";

export const metadata = {
    title: `Super Admin | Stoqera`
}

export default async function Layout({children}) {
    const currentUser = await getCurrentLoggedInUser();

    if (!currentUser) notFound();

    return (
        <>
            <Sidebar currentUser={currentUser} children={children}/>
        </>
    )
}