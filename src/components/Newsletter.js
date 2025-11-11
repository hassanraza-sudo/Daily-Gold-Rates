import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
export function Newsletter() {
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);
    const { toast } = useToast();
    const handleSubscribe = (e) => {
        e.preventDefault();
        if (!email) {
            toast({
                title: 'Email required',
                description: 'Please enter your email address',
                variant: 'destructive',
            });
            return;
        }
        setSubscribed(true);
        setEmail('');
        toast({
            title: 'Successfully subscribed!',
            description: 'You will receive daily gold rate updates in your inbox.',
        });
        setTimeout(() => setSubscribed(false), 3000);
    };
    return (_jsx(motion.section, { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, transition: { duration: 0.6 }, viewport: { once: true }, className: "container mx-auto px-4 py-20", children: _jsx("div", { className: "max-w-3xl mx-auto", children: _jsxs("div", { className: "bg-gradient-to-br from-yellow-500 to-yellow-700 rounded-2xl p-12 text-white shadow-2xl", children: [_jsxs("div", { className: "text-center mb-8", children: [_jsx("div", { className: "inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 mb-4", children: _jsx(Mail, { className: "h-8 w-8" }) }), _jsx("h2", { className: "text-3xl md:text-4xl font-bold mb-4", children: "Subscribe for Daily Updates" }), _jsx("p", { className: "text-yellow-100 text-lg", children: "Get the latest gold and silver rates delivered to your inbox every morning" })] }), _jsxs("form", { onSubmit: handleSubscribe, className: "flex flex-col md:flex-row gap-4", children: [_jsx(Input, { type: "email", placeholder: "Enter your email address", value: email, onChange: (e) => setEmail(e.target.value), className: "flex-1 bg-white text-gray-900 border-0 h-12", disabled: subscribed }), _jsx(Button, { type: "submit", size: "lg", className: "bg-white text-yellow-700 hover:bg-yellow-50 h-12 px-8", disabled: subscribed, children: subscribed ? (_jsxs(_Fragment, { children: [_jsx(Check, { className: "mr-2 h-5 w-5" }), "Subscribed"] })) : ('Subscribe Now') })] }), _jsx("p", { className: "text-center text-yellow-100 text-sm mt-6", children: "Join over 10,000+ subscribers. Unsubscribe anytime." })] }) }) }));
}
