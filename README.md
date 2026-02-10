# Next.js 101

This is workshop lab which should be done step by step as described in this readme.

- [Next.js 101](#nextjs-101)
  - [Prerequisites](#prerequisites)
    - [Node.js](#nodejs)
  - [Getting Started](#getting-started)
  - [Guides](#guides)
  - [Learn More](#learn-more)
  - [Deploy on Vercel](#deploy-on-vercel)

## Prerequisites

### Node.js

**If nvm is _not_ already installed on your computer**

Follow instruction on how to [install nvm here](https://github.com/nvm-sh/nvm/blob/master/README.md)

**If already installed**

These commands make use of the file [.nvmrc](.nvmrc)

```bash
nvm -v # Check wether nvm is installed
nvm install # Installing the repo-recommended node version
nvm use
```

## Getting Started

1. Install dependencies `npm install`
2. Run the "database" `npm run db`
3. Run the Next app `npm run dev`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Guides

This repository includes comprehensive guides for Next.js features:

- **[Parallel Routes Guide](./PARALLEL_ROUTES_GUIDE.md)** - A complete guide on how to use Parallel Routes in Next.js, including:
  - What parallel routes are and why they're useful
  - Step-by-step implementation instructions
  - Real examples from this codebase (dashboard and todos)
  - Advanced patterns and best practices
  - Troubleshooting common issues

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
