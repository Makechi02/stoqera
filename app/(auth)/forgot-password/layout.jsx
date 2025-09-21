import Metrics from "@/app/metrics";

export const metadata = {
    title: `Forgot Password | Stoqera`,
    alternates: {
        canonical: `/forgot-password`
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