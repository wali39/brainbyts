import Hero from "./_components/hero";
import Heading from "@/components/heading";
import RecentBlogs from "./_components/recent-blogs";

export default async function HomePage() {
  return (
    <div>
      <Hero />
      <div className="text-center">
        <Heading title="Recent posts" />
      </div>
      <RecentBlogs />
    </div>
  );
}
