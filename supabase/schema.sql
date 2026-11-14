-- ==============================================================================
-- Yodha Fitness Zone — Supabase PostgreSQL Schema
-- Database: PostgreSQL 15+ (Supabase)
-- Scope: E-Commerce Storefront + Gym Memberships + Admin Operations
-- ==============================================================================

-- 1. EXTENSIONS
create extension if not exists "uuid-ossp";

-- 2. CUSTOM ENUMS
create type user_role as enum ('customer', 'staff', 'admin');
create type order_status as enum (
  'confirmed',
  'processing',
  'packaged',
  'handed_to_courier',
  'in_transit',
  'out_for_delivery',
  'delivered',
  'cancelled',
  'refunded'
);
create type payment_status as enum ('paid', 'pending', 'failed', 'refunded');
create type payment_method as enum ('upi', 'cards', 'netbanking', 'cod');
create type membership_status as enum ('active', 'expiring_soon', 'expired', 'frozen');
create type membership_tier as enum ('general', 'transformation', 'personal_training');
create type registration_source as enum ('online', 'walk_in');

-- 3. PROFILES TABLE (Extends Supabase auth.users)
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  phone text unique not null,
  email text,
  role user_role not null default 'customer',
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 4. SAVED ADDRESSES TABLE
create table if not exists public.addresses (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  tag text default 'Home',
  full_name text not null,
  phone text not null,
  address_line1 text not null,
  address_line2 text,
  city text not null,
  state text not null,
  pin_code text not null,
  is_default boolean default false,
  created_at timestamptz not null default now()
);

-- 5. MEMBERSHIP PLANS TABLE
create table if not exists public.membership_plans (
  id text primary key,
  name text not null,
  tagline text,
  duration_months integer not null default 1,
  price integer not null,
  compare_at_price integer,
  tier membership_tier not null default 'general',
  features jsonb not null default '[]'::jsonb,
  is_popular boolean default false,
  active boolean default true,
  created_at timestamptz not null default now()
);

-- 6. USER MEMBERSHIPS TABLE
create table if not exists public.user_memberships (
  id uuid primary key default uuid_generate_v4(),
  membership_number text unique not null,
  user_id uuid references public.profiles(id) on delete set null,
  user_name text not null,
  user_phone text not null,
  user_email text,
  plan_id text not null references public.membership_plans(id),
  plan_name text not null,
  start_date date not null default current_date,
  expiry_date date not null,
  status membership_status not null default 'active',
  amount_paid integer not null,
  payment_method payment_method not null default 'upi',
  payment_status payment_status not null default 'paid',
  source registration_source not null default 'online',
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 7. PRODUCTS TABLE
create table if not exists public.products (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  name text not null,
  subtitle text,
  category text not null,
  suite text default 'YFZ Core',
  description text,
  short_description text,
  images jsonb not null default '[]'::jsonb,
  is_cod_allowed boolean not null default true,
  gst_rate numeric(4, 2) not null default 18.00,
  hsn_code text default '21069099',
  fssai_lic text,
  rating numeric(2, 1) default 5.0,
  review_count integer default 0,
  status text not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 8. PRODUCT VARIANTS TABLE
create table if not exists public.product_variants (
  id uuid primary key default uuid_generate_v4(),
  product_id uuid not null references public.products(id) on delete cascade,
  flavor text default 'Unflavored',
  size text not null,
  servings integer default 30,
  price integer not null,
  compare_at_price integer,
  sku text unique not null,
  stock integer not null default 0,
  reorder_point integer not null default 15,
  batch text,
  expiry_date date,
  created_at timestamptz not null default now()
);

-- 9. ORDERS TABLE
create table if not exists public.orders (
  id uuid primary key default uuid_generate_v4(),
  order_number text unique not null, -- e.g. #YFZ-98421
  user_id uuid references public.profiles(id) on delete set null,
  customer_name text not null,
  customer_phone text not null,
  customer_email text,
  shipping_address jsonb not null,
  items jsonb not null default '[]'::jsonb,
  subtotal integer not null,
  discount integer not null default 0,
  shipping_fee integer not null default 0,
  total integer not null,
  status order_status not null default 'confirmed',
  payment_method payment_method not null,
  payment_status payment_status not null default 'pending',
  razorpay_order_id text,
  razorpay_payment_id text,
  is_cod boolean not null default false,
  cod_collected boolean default false,
  courier text default 'Shiprocket (Delhivery / Blue Dart)',
  awb text,
  shipment_status text default 'label_created',
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 10. ROW LEVEL SECURITY (RLS) POLICIES
alter table public.profiles enable row level security;
alter table public.addresses enable row level security;
alter table public.membership_plans enable row level security;
alter table public.user_memberships enable row level security;
alter table public.products enable row level security;
alter table public.product_variants enable row level security;
alter table public.orders enable row level security;

-- Public read for active products and plans
create policy "Allow public read active products"
  on public.products for select using (status = 'active');

create policy "Allow public read variants"
  on public.product_variants for select using (true);

create policy "Allow public read membership plans"
  on public.membership_plans for select using (active = true);

-- Customer access to their own profile, addresses, memberships, orders
create policy "Users can read own profile"
  on public.profiles for select using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update using (auth.uid() = id);

create policy "Users can manage own addresses"
  on public.addresses for all using (auth.uid() = user_id);

create policy "Users can read own memberships"
  on public.user_memberships for select using (auth.uid() = user_id);

create policy "Users can read own orders"
  on public.orders for select using (auth.uid() = user_id);

-- Staff/Admin full access
create policy "Staff full access profiles"
  on public.profiles for all using (
    exists (select 1 from public.profiles where id = auth.uid() and role in ('staff', 'admin'))
  );

create policy "Staff full access products"
  on public.products for all using (
    exists (select 1 from public.profiles where id = auth.uid() and role in ('staff', 'admin'))
  );

create policy "Staff full access memberships"
  on public.user_memberships for all using (
    exists (select 1 from public.profiles where id = auth.uid() and role in ('staff', 'admin'))
  );

create policy "Staff full access orders"
  on public.orders for all using (
    exists (select 1 from public.profiles where id = auth.uid() and role in ('staff', 'admin'))
  );
