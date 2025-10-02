'use client';

import { useState } from 'react';
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
  ChevronRight
} from 'lucide-react';
import { useAuth } from '@/lib/auth-context';

// Mock data for meetings
const mockMeetings = [
  {
    id: 1,
    title: 'Product Strategy Meeting',
    date: '2025-09-30',
    time: '10:00 AM',
    duration: '1h 30m',
    participants: 8,
    hasNotes: true,
    status: 'completed'
  },
  {
    id: 2,
    title: 'Weekly Team Sync',
    date: '2025-09-29',
    time: '2:00 PM',
    duration: '45m',
    participants: 12,
    hasNotes: true,
    status: 'completed'
  },
  {
    id: 3,
    title: 'Client Presentation',
    date: '2025-09-28',
    time: '11:00 AM',
    duration: '2h 15m',
    participants: 5,
    hasNotes: true,
    status: 'completed'
  },
  {
    id: 4,
    title: 'Design Review',
    date: '2025-09-27',
    time: '3:30 PM',
    duration: '1h',
    participants: 6,
    hasNotes: false,
    status: 'completed'
  },
];

export default function DashboardPage() {
  const { user, logout, isLoading } = useAuth();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMeetings = mockMeetings.filter(meeting =>
    meeting.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-text/80">Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect if not authenticated
  if (!user) {
    router.push('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-dark border-r border-primary/20 flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-primary/20">
          <Link href="/" className="flex items-center space-x-2">
            <Video className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              AutoNote
            </span>
          </Link>
        </div>

        {/* Navigation */}
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

        {/* User Profile */}
        <div className="p-4 border-t border-primary/20">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-semibold">
              {user.full_name.split(' ').map(n => n[0]).join('').toUpperCase()}
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
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text mb-2">Welcome back, {user.full_name.split(' ')[0]}!</h1>
          <p className="text-text/80">Here&apos;s what&apos;s happening with your meetings today.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-dark rounded-xl shadow-sm border border-primary/20 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-primary/20 p-3 rounded-lg">
                <Video className="h-6 w-6 text-primary" />
              </div>
              <TrendingUp className="h-5 w-5 text-green-500" />
            </div>
            <h3 className="text-2xl font-bold text-text mb-1">24</h3>
            <p className="text-sm text-text/70">Total Meetings</p>
          </div>

          <div className="bg-dark rounded-xl shadow-sm border border-primary/20 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-accent/20 p-3 rounded-lg">
                <Clock className="h-6 w-6 text-accent" />
              </div>
              <TrendingUp className="h-5 w-5 text-green-500" />
            </div>
            <h3 className="text-2xl font-bold text-text mb-1">32h 45m</h3>
            <p className="text-sm text-text/70">Meeting Time</p>
          </div>

          <div className="bg-dark rounded-xl shadow-sm border border-primary/20 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-primary/20 p-3 rounded-lg">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <TrendingUp className="h-5 w-5 text-green-500" />
            </div>
            <h3 className="text-2xl font-bold text-text mb-1">18</h3>
            <p className="text-sm text-text/70">Notes Generated</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Link
            href="/meeting/new"
            className="bg-gradient-to-r from-primary to-accent rounded-xl shadow-lg p-6 text-white hover:shadow-xl transition-all group"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold mb-2">Start New Meeting</h3>
                <p className="text-white/80">Create an instant meeting room</p>
              </div>
              <Plus className="h-8 w-8 group-hover:scale-110 transition-transform" />
            </div>
          </Link>

          <Link
            href="/meeting/schedule"
            className="bg-dark rounded-xl shadow-sm border-2 border-primary/30 p-6 hover:shadow-lg transition-all group"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-text mb-2">Schedule Meeting</h3>
                <p className="text-text/70">Plan a meeting for later</p>
              </div>
              <Calendar className="h-8 w-8 text-primary group-hover:scale-110 transition-transform" />
            </div>
          </Link>
        </div>

        {/* Meeting Agenda Section */}
        <div className="bg-dark rounded-xl shadow-sm border border-primary/20 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-text">Meeting Agenda & Notes</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-text/50" />
              <input
                type="text"
                placeholder="Search meetings..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-primary/30 bg-background rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none w-64 text-text"
              />
            </div>
          </div>

          {/* Meetings List */}
          <div className="space-y-4">
            {filteredMeetings.map((meeting) => (
              <Link
                key={meeting.id}
                href={`/notes/${meeting.id}`}
                className="block p-4 border border-primary/20 rounded-lg hover:border-primary hover:shadow-md transition-all group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-text group-hover:text-primary transition-colors">
                        {meeting.title}
                      </h3>
                      {meeting.hasNotes && (
                        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                          Notes Available
                        </span>
                      )}
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-text/70">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{meeting.date}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{meeting.time} • {meeting.duration}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="h-4 w-4" />
                        <span>{meeting.participants} participants</span>
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-text/50 group-hover:text-primary transition-colors" />
                </div>
              </Link>
            ))}
          </div>

          {filteredMeetings.length === 0 && (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-text/50 mx-auto mb-4" />
              <p className="text-text/70">No meetings found matching your search.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
