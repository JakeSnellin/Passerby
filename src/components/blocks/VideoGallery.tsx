import { VideoGalleryBlock } from '@/types/block';
import React from 'react';

export default function VideoGallery({ videos: { nodes } }: VideoGalleryBlock) {
  return nodes.map((node) => (
    <video
      key={node.id}
      src={node.videoFields.videoUrl}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
    >
      {' '}
      Sorry, your browser doesn’t support embedded videos.
    </video>
  ));
}
