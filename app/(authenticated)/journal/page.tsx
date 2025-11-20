import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { BookOpen, Plus, FolderOpen } from 'lucide-react';

// Cache journal page for 60 seconds (user-specific content)
// Data changes when user creates/edits entries, so 60s is a good balance
export const revalidate = 60;

type JournalFolder = {
  id: string;
  name: string;
  icon: string;
  color: string;
  user_id: string;
  created_at: string;
};

type JournalEntry = {
  id: string;
  title: string;
  content: string;
  user_id: string;
  folder_id: string | null;
  is_published: boolean;
  tags?: string[];
  created_at: string;
  updated_at: string;
  journal_folders?: {
    name: string;
    icon: string;
    color: string;
  } | null;
};

export default async function JournalPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth/login');
  }

  // Fetch folders
  const { data: folders } = await supabase
    .from('journal_folders')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  // Fetch recent entries
  const { data: entries } = await supabase
    .from('journal_entries')
    .select('*, journal_folders(name, icon, color)')
    .eq('user_id', user.id)
    .order('updated_at', { ascending: false })
    .limit(20);

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 via-white to-stone-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-4xl lg:text-5xl font-black text-slate-900 mb-2 tracking-tight">
              My Journal
            </h1>
            <p className="text-xl text-slate-600 font-medium">
              Your private space for ideas, research, and reflection
            </p>
          </div>
          <div className="flex gap-3">
            <Link href="/journal/folders/new">
              <Button variant="secondary" size="md">
                <FolderOpen size={18} />
                New Folder
              </Button>
            </Link>
            <Link href="/journal/new">
              <Button variant="primary" size="md">
                <Plus size={18} />
                New Entry
              </Button>
            </Link>
          </div>
        </div>

        {/* Folders Section */}
        {folders && folders.length > 0 && (
          <div className="mb-10">
            <h2 className="text-2xl font-black text-slate-900 mb-4">Folders</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {folders.map((folder: JournalFolder) => (
                <Link key={folder.id} href={`/journal?folder=${folder.id}`}>
                  <Card variant="standard" className="hover:shadow-xl transition-all cursor-pointer text-center p-6">
                    <div className="text-4xl mb-2">{folder.icon}</div>
                    <div className="font-bold text-slate-900 text-sm truncate">
                      {folder.name}
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Entries Section */}
        <div>
          <h2 className="text-2xl font-black text-slate-900 mb-4">Recent Entries</h2>

          {entries && entries.length > 0 ? (
            <div className="space-y-4">
              {entries.map((entry: JournalEntry) => (
                <Link key={entry.id} href={`/journal/${entry.id}`}>
                  <Card variant="standard" className="hover:shadow-xl transition-all cursor-pointer">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-black text-slate-900">
                            {entry.title}
                          </h3>
                          {entry.is_published && (
                            <Badge variant="status" color="teal" size="sm">
                              PUBLISHED
                            </Badge>
                          )}
                        </div>
                        <p className="text-slate-600 font-medium mb-3 line-clamp-2">
                          {entry.content.substring(0, 200)}
                          {entry.content.length > 200 ? '...' : ''}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-slate-500 font-bold">
                          {entry.journal_folders && (
                            <span className="flex items-center gap-1">
                              {entry.journal_folders.icon} {entry.journal_folders.name}
                            </span>
                          )}
                          <span>
                            Updated {new Date(entry.updated_at).toLocaleDateString()}
                          </span>
                          {entry.tags && entry.tags.length > 0 && (
                            <span className="flex gap-1">
                              {entry.tags.slice(0, 3).map((tag: string) => (
                                <Badge key={tag} variant="status" color="slate" size="sm">
                                  {tag}
                                </Badge>
                              ))}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <Card variant="gradient" className="text-center py-16">
              <div className="max-w-md mx-auto">
                <BookOpen size={64} className="mx-auto mb-6 text-slate-400" />
                <h3 className="text-2xl font-black text-slate-900 mb-3">
                  Start Your Journal
                </h3>
                <p className="text-lg text-slate-600 font-medium mb-6">
                  Capture your thoughts, organize your research, and develop your ideas privately.
                  When ready, you can publish entries to the community.
                </p>
                <Link href="/journal/new">
                  <Button variant="primary" size="lg">
                    <Plus size={18} />
                    Create First Entry
                  </Button>
                </Link>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
