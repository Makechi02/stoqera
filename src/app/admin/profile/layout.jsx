import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import ProfileNavbar from "@/components/ui/dashboard/admin/ProfileNavbar";

const Layout = async ({children}) => {
    const session = await getServerSession(authOptions);
    const user = session.user;

    const firstLetter = user.name.split("")[0];
    const secondLetter = user.name.split(" ")[1]?.split("")[0];

    return (
        <div className={`bg-white p-4 md:p-8 rounded-lg min-h-[calc(100svh-5.5rem)]`}>
            <h1 className={`page-heading`}>Profile</h1>

            <div className={`mt-4 md:flex gap-4`}>
                <div className={`md:w-[30%]`}>
                    <div className={`flex items-center gap-2`}>
                        <div
                            className={`h-[70px] aspect-square flex items-center justify-center bg-gray-200 rounded-full`}>
                            <p className={`font-gfs_didot font-bold text-2xl`}>{firstLetter.toUpperCase()}</p>
                            <p className={`font-gfs_didot font-bold text-2xl`}>{secondLetter?.toUpperCase()}</p>
                        </div>
                        <div>
                            <h2 className={`font-bold font-gfs_didot text-lg`}>{user.name}</h2>
                            <p className={`text-gray-600 text-sm`}>{user.email}</p>
                        </div>
                    </div>

                    <ProfileNavbar/>
                </div>

                <div className={`flex-1`}>
                    {children}
                </div>
            </div>
        </div>
    );
}

export default Layout;