import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Edit, Save, Lock, LogOut } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';
import { useGoldRate } from '@/contexts/GoldRateContext';
export function AdminPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loginData, setLoginData] = useState({ email: '', password: '' });
    const [rateData, setRateData] = useState({
        gold_24k: '',
        gold_22k: '',
        gold_18k: '',
        silver: '',
    });
    const [saving, setSaving] = useState(false);
    const { toast } = useToast();
    const { currentRate, refreshRates } = useGoldRate();
    useEffect(() => {
        if (currentRate && isAuthenticated) {
            setRateData({
                gold_24k: currentRate.gold_24k.toString(),
                gold_22k: currentRate.gold_22k.toString(),
                gold_18k: currentRate.gold_18k.toString(),
                silver: currentRate.silver.toString(),
            });
        }
    }, [currentRate, isAuthenticated]);
    const handleLogin = (e) => {
        e.preventDefault();
        if (loginData.email === 'admin@dailygoldrate.com' &&
            loginData.password === 'admin123') {
            setIsAuthenticated(true);
            toast({
                title: 'Login successful',
                description: 'Welcome to the admin dashboard',
            });
        }
        else {
            toast({
                title: 'Login failed',
                description: 'Invalid email or password',
                variant: 'destructive',
            });
        }
    };
    const handleLogout = () => {
        setIsAuthenticated(false);
        setLoginData({ email: '', password: '' });
        toast({
            title: 'Logged out',
            description: 'You have been logged out successfully',
        });
    };
    const handleSaveRates = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            const { error } = await supabase.from('gold_rates').insert({
                gold_24k: parseFloat(rateData.gold_24k),
                gold_22k: parseFloat(rateData.gold_22k),
                gold_18k: parseFloat(rateData.gold_18k),
                silver: parseFloat(rateData.silver),
                is_current: true,
            });
            if (error)
                throw error;
            await refreshRates();
            toast({
                title: 'Rates updated successfully!',
                description: 'The new rates are now live on the website.',
            });
        }
        catch (error) {
            console.error('Error updating rates:', error);
            toast({
                title: 'Update failed',
                description: 'There was an error updating the rates. Please try again.',
                variant: 'destructive',
            });
        }
        finally {
            setSaving(false);
        }
    };
    if (!isAuthenticated) {
        return (_jsx("div", { className: "min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-gray-900 dark:to-gray-800 px-4", children: _jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6 }, className: "w-full max-w-md", children: _jsxs(Card, { className: "shadow-xl", children: [_jsxs(CardHeader, { className: "text-center", children: [_jsx("div", { className: "flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 mx-auto mb-4", children: _jsx(Lock, { className: "h-8 w-8 text-white" }) }), _jsx(CardTitle, { className: "text-2xl", children: "Admin Login" }), _jsx(CardDescription, { children: "Enter your credentials to access the admin dashboard" })] }), _jsxs(CardContent, { children: [_jsxs("form", { onSubmit: handleLogin, className: "space-y-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "email", children: "Email" }), _jsx(Input, { id: "email", type: "email", value: loginData.email, onChange: (e) => setLoginData({ ...loginData, email: e.target.value }), placeholder: "admin@dailygoldrate.com", required: true })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "password", children: "Password" }), _jsx(Input, { id: "password", type: "password", value: loginData.password, onChange: (e) => setLoginData({ ...loginData, password: e.target.value }), placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", required: true })] }), _jsx(Button, { type: "submit", className: "w-full bg-yellow-600 hover:bg-yellow-700", size: "lg", children: "Login" })] }), _jsxs("div", { className: "mt-4 p-3 bg-muted rounded-lg text-sm text-muted-foreground", children: [_jsx("p", { className: "font-semibold mb-1", children: "Demo Credentials:" }), _jsx("p", { children: "Email: admin@dailygoldrate.com" }), _jsx("p", { children: "Password: admin123" })] })] })] }) }) }));
    }
    return (_jsx("div", { className: "min-h-screen bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-gray-900 dark:to-gray-800", children: _jsx("div", { className: "container mx-auto px-4 py-12", children: _jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6 }, children: [_jsxs("div", { className: "flex items-center justify-between mb-8", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-4xl font-bold mb-2 bg-gradient-to-r from-yellow-600 to-yellow-800 bg-clip-text text-transparent", children: "Admin Dashboard" }), _jsx("p", { className: "text-muted-foreground", children: "Update gold and silver rates for the website" })] }), _jsxs(Button, { variant: "outline", onClick: handleLogout, className: "flex items-center space-x-2", children: [_jsx(LogOut, { className: "h-4 w-4" }), _jsx("span", { children: "Logout" })] })] }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8", children: [_jsx("div", { className: "lg:col-span-2", children: _jsxs(Card, { className: "shadow-lg", children: [_jsxs(CardHeader, { children: [_jsxs(CardTitle, { className: "flex items-center space-x-2", children: [_jsx(Edit, { className: "h-5 w-5" }), _jsx("span", { children: "Update Gold & Silver Rates" })] }), _jsx(CardDescription, { children: "Enter the new rates per gram. Changes will be reflected immediately on the website." })] }), _jsx(CardContent, { children: _jsxs("form", { onSubmit: handleSaveRates, className: "space-y-6", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "gold_24k", children: "24K Gold Rate (\u20B9/gram)" }), _jsx(Input, { id: "gold_24k", type: "number", step: "0.01", value: rateData.gold_24k, onChange: (e) => setRateData({ ...rateData, gold_24k: e.target.value }), placeholder: "7200", required: true })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "gold_22k", children: "22K Gold Rate (\u20B9/gram)" }), _jsx(Input, { id: "gold_22k", type: "number", step: "0.01", value: rateData.gold_22k, onChange: (e) => setRateData({ ...rateData, gold_22k: e.target.value }), placeholder: "6600", required: true })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "gold_18k", children: "18K Gold Rate (\u20B9/gram)" }), _jsx(Input, { id: "gold_18k", type: "number", step: "0.01", value: rateData.gold_18k, onChange: (e) => setRateData({ ...rateData, gold_18k: e.target.value }), placeholder: "5400", required: true })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "silver", children: "Silver Rate (\u20B9/gram)" }), _jsx(Input, { id: "silver", type: "number", step: "0.01", value: rateData.silver, onChange: (e) => setRateData({ ...rateData, silver: e.target.value }), placeholder: "85", required: true })] })] }), _jsx(Button, { type: "submit", size: "lg", className: "w-full bg-yellow-600 hover:bg-yellow-700", disabled: saving, children: saving ? ('Saving...') : (_jsxs(_Fragment, { children: [_jsx(Save, { className: "mr-2 h-5 w-5" }), "Save & Publish Rates"] })) })] }) })] }) }), _jsx("div", { children: _jsxs(Card, { className: "shadow-lg", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Current Rates" }), _jsx(CardDescription, { children: "Rates currently displayed on the website" })] }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "flex justify-between items-center p-3 bg-muted rounded-lg", children: [_jsx("span", { className: "font-medium", children: "24K Gold" }), _jsxs("span", { className: "text-yellow-600 font-bold", children: ["\u20B9", currentRate?.gold_24k.toLocaleString()] })] }), _jsxs("div", { className: "flex justify-between items-center p-3 bg-muted rounded-lg", children: [_jsx("span", { className: "font-medium", children: "22K Gold" }), _jsxs("span", { className: "text-yellow-600 font-bold", children: ["\u20B9", currentRate?.gold_22k.toLocaleString()] })] }), _jsxs("div", { className: "flex justify-between items-center p-3 bg-muted rounded-lg", children: [_jsx("span", { className: "font-medium", children: "18K Gold" }), _jsxs("span", { className: "text-yellow-600 font-bold", children: ["\u20B9", currentRate?.gold_18k.toLocaleString()] })] }), _jsxs("div", { className: "flex justify-between items-center p-3 bg-muted rounded-lg", children: [_jsx("span", { className: "font-medium", children: "Silver" }), _jsxs("span", { className: "text-yellow-600 font-bold", children: ["\u20B9", currentRate?.silver.toLocaleString()] })] })] })] }) })] })] }) }) }));
}
