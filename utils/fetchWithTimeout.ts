/**
 * @file utils/fetchWithTimeout.ts
 * @description Wrapper de fetch com timeout compatível com iOS, Android e Web
 */

export async function fetchWithTimeout(
  input: RequestInfo,
  init: RequestInit = {},
  timeout: number
): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    return await fetch(input, {
      ...init,
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeoutId);
  }
}
