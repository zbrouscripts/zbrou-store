import { chromium } from "playwright";
import { spawn } from "node:child_process";
import { mkdir } from "node:fs/promises";
import assert from "node:assert/strict";

const base = "http://127.0.0.1:3000";
const server = spawn("npm", ["run", "dev", "--", "--host", "127.0.0.1"], {
  env: { ...process.env, NUXT_PUBLIC_API_PUBLIC_KEY: process.env.NUXT_PUBLIC_API_PUBLIC_KEY || "" },
  stdio: ["ignore", "pipe", "pipe"],
});
let log = "";
server.stdout.on("data", (data) => { log += data.toString(); });
server.stderr.on("data", (data) => { log += data.toString(); });
let browser;
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
try {
  let ready = false;
  for (let i = 0; i < 70; i += 1) {
    try {
      const r = await fetch(base, { signal: AbortSignal.timeout(1200) });
      if (r.status < 500) { ready = true; break; }
    } catch {}
    await sleep(1000);
  }
  if (!ready) throw new Error("Nuxt preview server did not become healthy:\n" + log.slice(-6000));
  browser = await chromium.launch({ headless: true, args: ["--no-sandbox"] });
  await mkdir("screenshots", { recursive: true });
  const errors = [];
  const desktop = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
  desktop.on("pageerror", (error) => errors.push(error.message));
  await desktop.goto(base, { waitUntil: "domcontentloaded", timeout: 30000 });
  await desktop.locator(".ph-hero h1").waitFor({ timeout: 30000 });
  assert.match(await desktop.locator(".ph-hero h1").innerText(), /Make your mark/i);
  assert.equal(await desktop.locator(".story-track").count(), 1);
  assert.equal(await desktop.locator(".ph-activity__panel").count(), 1);
  assert.equal(await desktop.locator(".ph-feature").count(), 1);
  await desktop.screenshot({ path: "screenshots/store-desktop.png", fullPage: true, animations: "disabled" });

  await desktop.locator("#preview").scrollIntoViewIfNeeded();
  await desktop.getByRole("button", { name: "Glitch" }).click();
  await desktop.locator(".ph-lab__screen--glitch").waitFor({ state: "attached", timeout: 10000 });
  await desktop.locator(".story-track").scrollIntoViewIfNeeded();
  await sleep(300);
  await desktop.screenshot({ path: "screenshots/scroll-scene-desktop.png", animations: "disabled" });
  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 });
  mobile.on("pageerror", (error) => errors.push(error.message));
  await mobile.goto(base, { waitUntil: "domcontentloaded", timeout: 30000 });
  await mobile.locator(".ph-hero h1").waitFor({ timeout: 30000 });
  await mobile.screenshot({ path: "screenshots/store-mobile.png", fullPage: true, animations: "disabled" });
  const overflow = await mobile.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  assert.ok(overflow <= 2, "Unexpected horizontal overflow on mobile: " + overflow);
  await mobile.locator(".zb-nav__mobile-toggle").click();
  await mobile.locator(".zb-nav__links--open").waitFor({ state: "visible", timeout: 10000 });
  console.log("PASS: desktop/mobile render, hero, scroll scene, effect tabs, mobile menu, no horizontal overflow");
  console.log("Non-fatal runtime page errors:", errors.slice(0, 8));
} catch (error) {
  console.error(error);
  console.error("Nuxt logs:", log.slice(-8000));
  process.exitCode = 1;
} finally {
  await browser?.close();
  server.kill("SIGTERM");
  // npm may leave a Nuxt child process alive; the CI runner must always terminate.
  await sleep(300);
  process.exit(process.exitCode ?? 0);
}
