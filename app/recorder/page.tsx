'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Download, UploadCloud } from 'lucide-react';

export default function RecorderPage() {
  const router = useRouter();
  const params = useSearchParams();
  const videoUrl = params.get('video');
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState('');

  useEffect(() => {
    if (videoUrl) {
      setVideoSrc(decodeURIComponent(videoUrl));
    }
  }, [videoUrl]);

  const handleDownload = () => {
    if (!videoSrc) return;
    const a = document.createElement('a');
    a.href = videoSrc;
    a.download = 'recording.webm';
    a.click();
  };

  const handleUpload = async () => {
    if (!videoSrc) return;
    setIsUploading(true);
    setUploadMessage('');

    try {
      const response = await fetch(videoSrc);
      const blob = await response.blob();
      const formData = new FormData();
      formData.append('file', blob, 'recording.webm');

      // Example POST to backend API
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        setUploadMessage('✅ Upload successful!');
      } else {
        setUploadMessage('❌ Upload failed.');
      }
    } catch (err) {
      console.error(err);
      setUploadMessage('❌ Upload error occurred.');
    } finally {
      setIsUploading(false);
    }
  };

  if (!videoSrc) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center text-text">
        <p className="text-lg mb-4">No recording found.</p>
        <Link
          href="/dashboard"
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
        >
          Go back
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center text-text p-8">
      <div className="w-full max-w-4xl">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => router.push('/dashboard')}
            className="flex items-center space-x-2 text-primary hover:underline"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Dashboard</span>
          </button>
          <h1 className="text-2xl font-bold text-text">Recording Preview</h1>
        </div>

        <video
          src={videoSrc}
          controls
          autoPlay
          className="w-full rounded-lg border border-primary/20 mb-6"
        />

        <div className="flex flex-wrap items-center gap-4">
          <button
            onClick={handleDownload}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/90"
          >
            <Download className="h-5 w-5" />
            <span>Download</span>
          </button>

          <button
            onClick={handleUpload}
            disabled={isUploading}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
              isUploading ? 'bg-gray-500' : 'bg-accent hover:bg-accent/80'
            } text-white transition-colors`}
          >
            <UploadCloud className="h-5 w-5" />
            <span>{isUploading ? 'Uploading...' : 'Upload to Server'}</span>
          </button>

          {uploadMessage && (
            <p className="text-sm text-text/80 ml-2">{uploadMessage}</p>
          )}
        </div>
      </div>
    </div>
  );
}
