import { VideoGalleryBlock } from '@/types/block';
import { useParams } from 'next/navigation';
import { buildHref } from '@/lib/utils/buildHref';
import VideoCard from '@/components/ui/VideoCard';

export default function VideoGallery({ videos: { nodes } }: VideoGalleryBlock) {
  const params = useParams();
  const creator = typeof params.creator === 'string' ? params.creator : undefined;

  // Base projects path
  const baseProjectsHref = buildHref('/projects', creator);

  return (
    <section className="projects-section" aria-label="Projects section">
      <div className="work-indicator">
        <p className="work-indicator__label">WORK</p>
        <div className="work-indicator__line" aria-hidden="true"></div>
      </div>
      <ul className="video-gallery" aria-label="Video gallery">
        {nodes.map(({ id, videoFields }) => (
          <VideoCard
            key={id}
            id={id}
            slug={videoFields.projectSlug}
            title={videoFields.projectTitle}
            services={videoFields.projectServices}
            videoUrl={videoFields.videoUrl}
            thumbnailUrl={videoFields.thumbnail.node.sourceUrl}
            href={`${baseProjectsHref}/${videoFields.projectSlug}`}
          />
        ))}
      </ul>
    </section>
  );
}
