# TINY-KNTP

A NextJS app where you can create a shortened version of a long URL.

### Libraries used

- [React](https://reactjs.org/)
- [Next](https://nextjs.org/)
- [TRPC](https://trpc.io/)
- [Zod](https://zod.dev/)
- [Prisma](https://www.prisma.io/)
- PostgresDB on [supabase](https://supabase.com/)
- [React-hook-form](https://react-hook-form.com/)
- [TailwindCSS](https://tailwindcss.com/)

### Demo and run-it-yourself

[DEMO](https://tiny.kntp.pl/) deployed on [Vercel](https://vercel.com/)

##### To run it locally clone the repo and

- run npm install
- create .env file in root with key <b>DATABASE_URL</b>="your_db_url"
- npx prisma db push
- npx prisma generate
- npm run dev
