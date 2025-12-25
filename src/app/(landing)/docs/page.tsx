import Link from "next/link";
import { sanityFetch } from "@/sanity/lib/live";
import { POSTS_QUERY } from "@/sanity/lib/queries";
import { Background } from "@/components/landing/background";

const options = { next: { revalidate: 60 } };

export default async function Page() {
  const { data: posts } = await sanityFetch({ query: POSTS_QUERY });

  return (
    <Background>
      <section className="py-28 lg:py-32 lg:pt-44">
        <div className="container max-w-4xl">
          <h1 className="text-center text-2xl font-semibold tracking-tight md:text-4xl lg:text-5xl">
            Documentation
          </h1>
          <p className="text-muted-foreground mt-4 mb-12 text-center leading-snug font-medium lg:mx-auto">
            Learn how to use SaaSBox and get the most out of it.
          </p>
          <ul className="grid grid-cols-1 divide-y divide-blue-100">
            {posts.map((post) => (
              <li key={post._id}>
                <Link
                  className="block p-4 hover:text-blue-500"
                  href={`/docs/${post?.slug?.current}`}
                >
                  {post?.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </Background>
  );
}
