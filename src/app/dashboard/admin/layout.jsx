import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {redirect} from "next/navigation";
import Sidebar from "@/components/ui/dashboard/admin/Sidebar";

export const metadata = {
    title: 'Admin - Finviq'
}

const Layout = async ({children}) => {
    const session = await getServerSession(authOptions);

    if (session.user.role !== 'ADMIN') {
        redirect("/403");
    }

    return <Sidebar user={session.user} children={children}/>
}

export default Layout;