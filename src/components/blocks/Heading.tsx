import { CoreHeadingBlock } from '@/types/block';

export default function Paragraph({ content, level, textAlign }: CoreHeadingBlock['attributes']) {
  return <p>{content}</p>;
}
