export default function Layout({children}) {
    return (
        <div className={`bg-background text-text min-h-svh flex justify-center items-center px-8`}>
            <main className={`flex-1 bg-white max-w-md mx-auto border border-gray-200 rounded-lg`}>
                {children}
            </main>
        </div>
    );
};
