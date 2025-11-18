'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { createJournalFolder } from '@/lib/actions/journal';

const FOLDER_ICONS = [
  '📓', '📚', '📖', '📝', '✍️', '🧠', '💭', '🎯',
  '🔬', '🔭', '⚗️', '🧪', '💡', '🌟', '⭐', '✨',
  '📊', '📈', '🎨', '🖼️', '🎭', '🎪', '🎬', '📷',
  '🌍', '🌎', '🌏', '🗺️', '⛰️', '🏔️', '🌋', '🏝️'
];

const FOLDER_COLORS = [
  { name: 'Slate', value: '#64748b' },
  { name: 'Red', value: '#ef4444' },
  { name: 'Orange', value: '#f97316' },
  { name: 'Amber', value: '#f59e0b' },
  { name: 'Yellow', value: '#eab308' },
  { name: 'Lime', value: '#84cc16' },
  { name: 'Green', value: '#22c55e' },
  { name: 'Emerald', value: '#10b981' },
  { name: 'Teal', value: '#14b8a6' },
  { name: 'Cyan', value: '#06b6d4' },
  { name: 'Sky', value: '#0ea5e9' },
  { name: 'Blue', value: '#3b82f6' },
  { name: 'Indigo', value: '#6366f1' },
  { name: 'Violet', value: '#8b5cf6' },
  { name: 'Purple', value: '#a855f7' },
  { name: 'Fuchsia', value: '#d946ef' },
  { name: 'Pink', value: '#ec4899' },
  { name: 'Rose', value: '#f43f5e' }
];

export default function NewFolderForm() {
  const [name, setName] = useState('');
  const [icon, setIcon] = useState('📓');
  const [color, setColor] = useState('#14b8a6');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setError('Folder name is required');
      return;
    }

    setSaving(true);
    setError('');

    try {
      const result = await createJournalFolder(name.trim(), icon, color);

      if (result.error) {
        setError(result.error);
        return;
      }

      router.push('/journal');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create folder');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card variant="gradient">
        {error && (
          <div className="bg-red-50 border-2 border-red-400 text-red-900 px-5 py-4 rounded-xl font-bold mb-6">
            {error}
          </div>
        )}

        {/* Folder Name */}
        <div className="mb-8">
          <label htmlFor="name" className="block text-sm font-black text-slate-900 mb-3 uppercase tracking-wide">
            Folder Name *
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., Philosophy Notes, Research Ideas, Daily Reflections"
            className="w-full px-5 py-4 border-2 border-slate-300 rounded-xl text-lg font-medium focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
            maxLength={50}
            required
          />
          <p className="text-sm text-slate-500 font-medium mt-2">
            {name.length}/50 characters
          </p>
        </div>

        {/* Icon Selection */}
        <div className="mb-8">
          <label className="block text-sm font-black text-slate-900 mb-3 uppercase tracking-wide">
            Choose an Icon
          </label>
          <div className="grid grid-cols-8 gap-2">
            {FOLDER_ICONS.map((emoji) => (
              <button
                key={emoji}
                type="button"
                onClick={() => setIcon(emoji)}
                className={`text-3xl p-3 rounded-lg border-2 transition-all hover:scale-110 ${
                  icon === emoji
                    ? 'border-teal-500 bg-teal-50 shadow-md'
                    : 'border-slate-200 hover:border-teal-300'
                }`}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>

        {/* Color Selection */}
        <div className="mb-8">
          <label className="block text-sm font-black text-slate-900 mb-3 uppercase tracking-wide">
            Choose a Color
          </label>
          <div className="grid grid-cols-6 gap-3">
            {FOLDER_COLORS.map((c) => (
              <button
                key={c.value}
                type="button"
                onClick={() => setColor(c.value)}
                className={`h-12 rounded-lg border-2 transition-all hover:scale-105 ${
                  color === c.value
                    ? 'border-slate-900 shadow-lg ring-2 ring-slate-900 ring-offset-2'
                    : 'border-slate-200'
                }`}
                style={{ backgroundColor: c.value }}
                title={c.name}
              />
            ))}
          </div>
        </div>

        {/* Preview */}
        <div className="mb-8">
          <label className="block text-sm font-black text-slate-900 mb-3 uppercase tracking-wide">
            Preview
          </label>
          <Card variant="standard" className="inline-block">
            <div className="text-center px-8 py-6">
              <div className="text-5xl mb-3">{icon}</div>
              <div className="font-black text-slate-900 text-lg">
                {name || 'Folder Name'}
              </div>
            </div>
          </Card>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button
            type="button"
            variant="secondary"
            onClick={() => router.back()}
            disabled={saving}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            disabled={saving || !name.trim()}
          >
            {saving ? 'Creating...' : 'Create Folder'}
          </Button>
        </div>
      </Card>
    </form>
  );
}
