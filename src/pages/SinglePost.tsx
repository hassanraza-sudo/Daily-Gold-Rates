import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { client, urlFor } from "../lib/sanity";
import { Post } from "../lib/api";
import { PortableText } from "@portabletext/react";

const SinglePost: React.FC = () => {
  const { slug } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSinglePost = async () => {
      const query = `*[_type == "post" && slug.current == $slug][0]{
        title,
        image,
        publishedAt,
        content
      }`;

      const data = await client.fetch(query, { slug });
      setPost(data);
      setLoading(false);
    };

    getSinglePost();
  }, [slug]);

  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (!post) return <p className="text-center">Post not found</p>;

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold mb-6">{post.title}</h1>

      {post.image && (
        <img
          src={urlFor(post.image).width(300).height(200).url()} // limit size from Sanity
          alt={post.title}
          className="w-72 h-48 mx-auto rounded-lg mb-6 object-cover"
        />
      )}

      <p className="text-gray-500 text-sm mb-6">
        Published on{" "}
        {post.publishedAt
          ? new Date(post.publishedAt).toLocaleDateString()
          : "Unknown"}
      </p>

      {/* Render full content using PortableText */}
      <div className="prose max-w-none">
        <PortableText value={post.content} />
      </div>
    </div>
  );
};

export default SinglePost;
