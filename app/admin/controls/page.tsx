import { getPlatformSettings } from '@/lib/admin/utils';
import { Settings, Power, Shield, Database, AlertTriangle, RefreshCw, Download, Trash2 } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminControlsPage() {
  const { settings } = await getPlatformSettings();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
          <Settings className="w-8 h-8 text-teal-400" />
          Platform Controls
        </h1>
        <p className="text-slate-400 mt-1">Manage platform settings and emergency controls</p>
      </div>

      {/* Emergency Controls */}
      <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6">
        <h2 className="text-xl font-semibold text-red-400 mb-4 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5" />
          Emergency Controls
        </h2>
        <p className="text-slate-400 mb-4">Use these controls only in emergency situations.</p>
        <div className="flex items-center gap-4">
          <button className="px-6 py-3 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors border border-red-500/30 flex items-center gap-2">
            <Power className="w-5 h-5" />
            Enable Maintenance Mode
          </button>
          <button className="px-6 py-3 bg-orange-500/20 text-orange-400 rounded-lg hover:bg-orange-500/30 transition-colors border border-orange-500/30 flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Disable New Registrations
          </button>
        </div>
      </div>

      {/* Feature Flags */}
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
          <Settings className="w-5 h-5 text-teal-400" />
          Feature Flags
        </h2>
        <div className="space-y-4">
          <ToggleSetting
            label="Maintenance Mode"
            description="When enabled, users see a maintenance page"
            enabled={settings.maintenance_mode === 'true'}
            settingKey="maintenance_mode"
            dangerous
          />
          <ToggleSetting
            label="User Registration"
            description="Allow new users to sign up"
            enabled={settings.registration_open === 'true'}
            settingKey="registration_open"
          />
          <ToggleSetting
            label="Debate Creation"
            description="Allow users to create new debates"
            enabled={settings.debate_creation_enabled === 'true'}
            settingKey="debate_creation_enabled"
          />
          <ToggleSetting
            label="AI Moderation"
            description="Automatically flag potentially problematic content"
            enabled={settings.ai_moderation_enabled === 'true'}
            settingKey="ai_moderation_enabled"
          />
          <ToggleSetting
            label="Daily Question"
            description="Show the daily featured question"
            enabled={settings.daily_question_enabled === 'true'}
            settingKey="daily_question_enabled"
          />
        </div>
      </div>

      {/* Database Actions */}
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
          <Database className="w-5 h-5 text-teal-400" />
          Database Actions
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <ActionButton
            label="Export Users CSV"
            description="Download all user data"
            icon={Download}
            color="blue"
          />
          <ActionButton
            label="Export Analytics"
            description="Download platform analytics"
            icon={Download}
            color="blue"
          />
          <ActionButton
            label="Clear Cache"
            description="Clear all cached data"
            icon={RefreshCw}
            color="yellow"
          />
          <ActionButton
            label="Reindex Search"
            description="Rebuild search indexes"
            icon={RefreshCw}
            color="yellow"
          />
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-slate-800 rounded-xl p-6 border border-red-500/30">
        <h2 className="text-xl font-semibold text-red-400 mb-4 flex items-center gap-2">
          <Trash2 className="w-5 h-5" />
          Danger Zone
        </h2>
        <p className="text-slate-400 mb-4">
          These actions are destructive and cannot be undone. Use with extreme caution.
        </p>
        <div className="space-y-4">
          <DangerAction
            label="Delete All Test Users"
            description="Remove all accounts created in the last 24 hours"
          />
          <DangerAction
            label="Reset All Metrics"
            description="Clear all analytics and metrics data"
          />
          <DangerAction
            label="Purge Content Reports"
            description="Delete all resolved content reports"
          />
        </div>
      </div>

      {/* System Info */}
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <h2 className="text-xl font-semibold text-white mb-4">System Information</h2>
        <div className="grid grid-cols-2 gap-4">
          <InfoRow label="Environment" value={process.env.NODE_ENV || 'development'} />
          <InfoRow label="Next.js Version" value="15.x" />
          <InfoRow label="Database" value="Supabase PostgreSQL" />
          <InfoRow label="Last Deploy" value={new Date().toLocaleDateString()} />
        </div>
      </div>
    </div>
  );
}

function ToggleSetting({
  label,
  description,
  enabled,
  settingKey,
  dangerous = false,
}: {
  label: string;
  description: string;
  enabled: boolean;
  settingKey: string;
  dangerous?: boolean;
}) {
  return (
    <div className="flex items-center justify-between py-4 border-b border-slate-700 last:border-0">
      <div>
        <p className={`font-medium ${dangerous ? 'text-red-400' : 'text-white'}`}>{label}</p>
        <p className="text-sm text-slate-400">{description}</p>
      </div>
      <button
        data-setting={settingKey}
        className={`w-14 h-8 rounded-full transition-colors relative ${
          enabled
            ? dangerous
              ? 'bg-red-500'
              : 'bg-teal-500'
            : 'bg-slate-600'
        }`}
      >
        <div
          className={`w-6 h-6 bg-white rounded-full absolute top-1 transition-transform ${
            enabled ? 'translate-x-7' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );
}

function ActionButton({
  label,
  description,
  icon: Icon,
  color,
}: {
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: 'blue' | 'yellow';
}) {
  const colorClasses = {
    blue: 'bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 border-blue-500/30',
    yellow: 'bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30 border-yellow-500/30',
  };

  return (
    <button className={`p-4 rounded-lg border transition-colors text-left ${colorClasses[color]}`}>
      <div className="flex items-center gap-3">
        <Icon className="w-5 h-5" />
        <div>
          <p className="font-medium">{label}</p>
          <p className="text-sm opacity-70">{description}</p>
        </div>
      </div>
    </button>
  );
}

function DangerAction({
  label,
  description,
}: {
  label: string;
  description: string;
}) {
  return (
    <div className="flex items-center justify-between py-3">
      <div>
        <p className="font-medium text-white">{label}</p>
        <p className="text-sm text-slate-400">{description}</p>
      </div>
      <button className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors border border-red-500/30">
        Execute
      </button>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-slate-400">{label}</span>
      <span className="text-white font-medium">{value}</span>
    </div>
  );
}
