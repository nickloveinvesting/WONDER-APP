import { redirect } from 'next/navigation';

// Redirect old gate URL to new apply flow
export default function GatePage() {
  redirect('/apply');
}
