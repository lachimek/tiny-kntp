import type { NextApiRequest, NextApiResponse } from 'next';
import db from '../../../db';

const CACHE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days in seconds

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(req.body);
  const customEnding = req.query['customEnding'];

  if (!customEnding || typeof customEnding !== 'string') {
    res.statusCode = 404;
    res.status(404).json({ message: 'invalid custom heading type' });
    return;
  }

  const found = await db.link.findFirst({
    where: { customEnding: customEnding },
  });

  if (!found) {
    res.status(404).json({ error: true, message: 'url not found' });
    return;
  }
  console.log(found);

  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Cache-Control',
    `s-maxage=${CACHE_MAX_AGE}, stale-while-revalidate`
  );

  return res.json({ redirectUrl: found.redirectUrl });
}
