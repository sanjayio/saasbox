import Link from "next/link";
import { sanityFetch } from "@/sanity/lib/live";
import { POSTS_QUERY } from "@/sanity/lib/queries";
import { Background } from "@/components/landing/background";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/landing/ui/card";
import { Categories } from "@/sanity/categories";
import { PublishedAt } from "@/sanity/published_at";
import { POSTS_QUERY_RESULT } from "@/sanity/types";

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
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {posts.map((post) => (
              <Link
                key={post._id}
                href={`/docs/${post?.slug?.current}`}
                className="group"
              >
                <Card className="h-full transition-all hover:shadow-md hover:border-primary/50">
                  <CardHeader>
                    <CardTitle className="group-hover:text-primary transition-colors">
                      {post?.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-4">
                    {post.categories && post.categories.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        <Categories
                          categories={
                            post.categories as POSTS_QUERY_RESULT[0]["categories"]
                          }
                        />
                      </div>
                    )}
                  </CardContent>
                  <CardFooter>
                    {post.publishedAt && (
                      <PublishedAt publishedAt={post.publishedAt} />
                    )}
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Background>
  );
}
