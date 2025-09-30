'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { 
  Mic, 
  MicOff, 
  Video, 
  VideoOff, 
  Monitor,
  MonitorOff,
  PhoneOff,
  Users,
  MessageSquare,
  Settings,
  MoreVertical,
  Hand,
  Grid3x3,
  Maximize2,
  Volume2,
  VolumeX,
  Circle,
  Square,
  Clock,
  UserPlus,
  Copy,
  Sparkles
} from 'lucide-react';

// Mock participants
const mockParticipants = [
  { id: 1, name: 'You', isMuted: false, isVideoOff: false, isSpeaking: true },
  { id: 2, name: 'Jane Smith', isMuted: false, isVideoOff: false, isSpeaking: false },
  { id: 3, name: 'Mike Johnson', isMuted: true, isVideoOff: false, isSpeaking: false },
  { id: 4, name: 'Sarah Williams', isMuted: false, isVideoOff: true, isSpeaking: false },
];

export default function MeetingRoomPage() {
  const params = useParams();
  const router = useRouter();
  const meetingId = params.id as string;
  
  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showParticipants, setShowParticipants] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [handRaised, setHandRaised] = useState(false);
  const [meetingDuration, setMeetingDuration] = useState(0);
  const [showEndMeetingModal, setShowEndMeetingModal] = useState(false);
  const [showNotesPrompt, setShowNotesPrompt] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: 'Jane Smith', message: 'Hello everyone!', time: '10:05 AM' },
    { id: 2, sender: 'Mike Johnson', message: 'Can you share the presentation?', time: '10:07 AM' },
  ]);
  const [newMessage, setNewMessage] = useState('');

  // Timer for meeting duration
  useEffect(() => {
    const timer = setInterval(() => {
      setMeetingDuration(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDuration = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleEndMeeting = () => {
    setShowNotesPrompt(true);
  };

  const handleGenerateNotes = (generate: boolean) => {
    if (generate) {
      // Simulate notes generation
      setTimeout(() => {
        router.push('/notes/1');
      }, 1500);
    } else {
      router.push('/dashboard');
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setChatMessages([
        ...chatMessages,
        {
          id: chatMessages.length + 1,
          sender: 'You',
          message: newMessage,
          time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      setNewMessage('');
    }
  };

  return (
    <div className="h-screen bg-gray-900 flex flex-col overflow-hidden">
      {/* Top Bar */}
      <div className="bg-gray-800 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-gray-400" />
            <span className="text-white font-mono text-sm">{formatDuration(meetingDuration)}</span>
          </div>
          {isRecording && (
            <div className="flex items-center space-x-2 px-3 py-1 bg-red-600 rounded-full">
              <Circle className="h-3 w-3 text-white fill-white animate-pulse" />
              <span className="text-white text-sm font-medium">Recording</span>
            </div>
          )}
        </div>
        
        <div className="text-center">
          <h1 className="text-white font-semibold">Product Strategy Meeting</h1>
          <p className="text-gray-400 text-sm">Meeting ID: {meetingId}</p>
        </div>

        <div className="flex items-center space-x-2">
          <button className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm flex items-center space-x-2">
            <Copy className="h-4 w-4" />
            <span>Copy Link</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Video Grid */}
        <div className="flex-1 p-4 overflow-auto">
          <div className="grid grid-cols-2 gap-4 h-full">
            {mockParticipants.map((participant) => (
              <div
                key={participant.id}
                className={`relative bg-gray-800 rounded-lg overflow-hidden ${
                  participant.isSpeaking ? 'ring-4 ring-green-500' : ''
                }`}
              >
                {/* Video Placeholder */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {participant.isVideoOff ? (
                    <div className="w-24 h-24 rounded-full bg-primary-600 flex items-center justify-center text-white text-3xl font-bold">
                      {participant.name.split(' ').map(n => n[0]).join('')}
                    </div>
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-6xl font-bold">
                      {participant.name.split(' ').map(n => n[0]).join('')}
                    </div>
                  )}
                </div>

                {/* Participant Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-white font-medium">{participant.name}</span>
                    <div className="flex items-center space-x-2">
                      {participant.isMuted ? (
                        <MicOff className="h-4 w-4 text-red-500" />
                      ) : (
                        <Mic className="h-4 w-4 text-white" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Side Panel (Chat/Participants) */}
        {(showChat || showParticipants) && (
          <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
            {/* Panel Header */}
            <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center justify-between">
              <div className="flex space-x-4">
                <button
                  onClick={() => { setShowChat(true); setShowParticipants(false); }}
                  className={`text-sm font-medium ${
                    showChat ? 'text-primary-600 border-b-2 border-primary-600' : 'text-gray-600'
                  } pb-2`}
                >
                  Chat
                </button>
                <button
                  onClick={() => { setShowParticipants(true); setShowChat(false); }}
                  className={`text-sm font-medium ${
                    showParticipants ? 'text-primary-600 border-b-2 border-primary-600' : 'text-gray-600'
                  } pb-2`}
                >
                  Participants ({mockParticipants.length})
                </button>
              </div>
              <button
                onClick={() => { setShowChat(false); setShowParticipants(false); }}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            {/* Chat Panel */}
            {showChat && (
              <>
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {chatMessages.map((msg) => (
                    <div key={msg.id} className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-900">{msg.sender}</span>
                        <span className="text-xs text-gray-500">{msg.time}</span>
                      </div>
                      <p className="text-sm text-gray-700 bg-gray-100 rounded-lg p-2">{msg.message}</p>
                    </div>
                  ))}
                </div>
                <div className="p-4 border-t border-gray-200">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Type a message..."
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                    />
                    <button
                      onClick={handleSendMessage}
                      className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                    >
                      Send
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* Participants Panel */}
            {showParticipants && (
              <div className="flex-1 overflow-y-auto p-4">
                <button className="w-full mb-4 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center space-x-2">
                  <UserPlus className="h-4 w-4" />
                  <span>Add People</span>
                </button>
                <div className="space-y-2">
                  {mockParticipants.map((participant) => (
                    <div
                      key={participant.id}
                      className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center text-white font-semibold">
                          {participant.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{participant.name}</p>
                          <p className="text-xs text-gray-500">
                            {participant.isMuted ? 'Muted' : 'Active'}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {participant.isMuted && <MicOff className="h-4 w-4 text-gray-400" />}
                        {participant.isVideoOff && <VideoOff className="h-4 w-4 text-gray-400" />}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom Control Bar */}
      <div className="bg-gray-800 px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left Controls */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsMicOn(!isMicOn)}
              className={`p-4 rounded-full transition-colors ${
                isMicOn ? 'bg-gray-700 hover:bg-gray-600' : 'bg-red-600 hover:bg-red-700'
              }`}
            >
              {isMicOn ? (
                <Mic className="h-6 w-6 text-white" />
              ) : (
                <MicOff className="h-6 w-6 text-white" />
              )}
            </button>
            <button
              onClick={() => setIsVideoOn(!isVideoOn)}
              className={`p-4 rounded-full transition-colors ${
                isVideoOn ? 'bg-gray-700 hover:bg-gray-600' : 'bg-red-600 hover:bg-red-700'
              }`}
            >
              {isVideoOn ? (
                <Video className="h-6 w-6 text-white" />
              ) : (
                <VideoOff className="h-6 w-6 text-white" />
              )}
            </button>
          </div>

          {/* Center Controls */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsScreenSharing(!isScreenSharing)}
              className={`p-4 rounded-full transition-colors ${
                isScreenSharing ? 'bg-primary-600 hover:bg-primary-700' : 'bg-gray-700 hover:bg-gray-600'
              }`}
              title="Share Screen"
            >
              {isScreenSharing ? (
                <MonitorOff className="h-6 w-6 text-white" />
              ) : (
                <Monitor className="h-6 w-6 text-white" />
              )}
            </button>
            
            <button
              onClick={() => setIsRecording(!isRecording)}
              className={`p-4 rounded-full transition-colors ${
                isRecording ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-700 hover:bg-gray-600'
              }`}
              title="Record Meeting"
            >
              {isRecording ? (
                <Square className="h-6 w-6 text-white" />
              ) : (
                <Circle className="h-6 w-6 text-white" />
              )}
            </button>

            <button
              onClick={() => setHandRaised(!handRaised)}
              className={`p-4 rounded-full transition-colors ${
                handRaised ? 'bg-yellow-600 hover:bg-yellow-700' : 'bg-gray-700 hover:bg-gray-600'
              }`}
              title="Raise Hand"
            >
              <Hand className="h-6 w-6 text-white" />
            </button>

            <button
              onClick={() => { setShowChat(!showChat); setShowParticipants(false); }}
              className={`p-4 rounded-full transition-colors ${
                showChat ? 'bg-primary-600 hover:bg-primary-700' : 'bg-gray-700 hover:bg-gray-600'
              }`}
              title="Chat"
            >
              <MessageSquare className="h-6 w-6 text-white" />
            </button>

            <button
              onClick={() => { setShowParticipants(!showParticipants); setShowChat(false); }}
              className={`p-4 rounded-full transition-colors ${
                showParticipants ? 'bg-primary-600 hover:bg-primary-700' : 'bg-gray-700 hover:bg-gray-600'
              }`}
              title="Participants"
            >
              <Users className="h-6 w-6 text-white" />
            </button>

            <button
              className="p-4 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors"
              title="More Options"
            >
              <MoreVertical className="h-6 w-6 text-white" />
            </button>
          </div>

          {/* Right Controls */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowEndMeetingModal(true)}
              className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-full transition-colors flex items-center space-x-2"
            >
              <PhoneOff className="h-5 w-5 text-white" />
              <span className="text-white font-medium">End Meeting</span>
            </button>
          </div>
        </div>
      </div>

      {/* End Meeting Modal */}
      {showEndMeetingModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">End Meeting?</h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to end this meeting for everyone?
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowEndMeetingModal(false)}
                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowEndMeetingModal(false);
                  handleEndMeeting();
                }}
                className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
              >
                End Meeting
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notes Generation Prompt */}
      {showNotesPrompt && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-lg w-full mx-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-primary-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Generate Meeting Notes?</h2>
            </div>
            <p className="text-gray-600 mb-6">
              Would you like to generate AI-powered meeting notes with key points, action items, 
              and decisions? This will include:
            </p>
            <ul className="space-y-2 mb-6 text-gray-700">
              <li className="flex items-start space-x-2">
                <span className="text-primary-600 mt-1">✓</span>
                <span>Meeting summary and key discussion points</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-primary-600 mt-1">✓</span>
                <span>Action items with assignees and deadlines</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-primary-600 mt-1">✓</span>
                <span>Important decisions made during the meeting</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-primary-600 mt-1">✓</span>
                <span>Meeting analytics and engagement metrics</span>
              </li>
            </ul>
            <div className="flex space-x-3">
              <button
                onClick={() => handleGenerateNotes(false)}
                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Skip
              </button>
              <button
                onClick={() => handleGenerateNotes(true)}
                className="flex-1 px-4 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium flex items-center justify-center space-x-2"
              >
                <Sparkles className="h-5 w-5" />
                <span>Generate Notes</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
