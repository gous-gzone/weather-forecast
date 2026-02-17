export default function UnitSwitcher({ currentUnit, onUnitChange, loading }) {
  const units = [
    { value: 'm', label: 'Metric (°C)' },
    { value: 'f', label: 'Fahrenheit (°F)' },
    { value: 's', label: 'Scientific (K)' }
  ];

  return (
    <div className="flex gap-2 flex-wrap justify-center">
      {units.map((unit) => (
        <button
          key={unit.value}
          onClick={() => onUnitChange(unit.value)}
          disabled={loading}
          className={`px-4 py-2 rounded-xl transition-all ${
            currentUnit === unit.value
              ? 'bg-white text-blue-600 shadow-lg'
              : 'bg-white/20 text-white hover:bg-white/30'
          } disabled:opacity-50`}
        >
          {unit.label}
        </button>
      ))}
    </div>
  );
}
