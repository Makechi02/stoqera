import GoogleAnalyticsScript from "@/app/metrics/GoogleAnalyticsScript";
import MicrosoftClarity from "@/app/metrics/MicrosoftClarity";

export default function Metrics() {
    return (
        <>
            <GoogleAnalyticsScript/>
            <MicrosoftClarity/>
        </>
    )
}