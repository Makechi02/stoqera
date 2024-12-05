import Image from "next/image";

const Logo = () => {
    return (
        <Image
            src={`/assets/images/invisio-logo-without-bg.webp`}
            alt={`Invisio logo`}
            width={768}
            height={768}
            className={`w-16 aspect-square`}
        />
    )
}

export default Logo;