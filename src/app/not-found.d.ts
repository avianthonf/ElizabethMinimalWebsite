// Global analytics type declarations for 404 tracking

declare global {
  interface Window {
    gtag?: (
      command: string,
      eventName: string,
      params?: Record<string, string | number | boolean | undefined>,
    ) => void;
    va?: (
      command: string,
      params?: Record<string, string | number | boolean | Record<string, string>>,
    ) => void;
  }
}

export {};
