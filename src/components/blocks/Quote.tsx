import React from 'react';
import { CoreQuoteBlock } from '@/types/block';

export default function Quote({ value, citation }: CoreQuoteBlock['attributes']) {
  return (
    <blockquote>
      <div dangerouslySetInnerHTML={{ __html: value }} />
    </blockquote>
  );
}
