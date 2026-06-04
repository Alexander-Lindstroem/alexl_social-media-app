import HomeCategories from "@/components/HomeCategories";
import HomePosts from "@/components/HomePosts";

export const revalidate = 600;

export default async function Home() {

  return (  
    <section className="flex flex-col justify-between md:flex-row w-full gap-4">
      <HomePosts/>
      <HomeCategories/>
    </section>
  );
}
