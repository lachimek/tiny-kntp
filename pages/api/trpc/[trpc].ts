import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import {
  formSchema,
  checkIfExistsSchema,
  getRedirectUrl,
} from '../../../shared/form.schema';
import db from '../../../db';

export const appRouter = trpc
  .router()
  .mutation('create-tiny-link', {
    input: formSchema,
    async resolve({ input }) {
      console.log('create', input);
      try {
        const addedLink = await db.link.create({
          data: {
            redirectUrl: input.longUrl,
            customEnding: input.customEnding,
          },
        });
        console.log('addedLink', addedLink);
        return { ok: true };
      } catch (error) {
        console.log(error);
        return { ok: false };
      }
    },
  })
  .mutation('check-if-taken', {
    input: checkIfExistsSchema,
    async resolve({ input }) {
      console.log('check', input);
      const found = await db.link.findFirst({
        where: { customEnding: input.customEnding },
      });
      if (found) {
        return { ok: false };
      }
      return { ok: true };
    },
  })
  .query('get-redirect-url', {
    input: getRedirectUrl,
    async resolve({ input }) {
      console.log('get-redirect-url', input);
      const found = await db.link.findFirst({
        where: { customEnding: input.customEnding },
      });
      if (!found) {
        return { ok: false };
      }
      return { ok: true, found };
    },
  });

// export type definition of API
export type AppRouter = typeof appRouter;

// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => null,
});
