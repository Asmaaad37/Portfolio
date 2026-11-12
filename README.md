# Asmaad Saeed — Portfolio

My personal site: **[asmaadsaeed.vercel.app](https://asmaadsaeed.vercel.app)**

I'm an AI engineer and full-stack developer building LLM, RAG and real-time ML systems. The site has my work, case studies, background and resume.

## Stack

- [Next.js](https://nextjs.org/) (App Router, static export) with React and TypeScript
- Hand-written CSS in `app/styles/site/` (Tailwind for the base reset)
- [GSAP](https://gsap.com/) with ScrollTrigger and [Lenis](https://lenis.darkroom.engineering/) for motion
- [Vitest](https://vitest.dev/) and Testing Library for tests
- [Biome](https://biomejs.dev/) for linting and formatting
- Hosted on [Vercel](https://vercel.com/)

## Running locally

Requires Node.js 20 or newer.

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Commands

```bash
npm run dev            # Dev server
npm run build          # Static build to out/
npm run lint           # Biome lint
npm run type-check     # TypeScript check
npm run format         # Format code
npm test               # Run tests
npm run test:watch     # Tests in watch mode
npm run test:coverage  # Coverage report
```

## Where the content lives

All site content is plain TypeScript, so updating it means editing a file:

| Content                    | File                                               |
| -------------------------- | -------------------------------------------------- |
| Projects and case studies  | `src/data/caseStudies.ts`                          |
| Resume                     | `src/data/resume.ts` (matches `public/resume.pdf`) |
| About page                 | `src/data/about.ts`                                |
| Home page copy and figures | `src/data/home.ts`, `src/data/timeline.ts`         |
| Email, LinkedIn, GitHub    | `src/data/site.ts`                                 |
| Site URL and name          | `src/lib/utils.ts`                                 |
| Blog posts                 | `content/writing/*.md`                             |

## Deployment

Every push to `main` deploys to Vercel automatically, and pull requests get a preview link.

## License

[MIT](./LICENSE)
