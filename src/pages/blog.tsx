import React, { useEffect, useState } from "react";
import { getPosts, Post } from "../lib/api";
import { urlFor } from "../lib/sanity";
import { Link } from "react-router-dom";

const Blog: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const data = await getPosts();
      console.log("Posts fetched:", data);
      setPosts(data);
      setLoading(false);
    };
    fetchPosts();
  }, []);

  if (loading) {
    return <div className="text-center py-8">Loading posts...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Daily Gold Rate Blog
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <div
            key={post.slug.current}
            className="border rounded-lg overflow-hidden shadow-lg"
          >
            {/* FIXED: use post.image */}
            {post.image && (
              <img
                src={urlFor(post.image).width(300).height(200).url()} // Sanity image builder
                alt={post.title}
                className="w-72 h-48 object-cover mx-auto rounded-lg"
              />
            )}

            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{post.title}</h2>

              {/* FIX: publishedAt may be null */}
              <p className="text-gray-500 text-sm mb-2">
                Published on{" "}
                {post.publishedAt
                  ? new Date(post.publishedAt).toLocaleDateString()
                  : "Not available"}
              </p>

              <Link
                to={`/blog/${post.slug.current}`}
                className="text-blue-600 hover:underline"
              >
                Read More
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
