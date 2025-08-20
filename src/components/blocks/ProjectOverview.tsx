import { ProjectOverviewBlock } from '@/types/block';
import React from 'react';

export default function ProjectOverview({
  projectTitleText,
  projectWebsite,
  overviewText,
}: ProjectOverviewBlock) {
  const { overviewTitle, overviewBodyText, optionalTaskSubheading, optionalTaskBodyText } =
    overviewText || {};

  return (
    <div>
      <div>{projectTitleText}</div>
      <div>{projectWebsite}</div>
      <div dangerouslySetInnerHTML={{ __html: overviewBodyText }} />
    </div>
  );
}
