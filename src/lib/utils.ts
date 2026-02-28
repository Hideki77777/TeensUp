/**
 * Formata um número grande com sufixo (ex: 1500 → "1.5k")
 */
export function formatarNumero(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`
  return String(n)
}

/**
 * Retorna a data de hoje no formato YYYY-MM-DD
 */
export function hoje(): string {
  return new Date().toISOString().split('T')[0]
}

/**
 * Retorna a data de ontem no formato YYYY-MM-DD
 */
export function ontem(): string {
  return new Date(Date.now() - 86400000).toISOString().split('T')[0]
}

/**
 * Embaralha um array (Fisher-Yates)
 */
export function embaralhar<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

/**
 * Clamp: mantém valor entre min e max
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value))
}
