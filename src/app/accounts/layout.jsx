const Layout = ({children}) => {
    return (
        <div className={`bg-background text-text min-h-screen flex justify-center items-center px-8`}>
            <main className={`flex-1 bg-white max-w-md mx-auto border rounded-lg`}>
                {children}
            </main>
        </div>
    );
};

export default Layout;