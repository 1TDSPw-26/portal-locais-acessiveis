/**
 * Pure function to normalize form data before sending to any service.
 *
 * - Trims whitespace on string values.
 * - Trims strings inside arrays, preserving other element types.
 * - Recursively normalizes nested objects.
 * - Does **not** mutate the input object.
 * - Preserves undefined, null and empty arrays according to the contract.
 */
export function normalizarDadosFormulario<T extends Record<string, any>>(dados: T): T {
  const normalizarValor = (valor: any): any => {
    if (typeof valor === 'string') {
      return valor.trim();
    }
    if (Array.isArray(valor)) {
      return valor.map((elem) => (typeof elem === 'string' ? elem.trim() : elem));
    }
    if (valor && typeof valor === 'object') {
      // Recursively normalize nested objects
      return normalizarDadosFormulario(valor);
    }
    // Primitive types (number, boolean, null, undefined) remain unchanged
    return valor;
  };

  const resultado: any = {};
  for (const key of Object.keys(dados)) {
    const v = (dados as any)[key];
    // Preserve missing fields (undefined) exactly as they are
    if (v === undefined) {
      resultado[key] = undefined;
    } else {
      resultado[key] = normalizarValor(v);
    }
  }
  return resultado as T;
}
