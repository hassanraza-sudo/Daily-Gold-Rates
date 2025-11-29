import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { getPosts } from "../lib/api";
import { urlFor } from "../lib/sanity";
import { Link } from "react-router-dom";
const Blog = () => {
    const [posts, setPosts] = useState([]);
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
        return _jsx("div", { className: "text-center py-8", children: "Loading posts..." });
    }
    return (_jsxs("div", { className: "container mx-auto px-4 py-8", children: [_jsx("h1", { className: "text-4xl font-bold mb-8 text-center", children: "Daily Gold Rate Blog" }), _jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-8", children: posts.map((post) => (_jsxs("div", { className: "border rounded-lg overflow-hidden shadow-lg", children: [post.image && (_jsx("img", { src: urlFor(post.image).width(300).height(200).url(), alt: post.title, className: "w-72 h-48 object-cover mx-auto rounded-lg" })), _jsxs("div", { className: "p-4", children: [_jsx("h2", { className: "text-xl font-semibold mb-2", children: post.title }), _jsxs("p", { className: "text-gray-500 text-sm mb-2", children: ["Published on", " ", post.publishedAt
                                            ? new Date(post.publishedAt).toLocaleDateString()
                                            : "Not available"] }), _jsx(Link, { to: `/blog/${post.slug.current}`, className: "text-blue-600 hover:underline", children: "Read More" })] })] }, post.slug.current))) })] }));
};
export default Blog;
