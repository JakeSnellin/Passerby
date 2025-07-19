# Passerby Site

A modern, performant agency website built with **Next.js**, powered by a **headless WordPress backend**. The site uses **TypeScript**, **SASS**, **GSAP**, and **GraphQL** to deliver a seamless frontend experience while integrating deeply with WordPress via Gutenberg blocks.

---

## 🔧 Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router, TypeScript)
- **Styling:** SASS (SCSS Modules)
- **Animations:** [GSAP](https://greensock.com/gsap/) + CSS transitions
- **Backend:** WordPress (Headless) with:
  - [WPGraphQL](https://www.wpgraphql.com/)
  - [WPGraphQL Gutenberg by pristas-peter](https://github.com/pristas-peter/wp-graphql-gutenberg)
- **GraphQL Client:** [graphql-request](https://www.npmjs.com/package/graphql-request)
- **Image Optimization:** Next.js `<Image />` with remote loader
- **Code Style:** Prettier
- **Deployment:** [Vercel](https://vercel.com/)
- **Node.js Version:** >=22 (locked via `engines` in `package.json`)

---

## 🚀 Getting Started

1. **Clone the repository:**

```bash
git clone https://github.com/jakesnellin/passerby-site.git
cd passerby-site
```

2. **Install dependencies:**

```bash
npm install
```

3. **Start the development server:**

```bash
npm run dev
```

4. **Build for production:**

```bash
npm run build
npm start
```

---

## 🌐 Environment Variables

Create a `.env.local` file in the root:

```env
WORDPRESS_GRAPHQL_ENDPOINT=https://your-wp-site.com/graphql
```

> Replace `your-wp-site.com` with your actual WordPress site URL. This is not a secret key and can be committed unless your project requires otherwise.

Ensure **WPGraphQL** and **GraphQL Gutenberg** plugins are enabled in your WordPress backend.

---

## 📦 Data Fetching Strategy

This project uses **static generation (SSG)** via the **App Router** for maximum performance.

- `generateStaticParams()` for dynamic routes (e.g. projects, blog posts)
- `generateMetadata()` for SEO
- `graphql-request` for all GraphQL queries

> You do **not** use `getStaticProps` or `getServerSideProps` with the App Router.

**Example:**
```ts
// lib/queries/getHomepage.ts
import { gql, request } from 'graphql-request';

const HOMEPAGE_QUERY = gql`
  query GetHomepage {
    pageBy(uri: "/") {
      title
      blocksJSON
    }
  }
`;

export async function getHomepageData() {
  const data = await request(process.env.WORDPRESS_GRAPHQL_ENDPOINT!, HOMEPAGE_QUERY);
  return data;
}
```

---

## 🎨 Styling & Animations

- **SASS (SCSS Modules):** Component-level styles with global support via `globals.scss`
- **GSAP:** For scroll and timeline animations
- **CSS Transitions:** For basic interactions and fallback animations

---

## ✅ Linting & Formatting

- **Prettier** is used for consistent formatting
- **No ESLint** configured by default

To format code manually:

```bash
npx prettier --write .
```

Example `.prettierrc`:

```json
{
  "semi": true,
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2,
  "trailingComma": "es5"
}
```

---

## 📤 Deployment

Deployed to **Vercel**. Recommended settings:

- **Node.js Version:** 22.x (set in Vercel Project Settings > General > Node Version)
- **Environment Variables:** Add `WORDPRESS_GRAPHQL_ENDPOINT`
- **Build Command:** `npm run build`
- **Output Directory:** `.next`

---

## 🧪 Testing

No automated testing included (yet). Consider adding unit and integration tests as the project evolves.

---

## 🗃️ Version Control

Git is initialized in the root of this project.

To connect to a remote repository:

```bash
git remote add origin https://github.com/jakesnellin/passerby-site.git
git push -u origin main
```

---

## ✍️ Content Notes

- Gutenberg blocks are parsed via the `graphql-gutenberg` plugin
- Blocks are returned as `blocksJSON`
- Frontend dynamically renders blocks with custom components where applicable

---

## 📄 License

MIT License © Passerby Design & Consultancy

---

## 🙌 Acknowledgements

- [Next.js](https://nextjs.org/)
- [WordPress + WPGraphQL](https://www.wpgraphql.com/)
- [GSAP](https://greensock.com/gsap/)
- [graphql-request](https://www.npmjs.com/package/graphql-request)