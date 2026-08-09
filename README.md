# Bryan Wei — Portfolio

A personal portfolio built with Next.js, React, and TypeScript. It presents my experience, projects, technical background, resume, and contact form in a responsive terminal-inspired interface.

**Live site:** [bryan-wei-portfolio.vercel.app](https://bryan-wei-portfolio.vercel.app)

## Run Locally

```bash
npm install
```

Create `.env.local` from `.env.example` and add your Web3Forms access key:

```env
NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=your_access_key
```

Then start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Add or Update Content

- **Personal details, skills, experience, and projects:** edit `src/data/portfolio.ts`.
- **Add an experience or project:** add another object to the matching `experiences` or `projects` array and follow the existing object structure.
- **Page sections and markup:** edit `src/app/page.tsx`.
- **Layout, responsive behavior, colors, and animations:** edit `src/app/globals.css`.
- **Navigation and contact form behavior:** edit files in `src/components/`.
- **Resume and logos:** replace or add files inside `public/`, then update their paths in `src/data/portfolio.ts` if needed.

Before publishing a change, verify the production build:

```bash
npm run build
```

## Publish Updates

Push changes to the `main` branch:

```bash
git add .
git commit -m "Describe your update"
git push
```

Vercel automatically rebuilds and publishes the site after each push to `main` once the GitHub repository is connected to the Vercel project.
