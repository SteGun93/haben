import { useId, useState, type Ref } from "react";

/**
 * Dateiauswahl mit deutscher Beschriftung; der Browser schreibt sonst je nach Sprache „Choose Files“.
 * Gehört in `Field` (`{...control}`). Das Eingabefeld bleibt unsichtbar, aber für Tastatur und Formular erreichbar; die sichtbare
 * Fläche ist ein `<label>` daneben, der Klick darauf öffnet die Auswahl. Sie ist für Screenreader verborgen, denn das Feld nennt
 * seinen Zustand selbst, und der Name soll nur der Feldname von `Field` sein.
 */
export function FilePicker({
  name,
  accept,
  multiple,
  required,
  id,
  inputRef,
  ariaLabel,
  "aria-describedby": describedBy,
  "aria-invalid": invalid,
}: {
  name?: string;
  accept?: string;
  multiple?: boolean;
  required?: boolean;
  id?: string;
  inputRef?: Ref<HTMLInputElement>;
  ariaLabel?: string;
  "aria-describedby"?: string | undefined;
  "aria-invalid"?: true | undefined;
}) {
  const [files, setFiles] = useState<string[]>([]);
  const ownId = useId();
  const inputId = id ?? ownId;
  return (
    <>
      <input
        id={inputId}
        ref={inputRef}
        name={name}
        type="file"
        accept={accept}
        multiple={multiple}
        required={required}
        aria-label={ariaLabel}
        aria-describedby={describedBy}
        aria-invalid={invalid}
        className="visually-hidden"
        onChange={(e) => setFiles([...(e.target.files ?? [])].map((f) => f.name))}
      />
      <label className="file-picker" htmlFor={inputId} aria-hidden="true">
        <span className="btn btn-sm">{multiple ? "Dateien wählen" : "Datei wählen"}</span>
        <span className="file-picker-name">
          {files.length === 0 ? (multiple ? "Keine Dateien gewählt" : "Keine Datei gewählt") : files.length > 2 ? `${files.length} Dateien` : files.join(", ")}
        </span>
      </label>
    </>
  );
}
