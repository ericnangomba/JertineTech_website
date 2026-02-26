import { cn } from '@/lib/utils';

interface BrandWordmarkProps {
  className?: string;
}

export default function BrandWordmark({ className }: BrandWordmarkProps) {
  return (
    <span className={cn('font-headline font-semibold tracking-wide', className)}>
      <span className="text-white">Jertine</span>{' '}
      <span className="text-lime-300">TECH</span>
    </span>
  );
}
