import React from "react";

export default function AddressCard({ address, isSelected, onSelect, onEdit, onRemove }) {
  return (
    <div
      className={`border rounded-lg p-4 mb-4 ${isSelected ? "border-pink-500" : "border-gray-300"
        } transition-all cursor-pointer`}
      onClick={() => onSelect()} // onSelect now called with no args, bound in parent
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <input
            type="radio"
            name="selectedAddress"
            checked={isSelected}
            onChange={() => onSelect()} // onSelect called without args
            className="accent-pink-500"
            onClick={e => e.stopPropagation()} // prevent parent click triggering twice
          />
          <div className="font-semibold">{address.fullName}</div>
          <span className="text-xs bg-gray-200 px-2 py-0.5 rounded-full">
            {(address.city || "").toUpperCase()}
          </span>
        </div>
      </div>
      <div className="text-sm mt-2 text-gray-700">{address.landmark}</div>
      <div className="text-sm mt-1">
        Mobile: <span className="font-semibold">{address.mobileNo}</span>
      </div>
      <div className="text-sm mt-1">
        pinCode: <span className="font-semibold">{address.zipCode}</span>
      </div>
      {address.cod && (
        <div className="text-xs text-green-600 mt-1">• Pay on Delivery available</div>
      )}
      <div className="mt-3 flex gap-3">
        <button
          onClick={e => {
            e.stopPropagation();
            onEdit(address.id);
          }}
          className="text-sm text-pink-500 font-medium"
        >
          EDIT
        </button>
        <button
          onClick={e => {
            e.stopPropagation();
            onRemove(address.id);
          }}
          className="text-sm text-gray-500"
        >
          REMOVE
        </button>
      </div>
    </div>
  );
}



