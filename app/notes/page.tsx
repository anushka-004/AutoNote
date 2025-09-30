'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Video,
  Calendar,
  FileText,
  Settings,
  LogOut,
  Search,
  Filter,
  Download,
  Clock,
  Users,
  ChevronRight,
  TrendingUp,
  BarChart3,
  CheckCircle
} from 'lucide-react';

// Mock meetings organized by date
const meetingsByDate = [
  {
    date: '2025-09-30',
    meetings: [
      {
        id: 1,
        title: 'Product Strategy Meeting',
        time: '10:00 AM',
        duration: '1h 30m',
        participants: 8,
        hasNotes: true,
        hasRecording: true,
        keyPoints: 5,
        actionItems: 4,
        agenda: 'Discuss Q4 product roadmap and feature prioritization'
      },
      {
        id: 5,
        title: 'Engineering Standup',
        time: '3:00 PM',
        duration: '30m',
        participants: 15,
        hasNotes: true,
        hasRecording: true,
        keyPoints: 3,
        actionItems: 2,
        agenda: 'Daily progress updates and blocker discussion'
      }
    ]
  },
  {
    date: '2025-09-29',
    meetings: [
      {
        id: 2,
        title: 'Weekly Team Sync',
        time: '2:00 PM',
        duration: '45m',
        participants: 12,
        hasNotes: true,
        hasRecording: true,
        keyPoints: 4,
        actionItems: 2,
        agenda: 'Weekly progress updates and blocker discussion'
      }
    ]
  },
  {
    date: '2025-09-28',
    meetings: [
      {
        id: 3,
        title: 'Client Presentation',
        time: '11:00 AM',
        duration: '2h 15m',
        participants: 5,
        hasNotes: true,
        hasRecording: true,
        keyPoints: 8,
        actionItems: 6,
        agenda: 'Present Q3 results and discuss future partnership opportunities'
      }
    ]
  },
  {
    date: '2025-09-27',
    meetings: [
      {
        id: 4,
        title: 'Design Review',
        time: '3:30 PM',
        duration: '1h',
        participants: 6,
        hasNotes: false,
        hasRecording: true,
        keyPoints: 0,
        actionItems: 0,
        agenda: 'Review new dashboard designs and gather feedback'
      }
    ]
  },
];

