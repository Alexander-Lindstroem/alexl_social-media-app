import { useEffect, useState } from "react"

export const useDebouncer = <Type>(value:Type, delay:number = 300):Type => {
    const [debouncedValue, setDebouncedValue] = useState<Type>(value)

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value)
        }, delay)

        return () => clearTimeout(timer)
    },[value, delay])

    return debouncedValue
}