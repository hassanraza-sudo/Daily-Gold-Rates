import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BookOpen, ArrowRight, Calendar } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { format } from 'date-fns';
export function BlogPreview() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const { data, error } = await supabase
                    .from('blog_posts')
                    .select('*')
                    .eq('published', true)
                    .order('created_at', { ascending: false })
                    .limit(3);
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
    if (loading) {
        return (_jsx("section", { className: "container mx-auto px-4 py-20", children: _jsx("div", { className: "text-center", children: "Loading blog posts..." }) }));
    }
    return (_jsxs(motion.section, { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, transition: { duration: 0.6 }, viewport: { once: true }, className: "container mx-auto px-4 py-20 bg-muted/30", children: [_jsxs("div", { className: "text-center mb-12", children: [_jsxs("div", { className: "inline-flex items-center space-x-2 bg-yellow-100 dark:bg-yellow-900/30 px-4 py-2 rounded-full mb-4", children: [_jsx(BookOpen, { className: "h-5 w-5 text-yellow-700 dark:text-yellow-400" }), _jsx("span", { className: "text-sm font-medium text-yellow-800 dark:text-yellow-300", children: "Latest Insights" })] }), _jsx("h2", { className: "text-4xl font-bold mb-4", children: "Gold Market News" }), _jsx("p", { className: "text-muted-foreground max-w-2xl mx-auto", children: "Stay informed with the latest trends and insights in the gold market" })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto", children: posts.map((post, index) => (_jsx(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay: index * 0.1 }, viewport: { once: true }, children: _jsxs(Card, { className: "h-full hover:shadow-xl transition-shadow overflow-hidden group", children: [_jsx("div", { className: "aspect-video overflow-hidden", children: _jsx("img", { src: post.image_url || 'https://images.pexels.com/photos/8370752/pexels-photo-8370752.jpeg', alt: post.title, className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" }) }), _jsxs(CardHeader, { children: [_jsxs("div", { className: "flex items-center space-x-2 text-xs text-muted-foreground mb-2", children: [_jsx(Calendar, { className: "h-3 w-3" }), _jsx("span", { children: format(new Date(post.created_at), 'MMM dd, yyyy') })] }), _jsx(CardTitle, { className: "line-clamp-2 group-hover:text-yellow-600 transition-colors", children: post.title }), _jsx(CardDescription, { className: "line-clamp-3", children: post.excerpt })] }), _jsx(CardContent, { children: _jsx(Link, { to: `/blog/${post.slug}`, children: _jsxs(Button, { variant: "ghost", className: "group/btn", children: ["Read More", _jsx(ArrowRight, { className: "ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" })] }) }) })] }) }, post.id))) }), _jsx("div", { className: "text-center mt-12", children: _jsx(Link, { to: "/blog", children: _jsxs(Button, { size: "lg", className: "bg-yellow-600 hover:bg-yellow-700", children: ["View All Articles", _jsx(ArrowRight, { className: "ml-2 h-5 w-5" })] }) }) })] }));
}
