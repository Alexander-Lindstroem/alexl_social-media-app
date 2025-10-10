'use client'
import { logout } from "../../actions/logout"

const LogOut = () => {
    return (
        <button className="button-secondary cursor-pointer" onClick={logout}>Log Out</button>
    )
}

export default LogOut 