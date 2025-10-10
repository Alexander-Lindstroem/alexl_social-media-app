import Header from "../../components/Header"

const MainLayout = ({children}: Readonly<{children: React.ReactNode}>) => {
    return (
        <>
        <Header/>
        <main className="p-8">
            {children}
        </main>
        </>
    )
}

export default MainLayout