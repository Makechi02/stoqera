import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import Tabs from "@/app/admin/(home)/Tabs";

export default async function Layout({children}) {
    const {user} = await getServerSession(authOptions);

    return (
        <div>
            <div className={`px-8 pt-8 border-b`}>
                <div>
                    <p className={`font-bold font-gfs_didot text-lg`}>Hello {user.name},</p>
                </div>

                <div className={`mt-8`}>
                    <Tabs/>
                </div>
            </div>

            <div>{children}</div>
        </div>
    )
}