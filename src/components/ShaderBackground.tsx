"use client";

import React, { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import {
  Shader,
  Swirl,
  ChromaFlow,
  FlutedGlass,
  FilmGrain,
  getWebGPUSupport,
} from "shaders/react";

const StaticFallback: React.FC = () => (
  <div
    aria-hidden
    style={{
      position: "absolute",
      inset: 0,
      background:
        "radial-gradient(120% 90% at 20% 10%, #fbf9ef 0%, #f6f3e8 45%, #f0ede1 100%)",
    }}
  />
);

// --- Debug overlay -----------------------------------------------------
// Visit the page with ?shaderdebug=1 in the URL (works on your phone too,
// just type it into the address bar) to see live diagnostics instead of
// guessing. Remove this whole block once you've root-caused the issue.

const DEBUG_PARAM = "shaderdebug";

type DebugInfo = {
  isSecureContext: boolean;
  hasNavigatorGPU: boolean;
  webgpuSupported: boolean | null;
  unavailableReason: string | null;
};

const DebugOverlay: React.FC<{ info: DebugInfo }> = ({ info }) => (
  <div
    style={{
      position: "fixed",
      bottom: 8,
      left: 8,
      zIndex: 999999,
      background: "rgba(0,0,0,0.8)",
      color: "#fff",
      font: "11px/1.5 monospace",
      padding: "8px 10px",
      borderRadius: 6,
      maxWidth: 280,
      pointerEvents: "none",
    }}
  >
    <div>secure context: {String(info.isSecureContext)}</div>
    <div>navigator.gpu present: {String(info.hasNavigatorGPU)}</div>
    <div>
      getWebGPUSupport():{" "}
      {info.webgpuSupported === null ? "checking…" : String(info.webgpuSupported)}
    </div>
    <div>unavailable reason: {info.unavailableReason ?? "—"}</div>
  </div>
);

// -------------------------------------------------------------------------

export const ShaderBackground: React.FC = () => {
  const [unavailable, setUnavailable] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [debugInfo, setDebugInfo] = useState<DebugInfo>({
    isSecureContext: true,
    hasNavigatorGPU: false,
    webgpuSupported: null,
    unavailableReason: null,
  });

  const showDebug =
    typeof window !== "undefined" &&
    new URLSearchParams(window.location.search).has(DEBUG_PARAM);

  useEffect(() => {
    setMounted(true); // also guards the createPortal call below (needs document.body)

    setDebugInfo((prev) => ({
      ...prev,
      isSecureContext: window.isSecureContext,
      hasNavigatorGPU: typeof (navigator as any).gpu !== "undefined",
    }));

    getWebGPUSupport()
      .then(({ supported }: { supported: boolean }) =>
        setDebugInfo((prev) => ({ ...prev, webgpuSupported: supported }))
      )
      .catch(() => setDebugInfo((prev) => ({ ...prev, webgpuSupported: false })));
  }, []);

  const renderScale = useMemo(() => {
    if (typeof window === "undefined") return 1;
    const dpr = window.devicePixelRatio || 1;
    return dpr >= 1.5 ? 0.5 : 0.75;
  }, []);

  if (!mounted) return null;

  const content = (
    <div className="fixed inset-0 w-full h-full overflow-hidden" style={{ zIndex: -1 }}>
      {unavailable ? (
        <StaticFallback />
      ) : (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: `${renderScale * 100}%`,
            height: `${renderScale * 100}%`,
            transform: `scale(${1 / renderScale})`,
            transformOrigin: "top left",
          }}
        >
          <Shader
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              display: "block",
            }}
            onUnavailable={(reason: string) => {
              setUnavailable(true);
              setDebugInfo((prev) => ({ ...prev, unavailableReason: reason }));
            }}
          >
            <Swirl colorA="#fbf9ef" colorB="#f0ede1" detail={1.7} />
            <ChromaFlow
              baseColor="#fbf9ef"
              downColor="#FF5C00"
              leftColor="#FF8C00"
              rightColor="#FF4500"
              upColor="#FFD700"
              momentum={13}
              radius={3.5}
            />
            <FlutedGlass
              aberration={0.61}
              angle={31}
              frequency={8}
              highlight={0.12}
              highlightSoftness={0}
              lightAngle={-90}
              refraction={4}
              shape="rounded"
              softness={1}
              speed={0.15}
            />
            <FilmGrain strength={0.05} />
          </Shader>
        </div>
      )}
      {showDebug && <DebugOverlay info={debugInfo} />}
    </div>
  );

  // Rendered via a portal straight into document.body. This is the fix for
  // the most common "fixed background works on desktop, not on mobile"
  // cause: if ANY ancestor of this component has `transform`, `filter`,
  // `perspective`, or `will-change: transform` set on it (GSAP applies
  // exactly this to elements it animates), `position: fixed` stops being
  // relative to the real viewport and becomes relative to that ancestor
  // instead — which can push this off-screen or collapse it to 0 size on
  // whatever layout your mobile breakpoint uses. Portaling to <body>
  // sidesteps that entirely.
  return createPortal(content, document.body);
};