function FieldView({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col items-start">
      <p className="text-sm font-medium text-gray-400 mb-1">{label}</p>
      <p className="text-white text-sm">{value || '—'}</p>
    </div>
  );
}

export default FieldView;
