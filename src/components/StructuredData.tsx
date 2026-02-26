interface StructuredDataProps {
  data: Record<string, unknown> | Array<Record<string, unknown>>;
}

function serializeJsonLd(data: StructuredDataProps['data']): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

export default function StructuredData({ data }: StructuredDataProps) {
  return (
    <script
      type="application/ld+json"
      // Safe for JSON-LD script injection.
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  );
}
