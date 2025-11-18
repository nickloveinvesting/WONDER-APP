import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import NewFolderForm from './NewFolderForm';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

export const dynamic = 'force-dynamic';

export default async function NewFolderPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth/login');
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 via-white to-stone-50">
      <div className="max-w-3xl mx-auto px-6 lg:px-8 py-12">
        <Breadcrumbs
          items={[
            { label: 'Journal', href: '/journal' },
            { label: 'New Folder' }
          ]}
        />

        <div className="mb-8">
          <h1 className="text-4xl lg:text-5xl font-black text-slate-900 mb-3 tracking-tight">
            Create New Folder
          </h1>
          <p className="text-xl text-slate-600 font-medium">
            Organize your journal entries by topic or theme
          </p>
        </div>

        <NewFolderForm />
      </div>
    </div>
  );
}
