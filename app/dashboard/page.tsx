'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Video,
  Calendar,
  FileText,
  Settings,
  LogOut,
  Plus,
  Search,
  Clock,
  Users,
  TrendingUp,
  ChevronRight,
  Mic,
  Square,
  Pause,
  Play,
} from 'lucide-react';
import { useAuth } from '@/lib/auth-context';

// Mock data
const mockMeetings = [
  { id: 1, title: 'Product Strategy Meeting', date: '2025-09-30', time: '10:00 AM', duration: '1h 30m', participants: 8, hasNotes: true },
  { id: 2, title: 'Weekly Team Sync', date: '2025-09-29', time: '2:00 PM', duration: '45m', participants: 12, hasNotes: true },
  { id: 3, title: 'Client Presentation', date: '2025-09-28', time: '11:00 AM', duration: '2h 15m', participants: 5, hasNotes: true },
  { id: 4, title: 'Design Review', date: '2025-09-27', time: '3:30 PM', duration: '1h', participants: 6, hasNotes: false },
];

export default function DashboardPage() {
  const { user, logout, isLoading } = useAuth();
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [error, setError] = useState('');
  const [recordingTime, setRecordingTime] = useState(0);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const recordedChunksRef = useRef<BlobPart[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const filteredMeetings = mockMeetings.filter((m) =>
    m.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const startTimer = () => {
    timerRef.current = setInterval(() => setRecordingTime((t) => t + 1), 1000);
  };

  const stopTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setRecordingTime(0);
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec < 10 ? '0' : ''}${sec}`;
  };

  const handleStartRecording = async () => {
    try {
      setError('');
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true,
      });
      mediaStreamRef.current = stream;

      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;
      recordedChunksRef.current = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) recordedChunksRef.current.push(e.data);
      };

      recorder.onstop = () => {
        const blob = new Blob(recordedChunksRef.current, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        router.push(`/recorder?video=${encodeURIComponent(url)}`);
      };

      recorder.start();
      setIsRecording(true);
      setIsPaused(false);
      startTimer();
    } catch (err) {
      console.error(err);
      setError('Screen recording permission denied or unavailable.');
    }
  };

  const handlePauseResume = () => {
    const rec = mediaRecorderRef.current;
    if (!rec) return;
    if (isPaused) {
      rec.resume();
      startTimer();
    } else {
      rec.pause();
      stopTimer();
    }
    setIsPaused(!isPaused);
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current) mediaRecorderRef.current.stop();
    mediaStreamRef.current?.getTracks().forEach((t) => t.stop());
    stopTimer();
    setIsRecording(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-text/80">Loading...</p>
      </div>
    );
  }

  if (!user) {
    router.push('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-dark border-r border-primary/20 flex flex-col">
        <div className="p-6 border-b border-primary/20">
          <Link href="/" className="flex items-center space-x-2">
            <Video className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              AutoNote
            </span>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <Link
            href="/dashboard"
            className="flex items-center space-x-3 px-4 py-3 rounded-lg bg-primary/20 text-primary font-medium"
          >
            <Calendar className="h-5 w-5" />
            <span>Dashboard</span>
          </Link>
          <Link
            href="/notes"
            className="flex items-center space-x-3 px-4 py-3 rounded-lg text-text hover:bg-background transition-colors"
          >
            <FileText className="h-5 w-5" />
            <span>Meeting Notes</span>
          </Link>
          <Link
            href="/settings"
            className="flex items-center space-x-3 px-4 py-3 rounded-lg text-text hover:bg-background transition-colors"
          >
            <Settings className="h-5 w-5" />
            <span>Settings</span>
          </Link>
        </nav>

        <div className="p-4 border-t border-primary/20">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-semibold">
              {user.full_name.split(' ').map((n) => n[0]).join('').toUpperCase()}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-text">{user.full_name}</p>
              <p className="text-xs text-text/60">{user.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-text hover:bg-background rounded-lg transition-colors"
          >
            <LogOut className="h-4 w-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 p-8">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-text mb-2">
              Welcome back, {user.full_name.split(' ')[0]}!
            </h1>
            <p className="text-text/80">
              Here&apos;s what&apos;s happening with your meetings today.
            </p>
          </div>
          <div className="space-x-3">
            {!isRecording ? (
              <button
                onClick={handleStartRecording}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/90"
              >
                <Mic className="h-5 w-5" />
                <span>Start Recording</span>
              </button>
            ) : (
              <button
                onClick={handleStopRecording}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
              >
                <Square className="h-5 w-5" />
                <span>Stop Recording</span>
              </button>
            )}
          </div>
        </div>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        {isRecording && (
          <div className="flex items-center space-x-4 mb-8">
            <div
              className={`w-3 h-3 rounded-full ${
                isPaused ? 'bg-yellow-500' : 'bg-red-500 animate-pulse'
              }`}
            ></div>
            <p className="text-text font-medium">
              {isPaused ? 'Paused' : 'Recording...'} ({formatTime(recordingTime)})
            </p>
            <button
              onClick={handlePauseResume}
              className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-primary/20 text-primary"
            >
              {isPaused ? <Play className="h-5 w-5" /> : <Pause className="h-5 w-5" />}
              <span>{isPaused ? 'Resume' : 'Pause'}</span>
            </button>
          </div>
        )}

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-dark rounded-xl border border-primary/20 p-6">
            <div className="flex justify-between mb-4">
              <div className="bg-primary/20 p-3 rounded-lg">
                <Video className="h-6 w-6 text-primary" />
              </div>
              <TrendingUp className="h-5 w-5 text-green-500" />
            </div>
            <h3 className="text-2xl font-bold text-text mb-1">24</h3>
            <p className="text-sm text-text/70">Total Meetings</p>
          </div>
          <div className="bg-dark rounded-xl border border-primary/20 p-6">
            <div className="flex justify-between mb-4">
              <div className="bg-accent/20 p-3 rounded-lg">
                <Clock className="h-6 w-6 text-accent" />
              </div>
              <TrendingUp className="h-5 w-5 text-green-500" />
            </div>
            <h3 className="text-2xl font-bold text-text mb-1">32h 45m</h3>
            <p className="text-sm text-text/70">Meeting Time</p>
          </div>
          <div className="bg-dark rounded-xl border border-primary/20 p-6">
            <div className="flex justify-between mb-4">
              <div className="bg-primary/20 p-3 rounded-lg">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <TrendingUp className="h-5 w-5 text-green-500" />
            </div>
            <h3 className="text-2xl font-bold text-text mb-1">18</h3>
            <p className="text-sm text-text/70">Notes Generated</p>
          </div>
        </div>

        {/* Meeting List */}
        <div className="bg-dark rounded-xl border border-primary/20 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-text">Meeting Agenda & Notes</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-text/50" />
              <input
                type="text"
                placeholder="Search meetings..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-primary/30 bg-background rounded-lg focus:ring-2 focus:ring-primary w-64 text-text"
              />
            </div>
          </div>

          {filteredMeetings.map((m) => (
            <Link
              key={m.id}
              href={`/notes/${m.id}`}
              className="block p-4 border border-primary/20 rounded-lg hover:border-primary hover:shadow-md transition-all group mb-2"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-text group-hover:text-primary">
                  {m.title}
                </h3>
                {m.hasNotes && (
                  <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                    Notes Available
                  </span>
                )}
              </div>
              <div className="flex items-center space-x-4 text-sm text-text/70 mt-2">
                <span className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>{m.date}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>
                    {m.time} • {m.duration}
                  </span>
                </span>
                <span className="flex items-center space-x-1">
                  <Users className="h-4 w-4" />
                  <span>{m.participants} participants</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
