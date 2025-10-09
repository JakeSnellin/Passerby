import TransitionLink from '@/components/TransitionLink';
import LazyVideo from '@/components/LazyVideo';

interface VideoCardProps {
  id: string;
  slug: string;
  title: string;
  services: string;
  videoUrl: string;
  thumbnailUrl: string;
  href: string;
}

export default function VideoCard({
  id,
  slug,
  title,
  services,
  videoUrl,
  thumbnailUrl,
  href,
}: VideoCardProps) {
  return (
    <li key={id} className="video-gallery__card">
      <TransitionLink
        aria-label={`View project: ${title}`}
        href={href}
        className="video-gallery__card-link"
      >
        <div className="video-gallery__video">
          <LazyVideo src={videoUrl} posterUrl={thumbnailUrl} className="" />
        </div>
        <div className="video-gallery__card-meta">
          <p className="video-gallery__card-meta-title">{title}</p>
          <p className="video-gallery__card-meta-services">{services}</p>
        </div>
      </TransitionLink>
    </li>
  );
}
