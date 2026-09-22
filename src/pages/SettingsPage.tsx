import React, { useState } from 'react';
import { useUiStore } from '@/store/uiStore';
import { Button } from '@/components/common/Button';
import { Settings, MapPin, Bell, Shield, Save } from 'lucide-react';

const CITIES = ['Chennai', 'Mumbai', 'Bengaluru', 'Delhi NCR', 'Hyderabad', 'Kolkata', 'Pune'];

export const SettingsPage: React.FC = () => {
  const { selectedCity, setSelectedCity, addToast } = useUiStore();
  const [city, setCity] = useState(selectedCity);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [whatsappReminders, setWhatsappReminders] = useState(true);
  const [soundEffects, setSoundEffects] = useState(true);

  const handleSave = () => {
    setSelectedCity(city);
    addToast({
      type: 'success',
      message: 'Preferences updated successfully!',
    });
  };

  return (
    <div className="min-h-screen bg-surface-primary py-8 sm:py-12">
      <main className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="pb-6 border-b border-charcoal-200 mb-8">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-charcoal-900 tracking-tight flex items-center gap-2.5">
            <Settings className="w-7 h-7 text-brand-500" />
            <span>Preferences & Settings</span>
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-500 mt-1">
            Manage your default location, gate reminder notifications, and ticketing preferences.
          </p>
        </div>

        <div className="space-y-6">
          {/* Default Location Section */}
          <section className="bg-white rounded-2xl border border-charcoal-200 p-6 shadow-subtle">
            <h2 className="text-sm font-bold text-charcoal-900 flex items-center gap-2 mb-1">
              <MapPin className="w-4 h-4 text-brand-500" />
              <span>Default City Preference</span>
            </h2>
            <p className="text-xs text-charcoal-500 mb-4">
              Select which metro area is prioritized for event discovery recommendations.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {CITIES.map((c) => {
                const isSelected = city.toLowerCase() === c.toLowerCase();
                return (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setCity(c)}
                    className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all text-center ${
                      isSelected
                        ? 'border-brand-500 bg-brand-50 text-brand-600 shadow-2xs'
                        : 'border-charcoal-200 hover:border-charcoal-300 text-charcoal-700'
                    }`}
                  >
                    {c}
                  </button>
                );
              })}
            </div>
          </section>

          {/* Notifications Section */}
          <section className="bg-white rounded-2xl border border-charcoal-200 p-6 shadow-subtle space-y-4">
            <h2 className="text-sm font-bold text-charcoal-900 flex items-center gap-2 mb-1">
              <Bell className="w-4 h-4 text-brand-500" />
              <span>Notification Preferences</span>
            </h2>
            <p className="text-xs text-charcoal-500">
              Control how you receive flash-sale drops and booking receipts.
            </p>

            <div className="space-y-3 pt-2">
              <label className="flex items-center justify-between p-3 rounded-xl border border-charcoal-100 hover:bg-surface-secondary cursor-pointer">
                <div>
                  <span className="text-xs font-bold text-charcoal-900 block">Email Ticket Receipts & Passes</span>
                  <span className="text-[11px] text-charcoal-500">Instant PDF download links emailed immediately upon booking</span>
                </div>
                <input
                  type="checkbox"
                  checked={emailAlerts}
                  onChange={(e) => setEmailAlerts(e.target.checked)}
                  className="w-4 h-4 rounded border-charcoal-300 text-brand-500 focus:ring-brand-500"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-xl border border-charcoal-100 hover:bg-surface-secondary cursor-pointer">
                <div>
                  <span className="text-xs font-bold text-charcoal-900 block">WhatsApp Gate Reminders</span>
                  <span className="text-[11px] text-charcoal-500">Turnstile QR pass and gate opening reminders on event day</span>
                </div>
                <input
                  type="checkbox"
                  checked={whatsappReminders}
                  onChange={(e) => setWhatsappReminders(e.target.checked)}
                  className="w-4 h-4 rounded border-charcoal-300 text-brand-500 focus:ring-brand-500"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-xl border border-charcoal-100 hover:bg-surface-secondary cursor-pointer">
                <div>
                  <span className="text-xs font-bold text-charcoal-900 block">Queue Turn Alert Chimes</span>
                  <span className="text-[11px] text-charcoal-500">Audio chime when your turn arrives in the waiting room</span>
                </div>
                <input
                  type="checkbox"
                  checked={soundEffects}
                  onChange={(e) => setSoundEffects(e.target.checked)}
                  className="w-4 h-4 rounded border-charcoal-300 text-brand-500 focus:ring-brand-500"
                />
              </label>
            </div>
          </section>

          {/* Fair Access Guarantee Info */}
          <section className="bg-white rounded-2xl border border-charcoal-200 p-6 shadow-subtle">
            <h2 className="text-sm font-bold text-charcoal-900 flex items-center gap-2 mb-2">
              <Shield className="w-4 h-4 text-brand-500" />
              <span>FairFlash Policy FAQ</span>
            </h2>
            <div className="space-y-3 text-xs text-charcoal-600 leading-relaxed">
              <p>
                <strong>How does the Virtual Queue work?</strong> During high-demand flash sales, fans join a fair waiting room. Real-time allocations prevent server crashes and bot hoarding.
              </p>
              <p>
                <strong>How long is my reservation held?</strong> Once you enter the ticket selection screen, your selected seats are held for 10 minutes to allow ample time to complete payment.
              </p>
            </div>
          </section>

          {/* Save CTA */}
          <div className="flex justify-end pt-2">
            <Button
              variant="primary"
              size="lg"
              leftIcon={<Save className="w-4 h-4" />}
              onClick={handleSave}
              className="px-8 shadow-sm"
            >
              Save Preferences
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SettingsPage;
