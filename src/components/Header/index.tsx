import AccountLinks from "../AccountLinks"
import Logo from "../Logo"
import SearchInput from "../SearchInput/indext"

const Header = () => {
    return (
        <header className="flex justify-between items-center p-4 shadow-xl">
            <Logo />
            <SearchInput/>
            <AccountLinks/>
        </header>
    )
}

export default Header