import { POST_QUERY_RESULT } from "@/sanity/types";

type CategoriesProps = {
  categories: NonNullable<POST_QUERY_RESULT>["categories"];
};

export function Categories({ categories }: CategoriesProps) {
  return categories.map((category) => (
    <span
      key={category._id}
      className="bg-cyan-50 dark:bg-cyan-950/30 rounded-full px-2 py-1 leading-none whitespace-nowrap text-sm font-semibold text-cyan-700 dark:text-cyan-300"
    >
      {category.title}
    </span>
  ));
}
