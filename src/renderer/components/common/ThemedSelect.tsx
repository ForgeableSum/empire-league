import { useRef } from "react";

export interface ThemedSelectOption {
  value: string;
  label: string;
}

export function ThemedSelect({
  label,
  options,
  value,
  onChange,
  className
}: {
  label: string;
  options: ThemedSelectOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}) {
  const dropdownRef = useRef<HTMLDetailsElement>(null);
  const selectedLabel = options.find((option) => option.value === value)?.label ?? options[0]?.label ?? "";

  return (
    <div className={className ? `themed-select-field ${className}` : "themed-select-field"}>
      <span>{label}</span>
      <details className="themed-select" ref={dropdownRef}>
        <summary>{selectedLabel}</summary>
        <div className="themed-select-options" role="listbox" aria-label={label}>
          {options.map((option) => (
            <button
              aria-selected={option.value === value}
              className={option.value === value ? "selected" : undefined}
              key={option.value}
              onClick={() => {
                onChange(option.value);
                dropdownRef.current?.removeAttribute("open");
              }}
              role="option"
              type="button"
            >
              {option.label}
            </button>
          ))}
        </div>
      </details>
    </div>
  );
}
