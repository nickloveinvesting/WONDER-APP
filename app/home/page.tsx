import { redirect } from 'next/navigation';

/**
 * Root /home page - redirects to the authenticated dashboard
 * Auth checking is handled by the (authenticated) layout
 */
export default async function HomeRedirect() {
  redirect('/(authenticated)/home');
}
