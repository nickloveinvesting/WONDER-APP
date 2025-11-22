import { redirect } from 'next/navigation';

// Redirect old /discuss/[id] route to unified /debates/[id] page
export default async function DiscussionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  redirect(`/debates/${id}`);
}
