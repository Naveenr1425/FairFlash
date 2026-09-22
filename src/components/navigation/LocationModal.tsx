import React from 'react';
import { Modal } from '@/components/common/Modal';
import { useUiStore } from '@/store/uiStore';
import { MapPin, Check } from 'lucide-react';
import { cn } from '@/utils/cn';

const POPULAR_CITIES = [
  { name: 'Chennai', state: 'Tamil Nadu', isPopular: true },
  { name: 'Mumbai', state: 'Maharashtra', isPopular: true },
  { name: 'Bengaluru', state: 'Karnataka', isPopular: true },
  { name: 'Delhi NCR', state: 'Delhi', isPopular: true },
  { name: 'Hyderabad', state: 'Telangana', isPopular: false },
  { name: 'Kolkata', state: 'West Bengal', isPopular: false },
  { name: 'Pune', state: 'Maharashtra', isPopular: false },
  { name: 'Ahmedabad', state: 'Gujarat', isPopular: false },
  { name: 'Kochi', state: 'Kerala', isPopular: false },
  { name: 'Coimbatore', state: 'Tamil Nadu', isPopular: false },
];

export const LocationModal: React.FC = () => {
  const { isLocationModalOpen, setLocationModalOpen, selectedCity, setSelectedCity } = useUiStore();

  const handleSelect = (city: string) => {
    setSelectedCity(city);
    setLocationModalOpen(false);
  };

  return (
    <Modal
      isOpen={isLocationModalOpen}
      onClose={() => setLocationModalOpen(false)}
      title="Select Your City"
      description="Choose your location to discover live events, concerts, and movies near you."
      maxWidth="lg"
    >
      <div>
        <h4 className="text-xs font-bold text-charcoal-400 uppercase tracking-wider mb-3">
          Popular Metros
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-6">
          {POPULAR_CITIES.filter((c) => c.isPopular).map((city) => {
            const isSelected = selectedCity.toLowerCase() === city.name.toLowerCase();
            return (
              <button
                key={city.name}
                type="button"
                onClick={() => handleSelect(city.name)}
                className={cn(
                  'flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all',
                  isSelected
                    ? 'border-brand-500 bg-brand-50/50 text-brand-600 font-semibold shadow-sm'
                    : 'border-charcoal-200 hover:border-charcoal-300 hover:bg-surface-secondary text-charcoal-800'
                )}
              >
                <div
                  className={cn(
                    'w-9 h-9 rounded-full flex items-center justify-center mb-1.5',
                    isSelected ? 'bg-brand-500 text-white' : 'bg-charcoal-100 text-charcoal-600'
                  )}
                >
                  <MapPin className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium">{city.name}</span>
                <span className="text-[10px] text-charcoal-400">{city.state}</span>
              </button>
            );
          })}
        </div>

        <h4 className="text-xs font-bold text-charcoal-400 uppercase tracking-wider mb-3">
          Other Cities
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {POPULAR_CITIES.filter((c) => !c.isPopular).map((city) => {
            const isSelected = selectedCity.toLowerCase() === city.name.toLowerCase();
            return (
              <button
                key={city.name}
                type="button"
                onClick={() => handleSelect(city.name)}
                className={cn(
                  'flex items-center justify-between px-3.5 py-2.5 rounded-lg border text-sm transition-all',
                  isSelected
                    ? 'border-brand-500 bg-brand-50/50 text-brand-600 font-semibold'
                    : 'border-charcoal-200 hover:border-charcoal-300 hover:bg-surface-secondary text-charcoal-700'
                )}
              >
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-charcoal-400" />
                  <span>{city.name}</span>
                  <span className="text-xs text-charcoal-400">({city.state})</span>
                </div>
                {isSelected && <Check className="w-4 h-4 text-brand-500" />}
              </button>
            );
          })}
        </div>
      </div>
    </Modal>
  );
};
