import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase, GoldRate } from '@/lib/supabase';

interface GoldRateContextType {
  currentRate: GoldRate | null;
  loading: boolean;
  refreshRates: () => Promise<void>;
}

const GoldRateContext = createContext<GoldRateContextType | undefined>(undefined);

export function GoldRateProvider({ children }: { children: ReactNode }) {
  const [currentRate, setCurrentRate] = useState<GoldRate | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchCurrentRate = async () => {
    try {
      const { data, error } = await supabase
        .from('gold_rates')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) throw error;
      setCurrentRate(data);
    } catch (error) {
      console.error('Error fetching gold rates:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentRate();
  }, []);

  const refreshRates = async () => {
    await fetchCurrentRate();
  };

  return (
    <GoldRateContext.Provider value={{ currentRate, loading, refreshRates }}>
      {children}
    </GoldRateContext.Provider>
  );
}

export function useGoldRate() {
  const context = useContext(GoldRateContext);
  if (context === undefined) {
    throw new Error('useGoldRate must be used within a GoldRateProvider');
  }
  return context;
}
