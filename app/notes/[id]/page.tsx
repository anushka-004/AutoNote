'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Users, 
  Download, 
  Share2,
  FileText,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  MessageSquare
} from 'lucide-react';

// Mock meeting data with notes
const mockMeetingData: Record<string, any> = {
  '1': {
    id: 1,
    title: 'Product Strategy Meeting',
    date: '2025-09-30',
    time: '10:00 AM - 11:30 AM',
    duration: '1h 30m',
    participants: ['John Doe', 'Jane Smith', 'Mike Johnson', 'Sarah Williams', 'Tom Brown', 'Lisa Davis', 'Chris Wilson', 'Emma Taylor'],
    agenda: 'Discuss Q4 product roadmap and feature prioritization',
    summary: 'The team discussed the Q4 product roadmap with a focus on three major features: AI-powered analytics, mobile app redesign, and API v3 launch. Key decisions were made regarding resource allocation and timeline adjustments.',
    keyPoints: [
      'AI analytics feature approved for Q4 development',
      'Mobile app redesign to start in October',
      'API v3 beta launch scheduled for November',
      'Budget increase approved for engineering team',
      'Marketing campaign to align with product launches'
    ],
    actionItems: [
      { task: 'Create detailed technical spec for AI analytics', assignee: 'Mike Johnson', deadline: '2025-10-05' },
      { task: 'Hire 2 additional mobile developers', assignee: 'Sarah Williams', deadline: '2025-10-10' },
      { task: 'Draft API v3 migration guide', assignee: 'Tom Brown', deadline: '2025-10-15' },
      { task: 'Prepare marketing materials', assignee: 'Lisa Davis', deadline: '2025-10-20' }
    ],
    decisions: [
      'Approved $200K additional budget for Q4',
      'Prioritize AI analytics over other features',
      'Delay customer portal update to Q1 2026'
    ],
    analytics: {
      speakingTime: [
        { name: 'John Doe', time: 18, percentage: 20 },
        { name: 'Jane Smith', time: 15, percentage: 17 },
        { name: 'Mike Johnson', time: 12, percentage: 13 },
        { name: 'Sarah Williams', time: 10, percentage: 11 },
        { name: 'Others', time: 35, percentage: 39 }
      ],
      engagement: 87,
      questions: 12,
      topics: ['Product Roadmap', 'Budget', 'Timeline', 'Resources']
    }
  },
  '2': {
    id: 2,
    title: 'Weekly Team Sync',
    date: '2025-09-29',
    time: '2:00 PM - 2:45 PM',
    duration: '45m',
    participants: ['John Doe', 'Team Members'],
    agenda: 'Weekly progress updates and blocker discussion',
    summary: 'Team shared progress updates on current sprint tasks. Several blockers were identified and resolved during the meeting.',
    keyPoints: [
      'Sprint 23 is 75% complete',
      'Authentication bug fixed',
      'New design system components ready',
      'Performance optimization showing 40% improvement'
    ],
    actionItems: [
      { task: 'Review PR #234', assignee: 'John Doe', deadline: '2025-09-30' },
      { task: 'Update documentation', assignee: 'Team', deadline: '2025-10-02' }
    ],
    decisions: [
      'Extend sprint by 2 days',
      'Schedule design review for Friday'
    ],
    analytics: {
      speakingTime: [
        { name: 'John Doe', time: 12, percentage: 27 },
        { name: 'Others', time: 33, percentage: 73 }
      ],
      engagement: 92,
      questions: 8,
      topics: ['Sprint Progress', 'Blockers', 'Code Review']
    }
  }
};

