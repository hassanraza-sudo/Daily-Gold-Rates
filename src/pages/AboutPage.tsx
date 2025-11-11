import { motion } from 'framer-motion';
import { Target, Users, TrendingUp, Shield } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function AboutPage() {
  const features = [
    {
      icon: Target,
      title: 'Our Mission',
      description: 'To provide accurate, timely, and reliable gold and silver price information to help individuals make informed investment decisions.',
    },
    {
      icon: Users,
      title: 'Expert Team',
      description: 'Our team of market analysts continuously monitors gold markets worldwide to bring you the most current pricing information.',
    },
    {
      icon: TrendingUp,
      title: 'Market Analysis',
      description: 'We go beyond just numbers, providing insights into market trends and factors affecting precious metal prices.',
    },
    {
      icon: Shield,
      title: 'Trusted Source',
      description: 'Thousands of investors, jewelers, and gold enthusiasts rely on DailyGoldRate for their daily pricing needs.',
    },
  ];

  return (
    <div className="min-h-screen">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-gray-900 dark:to-gray-800 py-20"
      >
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-yellow-600 to-yellow-800 bg-clip-text text-transparent">
            About DailyGoldRate
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Your trusted companion in the world of precious metals
          </p>
        </div>
      </motion.section>

      <section className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl font-bold mb-6 text-center">Who We Are</h2>
          <div className="prose prose-lg dark:prose-invert mx-auto">
            <p className="text-muted-foreground leading-relaxed mb-4">
              DailyGoldRate is a dedicated platform providing accurate and up-to-date information
              on gold and silver prices. Founded with the vision of making precious metal price
              information accessible to everyone, we serve thousands of users daily including
              investors, jewelers, and gold enthusiasts.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Our team of market experts manually curates and verifies all pricing data to ensure
              accuracy and reliability. We understand that in the precious metals market, timing
              and accuracy are everything, which is why we're committed to providing the most
              current information available.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Beyond just providing numbers, we believe in educating our users about the gold
              market. Through our blog and resources, we share insights on market trends,
              investment strategies, and factors affecting gold prices.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-yellow-100 dark:bg-yellow-900/30">
                      <feature.icon className="h-6 w-6 text-yellow-600" />
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-yellow-500 to-yellow-700 rounded-2xl p-12 text-white text-center"
        >
          <h2 className="text-3xl font-bold mb-4">Our Commitment</h2>
          <p className="text-yellow-100 text-lg max-w-2xl mx-auto">
            We are committed to maintaining the highest standards of accuracy and reliability in
            all our pricing information. Our data is carefully verified by experts who understand
            the nuances of the precious metals market.
          </p>
        </motion.div>
      </section>
    </div>
  );
}
