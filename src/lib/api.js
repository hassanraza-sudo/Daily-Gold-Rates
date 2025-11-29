import { client } from "./sanity";
export const getPosts = async () => {
    const query = `*[_type == "post"]{
    title,
    slug,
    image,
    publishedAt,
    content
  }`;
    return await client.fetch(query);
};
