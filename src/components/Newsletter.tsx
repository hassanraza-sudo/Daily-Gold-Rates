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

  const handleSubscribe = (e: React.FormEvent) => {
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

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="container mx-auto px-4 py-20"
    >
      <div className="max-w-3xl mx-auto">
        <div className="bg-gradient-to-br from-yellow-500 to-yellow-700 rounded-2xl p-12 text-white shadow-2xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 mb-4">
              <Mail className="h-8 w-8" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Subscribe for Daily Updates
            </h2>
            <p className="text-yellow-100 text-lg">
              Get the latest gold and silver rates delivered to your inbox every morning
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="flex flex-col md:flex-row gap-4">
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-white text-gray-900 border-0 h-12"
              disabled={subscribed}
            />
            <Button
              type="submit"
              size="lg"
              className="bg-white text-yellow-700 hover:bg-yellow-50 h-12 px-8"
              disabled={subscribed}
            >
              {subscribed ? (
                <>
                  <Check className="mr-2 h-5 w-5" />
                  Subscribed
                </>
              ) : (
                'Subscribe Now'
              )}
            </Button>
          </form>

          <p className="text-center text-yellow-100 text-sm mt-6">
            Join over 10,000+ subscribers. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </motion.section>
  );
}