export default function NotesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all'); // all, with-notes, without-notes

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    }
  };

  const filteredMeetings = meetingsByDate.map(day => ({
    ...day,
    meetings: day.meetings.filter(meeting => {
      const matchesSearch = meeting.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          meeting.agenda.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = filterType === 'all' || 
                          (filterType === 'with-notes' && meeting.hasNotes) ||
                          (filterType === 'without-notes' && !meeting.hasNotes);
      return matchesSearch && matchesFilter;
    })
  })).filter(day => day.meetings.length > 0);

  const totalMeetings = meetingsByDate.reduce((acc, day) => acc + day.meetings.length, 0);
  const meetingsWithNotes = meetingsByDate.reduce((acc, day) => 
    acc + day.meetings.filter(m => m.hasNotes).length, 0
  );
  const totalActionItems = meetingsByDate.reduce((acc, day) => 
    acc + day.meetings.reduce((sum, m) => sum + m.actionItems, 0), 0
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <Link href="/" className="flex items-center space-x-2">
            <Video className="h-8 w-8 text-primary-600" />
            <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
              MeetWise
            </span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          <Link
            href="/dashboard"
            className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <Calendar className="h-5 w-5" />
            <span>Dashboard</span>
          </Link>
          <Link
            href="/notes"
            className="flex items-center space-x-3 px-4 py-3 rounded-lg bg-primary-50 text-primary-700 font-medium"
          >
            <FileText className="h-5 w-5" />
            <span>Meeting Notes</span>
          </Link>
          <Link
            href="/settings"
            className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <Settings className="h-5 w-5" />
            <span>Settings</span>
          </Link>
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center text-white font-semibold">
              JD
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">John Doe</p>
              <p className="text-xs text-gray-500">john@example.com</p>
            </div>
          </div>
          <button className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
            <LogOut className="h-4 w-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Meeting Notes & Agenda</h1>
          <p className="text-gray-600">View and manage all your meeting notes organized by date</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="bg-blue-100 p-2 rounded-lg">
                <FileText className="h-5 w-5 text-blue-600" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{totalMeetings}</h3>
            <p className="text-sm text-gray-600">Total Meetings</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="bg-green-100 p-2 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{meetingsWithNotes}</h3>
            <p className="text-sm text-gray-600">With Notes</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="bg-orange-100 p-2 rounded-lg">
                <BarChart3 className="h-5 w-5 text-orange-600" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{totalActionItems}</h3>
            <p className="text-sm text-gray-600">Action Items</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="bg-purple-100 p-2 rounded-lg">
                <TrendingUp className="h-5 w-5 text-purple-600" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">87%</h3>
            <p className="text-sm text-gray-600">Avg Engagement</p>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search meetings by title or agenda..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
              />
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setFilterType('all')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    filterType === 'all' 
                      ? 'bg-white text-gray-900 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilterType('with-notes')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    filterType === 'with-notes' 
                      ? 'bg-white text-gray-900 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  With Notes
                </button>
                <button
                  onClick={() => setFilterType('without-notes')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    filterType === 'without-notes' 
                      ? 'bg-white text-gray-900 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Without Notes
                </button>
              </div>
              
              <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2">
                <Download className="h-4 w-4" />
                <span>Export All</span>
              </button>
            </div>
          </div>
        </div>

        {/* Meetings by Date */}
        <div className="space-y-8">
          {filteredMeetings.map((day) => (
            <div key={day.date} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-3 mb-6">
                <Calendar className="h-6 w-6 text-primary-600" />
                <h2 className="text-2xl font-bold text-gray-900">{formatDate(day.date)}</h2>
                <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-full">
                  {day.meetings.length} {day.meetings.length === 1 ? 'meeting' : 'meetings'}
                </span>
              </div>

              <div className="space-y-4">
                {day.meetings.map((meeting) => (
                  <Link
                    key={meeting.id}
                    href={meeting.hasNotes ? `/notes/${meeting.id}` : '#'}
                    className={`block p-5 border-2 rounded-xl transition-all ${
                      meeting.hasNotes
                        ? 'border-gray-200 hover:border-primary-300 hover:shadow-md cursor-pointer'
                        : 'border-gray-200 bg-gray-50 cursor-not-allowed opacity-75'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <h3 className="text-xl font-semibold text-gray-900">
                            {meeting.title}
                          </h3>
                          {meeting.hasNotes ? (
                            <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                              Notes Available
                            </span>
                          ) : (
                            <span className="px-3 py-1 bg-gray-200 text-gray-600 text-xs font-medium rounded-full">
                              No Notes
                            </span>
                          )}
                          {meeting.hasRecording && (
                            <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                              Recorded
                            </span>
                          )}
                        </div>

                        <p className="text-gray-600 mb-4">{meeting.agenda}</p>

                        <div className="flex items-center flex-wrap gap-4 text-sm text-gray-600">
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{meeting.time} • {meeting.duration}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Users className="h-4 w-4" />
                            <span>{meeting.participants} participants</span>
                          </div>
                          {meeting.hasNotes && (
                            <>
                              <div className="flex items-center space-x-1">
                                <FileText className="h-4 w-4" />
                                <span>{meeting.keyPoints} key points</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <CheckCircle className="h-4 w-4" />
                                <span>{meeting.actionItems} action items</span>
                              </div>
                            </>
                          )}
                        </div>
                      </div>

                      {meeting.hasNotes && (
                        <ChevronRight className="h-6 w-6 text-gray-400 flex-shrink-0 ml-4" />
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}

          {filteredMeetings.length === 0 && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
              <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No meetings found</h3>
              <p className="text-gray-600">
                {searchQuery 
                  ? 'Try adjusting your search or filter criteria'
                  : 'Start a meeting to see your notes here'}
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
