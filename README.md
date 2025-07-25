# Passerby Site

A modern, performant agency website built with **Next.js**, powered by a **headless WordPress backend**. The site uses **TypeScript**, **SASS**, **GSAP**, and **GraphQL** to deliver a seamless frontend experience while integrating deeply with WordPress via Gutenberg blocks.

---

## 🔧 Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router, TypeScript)
- **Styling:** SASS (SCSS Modules)
- **Animations:** [GSAP](https://greensock.com/gsap/) + CSS transitions
- **Backend:** WordPress (Headless) with:
  - [WPGraphQL](https://www.wpgraphql.com/)
  - [WPGraphQL Content Blocks by WP Engine](https://github.com/wpengine/wp-graphql-content-blocks)
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

Create a `.env.local` file in the project root for local development. This file should not be committed:

```env
NEXT_PUBLIC_WORDPRESS_API_URL=https://your-wp-site.com/graphql
```

> Replace `your-wp-site.com` with your actual WordPress site URL. This is not a secret key and can be committed unless your project requires otherwise.

**Important**: Make sure to set the same environment variable (NEXT_PUBLIC_WORDPRESS_API_URL) with the appropriate URL on your staging and production servers (e.g., in Vercel dashboard or your hosting environment) to ensure the frontend connects to the correct backend.

Ensure **WPGraphQL** and **WPGraphQL Content Blocks** plugins are enabled in your WordPress backend.

---

## 📦 Data Fetching Strategy

This project uses **static generation (SSG)** via the **Next.js App Router** for optimal performance.

- `generateStaticParams()` for dynamic routes (e.g. pages, posts)
- `generateMetadata()` for SEO
- GraphQL queries are made using a configured `client` instance based on `graphql-request`
- Structured Gutenberg block data is fetched using **WPGraphQL Content Blocks** (by WP Engine)
- Blocks are rendered using a custom `<BlockRenderer />` React component
- **Note:** This setup does not use `getStaticProps` or `getServerSideProps`; everything is handled via the App Router conventions.

### 🧩 Example: Fetching and Rendering a Page

```tsx
// app/sample-page/page.tsx

import { client } from '@/lib/graphqlClient';
import { GET_PAGE_BY_SLUG } from '@/lib/queries/getPageBySlug';
import { BlockRenderer } from '@/components/BlockRenderer';
import { notFound } from 'next/navigation';

export default async function SamplePage() {
  const variables = {
    id: 'sample-page',
    idType: 'URI',
  };

  const { page }: { page: PageProps | null } = await client.request(GET_PAGE_BY_SLUG, variables);

  if (!page) {
    notFound();
  }

  return (
    <main>
      <h1>{page.title}</h1>
      <BlockRenderer blocks={page.editorBlocks} />
    </main>
  );
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
- **Environment Variables:** Add the environment variable `NEXT_PUBLIC_WORDPRESS_API_URL` with the appropriate URL
- **Build Command:** `npm run build`
- **Output Directory:** `.next`

---

## 🧪 Testing

No automated testing included (yet). Consider adding unit and integration tests as the project evolves.

---

## 🗃️ Version Control

Git is initialised in the root of this project.

To connect to a remote repository:

```bash
git remote add origin https://github.com/jakesnellin/passerby-site.git
git push -u origin main
```

---

## ✍️ Content Notes

- Gutenberg blocks are parsed using **WPGraphQL Content Blocks** by WP Engine
- Blocks are returned as structured JSON via the `editorBlocks` field
- These blocks are rendered on the frontend using a custom `<BlockRenderer />` React component

---

## 📄 License

MIT License © Passerby Design & Consultancy

---

## 🙌 Acknowledgements

- [Next.js](https://nextjs.org/)
- [WordPress + WPGraphQL](https://www.wpgraphql.com/)
- [GSAP](https://greensock.com/gsap/)
- [graphql-request](https://www.npmjs.com/package/graphql-request)
