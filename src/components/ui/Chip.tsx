import type { ReactNode } from 'react';

interface ChipProps {
  /** Bold lead-in, e.g. a figure number. */
  label?: string;
  children: ReactNode;
  className?: string;
}

/** Square mono caption with a pulsing accent dot. */
export default function Chip({ label, children, className }: ChipProps) {
  return (
    <span className={['chip', className].filter(Boolean).join(' ')}>
      {label && <b>{label}</b>}
      {children}
    </span>
  );
}
