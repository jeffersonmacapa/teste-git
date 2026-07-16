import * as React from 'react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

export interface CampoTextoProps {
  id: string;
  label: string;
  value: string;
  onChange: (
    evento: React.ChangeEvent<HTMLInputElement>,
  ) => void;
  onBlur: () => void;
  error?: string;
  inputRef?: React.Ref<HTMLInputElement>;
  type?: string;
  autoComplete?: string;
  placeholder?: string;
  maxLength?: number;
  required?: boolean;
  inputMode?: 'text' | 'email' | 'tel' | 'url' | 'numeric' | 'decimal';
  descritorExtra?: string;
}

export function CampoTexto({
  id,
  label,
  value,
  onChange,
  onBlur,
  error,
  inputRef,
  type = 'text',
  autoComplete,
  placeholder,
  maxLength,
  required,
  inputMode,
  descritorExtra,
}: CampoTextoProps) {
  const idErro = `${id}-erro`;
  const idHint = `${id}-hint`;
  const temErro = Boolean(error);
  const descritores = [error ? idErro : null, descritorExtra ? idHint : null]
    .filter(Boolean)
    .join(' ');

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id}>
        {label}
        {required ? (
          <span className="text-destructive" aria-hidden="true">
            {' '}
            *
          </span>
        ) : null}
      </Label>
      <Input
        id={id}
        ref={inputRef}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        aria-invalid={temErro || undefined}
        aria-describedby={descritores || undefined}
        autoComplete={autoComplete}
        placeholder={placeholder}
        maxLength={maxLength}
        required={required}
        inputMode={inputMode}
        className={cn(temErro && 'border-destructive ring-destructive')}
      />
      {descritorExtra ? (
        <p id={idHint} className="text-xs text-muted-foreground">
          {descritorExtra}
        </p>
      ) : null}
      {temErro ? (
        <p
          id={idErro}
          role="alert"
          className="text-sm font-medium text-destructive"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}