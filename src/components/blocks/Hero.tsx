import { HeroBlock } from '@/types/block';

export default function Hero({ titleText, subtitleText, descriptionText }: HeroBlock) {
  return (
    <div>
      <div>{titleText}</div>
      <div>{subtitleText}</div>
      <div dangerouslySetInnerHTML={{ __html: descriptionText }} />
    </div>
  );
}
