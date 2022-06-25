import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import { schema, optionalEndingSchema } from '../../../shared/form.schema';

const sampleTakenUrls = ['kntp123', 'xdxdxd', 'jdjdjd'];

export const appRouter = trpc
  .router()
  .mutation('create-tiny-link', {
    input: schema,
    resolve({ input }) {
      console.log('create', input);
      console.log('all_urls', sampleTakenUrls);
      // optional ending provided
      if (input.optionalEnding) {
        // optional ending not an empty string or in 'db'
        if (
          input.optionalEnding !== '' &&
          !sampleTakenUrls.includes(input.optionalEnding.toLowerCase())
        ) {
          //add it to 'db'
          sampleTakenUrls.push(input.optionalEnding);
          console.log('all_urls_after_add', sampleTakenUrls);
          return { ok: true };
        } else {
          // optional ending non unique
          return { ok: false };
        }
      }
      return { ok: false };
    },
  })
  .mutation('check-if-taken', {
    input: optionalEndingSchema,
    resolve({ input }) {
      console.log('check', input);
      if (sampleTakenUrls.includes(input.optionalEnding.toLowerCase())) {
        return { ok: false };
      }
      return { ok: true };
    },
  });

// export type definition of API
export type AppRouter = typeof appRouter;

// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => null,
});
