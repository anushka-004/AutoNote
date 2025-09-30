'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function NewMeetingPage() {
  const router = useRouter();

  useEffect(() => {
    // Generate a random meeting ID and redirect
    const meetingId = Math.random().toString(36).substring(2, 15);
    router.push(`/meeting/${meetingId}`);
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary-500 mx-auto mb-4"></div>
        <p className="text-white text-lg">Creating your meeting room...</p>
      </div>
    </div>
  );
}
