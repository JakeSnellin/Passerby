import { VideoGalleryBlock } from '@/types/block';
import TransitionLink from '@/components/TransitionLink';
import { useParams } from 'next/navigation';
import { buildHref } from '@/lib/utils/buildHref';

export default function VideoGallery({ videos: { nodes } }: VideoGalleryBlock) {
  const params = useParams();
  const creator = typeof params.creator === 'string' ? params.creator : undefined;

  // Base projects path
  const baseProjectsHref = buildHref('/projects', creator);

  return nodes.map((node) => (
    <div className="video-card" key={node.id}>
      <TransitionLink
        href={`${baseProjectsHref}/${node.videoFields.projectSlug}`}
        className="video-card__overlay"
      />
      <video src={node.videoFields.videoUrl} autoPlay muted loop playsInline preload="metadata">
        Sorry, your browser doesn’t support embedded videos.
      </video>
    </div>
  ));
}
