# 🛒 MERN Ecommerce Frontend

A full-featured ecommerce frontend built with **Next.js 16**, **TypeScript**, **Redux Toolkit**, and **Tailwind CSS** — part of a MERN stack ecommerce application.

🎬 [Watch Video Presentation](https://www.youtube.com/watch?v=LNnoBmY9ezc) &nbsp;|&nbsp; 🌐 [Live Demo](https://mern-ecommerce-frontend-seven-sigma.vercel.app/)

---

## 📋 Table of Contents

- [About the Project](#about-the-project)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Deployment](#deployment)

---

## About the Project

This is the client-side of a MERN (MongoDB, Express, React, Node.js) ecommerce application. It is bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app) and uses the Next.js App Router. The app enables users to browse products, manage a shopping cart, and complete purchases, while admins can manage the store inventory and orders.

---

## Tech Stack

| Category | Technology |
|---|---|
| Framework | [Next.js 16](https://nextjs.org/) (App Router) |
| Language | TypeScript |
| State Management | Redux Toolkit + React-Redux |
| Styling | Tailwind CSS |
| HTTP Client | Axios |
| Image Hosting | Cloudinary (`next-cloudinary`) |
| Notifications | React Toastify |
| Icons | React Icons |
| Linting | ESLint |

---

## Project Structure

```
mern-ecommerce-frontend/
├── app/              # Next.js App Router — pages and layouts
├── components/       # Reusable UI components
├── hooks/            # Custom React hooks
├── providers/        # Context and global providers
├── public/           # Static assets
├── redux/            # Redux store, slices, and API calls
├── types/            # TypeScript type definitions
├── utils/            # Utility/helper functions
├── next.config.ts    # Next.js configuration (Cloudinary image domain)
├── tailwind.config.ts
└── tsconfig.json
```

---

## Getting Started

### Prerequisites

- **Node.js** v18 or higher
- **npm**, **yarn**, **pnpm**, or **bun**
- A running instance of the [MERN Ecommerce Backend](https://mern-ecommerce-frontend-jg1w.onrender.com/)

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/mHasan1037/mern-ecommerce-frontend.git
cd mern-ecommerce-frontend
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables** (see [Environment Variables](#environment-variables))

4. **Run the development server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

---

## Environment Variables

Create a `.env.local` file in the root of the project and add the following:

```env
NEXT_PUBLIC_API_URL=<your_backend_api_url>
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=<your_cloudinary_cloud_name>
```

> **Note:** Never commit your `.env.local` file to version control.

---

## Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start development server with Turbopack |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

---

## Deployment

This project is deployed on **Vercel**. To deploy your own instance:

1. Push the repository to GitHub.
2. Import the project in [Vercel](https://vercel.com/).
3. Add the required environment variables in the Vercel dashboard.
4. Deploy.

The backend is separately hosted on **Render**: [https://mern-ecommerce-frontend-jg1w.onrender.com/](https://mern-ecommerce-frontend-jg1w.onrender.com/)

---

## License

This project is open source and available under the [MIT License](LICENSE).
