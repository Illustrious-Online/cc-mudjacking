import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import { resolve } from 'path'
 
export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./setupTests.ts'],
    environmentOptions: {
      jsdom: {
        resources: 'usable',
      },
    },
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        '.next', 
        'next.config.ts', 
        'vitest.config.mts',
        'next-env.d.ts',
        'dist',
        '**/*.test.tsx',
        '**/*.test.ts',
        '**/*.spec.tsx',
        '**/*.spec.ts',
        'sentry.*.config.ts',
        'instrumentation.ts',
        'setupTests.ts',
        'coverage/**',
        'node_modules/**',
        '**/*.d.ts',
        '**/*.config.*',
        '**/types/**',
        'app/global-error.tsx',
        // Next.js metadata files
        'app/robots.ts',
        'app/sitemap.ts',
        // API routes (external service integration)
        'app/api/**',
        // SEO components (external service integration)
        'components/seo/**',
        // Demo/example files
        'components/ui/contact-form-eden.tsx',
        'lib/eden-demo.ts',
        'lib/eden-examples.ts',
        // Library configuration and utility files
        'lib/seo-config.ts',
        'lib/supabase.ts',
        // Environment and configuration files
        'production.env',
        'bunfig.toml',
        'biome.json',
        'tsconfig.json',
        // Documentation files
        'README.md',
        'CHANGELOG.md',
        'CONTRIBUTING.md',
        'LICENSE',
        'SEO-SETUP.md',
        'EDEN_TREATY_SETUP.md',
        // Docker and deployment files
        'Dockerfile',
        'k8s/**',
        // GitHub workflows
        '.github/**',
        // Auth service example (if not needed for coverage)
        'auth-service-example/**',
      ],
      include: [
        'app/**/*.{ts,tsx}',
        'components/**/*.{ts,tsx}',
        'providers/**/*.{ts,tsx}',
      ],
      thresholds: {
        global: {
          branches: 70,
          functions: 70,
          lines: 70,
          statements: 70,
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './'),
    },
  },
})