import Image from "next/image";

export default function Logo({
                                 size = 'md',
                                 layout = 'horizontal',
                                 showText = true,
                                 textColor = 'text-background',
                                 font = 'font-bold'
                             }) {
    const sizeClasses = {
        sm: 'size-6',
        md: 'size-10',
        lg: 'size-15'
    };

    const textSizes = {
        sm: 'text-2xl',
        md: 'text-3xl',
        lg: 'text-4xl'
    };

    const layoutClasses = layout === 'vertical'
        ? 'flex-col items-center'
        : 'flex-row items-center';

    return (
        <div className={`size-fit ${sizeClasses[size]}`}>
            <div className={`flex ${layoutClasses} cursor-pointer justify-center`}>
                <Image
                    src={`/assets/images/stoqera-logo-mark.svg`}
                    alt={`Stoqera logo`}
                    width={40}
                    height={40}
                    className={`object-center object-cover ${sizeClasses[size]}`}
                />

                {showText && (
                    <div
                        className={`${textSizes[size]} ${textColor} ${font} tracking-tight ${layout === 'vertical' ? 'mt-2' : ''}`}
                    >
                        Stoqera
                    </div>
                )}
            </div>
        </div>
    )
}
