import { defineConfig } from "@playwright/test";
import publicSiteConfig from "./playwright.config";

if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error(
    "CareerOS E2E tests require NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY for a dedicated test project. Public site tests do not require them."
  );
}

export default defineConfig({
  ...publicSiteConfig,
  testMatch: "**/careeros.spec.ts",
});
