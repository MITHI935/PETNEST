# 🐾 PetNest: India's Premier Pet SaaS Ecosystem

PetNest is a production-ready, high-performance SaaS platform designed for the Indian pet market. It integrates a **Pet Marketplace** (OLX-style), a **Pet Food & Accessories Store** (Amazon-style), and a **Veterinary Directory** (Practo-style) into one seamless ecosystem.

---

## 🌟 Key Features

### 1. Pet Marketplace (P2P & Breeder)
- **Advanced Discovery:** Browse pets with filters for category, price, and location.
- **Debounced Search:** High-performance search optimized for breed and name.
- **Boosted Listings:** Monetized priority system (₹199–₹499) for higher visibility.
- **Verified Seller Badges:** Visual trust signals for premium breeders.

### 2. Pet Food Store (E-commerce)
- **Inventory Management:** Product listings with brand and animal type categorization.
- **Global Shopping Cart:** Persistent cart state using React Context.
- **Seamless Checkout:** Integrated flow with success animations and order history logic.
- **Dynamic Stock Tracking:** Real-time availability indicators.

### 3. Veterinary Directory (Services)
- **Expert Discovery:** Filter vets by specialization (Surgeon, Dentist, etc.) and city.
- **Appointment Booking:** Integrated date-picker system for scheduling consultations.
- **Verified Clinic Badges:** Highlights top-rated, certified medical professionals.

---

## 🛠️ Tech Stack (Strict)

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React 18, Vite, Tailwind CSS 4.0 |
| **State/Routing** | React Router v6, Context API |
| **Animations** | Framer Motion |
| **Backend** | Node.js, Express.js |
| **Database** | Supabase (PostgreSQL) |
| **API Client** | Axios |
| **Notifications** | React Hot Toast |
| **Icons** | Lucide React |

---

## 📁 Architecture Overview

The project follows a clean, modular **MVC (Model-View-Controller)** pattern on the backend and a **Service-Layer** architecture on the frontend.

```text
PetNest/
├── frontend/               # React Application
│   ├── src/
│   │   ├── components/     # Atomic UI components (Cards, Skeletons)
│   │   ├── context/        # Global state (CartContext)
│   │   ├── layouts/        # Glassmorphism layouts (Navbar, Footer)
│   │   ├── pages/          # Feature views (Marketplace, Store, Vets)
│   │   ├── services/       # API abstraction layer
│   │   └── index.css       # Tailwind 4 design tokens & Glass UI
└── backend/                # Express API
    ├── src/
    │   ├── controllers/    # Request handling logic
    │   ├── routes/         # RESTful API endpoints
    │   ├── services/       # Supabase DB operations
    │   └── index.js        # Server entry point
```

---

## 🚀 Getting Started

### 1. Database Schema Setup (Supabase)
Run the following SQL in your Supabase SQL Editor to create the necessary tables:

```sql
-- Core Tables
create table pets (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  category text,
  breed text,
  age text,
  price numeric,
  image_url text,
  location text,
  description text,
  seller_name text,
  seller_phone text,
  is_boosted boolean default false,
  created_at timestamp with time zone default now()
);

create table pet_food (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  brand text,
  animal_type text,
  price numeric,
  stock int,
  image_url text,
  description text,
  created_at timestamp with time zone default now()
);

create table veterinarians (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  clinic_name text,
  specialization text,
  location text,
  phone text,
  rating numeric,
  image_url text,
  bio text,
  is_verified boolean default false
);

create table orders (
  id uuid default gen_random_uuid() primary key,
  customer_name text,
  phone text,
  address text,
  items jsonb,
  total_price numeric,
  status text default 'pending',
  created_at timestamp with time zone default now()
);

create table appointments (
  id uuid default gen_random_uuid() primary key,
  vet_id uuid references veterinarians(id),
  user_name text,
  pet_name text,
  date date,
  notes text,
  status text default 'scheduled'
);
```

### 2. Environment Configuration

**Backend (`/backend/.env`):**
```env
PORT=5000
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
NODE_ENV=development
```

**Frontend (`/frontend/.env`):**
```env
VITE_API_URL=http://localhost:5000/api
```

### 3. Installation

**Install Backend:**
```bash
cd backend
npm install
npm run dev
```

**Install Frontend:**
```bash
cd frontend
npm install
npm run dev
```

---

## 💰 Monetization Strategy

PetNest is built for revenue generation:
1.  **Paid Listing Boosts:** Backend sorting logic prioritizes `is_boosted` entries.
2.  **Verified Badges:** Subscription system for Vets (₹799/mo) and Breeders (₹1499/mo).
3.  **Order Commissions:** E-commerce logic calculates total prices for transaction fee processing.

---

## 🎨 Design System
- **Colors:** Coral (#FF6B6B), Amber (#FFB347), Teal (#4ECDC4)
- **UI:** Glassmorphism (20% opacity, 12px blur), 24px Radius
- **Motion:** 0.3s Cubic Bezier transitions, 1.02x scale on hover.

---

Built with ❤️ for the Pet Lovers of India.
