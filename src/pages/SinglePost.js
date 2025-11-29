import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { client, urlFor } from "../lib/sanity";
import { PortableText } from "@portabletext/react";
const SinglePost = () => {
    const { slug } = useParams();
    const [post, setPost] = useState(null);
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
    if (loading)
        return _jsx("p", { className: "text-center py-10", children: "Loading..." });
    if (!post)
        return _jsx("p", { className: "text-center", children: "Post not found" });
    return (_jsxs("div", { className: "container mx-auto px-4 py-10", children: [_jsx("h1", { className: "text-4xl font-bold mb-6", children: post.title }), post.image && (_jsx("img", { src: urlFor(post.image).width(300).height(200).url(), alt: post.title, className: "w-72 h-48 mx-auto rounded-lg mb-6 object-cover" })), _jsxs("p", { className: "text-gray-500 text-sm mb-6", children: ["Published on", " ", post.publishedAt
                        ? new Date(post.publishedAt).toLocaleDateString()
                        : "Unknown"] }), _jsx("div", { className: "prose max-w-none", children: _jsx(PortableText, { value: post.content }) })] }));
};
export default SinglePost;
