import { PortableText } from "next-sanity";
import Image from "next/image";

import { Author } from "@/sanity/author";
import { Categories } from "@/sanity/categories";
import { components } from "@/sanity/portableTextComponents";
import { POST_QUERY_RESULT } from "@/sanity/types";
import { PublishedAt } from "@/sanity/published_at";
import { Title } from "@/sanity/title";
import { urlFor } from "@/sanity/lib/image";

export function Post(props: NonNullable<POST_QUERY_RESULT>) {
  const { title, author, mainImage, body, publishedAt, categories } = props;

  return (
    <article className="grid lg:grid-cols-12 gap-y-12 mt-12 md:mt-36">
      <header className="lg:col-span-12 flex flex-col gap-4 items-start">
        <div className="flex gap-4 items-center">
          <Categories categories={categories} />
          <PublishedAt publishedAt={publishedAt} />
        </div>
        <Title>{title}</Title>
        <Author author={author} />
      </header>
      {mainImage ? (
        <figure className="lg:col-span-4 flex flex-col gap-2 items-start">
          <Image
            src={urlFor(mainImage).width(400).height(400).url()}
            width={400}
            height={400}
            alt=""
          />
        </figure>
      ) : null}
      {body ? (
        <div className="lg:col-span-7 lg:col-start-6 prose lg:prose-lg dark:prose-invert">
          <PortableText value={body} components={components} />
        </div>
      ) : null}
    </article>
  );
}
