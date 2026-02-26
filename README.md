# Firebase Studio

This is a NextJS starter in Firebase Studio.

To get started, take a look at src/app/page.tsx.

## Runtime Requirement

- Node.js `>= 18.18.0` (recommended: `20.18.0`)

If you use `nvm`:

```powershell
nvm install 20.18.0
nvm use 20.18.0
```

## Contact Form Delivery Configuration

The contact API route (`/api/contact`) supports webhook forwarding for production delivery.

Set these environment variables in your hosting environment:

- `CONTACT_WEBHOOK_URL`: HTTPS endpoint that receives inquiry payloads.
- `CONTACT_WEBHOOK_BEARER_TOKEN` (optional): Bearer token sent in `Authorization` header.
- `CONTACT_WEBHOOK_SIGNING_SECRET` (optional): HMAC secret used to sign body as `X-Jertine-Signature-SHA256`.
- `CONTACT_WEBHOOK_TIMEOUT_MS` (optional): Webhook timeout in milliseconds (default `8000`, max `30000`).

Delivery behavior:

- Up to 2 delivery attempts are made per inquiry.
- On repeated webhook failure, the API returns HTTP `502` and the form shows a retry message.

Webhook payload shape:

```json
{
  "source": "jertinetech-website",
  "type": "contact_inquiry",
  "submissionId": "8f749de7-2dd1-4bf7-97b7-69f0f46f5f1b",
  "name": "Jane Doe",
  "email": "jane@company.com",
  "message": "Need software and hardware support.",
  "receivedAt": "2026-02-26T09:00:00.000Z",
  "rateKey": "..."
}
```
