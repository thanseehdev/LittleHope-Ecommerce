import React from "react";

export default function AddressCard({ address, isSelected, onSelect, onEdit, onRemove }) {
  return (
    <div
      className={`border rounded-lg p-4 mb-4 ${isSelected ? "border-pink-500" : "border-gray-300"} transition-all`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <input
            type="radio"
            checked={isSelected}
            onChange={onSelect}
            className="accent-pink-500"
          />
          <div className="font-semibold">{address.name}</div>
          <span className="text-xs bg-gray-200 px-2 py-0.5 rounded-full">
            {address.tag.toUpperCase()}
          </span>
        </div>
      </div>
      <div className="text-sm mt-2 text-gray-700">{address.details}</div>
      <div className="text-sm mt-1">
        Mobile: <span className="font-semibold">{address.phone}</span>
      </div>
      {address.cod && (
        <div className="text-xs text-green-600 mt-1">• Pay on Delivery available</div>
      )}
      <div className="mt-3 flex gap-3">
        <button onClick={onEdit} className="text-sm text-pink-500 font-medium">EDIT</button>
        <button onClick={onRemove} className="text-sm text-gray-500">REMOVE</button>
      </div>
    </div>
  );
}
