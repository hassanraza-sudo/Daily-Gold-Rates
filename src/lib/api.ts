import { client } from "./sanity";

export interface Post {
  title: string;
  slug: { current: string };
  image?: any;
  publishedAt?: string;
  content?: any[];
}

export const getPosts = async (): Promise<Post[]> => {
  const query = `*[_type == "post"]{
    title,
    slug,
    image,
    publishedAt,
    content
  }`;
  return await client.fetch(query);
};
