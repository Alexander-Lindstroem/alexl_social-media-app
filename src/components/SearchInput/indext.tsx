'use client'
import { SetStateAction, useState } from "react"
import { Search } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import { getSearchedPosts } from "@/utils/supabase/queries"
import Link from "next/link"

const SearchInput = () => {
    const [userInput, setUserInput] = useState<string>('')
    const {data} = useQuery({
        queryKey: ['search-results', userInput],
        queryFn: async() => {
            const {data, error} = await getSearchedPosts(userInput)
            if (error) throw new Error
            return data
        },
        enabled: userInput && userInput.length > 0 ? true : false
    })
    console.log(data)
    const handleChange = (e: { target: { value: SetStateAction<string> } }) => {
        setUserInput(e.target.value)
    }

    return (
        <div className="flex items-center p-2 gap-2 relative">
            <div>
                <Search/>
            </div>
            <div className="w-[200px]">
                <input 
                    onChange={handleChange} 
                    name="SearchInput" 
                    placeholder="Search by post title" 
                    className="p-2 rounded-xl border-1 border-black border-solid" 
                    value={userInput}
                />
                {data && 
                <div className="w-full bg-white flex flex-col absolute rounded-b-xl bottom-0 translate-y-[100%] border-1 border-black border-solid">
                    {data.map(({title, slug}, index) => <Link key={index} className="border-b-1 border-black border-solid p-2 last-of-type:border-none" href={`/${slug}`}>{title}</Link>)}
                </div>}
            </div>
        </div>
    )
}

export default SearchInput