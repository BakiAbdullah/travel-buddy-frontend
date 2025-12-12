# 🚀 Travel Buddy – Frontend (React + Next.js + TypeScript + Tailwind)

Frontend for the Travel Buddy platform: a travel collaboration app where users can browse and create travel plans, send join requests, write reviews, and manage trips.

Built with React, Next.js, TypeScript, Tailwind CSS and common ecosystem libraries.

---

## 📌 Key Features

- Authentication (login, refresh token, protected pages)
- Role-based UI (Admin & User)
- Browse / Search / Filter travel plans
- Create / Edit travel plans (owner only)
- Send / Manage travel join requests
- Add / View reviews
- Responsive UI (mobile-first)
- Modal-based interactions (shadcn/ui Dialog)
- API integration via RTK Query (or fetch/axios)

---

## 🛠 Technology Stack

| Technology | Usage |
|------------|-------|
| React | UI library |
| Next.js | Routing & server-side rendering |
| TypeScript | Type safety |
| Tailwind CSS | Styling |
| shadcn/ui | UI components |
| @shadcn/table | Tables |
| Next Js + Server Action | State & data fetching |
| Zod | Form & request validation (optional) |

---

## 📂 Project Structure

```
src/
 ├── app/ (Next.js app dir or pages/)
 ├── components/
 │    ├── common/
 │    ├── layout/
 │    ├── forms/
 │    ├── modals/
 │    ├── cards/
 ├── features/
 │    ├── auth/
 │    ├── travelPlans/
 │    ├── travelRequests/
 │    ├── reviews/
 ├── hooks/
 ├── lib/ (api clients, utils)
 ├── styles/
 ├── public/
next.config.js or app router files
```

---

## ⚙️ Environment Variables

Create `.env.local` in the project root:

```
NEXT_PUBLIC_API_BASE_URL="http://localhost:5000/api"
NEXT_PUBLIC_APP_NAME="Travel Buddy"
```

> When deploying, set `NEXT_PUBLIC_API_BASE_URL` to your production backend URL.

---

## ▶️ Running Locally

1. Install dependencies
```bash
npm install
# or
yarn
```

2. Run the development server
```bash
npm run dev
# or
yarn dev
```

3. Build for production
```bash
npm run build
npm run start
```

---

## 🔌 Integrating with Backend

- Set `NEXT_PUBLIC_API_BASE_URL` to backend endpoint.
- Auth flow: store access token in memory + refresh with refresh token endpoint (secure httpOnly cookie recommended on production).
- Use RTK Query / axios with an auth middleware to automatically attach tokens and handle 401 -> refresh flow.

---

## 🧩 UI / Component Notes

- Use `shadcn/ui` Dialog for modals (borrow modal, create plan modal, etc).
- Use `@tanstack/react-table` for listing plans and actions columns (Borrow button opens modal).
- Keep forms accessible and validate with Zod or React Hook Form + Zod.
- Centralize date handling with `date-fns` or `luxon`.

---

## ✅ Helpful Scripts (package.json)

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "prepare": "husky install"
  }
}
```

---

## 🐛 Common Frontend Issues & Fixes

- **Image import / next/image**: Use correct domains in `next.config.js` for external images.
- **React key warnings**: Ensure list renders have stable keys (`id`).
- **API CORS**: Enable CORS on backend for local development or proxy via Next.js rewrites.

---

## 🚀 Deployment

- Vercel (recommended for Next.js) or Netlify:
  - Set environment variables in the deployment dashboard.
  - Ensure backend URL is reachable from the deployed frontend.
- For server-side features (middleware, server actions), prefer Vercel.

---

## 📚 Further Improvements

- Implement server-side rendering or incremental static regeneration for plan lists.
- Add E2E tests (Cypress / Playwright).
- Add image uploads (S3 / Cloudinary).
- Improve accessibility & add i18n.

---






🌍 Travel Buddy – Frontend (Next.js + TypeScript + Tailwind + Shadcn)

Travel Buddy is a modern travel collaboration platform where users can create travel plans, send join requests, track sent/received requests, share reviews, and manage their travel activities—all through a smooth and responsive UI.

Built using Next.js App Router, Server Actions, TanStack Query, Prisma API integration, and Shadcn UI.

🚀 Features
🔐 Authentication

Login

Refresh token handling

Protected pages (dashboard, profile, travel plans)

🧳 Travel Plans

Create a travel plan

View all travel plans with:

Search

Filters

Pagination

View single plan details

Request to join a plan

Owner can view & manage received join requests

🤝 Travel Requests (Real-time UI update)

Sender can see all sent requests

Receiver can see all received requests

Accept / Reject / Toggle request status

Request button dynamically changes (Requested → Accepted → Rejected)

⭐ Review System

Add review to a travel plan

Display all reviews

🎨 Polished UI/UX

Shadcn component library

Fully responsive layout

Custom modals for join request

Elegant travel card design

Loading states + toast notifications

🛠 Tech Stack
Technology	Purpose
Next.js 14 (App Router)	Main frontend framework
TypeScript	Type safety
Tailwind CSS	Styling
Shadcn UI	Components
JWT + Cookies	Auth
TanStack Query	Data fetching/caching
Server Actions	Secure server-side mutations
Zod	Form validation


⚙️ Environment Variables

Create a .env.local file:

NEXT_PUBLIC_API_BASE_URL=https://your-backend.onrender.com/api
TOKEN_SECRET=your-secret


For local testing:

NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api

▶️ Installation & Setup
📌 1️⃣ Clone repository
git clone https://github.com/YOUR_NAME/travel-buddy-frontend
cd travel-buddy-frontend

📌 2️⃣ Install dependencies
npm install

📌 3️⃣ Run development server
npm run dev

📌 Open the app
http://localhost:3000

🧪 Core UI Features
✅ Request To Join Button

Dynamically switches to:

Requested

Accepted

Rejected

Disabled during server action loading

Re-fetches travel requests instantly

✅ Travel Request Page

Sent Requests tab

Received Requests tab

Accept/Reject buttons update instantly

Toggle accept/reject functionality

✅ Travel Plan UI

Cards & details page

Filters for:

SearchTerm

Date range

TravelType

Visibility

Pagination & sorting

✅ Dashboard

My Travel Plans

Summary metrics

Quick actions

🌐 API Integration

All APIs hit your backend:

GET /auth/me
POST /auth/login

GET /travel-plans
POST /travel-plans
GET /travel-plans/:id

POST /travel-request/:planId
GET /travel-request/sent
GET /travel-request/received
PATCH /travel-request/:id

POST /reviews/:planId
GET /reviews/:planId


Axios or fetch wrapper is used for authorization headers.

🔐 Authentication Flow

User logs in → receives AccessToken + RefreshToken

Tokens stored in HTTP-only cookies

getMyProfile() runs on every protected page load

If access token expires → refresh automatically

Redirect to login if refresh token also expires

🚀 Deployment
Vercel Deployment

Just add env vars in Vercel → Deploy → Done.

Backend communication issues?

Set environment variable correctly:

NEXT_PUBLIC_API_BASE_URL=https://travel-buddy-backend.onrender.com/api/v1


