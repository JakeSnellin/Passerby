import { CoreGroupBlock } from '@/types/block';

export default function Group({ attributes: { layout, className }, children }: CoreGroupBlock) {
  return <>{children}</>;
}
