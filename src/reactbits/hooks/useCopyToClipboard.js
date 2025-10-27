import { useCallback, useState } from 'react';

export default function useCopyToClipboard() {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(async (text) => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const ta = document.createElement('textarea');
        ta.value = String(text);
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.focus();
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 900);
      return true;
    } catch {
      setCopied(false);
      return false;
    }
  }, []);

  return [copied, copy];
}

