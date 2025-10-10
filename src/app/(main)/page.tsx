import { createClient } from "@/utils/supabase/server-client";
import { getHomePosts } from "@/utils/supabase/queries";
import PostPreview from "@/components/PostPreview"; 

export const revalidate = 600;

export default async function Home() {
  const supabase = await createClient()
  const { data, error } = await getHomePosts(supabase)

  return (
    <main className="p-4">
      <section className="flex flex-col gap-4">
          <h2 className="text-4xl text-center py-2">Recent Posts</h2>
          {data && 
          data.map(({id, title, slug, users}) => (
            <PostPreview key={id} title={title} author={users.username} link={slug} />
          ))}
      </section>
    </main>
  );
}
