import { withSentry } from '@sentry/nextjs';

function work() {
  throw new Error('API Test 2');
}

work();

async function handler(req: any, res: any) {
  res.status(200).json({ name: 'John Doe' });
}

export default withSentry(handler);
