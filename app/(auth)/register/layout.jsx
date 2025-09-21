import Metrics from "@/app/metrics";

export const metadata = {
    title: `Register | Stoqera`,
    alternates: {
        canonical: `/register`
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