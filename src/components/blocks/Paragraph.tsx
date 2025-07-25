import { CoreParagraphBlock } from '@/types/block';

export default function Paragraph({ content }: CoreParagraphBlock['attributes']) {
  return <p>{content}</p>;
}
