import { useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

interface TurnstileOptions {
  sitekey: string;
  callback: (token: string) => void;
  'expired-callback': () => void;
  'error-callback': () => boolean;
}

interface TurnstileApi {
  render: (container: HTMLElement, options: TurnstileOptions) => string;
  remove: (widgetId: string) => void;
}

interface TurnstileWidgetProps {
  siteKey?: string;
  onVerify: (token: string) => void;
  onExpire: () => void;
  onError: () => void;
  error?: string;
}

const TURNSTILE_SCRIPT_ID = 'cloudflare-turnstile-script';
const TURNSTILE_SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';

let scriptPromise: Promise<TurnstileApi> | undefined;

const loadTurnstile = (): Promise<TurnstileApi> => {
  if (window.turnstile) return Promise.resolve(window.turnstile);
  if (scriptPromise) return scriptPromise;

  scriptPromise = new Promise((resolve, reject) => {
    const existingScript = document.getElementById(TURNSTILE_SCRIPT_ID);

    if (existingScript) {
      existingScript.addEventListener('load', () => {
        if (window.turnstile) resolve(window.turnstile);
        else reject(new Error('Turnstile API yüklenemedi.'));
      }, { once: true });
      existingScript.addEventListener('error', reject, { once: true });
      return;
    }

    const script = document.createElement('script');
    script.id = TURNSTILE_SCRIPT_ID;
    script.src = TURNSTILE_SRC;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      if (window.turnstile) resolve(window.turnstile);
      else reject(new Error('Turnstile API yüklenemedi.'));
    };
    script.onerror = reject;
    document.head.appendChild(script);
  });

  return scriptPromise;
};

export default function TurnstileWidget({ siteKey, onVerify, onExpire, onError, error }: TurnstileWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    if (!siteKey || !containerRef.current) return undefined;

    let cancelled = false;

    loadTurnstile()
      .then((turnstile) => {
        if (cancelled || !containerRef.current) return;

        widgetIdRef.current = turnstile.render(containerRef.current, {
          sitekey: siteKey,
          callback: (token) => onVerify(token),
          'expired-callback': () => onExpire(),
          'error-callback': () => {
            onError();
            return true;
          },
        });
        setIsReady(true);
      })
      .catch(() => {
        setLoadError(true);
        onError();
      });

    return () => {
      cancelled = true;
      if (window.turnstile && widgetIdRef.current) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, [siteKey, onVerify, onExpire, onError]);

  if (!siteKey) {
    return (
      <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-800">
        Turnstile site key tanımlı değil. Canlıya almadan önce <code>VITE_TURNSTILE_SITE_KEY</code> değerini ekleyin.
      </div>
    );
  }

  return (
    <div>
      <div ref={containerRef} className="min-h-[65px]" />
      {!isReady && !loadError && (
        <p className="text-xs text-gray-500 mt-1">Güvenlik doğrulaması yükleniyor...</p>
      )}
      {loadError && (
        <p className="text-red-500 text-xs mt-1">Güvenlik doğrulaması yüklenemedi. Lütfen sayfayı yenileyin.</p>
      )}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}
