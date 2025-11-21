'use client';

import { useState, useEffect } from 'react';
import { Megaphone, Send, Clock, Users, Mail, Trash2 } from 'lucide-react';

export default function AdminAnnouncementsPage() {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [targetAudience, setTargetAudience] = useState('all');
  const [sendEmail, setSendEmail] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [announcements, setAnnouncements] = useState<Array<{
    id: string;
    title: string;
    message: string;
    target_audience: string;
    sent_via_email: boolean;
    created_at: string;
    is_active: boolean;
  }>>([]);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  async function fetchAnnouncements() {
    const response = await fetch('/api/admin/announcements');
    if (response.ok) {
      const data = await response.json();
      setAnnouncements(data.announcements || []);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !message.trim()) return;

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/admin/announcements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          message,
          targetAudience,
          sendEmail,
        }),
      });

      if (response.ok) {
        setTitle('');
        setMessage('');
        setTargetAudience('all');
        setSendEmail(false);
        fetchAnnouncements();
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDelete(id: string) {
    const response = await fetch(`/api/admin/announcements?id=${id}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      fetchAnnouncements();
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
          <Megaphone className="w-8 h-8 text-teal-400" />
          Announcements
        </h1>
        <p className="text-slate-400 mt-1">Send announcements to your users</p>
      </div>

      {/* New Announcement Form */}
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <h2 className="text-xl font-semibold text-white mb-4">New Announcement</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Announcement title..."
              className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Message
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your announcement..."
              rows={6}
              className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Target Audience
              </label>
              <select
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="all">All Users</option>
                <option value="verified">Verified Users Only</option>
                <option value="new_users">New Users (Last 7 Days)</option>
                <option value="active_users">Active Users (Last 7 Days)</option>
              </select>
            </div>

            <div className="flex items-end">
              <label className="flex items-center gap-3 px-4 py-3 bg-slate-700 rounded-lg cursor-pointer w-full">
                <input
                  type="checkbox"
                  checked={sendEmail}
                  onChange={(e) => setSendEmail(e.target.checked)}
                  className="w-5 h-5 rounded bg-slate-600 border-slate-500 text-teal-500 focus:ring-teal-500"
                />
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-300">Also send via email</span>
                </div>
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting || !title.trim() || !message.trim()}
            className="w-full px-6 py-3 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <Send className="w-5 h-5" />
            {isSubmitting ? 'Sending...' : 'Send Announcement'}
          </button>
        </form>
      </div>

      {/* Previous Announcements */}
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <h2 className="text-xl font-semibold text-white mb-4">Previous Announcements</h2>
        <div className="space-y-4">
          {announcements.length > 0 ? (
            announcements.map((announcement) => (
              <div
                key={announcement.id}
                className="p-4 bg-slate-700/50 rounded-lg"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-white">{announcement.title}</h3>
                  <button
                    onClick={() => handleDelete(announcement.id)}
                    className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-600 rounded transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-slate-300 mb-3">{announcement.message}</p>
                <div className="flex items-center gap-4 text-sm text-slate-500">
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {announcement.target_audience === 'all'
                      ? 'All Users'
                      : announcement.target_audience.replace('_', ' ')}
                  </span>
                  {announcement.sent_via_email && (
                    <span className="flex items-center gap-1">
                      <Mail className="w-4 h-4" />
                      Email sent
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {new Date(announcement.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-slate-500 text-center py-8">No announcements yet</p>
          )}
        </div>
      </div>
    </div>
  );
}
