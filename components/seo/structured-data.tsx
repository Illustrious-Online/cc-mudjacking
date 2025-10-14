import { localBusinessStructuredData, servicesStructuredData } from '@/lib/seo';

interface StructuredDataProps {
  type: 'localBusiness' | 'services';
  customData?: Record<string, any>;
}

export function StructuredData({ type, customData }: StructuredDataProps) {
  const getStructuredData = () => {
    switch (type) {
      case 'localBusiness':
        return { ...localBusinessStructuredData, ...customData };
      case 'services':
        return { ...servicesStructuredData, ...customData };
      default:
        return null;
    }
  };

  const structuredData = getStructuredData();

  if (!structuredData) {
    return null;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData, null, 2),
      }}
    />
  );
}
