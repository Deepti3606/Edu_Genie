import React, { useState } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, Clock } from 'lucide-react';

interface VideoPlayerProps {
  videos: any[];
  topic: string;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ videos, topic }) => {
  const [selectedVideo, setSelectedVideo] = useState(videos[0] || null);
  const [isPlaying, setIsPlaying] = useState(false);

  if (!videos || videos.length === 0) {
    return (
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 text-center">
        <Play className="h-16 w-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-gray-800 mb-2">No Videos Available</h3>
        <p className="text-gray-600">Videos related to {topic} will appear here.</p>
      </div>
    );
  }

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <Play className="h-6 w-6 mr-2 text-red-600" />
        Educational Videos - {topic}
      </h2>

      {/* Main Video Player */}
      {selectedVideo && (
        <div className="mb-6">
          <div className="relative bg-black rounded-xl overflow-hidden shadow-lg">
            <iframe
              src={selectedVideo.url}
              title={selectedVideo.title}
              className="w-full h-64 md:h-80"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          
          <div className="mt-4">
            <h3 className="text-lg font-bold text-gray-800 mb-2">{selectedVideo.title}</h3>
            <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
              <span className="flex items-center">
                <span className="font-medium">{selectedVideo.channelTitle}</span>
              </span>
              {selectedVideo.duration && (
                <span className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {selectedVideo.duration}
                </span>
              )}
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">
              {selectedVideo.description}
            </p>
          </div>
        </div>
      )}

      {/* Video Playlist */}
      <div>
        <h3 className="text-lg font-bold text-gray-800 mb-4">More Videos:</h3>
        <div className="space-y-3">
          {videos.map((video: any, index: number) => (
            <div
              key={index}
              onClick={() => setSelectedVideo(video)}
              className={`flex gap-4 p-3 rounded-xl cursor-pointer transition-all hover:shadow-md ${
                selectedVideo?.id === video.id
                  ? 'bg-blue-50 border-2 border-blue-200'
                  : 'bg-gray-50 border border-gray-200 hover:bg-gray-100'
              }`}
            >
              <div className="relative flex-shrink-0">
                <img 
                  src={video.thumbnail} 
                  alt={video.title}
                  className="w-24 h-16 object-cover rounded-lg"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-black bg-opacity-60 rounded-full p-2">
                    <Play className="h-4 w-4 text-white" />
                  </div>
                </div>
                {video.duration && (
                  <div className="absolute bottom-1 right-1 bg-black bg-opacity-80 text-white text-xs px-1 rounded">
                    {video.duration}
                  </div>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <h4 className={`font-medium mb-1 line-clamp-2 ${
                  selectedVideo?.id === video.id ? 'text-blue-800' : 'text-gray-800'
                }`}>
                  {video.title}
                </h4>
                <p className="text-sm text-gray-600 mb-1">{video.channelTitle}</p>
                <p className="text-xs text-gray-500 line-clamp-2">{video.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Controls Info */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
        <h4 className="font-medium text-blue-800 mb-2">📺 Video Features:</h4>
        <ul className="text-blue-700 text-sm space-y-1">
          <li>• Click on any video thumbnail to play it</li>
          <li>• Videos are embedded and play directly on the website</li>
          <li>• Use fullscreen mode for better viewing experience</li>
          <li>• All videos are educational and topic-related</li>
        </ul>
      </div>
    </div>
  );
};