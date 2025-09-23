export function splitName(fullName?: string | null): { firstName: string; lastName: string } {
  const safe = (fullName || '').trim();
  if (!safe) return { firstName: 'User', lastName: 'Unknown' };
  const parts = safe.split(/\s+/);
  if (parts.length === 1) return { firstName: parts[0], lastName: '' };
  const firstName = parts.shift() as string;
  const lastName = parts.join(' ');
  return { firstName, lastName };
}
