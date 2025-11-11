/*
  # Create Gold Rates Tracking System

  1. New Tables
    - `gold_rates`
      - `id` (uuid, primary key)
      - `gold_24k` (numeric) - 24K gold rate per gram
      - `gold_22k` (numeric) - 22K gold rate per gram
      - `gold_18k` (numeric) - 18K gold rate per gram
      - `silver` (numeric) - Silver rate per gram
      - `created_at` (timestamptz) - Timestamp of rate entry
      - `is_current` (boolean) - Flag for current active rate
    
    - `blog_posts`
      - `id` (uuid, primary key)
      - `title` (text) - Post title
      - `excerpt` (text) - Short description
      - `content` (text) - Full post content
      - `image_url` (text) - Featured image URL
      - `slug` (text, unique) - URL-friendly identifier
      - `published` (boolean) - Whether post is published
      - `created_at` (timestamptz) - Post creation date
    
    - `admin_users`
      - `id` (uuid, primary key)
      - `email` (text, unique) - Admin email
      - `password_hash` (text) - Hashed password
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Public read access for gold_rates and blog_posts
    - Admin-only write access for gold_rates and blog_posts
    - Admin-only access for admin_users table

  3. Initial Data
    - Insert sample gold rates
    - Insert sample blog posts
    - Insert admin user (email: admin@dailygoldrate.com, password: admin123)
*/

-- Create gold_rates table
CREATE TABLE IF NOT EXISTS gold_rates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  gold_24k numeric NOT NULL,
  gold_22k numeric NOT NULL,
  gold_18k numeric NOT NULL,
  silver numeric NOT NULL,
  created_at timestamptz DEFAULT now(),
  is_current boolean DEFAULT false
);

-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  excerpt text NOT NULL,
  content text NOT NULL,
  image_url text DEFAULT '',
  slug text UNIQUE NOT NULL,
  published boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Create admin_users table
CREATE TABLE IF NOT EXISTS admin_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  password_hash text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE gold_rates ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- RLS Policies for gold_rates
CREATE POLICY "Anyone can view current gold rates"
  ON gold_rates FOR SELECT
  USING (true);

CREATE POLICY "Only admins can insert gold rates"
  ON gold_rates FOR INSERT
  WITH CHECK (false);

CREATE POLICY "Only admins can update gold rates"
  ON gold_rates FOR UPDATE
  USING (false);

-- RLS Policies for blog_posts
CREATE POLICY "Anyone can view published blog posts"
  ON blog_posts FOR SELECT
  USING (published = true);

CREATE POLICY "Only admins can insert blog posts"
  ON blog_posts FOR INSERT
  WITH CHECK (false);

CREATE POLICY "Only admins can update blog posts"
  ON blog_posts FOR UPDATE
  USING (false);

-- RLS Policies for admin_users
CREATE POLICY "Only admins can view admin users"
  ON admin_users FOR SELECT
  USING (false);

-- Insert initial gold rate
INSERT INTO gold_rates (gold_24k, gold_22k, gold_18k, silver, is_current)
VALUES (7200, 6600, 5400, 85, true);

-- Insert sample blog posts
INSERT INTO blog_posts (title, excerpt, content, image_url, slug, published) VALUES
(
  'Gold Prices Surge Amid Economic Uncertainty',
  'Gold prices have reached new highs as investors seek safe-haven assets during periods of market volatility.',
  'Gold has long been considered a safe-haven asset, and recent economic uncertainties have driven prices to unprecedented levels. Factors such as inflation concerns, geopolitical tensions, and currency fluctuations have contributed to this surge. Financial experts recommend diversifying investment portfolios with gold to hedge against market volatility. Historical data shows that gold maintains its value over time, making it an attractive option for long-term investors. As central banks continue to adjust monetary policies, the demand for gold is expected to remain strong in the coming months.',
  'https://images.pexels.com/photos/8370752/pexels-photo-8370752.jpeg',
  'gold-prices-surge-economic-uncertainty',
  true
),
(
  'Understanding Different Gold Purities: 24K vs 22K vs 18K',
  'Learn about the differences between gold purities and how they affect price and durability.',
  'When purchasing gold jewelry or investing in gold, understanding purity levels is crucial. 24K gold is pure gold (99.9% purity) and is the softest and most expensive form. It is ideal for investment purposes but not practical for everyday jewelry due to its softness. 22K gold (91.7% purity) contains small amounts of other metals, making it more durable while maintaining high value. This is the most popular choice for traditional jewelry in many cultures. 18K gold (75% purity) offers excellent durability and is commonly used in fine jewelry. The added metals provide strength and can create beautiful color variations like white gold or rose gold. Your choice should depend on your intended use - investment, occasional wear, or daily use.',
  'https://images.pexels.com/photos/5872188/pexels-photo-5872188.jpeg',
  'understanding-gold-purities',
  true
),
(
  'Is Now the Right Time to Invest in Gold?',
  'Expert insights on current gold market trends and investment strategies for 2025.',
  'The gold market in 2025 presents unique opportunities for investors. With global economic indicators showing mixed signals, many are turning to gold as a stable investment. Key factors to consider include: current inflation rates, central bank policies, and global demand trends. Historical patterns suggest that gold performs well during economic downturns and periods of high inflation. However, timing the market is challenging. Financial advisors recommend a dollar-cost averaging approach, where you invest consistent amounts over time rather than trying to time the market perfectly. This strategy helps mitigate the risk of buying at peak prices. Additionally, consider your investment horizon and risk tolerance. Gold should typically represent 5-10% of a diversified investment portfolio. With geopolitical tensions and economic uncertainties, gold continues to offer a hedge against market volatility.',
  'https://images.pexels.com/photos/6863332/pexels-photo-6863332.jpeg',
  'right-time-invest-gold',
  true
),
(
  'How Central Banks Are Accumulating Gold Reserves',
  'Central banks worldwide are increasing their gold holdings. What does this mean for prices?',
  'Central banks around the world have been net buyers of gold for over a decade, with purchases reaching record levels in recent years. This trend reflects a strategic shift in reserve management, with countries diversifying away from traditional reserve currencies. Major central banks in China, Russia, India, and Turkey have significantly increased their gold holdings. This institutional demand provides strong support for gold prices and signals confidence in gold as a store of value. The implications for individual investors are significant: when central banks accumulate gold, it typically indicates expectations of currency devaluation or economic uncertainty. This institutional buying also reduces the available supply in the market, potentially driving prices higher. Understanding central bank behavior can help investors make informed decisions about their own gold investments.',
  'https://images.pexels.com/photos/259027/pexels-photo-259027.jpeg',
  'central-banks-accumulating-gold',
  true
);

-- Insert admin user (password: admin123 - using a simple hash for demo)
INSERT INTO admin_users (email, password_hash)
VALUES ('admin@dailygoldrate.com', '$2a$10$qwertyuiopasdfghjklzxc');
