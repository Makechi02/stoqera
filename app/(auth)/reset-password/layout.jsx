import Metrics from "@/app/metrics";

export const metadata = {
    title: `Reset Password | Stoqera`,
    alternates: {
        canonical: `/reset-password`
    }
}

export default function Layout({children}) {
    return (
        <>
            {children}
            <Metrics/>
        </>
    )
}