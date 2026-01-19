import Link from "next/link"

type PostPreviewProps = {
    title: string,
    author: string,
    link: string,
    category?: string
}

const PostPreview = ({title, author, link, category}:PostPreviewProps) => {
    return (
        <Link href={`/${link}`}>
            <div className="border-solid border-black border-1 rounded-md p-4">
                <div className="text-xl font-bold">{title}</div>
                <div className="text-lg text-right">submitted by {author}{category && ` in ${category}`}</div>
            </div>
        </Link>
    )
}

export default PostPreview