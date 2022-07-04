# Bohemia Interactive job assignment 02

Code for the second of two assignments for a front-end React developer position at Bohemia Interactive for the Back Office HR tool.

## Assignment

Create a PoC of the e-commerce solution. One of our clients wants to have an application where he could sell images and artworks. He gave us designs and we need to transfer his vision to real code.

Assignment details are in [assignment.md](assignment.md).

## Getting Started

Install packages with:

```bash
pnpm install
# or
npm install
# or
yarn install
```

Run the development server:

```bash
pnpm run dev
# or
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Updating store products

If you want to quickly randomize data, run `pnpm run convert` (or equivalent). If you want to dig deeper into this, docs are in [lib/convert-data.ts](./lib/convert-data.ts).

## Stack

- [Next.js](https://nextjs.org/) bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app)
- [TypeScript](https://www.typescriptlang.org/)
- [unstated-next](https://github.com/jamiebuilds/unstated-next) for nicer React Context
- [clsx](https://github.com/lukeed/clsx) for conditional classNames
- [ESLint](https://eslint.org/) + [Prettier](https://prettier.io/)
  - [`eslint-plugin-import`](https://github.com/import-js/eslint-plugin-import) for import order
  - [`eslint-plugin-json-files`](https://github.com/kellyselden/eslint-plugin-json-files) for [package.json](package.json) order
- [Tailwind CSS](https://tailwindcss.com/) + [PostCSS](https://postcss.org/) + [autoprefixer](https://github.com/postcss/autoprefixer)
- [SpinKit](https://github.com/tobiasahlin/SpinKit) loading spinner
- [pnpm](https://pnpm.io/) (optional but recommended instead of NPM)

The site honors `prefers-color-scheme` because choice is good.
