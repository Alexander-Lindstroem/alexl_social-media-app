import Link from "next/link"

const Logo = ({className}:{className?:string}) => {
    return (
        <Link href="/" className={className}>RipoffIt</Link>
    )
}

export default Logo