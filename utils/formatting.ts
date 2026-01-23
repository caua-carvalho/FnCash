/**
 * @file utils/formatting.ts
 * @description Funções utilitárias para formatação de dados
 * Centraliza formatação de moeda, data e tempo
 */

/**
 * Formata um número como moeda brasileira (R$)
 * @param {number} value - Valor a formatar
 * @returns {string} Valor formatado (ex: "R$ 1.234,56")
 * @example
 * formatCurrency(1234.56) // "R$ 1.234,56"
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}

/**
 * Formata um número apenas com separadores de milhar e decimal
 * Útil para exibir valores sem símbolo de moeda
 * @param {number} value - Valor a formatar
 * @returns {string} Valor formatado (ex: "1.234,56")
 * @example
 * formatNumber(1234.56) // "1.234,56"
 */
export function formatNumber(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

/**
 * Formata uma data para formato brasileiro
 * @param {Date | string} date - Data a formatar
 * @param {boolean} [includeTime] - Se deve incluir hora
 * @returns {string} Data formatada (ex: "24 de outubro de 2025")
 * @example
 * formatDate(new Date()) // "24 de outubro de 2025"
 * formatDate(new Date(), true) // "24 de outubro de 2025 às 14:30"
 */
export function formatDate(date: Date | string, includeTime: boolean = false): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;

  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  };

  if (includeTime) {
    options.hour = '2-digit';
    options.minute = '2-digit';
  }

  return new Intl.DateTimeFormat('pt-BR', options).format(dateObj);
}

/**
 * Formata uma data de forma curta (ex: "24 Out")
 * @param {Date | string} date - Data a formatar
 * @returns {string} Data formatada (ex: "24 Out")
 * @example
 * formatDateShort(new Date()) // "24 Out"
 */
export function formatDateShort(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;

  return new Intl.DateTimeFormat('pt-BR', {
    day: 'numeric',
    month: 'short',
  }).format(dateObj);
}

/**
 * Formata um tempo em segundos para formato HH:MM:SS
 * Útil para cronômetro de gravação
 * @param {number} seconds - Tempo em segundos
 * @returns {string} Tempo formatado (ex: "01:23:45")
 * @example
 * formatTime(3665) // "01:01:05"
 */
export function formatTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  const pad = (num: number) => String(num).padStart(2, '0');

  if (hours > 0) {
    return `${pad(hours)}:${pad(minutes)}:${pad(secs)}`;
  }

  return `${pad(minutes)}:${pad(secs)}`;
}

/**
 * Obtém o texto relativo de tempo (ex: "Hoje", "Ontem", "12 Out")
 * @param {Date | string} date - Data a formatar
 * @returns {string} Texto relativo
 * @example
 * getRelativeDate(new Date()) // "Hoje"
 * getRelativeDate(new Date(Date.now() - 86400000)) // "Ontem"
 */
export function getRelativeDate(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  // Compara apenas a data (sem hora)
  const isToday =
    dateObj.getDate() === today.getDate() &&
    dateObj.getMonth() === today.getMonth() &&
    dateObj.getFullYear() === today.getFullYear();

  const isYesterday =
    dateObj.getDate() === yesterday.getDate() &&
    dateObj.getMonth() === yesterday.getMonth() &&
    dateObj.getFullYear() === yesterday.getFullYear();

  if (isToday) return 'Hoje';
  if (isYesterday) return 'Ontem';

  return formatDateShort(dateObj);
}

/**
 * Agrupa transações por data relativa
 * @param {Array<{date: Date}>} items - Items com propriedade date
 * @returns {Object} Items agrupados por período
 * @example
 * groupByRelativeDate(transactions)
 * // { "Hoje": [...], "Ontem": [...], "12 Out": [...] }
 */
export function groupByRelativeDate<T extends { date: Date | string }>(
  items: T[]
): Record<string, T[]> {
  return items.reduce(
    (acc, item) => {
      const key = getRelativeDate(item.date);
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(item);
      return acc;
    },
    {} as Record<string, T[]>
  );
}
