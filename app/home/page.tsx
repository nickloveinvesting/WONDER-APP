import { redirect } from 'next/navigation';

/**
 * Deprecated: This file is kept for backward compatibility only.
 * Use the (authenticated)/home route instead.
 */
export default function HomePage() {
  redirect('/home');
}
