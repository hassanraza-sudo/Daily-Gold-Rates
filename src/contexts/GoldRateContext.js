import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
const GoldRateContext = createContext(undefined);
export function GoldRateProvider({ children }) {
    const [currentRate, setCurrentRate] = useState(null);
    const [loading, setLoading] = useState(true);
    const fetchCurrentRate = async () => {
        try {
            const { data, error } = await supabase
                .from('gold_rates')
                .select('*')
                .order('created_at', { ascending: false })
                .limit(1)
                .maybeSingle();
            if (error)
                throw error;
            setCurrentRate(data);
        }
        catch (error) {
            console.error('Error fetching gold rates:', error);
        }
        finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchCurrentRate();
    }, []);
    const refreshRates = async () => {
        await fetchCurrentRate();
    };
    return (_jsx(GoldRateContext.Provider, { value: { currentRate, loading, refreshRates }, children: children }));
}
export function useGoldRate() {
    const context = useContext(GoldRateContext);
    if (context === undefined) {
        throw new Error('useGoldRate must be used within a GoldRateProvider');
    }
    return context;
}
