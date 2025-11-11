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

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      loginData.email === 'admin@dailygoldrate.com' &&
      loginData.password === 'admin123'
    ) {
      setIsAuthenticated(true);
      toast({
        title: 'Login successful',
        description: 'Welcome to the admin dashboard',
      });
    } else {
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

  const handleSaveRates = async (e: React.FormEvent) => {
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

      if (error) throw error;

      await refreshRates();

      toast({
        title: 'Rates updated successfully!',
        description: 'The new rates are now live on the website.',
      });
    } catch (error) {
      console.error('Error updating rates:', error);
      toast({
        title: 'Update failed',
        description: 'There was an error updating the rates. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-gray-900 dark:to-gray-800 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <Card className="shadow-xl">
            <CardHeader className="text-center">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 mx-auto mb-4">
                <Lock className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl">Admin Login</CardTitle>
              <CardDescription>
                Enter your credentials to access the admin dashboard
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={loginData.email}
                    onChange={(e) =>
                      setLoginData({ ...loginData, email: e.target.value })
                    }
                    placeholder="admin@dailygoldrate.com"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={loginData.password}
                    onChange={(e) =>
                      setLoginData({ ...loginData, password: e.target.value })
                    }
                    placeholder="••••••••"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-yellow-600 hover:bg-yellow-700"
                  size="lg"
                >
                  Login
                </Button>
              </form>

              <div className="mt-4 p-3 bg-muted rounded-lg text-sm text-muted-foreground">
                <p className="font-semibold mb-1">Demo Credentials:</p>
                <p>Email: admin@dailygoldrate.com</p>
                <p>Password: admin123</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-yellow-600 to-yellow-800 bg-clip-text text-transparent">
                Admin Dashboard
              </h1>
              <p className="text-muted-foreground">
                Update gold and silver rates for the website
              </p>
            </div>
            <Button
              variant="outline"
              onClick={handleLogout}
              className="flex items-center space-x-2"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Edit className="h-5 w-5" />
                    <span>Update Gold & Silver Rates</span>
                  </CardTitle>
                  <CardDescription>
                    Enter the new rates per gram. Changes will be reflected immediately on the website.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSaveRates} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="gold_24k">24K Gold Rate (₹/gram)</Label>
                        <Input
                          id="gold_24k"
                          type="number"
                          step="0.01"
                          value={rateData.gold_24k}
                          onChange={(e) =>
                            setRateData({ ...rateData, gold_24k: e.target.value })
                          }
                          placeholder="7200"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="gold_22k">22K Gold Rate (₹/gram)</Label>
                        <Input
                          id="gold_22k"
                          type="number"
                          step="0.01"
                          value={rateData.gold_22k}
                          onChange={(e) =>
                            setRateData({ ...rateData, gold_22k: e.target.value })
                          }
                          placeholder="6600"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="gold_18k">18K Gold Rate (₹/gram)</Label>
                        <Input
                          id="gold_18k"
                          type="number"
                          step="0.01"
                          value={rateData.gold_18k}
                          onChange={(e) =>
                            setRateData({ ...rateData, gold_18k: e.target.value })
                          }
                          placeholder="5400"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="silver">Silver Rate (₹/gram)</Label>
                        <Input
                          id="silver"
                          type="number"
                          step="0.01"
                          value={rateData.silver}
                          onChange={(e) =>
                            setRateData({ ...rateData, silver: e.target.value })
                          }
                          placeholder="85"
                          required
                        />
                      </div>
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-yellow-600 hover:bg-yellow-700"
                      disabled={saving}
                    >
                      {saving ? (
                        'Saving...'
                      ) : (
                        <>
                          <Save className="mr-2 h-5 w-5" />
                          Save & Publish Rates
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>Current Rates</CardTitle>
                  <CardDescription>Rates currently displayed on the website</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                    <span className="font-medium">24K Gold</span>
                    <span className="text-yellow-600 font-bold">
                      ₹{currentRate?.gold_24k.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                    <span className="font-medium">22K Gold</span>
                    <span className="text-yellow-600 font-bold">
                      ₹{currentRate?.gold_22k.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                    <span className="font-medium">18K Gold</span>
                    <span className="text-yellow-600 font-bold">
                      ₹{currentRate?.gold_18k.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                    <span className="font-medium">Silver</span>
                    <span className="text-yellow-600 font-bold">
                      ₹{currentRate?.silver.toLocaleString()}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
