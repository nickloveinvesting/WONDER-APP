'use client';

export default function DebugPage() {
  return (
    <div className="p-8 bg-gray-900 text-white min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Environment Debug</h1>
      <div className="space-y-2 font-mono text-sm">
        <div>
          <strong>NEXT_PUBLIC_SUPABASE_URL:</strong>{' '}
          {process.env.NEXT_PUBLIC_SUPABASE_URL || 'UNDEFINED'}
        </div>
        <div>
          <strong>NEXT_PUBLIC_SUPABASE_ANON_KEY:</strong>{' '}
          {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
            ? `${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.substring(0, 20)}...`
            : 'UNDEFINED'}
        </div>
        <div>
          <strong>All NEXT_PUBLIC vars:</strong>
          <pre className="bg-gray-800 p-2 mt-2 rounded">
            {JSON.stringify(
              Object.keys(process.env).filter(key => key.startsWith('NEXT_PUBLIC')),
              null,
              2
            )}
          </pre>
        </div>
      </div>
    </div>
  );
}
