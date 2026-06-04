import Link from "next/link"

const SeeMore = ({linkTo}:{linkTo:string}) => {
    return (
        <Link 
            href={linkTo}
            className="bg-gradient-to-b from-gray-700 to-stone-700 text-white py-2 px-4 
            rounded-2xl text-lg md:text-xl cursor-pointer shadow-md"
        >
            <h3 className="font-semibold">See more...</h3>
        </Link>
    )
}

export default SeeMore