/**
 * Business Logic & Data Formatting Rules (MANDATORY)
 */

/**
 * Format Base Price:
 * - Round down to 2 decimal places in billions ('xx,xx tỷ')
 * - Example: 15101436069 VNĐ -> 15,10 tỷ
 */
export function formatBasePrice(price: number | null | undefined): string {
  if (price === null || price === undefined || isNaN(price)) return '0,00 tỷ';
  const inBillion = price / 1_000_000_000;
  const roundedDown = Math.floor(inBillion * 100) / 100;
  return `${roundedDown.toFixed(2).replace('.', ',')} tỷ`;
}

/**
 * Format Land Area (m²)
 */
export function formatArea(area: number | null | undefined): string {
  if (area === null || area === undefined || isNaN(area)) return '-';
  return `${area.toLocaleString('vi-VN')} m²`;
}

/**
 * Format Directions:
 * - 1 direction normally.
 * - Corner units with >= 2 directions joined with " - ".
 * - Example: ["Tây Bắc", "Bắc"] -> "Tây Bắc - Bắc"
 */
export function formatDirections(directions: any): string {
  if (!directions) return '-';
  if (Array.isArray(directions)) {
    const list = directions
      .map((d: any) => {
        if (!d) return '';
        if (typeof d === 'object') {
          return d.value || d.name || d.code || '';
        }
        return String(d).trim();
      })
      .filter(Boolean);
    return list.join(' - ') || '-';
  }
  if (typeof directions === 'object' && directions !== null) {
    return directions.value || directions.name || directions.code || '-';
  }
  return String(directions);
}

/**
 * Format Date to Vietnamese format dd/MM/yyyy
 */
export function formatDate(dateString: string | null | undefined): string {
  if (!dateString) return '-';
  try {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return dateString;
    return d.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  } catch {
    return dateString;
  }
}
