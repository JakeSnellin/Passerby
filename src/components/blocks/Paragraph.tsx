import { CoreParagraphBlock } from '@/types/block';

export default function Paragraph({ attributes: { content } }: CoreParagraphBlock) {
  return <div>{content}</div>;
}
