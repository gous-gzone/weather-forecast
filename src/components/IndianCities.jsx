import { MapPin } from 'lucide-react';

const INDIAN_CITIES = [
  { name: 'Mumbai', state: 'Maharashtra' },
  { name: 'Delhi', state: 'Delhi' },
  { name: 'Bangalore', state: 'Karnataka' },
  { name: 'Hyderabad', state: 'Telangana' },
  { name: 'Chennai', state: 'Tamil Nadu' },
  { name: 'Kolkata', state: 'West Bengal' },
  { name: 'Pune', state: 'Maharashtra' },
  { name: 'Ahmedabad', state: 'Gujarat' },
  { name: 'Jaipur', state: 'Rajasthan' },
  { name: 'Lucknow', state: 'Uttar Pradesh' }
];

export default function IndianCities({ onCitySelect, loading }) {
  return (
    <div className="w-full max-w-4xl">
      <h3 className="text-white/80 text-sm font-medium mb-3 flex items-center gap-2">
        <MapPin className="w-4 h-4" />
        Quick Select - Indian Cities
      </h3>
      <div className="flex flex-wrap gap-2">
        {INDIAN_CITIES.map((city) => (
          <button
            key={city.name}
            onClick={() => onCitySelect(city.name)}
            disabled={loading}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white rounded-lg transition-all text-sm disabled:opacity-50"
          >
            {city.name}
          </button>
        ))}
      </div>
    </div>
  );
}
