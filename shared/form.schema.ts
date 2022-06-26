import * as z from 'zod';

const expr =
  /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;

const urlRegex = new RegExp(expr);

export const formSchema = z.object({
  longUrl: z
    .string()
    .min(1, { message: 'Field is required' })
    .regex(urlRegex, { message: 'Not a valid url' }),
  customEnding: z
    .string()
    .min(3, { message: 'Minimum 3 characters or empty' })
    .max(20, { message: 'Maximum 20 characters' }),
});

export const checkIfExistsSchema = z.object({
  customEnding: z
    .string()
    .min(3, { message: 'Minimum 3 characters or empty' })
    .max(20, { message: 'Maximum 20 characters' }),
});
