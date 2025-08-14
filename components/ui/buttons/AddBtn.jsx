import Link from "next/link";

export default function AddBtn({href, text}) {
    return (
        <Link
            href={href}
            className={`bg-primary/70 hover:bg-primary text-white px-4 py-2 rounded-lg transition-colors duration-200`}
        >
            {text}
        </Link>
    )
}