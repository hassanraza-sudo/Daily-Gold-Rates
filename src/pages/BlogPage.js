import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
export function BlogPage() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const { data, error } = await supabase
                    .from('blog_posts')
                    .select('*')
                    .eq('published', true)
                    .order('created_at', { ascending: false });
                if (error)
                    throw error;
                setPosts(data || []);
            }
            catch (error) {
                console.error('Error fetching blog posts:', error);
            }
            finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);
    return (_jsxs("div", { className: "min-h-screen", children: [_jsx(motion.section, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6 }, className: "bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-gray-900 dark:to-gray-800 py-20", children: _jsxs("div", { className: "container mx-auto px-4 text-center", children: [_jsx("h1", { className: "text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-yellow-600 to-yellow-800 bg-clip-text text-transparent", children: "Gold Market Insights" }), _jsx("p", { className: "text-lg text-muted-foreground max-w-2xl mx-auto", children: "Expert analysis, market trends, and investment strategies for gold enthusiasts" })] }) }), _jsx("section", { className: "container mx-auto px-4 py-16", children: loading ? (_jsx("div", { className: "text-center py-20", children: _jsx("div", { className: "animate-pulse", children: "Loading articles..." }) })) : (_jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8", children: posts.map((post, index) => (_jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay: index * 0.1 }, children: _jsxs(Card, { className: "h-full hover:shadow-xl transition-shadow overflow-hidden group", children: [_jsx("div", { className: "aspect-video overflow-hidden", children: _jsx("img", { src: post.image_url || 'https://images.pexels.com/photos/8370752/pexels-photo-8370752.jpeg', alt: post.title, className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" }) }), _jsxs(CardHeader, { children: [_jsxs("div", { className: "flex items-center space-x-2 text-xs text-muted-foreground mb-2", children: [_jsx(Calendar, { className: "h-3 w-3" }), _jsx("span", { children: format(new Date(post.created_at), 'MMM dd, yyyy') })] }), _jsx(CardTitle, { className: "line-clamp-2 group-hover:text-yellow-600 transition-colors", children: post.title }), _jsx(CardDescription, { className: "line-clamp-3", children: post.excerpt })] }), _jsx(CardContent, { children: _jsx(Link, { to: `/blog/${post.slug}`, children: _jsxs(Button, { variant: "ghost", className: "group/btn", children: ["Read More", _jsx(ArrowRight, { className: "ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" })] }) }) })] }) }, post.id))) })) })] }));
}
