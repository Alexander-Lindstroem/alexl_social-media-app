'use client'
import {createContext, useContext, useEffect, useState} from "react"
import {User} from '@supabase/supabase-js'
import { createClient } from "@/utils/supabase/browser-client"

export type UserContextType = {
    user: User | null
    setUser: (user: User | null) => void
}

const UserContext = createContext<UserContextType | null>(null)

export const UserProvider = ({children, user: initialUser}:{children:React.ReactNode, user: User | null}) => {
    const [user, setUser] = useState<User | null>(initialUser)

    const supabase = createClient()

    useEffect(() => {
        setUser(initialUser);
    }, [initialUser]);

    useEffect(() => {
        const {data: {subscription}} = supabase.auth.onAuthStateChange(
            async (event, session) => {
                setUser(session?.user ?? null)
            }
        )

        return () => subscription.unsubscribe()
    },[])

    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => {
    const context = useContext(UserContext)
    if (context === undefined) {
        throw new Error('useUser must be within UserProvider')
    }
    return context
}