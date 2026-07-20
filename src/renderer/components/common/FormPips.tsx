import type { MatchOutcome } from "../../../shared/contracts/matchmaking";

export function FormPips({ form }: { form: readonly MatchOutcome[] }) {
  return (
    <span className="form-pips" aria-label={`Recent form ${form.join(", ")}`}>
      {form.map((item, index) => (
        <i key={`${item}-${index}`} className={`pip ${item}`} title={item.toUpperCase()} />
      ))}
    </span>
  );
}
