import { RadioSelectModalProps } from "@/types/product";
import React from "react";

const RadioSelectModal = ({
  title,
  detail,
  options,
  selectedId,
  onSelect,
  onCancel,
  onSubmit,
  cancelLabel = "Cancel",
  submitLabel = "Submit",
}: RadioSelectModalProps) => {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <h2 className="text-lg font-semibold mb-2">{title}</h2>
        <p className="text-sm text-gray-500 mb-4">{detail}</p>

        <ul className="max-h-64 overflow-y-auto border rounded mb-4">
          {options.map((option) => (
            <li
              key={option.id}
              className="flex items-center gap-2 px-3 py-2 border-b last:border-b-0"
            >
              <input
                type="radio"
                name="reassignTo"
                value={option.id}
                checked={selectedId === option.id}
                onChange={() => onSelect(option.id)}
                id={`radio-select-${option.id}`}
              />
              <label
                htmlFor={`radio-select-${option.id}`}
                className="cursor-pointer"
              >
                {option.label}
              </label>
            </li>
          ))}
        </ul>

        <div className="flex justify-end gap-2">
          <button className="px-4 py-2 rounded border" onClick={onCancel}>
            {cancelLabel}
          </button>
          <button
            className="px-4 py-2 rounded bg-red-600 text-white disabled:opacity-50"
            disabled={!selectedId}
            onClick={onSubmit}
          >
            {submitLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RadioSelectModal;
