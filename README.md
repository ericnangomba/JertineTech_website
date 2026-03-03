# Jertine Tech Website

Static-export Next.js site ready for `htdocs` hosting.

## Build Requirement

- Node.js `>= 18.18.0` (recommended: `20.18.0`)

If you use `nvm`:

```powershell
nvm install 20.18.0
nvm use 20.18.0
```

## Build Static Site

```powershell
npm install
npm run build
```

Static output will be generated in `out/`.

## htdocs Deployment

1. Copy the contents of `out/` into your server `htdocs` directory.
2. If your host has existing files, replace/merge as needed.
3. Ensure Apache serves `index.html` as default document.

## Contact Form on Static Hosting

Set `NEXT_PUBLIC_CONTACT_WEBHOOK_URL` in your build environment before running `npm run build`.

- The webhook endpoint must allow CORS from your website domain.
- If not set, the form falls back to opening the user's email client (`mailto`).