export default function MeetingNotesPage() {
  const params = useParams();
  const meetingId = params.id as string;
  const meeting = mockMeetingData[meetingId] || mockMeetingData['1'];
  const [showAnalytics, setShowAnalytics] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                href="/dashboard"
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="h-5 w-5 text-gray-600" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{meeting.title}</h1>
                <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>{meeting.date}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{meeting.time}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4" />
                    <span>{meeting.participants.length} participants</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowAnalytics(!showAnalytics)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  showAnalytics
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <TrendingUp className="h-4 w-4 inline mr-2" />
                Analytics
              </button>
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium">
                <Share2 className="h-4 w-4 inline mr-2" />
                Share
              </button>
              <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium">
                <Download className="h-4 w-4 inline mr-2" />
                Export
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Notes */}
          <div className="lg:col-span-2 space-y-6">
            {/* Meeting Agenda */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <FileText className="h-5 w-5 mr-2 text-primary-600" />
                Meeting Agenda
              </h2>
              <p className="text-gray-700">{meeting.agenda}</p>
            </div>

            {/* AI Summary */}
            <div className="bg-gradient-to-br from-primary-50 to-purple-50 rounded-xl shadow-sm border border-primary-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <MessageSquare className="h-5 w-5 mr-2 text-primary-600" />
                AI-Generated Summary
              </h2>
              <p className="text-gray-700 leading-relaxed">{meeting.summary}</p>
            </div>

            {/* Key Points */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
                Key Points
              </h2>
              <ul className="space-y-3">
                {meeting.keyPoints.map((point: string, index: number) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Items */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <AlertCircle className="h-5 w-5 mr-2 text-orange-600" />
                Action Items
              </h2>
              <div className="space-y-4">
                {meeting.actionItems.map((item: any, index: number) => (
                  <div key={index} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                    <input
                      type="checkbox"
                      className="mt-1 h-5 w-5 text-primary-600 rounded border-gray-300 focus:ring-primary-500"
                    />
                    <div className="flex-1">
                      <p className="text-gray-900 font-medium mb-2">{item.task}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span className="flex items-center space-x-1">
                          <Users className="h-4 w-4" />
                          <span>{item.assignee}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>Due: {item.deadline}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Decisions Made */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Decisions Made</h2>
              <ul className="space-y-3">
                {meeting.decisions.map((decision: string, index: number) => (
                  <li key={index} className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{decision}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Participants */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Participants</h3>
              <div className="space-y-3">
                {meeting.participants.slice(0, 5).map((participant: string, index: number) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center text-white text-sm font-semibold">
                      {participant.split(' ').map(n => n[0]).join('')}
                    </div>
                    <span className="text-gray-700 text-sm">{participant}</span>
                  </div>
                ))}
                {meeting.participants.length > 5 && (
                  <p className="text-sm text-gray-500 pl-11">
                    +{meeting.participants.length - 5} more
                  </p>
                )}
              </div>
            </div>

            {/* Analytics Panel */}
            {showAnalytics && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Meeting Analytics</h3>
                
                {/* Engagement Score */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Engagement Score</span>
                    <span className="text-2xl font-bold text-primary-600">{meeting.analytics.engagement}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary-600 h-2 rounded-full"
                      style={{ width: `${meeting.analytics.engagement}%` }}
                    ></div>
                  </div>
                </div>

                {/* Speaking Time */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Speaking Time Distribution</h4>
                  <div className="space-y-2">
                    {meeting.analytics.speakingTime.map((person: any, index: number) => (
                      <div key={index}>
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="text-gray-600">{person.name}</span>
                          <span className="text-gray-900 font-medium">{person.percentage}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div
                            className="bg-purple-600 h-1.5 rounded-full"
                            style={{ width: `${person.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 rounded-lg p-3">
                    <p className="text-xs text-blue-600 mb-1">Questions Asked</p>
                    <p className="text-2xl font-bold text-blue-900">{meeting.analytics.questions}</p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-3">
                    <p className="text-xs text-green-600 mb-1">Topics Covered</p>
                    <p className="text-2xl font-bold text-green-900">{meeting.analytics.topics.length}</p>
                  </div>
                </div>

                {/* Topics */}
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Topics Discussed</h4>
                  <div className="flex flex-wrap gap-2">
                    {meeting.analytics.topics.map((topic: string, index: number) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Meeting Info */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Meeting Info</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-gray-500 mb-1">Duration</p>
                  <p className="text-gray-900 font-medium">{meeting.duration}</p>
                </div>
                <div>
                  <p className="text-gray-500 mb-1">Date & Time</p>
                  <p className="text-gray-900 font-medium">{meeting.date}</p>
                  <p className="text-gray-900 font-medium">{meeting.time}</p>
                </div>
                <div>
                  <p className="text-gray-500 mb-1">Recording</p>
                  <button className="text-primary-600 hover:text-primary-700 font-medium">
                    View Recording →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
