
FROM oven/bun:latest AS builder

WORKDIR /app

COPY package.json bun.lockb* ./  
RUN bun install --frozen-lockfile  

COPY . .

# reCAPTCHA v3 SITE key — public by design; next build inlines NEXT_PUBLIC_* into
# the client bundle, so it must be present at build time (not runtime). The
# matching SECRET key lives only in the platform API, which verifies tokens.
ARG NEXT_PUBLIC_RECAPTCHA_SITE_KEY
ENV NEXT_PUBLIC_RECAPTCHA_SITE_KEY=$NEXT_PUBLIC_RECAPTCHA_SITE_KEY

RUN bun run build

FROM oven/bun:latest AS production

WORKDIR /app
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

ENV NODE_ENV=production
EXPOSE 3000
CMD ["bun", "server.js"]