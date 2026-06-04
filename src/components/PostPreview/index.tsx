import Link from "next/link"

type PostPreviewProps = {
    title: string,
    author: string,
    link: string,
    category?: string
}

const PostPreview = ({title, author, link, category}:PostPreviewProps) => {
    return (
        <Link className="w-full max-w-[640px]" href={`/${link}`}>
            <div className="border-solid border-rose-500 border-3 rounded-md shadow-md pb-4">
                {category && <div className="capitalize text-white font-bold py-1 bg-gradient-to-b to-red-500 from-rose-500 text-center">{category}</div>}
                <div className="text-lg font-bold capitalize px-4">{title}</div>
                <div className="text-sm text-right px-4">Submitted by <span className="font-semibold">{author}</span></div>
            </div>
        </Link>
    )
}

export default PostPreview