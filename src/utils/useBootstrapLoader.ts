import { useEffect } from 'react';

const BOOTSTRAP_CDN_ID = 'bootstrap-isolated-stylesheet';
const BOOTSTRAP_CDN_URL = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css';

/**
 * Hook to dynamically load Bootstrap CSS only when the component is mounted,
 * and cleanly remove it upon unmounting so it NEVER pollutes MUI or other pages.
 */
export function useBootstrapLoader() {
  useEffect(() => {
    let link = document.getElementById(BOOTSTRAP_CDN_ID) as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement('link');
      link.id = BOOTSTRAP_CDN_ID;
      link.rel = 'stylesheet';
      link.href = BOOTSTRAP_CDN_URL;
      document.head.appendChild(link);
    }

    return () => {
      // Remove bootstrap stylesheet when leaving the page
      const currentLink = document.getElementById(BOOTSTRAP_CDN_ID);
      if (currentLink && currentLink.parentNode) {
        currentLink.parentNode.removeChild(currentLink);
      }
    };
  }, []);
}
