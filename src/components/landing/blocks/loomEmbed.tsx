"use client";

import React, { useEffect, useRef } from 'react';
import * as loomEmbed from '@loomhq/loom-embed';

const LoomEmbed = ({ videoUrl }: { videoUrl: string}) => {
  const videoContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const embedVideo = async () => {
      if (videoContainerRef.current) {
        const { html } = await loomEmbed.oembed(videoUrl, { width: 640 });
        videoContainerRef.current.innerHTML = html;
        
        const iframe = videoContainerRef.current.querySelector('iframe');
        if (iframe) {
          iframe.style.width = '100%';
          iframe.style.height = '100%';
          iframe.style.position = 'absolute';
          iframe.style.top = '0';
          iframe.style.left = '0';
        }
      }
    };

    embedVideo();

    return () => {
      if (videoContainerRef.current) {
        videoContainerRef.current.innerHTML = '';
      }
    };
  }, [videoUrl]);

  return (
    <div className="rounded-4xl overflow-hidden relative w-full" style={{ paddingBottom: '56.25%' }}>
      <div ref={videoContainerRef} className="absolute inset-0" />
    </div>
  );
};

export default LoomEmbed;