import Metrics from "@/app/metrics";

export const metadata = {
    title: `Login | Stoqera`,
    alternates: {
        canonical: `/login`
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