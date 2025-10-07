-- SQL DDL minimo (Postgres)
CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT,
  stripe_customer_id TEXT,
  role TEXT DEFAULT 'visitor',
  created_at TIMESTAMPTZ DEFAULT now()
);
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  plan TEXT,
  status TEXT,
  current_period_end TIMESTAMPTZ
);
CREATE TABLE properties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  title TEXT,
  description TEXT,
  price NUMERIC(10,2),
  city TEXT,
  sqm INT,
  rooms INT,
  lat DOUBLE PRECISION,
  lon DOUBLE PRECISION,
  images JSONB DEFAULT '[]',
  status TEXT DEFAULT 'draft',
  created_at TIMESTAMPTZ DEFAULT now()
);
CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  property_id UUID,
  type TEXT,
  amount NUMERIC(10,2),
  stripe_payment_id TEXT,
  status TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);
CREATE INDEX idx_properties_city_price ON properties (city, price);
CREATE INDEX idx_properties_ft ON properties USING gin(to_tsvector('italian', coalesce(title,'') || ' ' || coalesce(description,'')));

