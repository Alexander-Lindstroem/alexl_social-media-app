import Link from "next/link"

const EditButton = async ({slug}:{slug: string}) => {

    return (
        <Link href={`${slug}/edit`} className="button-secondary">Edit post</Link>
    )
}

export default EditButton