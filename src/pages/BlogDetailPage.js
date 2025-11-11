import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, ArrowLeft, Clock } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
export function BlogDetailPage() {
    const { slug } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchPost = async () => {
            if (!slug)
                return;
            try {
                const { data, error } = await supabase
                    .from('blog_posts')
                    .select('*')
                    .eq('slug', slug)
                    .eq('published', true)
                    .maybeSingle();
                if (error)
                    throw error;
                setPost(data);
            }
            catch (error) {
                console.error('Error fetching blog post:', error);
            }
            finally {
                setLoading(false);
            }
        };
        fetchPost();
    }, [slug]);
    if (loading) {
        return (_jsx("div", { className: "min-h-screen flex items-center justify-center", children: _jsx("div", { className: "animate-pulse", children: "Loading article..." }) }));
    }
    if (!post) {
        return (_jsx("div", { className: "min-h-screen flex items-center justify-center", children: _jsxs("div", { className: "text-center", children: [_jsx("h1", { className: "text-2xl font-bold mb-4", children: "Article not found" }), _jsx(Link, { to: "/blog", children: _jsx(Button, { children: "Back to Blog" }) })] }) }));
    }
    return (_jsx("div", { className: "min-h-screen", children: _jsx(motion.article, { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.6 }, className: "container mx-auto px-4 py-12", children: _jsxs("div", { className: "max-w-4xl mx-auto", children: [_jsx(Link, { to: "/blog", children: _jsxs(Button, { variant: "ghost", className: "mb-8", children: [_jsx(ArrowLeft, { className: "mr-2 h-4 w-4" }), "Back to Blog"] }) }), _jsxs(motion.div, { initial: { y: 20 }, animate: { y: 0 }, transition: { duration: 0.5, delay: 0.2 }, children: [_jsx("div", { className: "aspect-video overflow-hidden rounded-xl mb-8", children: _jsx("img", { src: post.image_url || 'https://images.pexels.com/photos/8370752/pexels-photo-8370752.jpeg', alt: post.title, className: "w-full h-full object-cover" }) }), _jsxs("div", { className: "flex items-center space-x-4 text-sm text-muted-foreground mb-6", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Calendar, { className: "h-4 w-4" }), _jsx("span", { children: format(new Date(post.created_at), 'MMMM dd, yyyy') })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Clock, { className: "h-4 w-4" }), _jsx("span", { children: "5 min read" })] })] }), _jsx("h1", { className: "text-4xl md:text-5xl font-bold mb-6 leading-tight", children: post.title }), _jsx("p", { className: "text-xl text-muted-foreground mb-8 leading-relaxed", children: post.excerpt }), _jsx("div", { className: "prose prose-lg dark:prose-invert max-w-none", children: post.content.split('\n').map((paragraph, index) => (_jsx("p", { className: "mb-4 leading-relaxed", children: paragraph }, index))) }), _jsx("div", { className: "mt-12 pt-8 border-t", children: _jsx(Link, { to: "/blog", children: _jsxs(Button, { size: "lg", className: "bg-yellow-600 hover:bg-yellow-700", children: [_jsx(ArrowLeft, { className: "mr-2 h-5 w-5" }), "Read More Articles"] }) }) })] })] }) }) }));
}
