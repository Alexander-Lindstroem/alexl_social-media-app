import Link from "next/link"

type PostPreviewProps = {
    title: string,
    author: string,
    link: string
}

const PostPreview = ({title, author, link}:PostPreviewProps) => {
    return (
        <Link href={`/${link}`}>
            <div className="border-solid border-black border-1 rounded-md p-4">
                <div className="text-xl font-bold">{title}</div>
                <div className="text-lg text-right">submitted by {author}</div>
            </div>
        </Link>
    )
}

export default PostPreview