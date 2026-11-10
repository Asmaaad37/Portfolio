# Asmaad Saeed — Portfolio

My personal site: **[asmaadsaeed.vercel.app](https://asmaadsaeed.vercel.app)**

I'm an AI Engineer and Data Scientist building LLM systems, ML models and data pipelines. The site has my background, projects and resume.

## Stack

- [Next.js](https://nextjs.org/) (App Router, static export) with React and TypeScript
- [Tailwind CSS](https://tailwindcss.com/) plus hand-written CSS in `app/styles/`
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

| Content           | File                                                                    |
| ----------------- | ----------------------------------------------------------------------- |
| About page        | `src/data/about.ts`                                                     |
| Projects          | `src/data/projects.ts` (images in `public/images/projects/`)            |
| Resume            | `src/data/resume/` (`work.ts`, `degrees.ts`, `courses.ts`, `skills.ts`) |
| Contact links     | `src/data/contact.ts`                                                   |
| Stats             | `src/data/stats/`                                                       |
| Site URL and name | `src/lib/utils.ts`                                                      |
| Blog posts        | `content/writing/*.md`                                                  |

## Deployment

Every push to `main` deploys to Vercel automatically, and pull requests get a preview link.

## License

[MIT](./LICENSE)
