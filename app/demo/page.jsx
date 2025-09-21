import Metrics from "@/app/metrics";

export const metadata = {
    title: `Demo | Stoqera`,
    alternates: {
        canonical: `/demo`
    }
}

export default function Page() {
    return (
        <>
            <main>
                <h1>demo</h1>
            </main>
            <Metrics/>
        </>
    )
}