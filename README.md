This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


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
🔧 Project Structure
src/
 ├── app/
 │   ├── (auth)/login/
 │   ├── dashboard/
 │   ├── travel-plans/
 │   ├── profile/
 │   ├── requests/
 │   ├── actions/              # server actions
 │   ├── layout.tsx
 │   └── page.tsx
 │
 ├── components/
 │    ├── RequestToJoinButton/
 │    ├── TravelCard/
 │    ├── Navbar/
 │    ├── Footer/
 │
 ├── hooks/
 │
 ├── lib/
 │    ├── axiosInstance.ts
 │    ├── auth.ts
 │
 ├── types/
 ├── utils/

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

NEXT_PUBLIC_API_BASE_URL=https://travel-buddy-backend.onrender.com/api

📸 Screenshots (Optional)

You can add screenshots later:

/public/screenshots/home.png
/public/screenshots/travel-details.png
/public/screenshots/request-sent.png

📝 License

This project is made for educational/assignment use only.
