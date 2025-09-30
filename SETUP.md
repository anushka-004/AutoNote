# MeetWise Setup Guide

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation Steps

1. **Install Dependencies**
```bash
npm install
```

2. **Run Development Server**
```bash
npm run dev
```

3. **Open in Browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
windsurf/
├── app/                          # Next.js App Router
│   ├── page.tsx                 # Landing page
│   ├── login/                   # Login page
│   ├── register/                # Registration page
│   ├── dashboard/               # Main dashboard
│   ├── meeting/                 # Meeting rooms
│   │   ├── new/                # Create new meeting
│   │   └── [id]/               # Meeting room interface
│   ├── notes/                   # Meeting notes
│   │   ├── page.tsx            # All notes organized by date
│   │   └── [id]/               # Individual meeting notes
│   ├── layout.tsx              # Root layout
│   └── globals.css             # Global styles
├── components/                  # Reusable components
│   ├── Button.tsx
│   └── Card.tsx
├── lib/                        # Utility functions
│   └── utils.ts
├── public/                     # Static assets
├── package.json               # Dependencies
├── tsconfig.json             # TypeScript config
├── tailwind.config.ts        # Tailwind CSS config
└── README.md                 # Documentation
```

## 🎯 Features Implemented

### 1. **Landing Page** (`/`)
- Modern hero section with gradient design
- Feature showcase grid
- Login/Register CTAs
- Responsive navigation

### 2. **Authentication Pages**
- **Login** (`/login`) - Email/password with social login options
- **Register** (`/register`) - Full registration form with validation

### 3. **Dashboard** (`/dashboard`)
- Meeting statistics cards
- Quick action buttons (Start/Schedule meeting)
- Meeting agenda list with search
- Date-based organization
- Sidebar navigation

### 4. **Meeting Room** (`/meeting/[id]`)
- **Video Grid** - Multi-participant video layout
- **Controls:**
  - Microphone toggle (mute/unmute)
  - Camera toggle (video on/off)
  - Screen sharing
  - Recording (start/stop)
  - Raise hand
  - Chat
  - Participants list
  - More options
- **Real-time Features:**
  - Meeting timer
  - Recording indicator
  - Speaking indicator (green ring)
  - Participant status (muted/video off)
- **Chat Panel:**
  - Send/receive messages
  - Timestamp display
- **Participants Panel:**
  - View all participants
  - Add people button
  - Status indicators
- **End Meeting Flow:**
  - Confirmation modal
  - AI notes generation prompt

### 5. **Meeting Notes** (`/notes`)
- **Overview Page:**
  - Statistics dashboard
  - Search functionality
  - Filter options (All/With Notes/Without Notes)
  - Meetings organized by date
  - Export all option
- **Individual Notes** (`/notes/[id]`):
  - Meeting agenda
  - AI-generated summary
  - Key points list
  - Action items with assignees and deadlines
  - Decisions made
  - Participants list
  - Meeting analytics (toggle view):
    - Engagement score
    - Speaking time distribution
    - Questions asked
    - Topics covered
  - Export/Share options

### 6. **AI Notes Generation**
- Prompt modal after meeting ends
- Option to generate or skip
- Features included:
  - Meeting summary
  - Key discussion points
  - Action items with assignments
  - Important decisions
  - Analytics and metrics

### 7. **Meeting Analytics**
- Engagement score with progress bar
- Speaking time distribution charts
- Question count
- Topics discussed
- Participant statistics

## 🎨 Design Features

- **Modern UI** with TailwindCSS
- **Gradient accents** (blue to purple)
- **Lucide React icons** throughout
- **Responsive design** for all screen sizes
- **Smooth transitions** and hover effects
- **Color-coded status** indicators
- **Card-based layouts**
- **Custom scrollbars**

## 🔧 Technology Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** TailwindCSS
- **Icons:** Lucide React
- **State Management:** React Hooks (useState, useEffect)
- **Routing:** Next.js App Router with dynamic routes

## 📝 Mock Data

The application currently uses mock data for demonstration:
- Sample meetings with dates
- Participant information
- Meeting notes and summaries
- Analytics data
- Chat messages

## 🔄 Next Steps (Backend Integration)

To integrate with a real backend:

1. **Authentication:**
   - Replace mock login/register with API calls
   - Implement JWT token management
   - Add session handling

2. **WebRTC Integration:**
   - Implement real video/audio streaming
   - Add peer-to-peer connections
   - Screen sharing functionality

3. **Real-time Features:**
   - WebSocket for chat
   - Live participant updates
   - Real-time analytics

4. **AI Integration:**
   - Connect to transcription service
   - Implement notes generation API
   - Add sentiment analysis

5. **Database:**
   - Store meeting data
   - Save notes and recordings
   - User management

6. **Cloud Storage:**
   - Recording storage
   - File sharing
   - Export functionality

## 🎯 User Flow

1. **Landing** → Login/Register
2. **Dashboard** → View meetings, stats, and quick actions
3. **Start Meeting** → Join meeting room with full controls
4. **During Meeting** → Use video, chat, screen share, recording
5. **End Meeting** → Generate AI notes prompt
6. **View Notes** → Access organized notes by date with analytics

## 🚦 Running the Application

### Development Mode
```bash
npm run dev
```
Access at: http://localhost:3000

### Production Build
```bash
npm run build
npm start
```

### Linting
```bash
npm run lint
```

## 📱 Pages Overview

| Route | Description |
|-------|-------------|
| `/` | Landing page with features |
| `/login` | User login |
| `/register` | User registration |
| `/dashboard` | Main dashboard with meeting overview |
| `/meeting/new` | Create new meeting (redirects to room) |
| `/meeting/[id]` | Meeting room interface |
| `/notes` | All meeting notes organized by date |
| `/notes/[id]` | Individual meeting notes with analytics |

## 🎨 Color Scheme

- **Primary:** Blue (#0ea5e9)
- **Secondary:** Purple (#a855f7)
- **Success:** Green (#10b981)
- **Warning:** Orange (#f59e0b)
- **Danger:** Red (#ef4444)
- **Neutral:** Gray scale

## ✨ Key Highlights

- ✅ Complete Google Meet-like interface
- ✅ AI-powered meeting notes generation
- ✅ Meeting analytics and insights
- ✅ Date-based meeting organization
- ✅ Recording functionality UI
- ✅ Real-time meeting timer
- ✅ Chat and participants panels
- ✅ Screen sharing controls
- ✅ Action items tracking
- ✅ Export and share options
- ✅ Responsive design
- ✅ Modern, professional UI

## 🎓 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [Lucide Icons](https://lucide.dev)

---

**Note:** This is a frontend-only implementation. Backend integration is required for production use.
