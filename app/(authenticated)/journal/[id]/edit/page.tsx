import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import EditJournalForm from './EditJournalForm';

export const dynamic = 'force-dynamic';

export default async function EditJournalEntryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const supabase = await createClient();
  const { id } = await params;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth/login');
  }

  // Fetch the entry
  const { data: entry, error } = await supabase
    .from('journal_entries')
    .select('id, title, content, tags')
    .eq('id', id)
    .eq('user_id', user.id)
    .single();

  if (error || !entry) {
    redirect('/journal');
  }

  return <EditJournalForm entry={entry} />;
}
