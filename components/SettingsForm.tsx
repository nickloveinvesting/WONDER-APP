'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { updateProfile } from '@/lib/actions/settings';

type SettingsFormProps = {
    initialDisplayName: string | null;
    initialBio: string | null;
};

export function SettingsForm({ initialDisplayName, initialBio }: SettingsFormProps) {
    const [displayName, setDisplayName] = useState(initialDisplayName || '');
    const [bio, setBio] = useState(initialBio || '');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess(false);

        startTransition(async () => {
            const result = await updateProfile({
                displayName: displayName.trim(),
                bio: bio.trim(),
            });

            if (result.error) {
                setError(result.error);
            } else {
                setSuccess(true);
                router.refresh();

                // Clear success message after 3 seconds
                setTimeout(() => setSuccess(false), 3000);
            }
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
                <div className="bg-red-50 border-2 border-red-400 text-red-900 px-5 py-4 rounded-xl font-bold">
                    {error}
                </div>
            )}

            {success && (
                <div className="bg-green-50 border-2 border-green-400 text-green-900 px-5 py-4 rounded-xl font-bold">
                    Settings updated successfully!
                </div>
            )}

            <div>
                <label className="block text-slate-900 text-sm font-bold mb-2">Display Name</label>
                <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="w-full px-4 py-2 bg-white border-2 border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100 font-medium"
                    placeholder="Your display name"
                    maxLength={50}
                />
            </div>

            <div>
                <label className="block text-slate-900 text-sm font-bold mb-2">Bio</label>
                <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-2 bg-white border-2 border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100 font-medium resize-none"
                    placeholder="Tell us about yourself..."
                    maxLength={500}
                />
                <p className="text-sm text-slate-500 mt-1 font-medium">{bio.length}/500 characters</p>
            </div>

            <button
                type="submit"
                disabled={isPending}
                className="px-6 py-3 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 font-black text-lg"
            >
                {isPending ? 'Saving...' : 'Save Changes'}
            </button>
        </form>
    );
}
