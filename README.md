# MediTravel

![MediTravel Logo](https://meditravel.vercel.app/images/medi-travel-logo.webp)

Your trusted partner in medical tourism. MediTravel connects patients with world-class clinics, ensuring affordable and high-quality healthcare worldwide.

## 🌍 Live Application
Experience MediTravel live: [MediTravel App](https://meditravel.vercel.app/)

![MediTravel Hero](https://meditravel.vercel.app/images/medi-travel-hero.webp)

---

## 🚀 About the Project
MediTravel is a **Next.js** application designed to streamline medical tourism by helping users find, compare, and book procedures in top-tier international clinics. It features:
- **Seamless Authentication** powered by Firebase Auth
- **Clinic Listings & Comparisons** with real-time pricing insights
- **High-Performance UI/UX** leveraging Radix UI and Tailwind CSS
- **Secure Image & Data Handling** via Cloudinary and Firestore
- **Optimized for SEO & Performance** using Next.js App Router

## 📂 Project Structure
```
medi-travel/
 ├── src/
 │   ├── app/ (Next.js App Router)
 │   ├── components/ (UI components)
 │   ├── constants/ (Global constants)
 │   ├── db/ (Database config - Firebase & Firestore)
 │   ├── hooks/ (Custom React hooks)
 │   ├── layouts/ (Page layouts)
 │   ├── lib/ (Utility functions)
 │   ├── models/ (Data models)
 │   ├── store/ (Zustand global state management)
 │   ├── styles/ (TailwindCSS & global styles)
 │   ├── validations/ (Yup validation schemas)
 ├── next.config.ts (Next.js configuration)
 ├── package.json (Dependencies & scripts)
 ├── tailwind.config.ts (Tailwind CSS config)
 ├── tsconfig.json (TypeScript configuration)
```

## 📦 Key Technologies & Libraries
### Core Stack
- **Next.js 15** - Framework for React with App Router
- **TypeScript** - Ensures type safety
- **Firebase** (Auth, Firestore) - Secure authentication and data storage
- **Cloudinary** - Optimized image storage and delivery

### UI/UX Enhancements
- **TailwindCSS** - Utility-first styling
- **Radix UI** - Accessible and customizable UI components
- **Framer Motion** - Smooth animations & micro-interactions
- **Lucide & Tabler Icons** - Crisp and modern icons

### State Management & Data Handling
- **Zustand** - Lightweight state management
- **TanStack React Query** - Powerful data fetching & caching
- **Lodash** - Functional utilities

### Performance & Security
- **Next Image Optimization** - For fast and responsive images
- **Next Cloudinary** - Seamless Cloudinary integration
- **Next Bundle Analyzer** - Optimized build analysis

## 🔧 Setup & Installation
### Prerequisites
- Node.js (>= 18.x)
- pnpm (preferred) / npm / yarn

### Clone Repository
```sh
git clone https://github.com/yourusername/medi-travel.git
cd medi-travel
```

### Install Dependencies
Using **pnpm** (recommended):
```sh
pnpm install
```
Using **npm**:
```sh
npm install
```
Using **yarn**:
```sh
yarn install
```

### Environment Variables
Create a `.env.local` file and configure the following:
```env
NEXT_PUBLIC_CSC_API_KEY=value
NEXT_PUBLIC_FIREBASE_APP_ID=value
NEXT_PUBLIC_FIREBASE_API_KEY=value
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=value
NEXT_PUBLIC_FIREBASE_PROJECT_ID=value
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=value
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=value
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=value
NEXT_PUBLIC_UPLOAD_PRESET=value
NEXT_PUBLIC_CLOUDINARY_ENV=value
```

### Run Development Server
```sh
pnpm dev
# OR
npm run dev
# OR
yarn dev
```
App will be running at `http://localhost:8050`

## 📌 Notable Configurations
### `next.config.ts`
- **Bundle Analysis** enabled for production builds
- **Strict Security Headers** including `Content-Security-Policy`, `Referrer-Policy`, `HSTS`
- **Optimized Image Domains** (Cloudinary, Unsplash, UI-Avatars)
- **Experimental Turbo Mode** for enhanced performance

## 📜 License
MIT License. See `LICENSE` for details.

## ✨ Contributors
- **Alabura Usman** ([@usmanunfolds](mailto:usmanunfolds@alabura.com))

## 📮 Feedback & Support
If you encounter any issues or have suggestions, feel free to open an issue or reach out via email: [usmanunfolds@alabura.com](mailto:usmanunfolds@alabura.com).

🚀 *Transforming medical tourism, one click at a time!*

