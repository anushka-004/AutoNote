# MeetWise - AI-Powered Meeting Platform

A modern Google Meet-like application with intelligent meeting notes generation and analytics.

## Features

- 🎥 **Video Conferencing** - Full-featured video meetings with screen sharing
- 📝 **AI Meeting Notes** - Automatic generation of meeting summaries and key points
- 📊 **Meeting Analytics** - Track meeting duration, participants, and engagement
- 📅 **Meeting Agenda** - Organize meetings by date with searchable notes
- 🎙️ **Meeting Recorder** - Record meetings with transcription support
- 🔐 **Authentication** - Secure login and registration system

## Tech Stack

- **Framework**: Next.js 14 (React 18)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Icons**: Lucide React
- **UI Components**: Custom components with shadcn/ui patterns

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── page.tsx           # Landing page
│   ├── login/             # Login page
│   ├── register/          # Registration page
│   ├── dashboard/         # Main dashboard
│   ├── meeting/           # Meeting room
│   └── notes/             # Meeting notes & agenda
├── components/            # Reusable components
├── lib/                   # Utility functions
└── public/               # Static assets
```

## Features Overview

### Landing Page
- Modern, responsive design
- Login/Register options
- Feature highlights

### Meeting Room
- Video/Audio controls
- Screen sharing
- Participant management
- Chat functionality
- Recording controls
- Real-time meeting analytics

### Meeting Notes
- Date-based organization
- Searchable meeting agendas
- AI-generated summaries
- Export options
- Meeting analytics dashboard

## Future Enhancements

- Backend API integration
- Real WebRTC implementation
- AI transcription service
- Cloud storage for recordings
- Calendar integration
- Mobile app

## License

MIT
