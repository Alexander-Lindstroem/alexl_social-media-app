import Link from "next/link";

const EditButton = async ({ slug }: { slug: string }) => {
  return (
    <Link
      href={`${slug}/edit`}
      className="bg-gradient-to-b from-red-500 to-rose-500 text-white py-1.5 
      px-3 font-semibold rounded-2xl text-lg cursor-pointer"
    >
      Edit post
    </Link>
  );
};

export default EditButton;
