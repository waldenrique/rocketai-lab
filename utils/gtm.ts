declare global {
  interface Window {
    dataLayer?: any[];
  }
}

export function pushToDataLayer(event: string, params: Record<string, any> = {}) {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({ event, ...params });
  }
}
