import Image from 'next/image';
import { cn } from '@/lib/utils';
import webLogo from '@/images/jertine_weblogo.png';

interface BrandWordmarkProps {
  className?: string;
}

export default function BrandWordmark({ className }: BrandWordmarkProps) {
  return (
    <Image
      src={webLogo}
      alt="Jertine Tech"
      className={cn('h-7 w-auto', className)}
      sizes="(max-width: 768px) 180px, 230px"
      priority
    />
  );
}
