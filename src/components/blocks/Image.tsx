import type { BlockData, CoreImageBlock } from '@/types/block';

export default function Image({ url, alt }: CoreImageBlock['attributes']) {
  return <img src={url} alt={alt ?? ''} />;
}
