import { redirect } from 'next/navigation';

// Redirect old /discuss route to unified /debates page
export default function DiscussPage() {
  redirect('/debates');
}
