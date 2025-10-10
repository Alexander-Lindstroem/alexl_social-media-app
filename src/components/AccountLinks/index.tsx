import { createClient } from "@/utils/supabase/server-client"
import Link from "next/link"
import LogOut from "@/components/LogOut"

const AccountLinks = async () => {
    const supabase = await createClient()
    const {data: {user}, error} = await supabase.auth.getUser();

    return (
        <div>
            {user ? 
            <div className="flex gap-2">
                <Link href="/create" className="button-tertiary">Create Post</Link>
                <LogOut/>
            </div>
            : 
            <Link href="/auth/login" className="button-secondary">Log In</Link>}
        </div>
    )
}

export default AccountLinks