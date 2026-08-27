import { useEffect, useRef, useState } from "react";

export interface ThemedSelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export function ThemedSelect({
  label,
  options,
  value,
  onChange,
  className,
  disabled = false,
  searchable = false,
  searchPlaceholder,
  displayValue
}: {
  label: string;
  options: ThemedSelectOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
  disabled?: boolean;
  searchable?: boolean;
  searchPlaceholder?: string;
  displayValue?: string;
}) {
  const dropdownRef = useRef<HTMLDetailsElement>(null);
  const [query, setQuery] = useState("");
  const selectedLabel = displayValue ?? options.find((option) => option.value === value)?.label ?? options[0]?.label ?? "";
  const visibleOptions = searchable
    ? options.filter((option) => option.label.toLowerCase().includes(query.trim().toLowerCase()))
    : options;

  useEffect(() => {
    const closeOnOutsideInteraction = (event: PointerEvent) => {
      const dropdown = dropdownRef.current;
      if (dropdown?.open && event.target instanceof Node && !dropdown.contains(event.target)) {
        dropdown.removeAttribute("open");
      }
    };

    document.addEventListener("pointerdown", closeOnOutsideInteraction);
    return () => document.removeEventListener("pointerdown", closeOnOutsideInteraction);
  }, []);

  return (
    <div className={className ? `themed-select-field ${className}` : "themed-select-field"}>
      {label && <span>{label}</span>}
      <details className="themed-select" ref={dropdownRef} onToggle={(event) => {
        if (!event.currentTarget.open) setQuery("");
      }}>
        <summary aria-disabled={disabled} onClick={(event) => {
          if (disabled) event.preventDefault();
        }}>{selectedLabel}</summary>
        <div className="themed-select-options">
          {searchable && (
            <input
              aria-label={`Search ${label}`}
              autoFocus
              className="themed-select-search"
              placeholder={searchPlaceholder}
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          )}
          <div className="themed-select-option-list" role="listbox" aria-label={label || "Select option"}>
            {visibleOptions.map((option) => (
              <button
                aria-selected={option.value === value}
                className={option.value === value ? "selected" : undefined}
                key={option.value}
                disabled={disabled || option.disabled}
                onClick={() => {
                  if (option.disabled) return;
                  onChange(option.value);
                  dropdownRef.current?.removeAttribute("open");
                }}
                role="option"
                type="button"
              >
                {option.label}
              </button>
            ))}
            {visibleOptions.length === 0 && <span className="themed-select-empty">No options found</span>}
          </div>
        </div>
      </details>
    </div>
  );
}
