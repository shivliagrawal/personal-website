// Device matrix shared by screenshot.mjs and scripts/qa-check.mjs.
// CSS-pixel viewports of real Apple hardware plus common desktop sizes.
export const DEVICES = {
  'iphone-se':        { width: 375,  height: 667,  deviceScaleFactor: 2, isMobile: true,  hasTouch: true },
  'iphone-15-pro':    { width: 393,  height: 852,  deviceScaleFactor: 3, isMobile: true,  hasTouch: true },
  'iphone-landscape': { width: 852,  height: 393,  deviceScaleFactor: 3, isMobile: true,  hasTouch: true },
  'ipad-mini':        { width: 744,  height: 1133, deviceScaleFactor: 2, isMobile: true,  hasTouch: true },
  'ipad-pro':         { width: 1024, height: 1366, deviceScaleFactor: 2, isMobile: true,  hasTouch: true },
  'ipad-landscape':   { width: 1366, height: 1024, deviceScaleFactor: 2, isMobile: true,  hasTouch: true },
  'macbook-air':      { width: 1470, height: 956,  deviceScaleFactor: 2, isMobile: false, hasTouch: false },
  'desktop-1080':     { width: 1920, height: 1080, deviceScaleFactor: 1, isMobile: false, hasTouch: false },
  'desktop-1440':     { width: 2560, height: 1440, deviceScaleFactor: 1, isMobile: false, hasTouch: false },
};

// A small representative set for quick visual passes.
export const QUICK = ['iphone-15-pro', 'ipad-mini', 'macbook-air'];

export function pickDevices(arg) {
  if (!arg || arg === 'quick') return QUICK;
  if (arg === 'all') return Object.keys(DEVICES);
  const names = arg.split(',').map((s) => s.trim()).filter(Boolean);
  for (const n of names) if (!DEVICES[n]) throw new Error(`Unknown device "${n}". Known: ${Object.keys(DEVICES).join(', ')}`);
  return names;
}
