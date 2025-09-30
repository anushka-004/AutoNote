# 📐 Page Layouts Reference

Visual guide to all page layouts in MeetWise.

---

## 1. Landing Page (`/`)

```
┌─────────────────────────────────────────────────────────┐
│ [Logo] MeetWise                    [Login] [Get Started] │
├─────────────────────────────────────────────────────────┤
│                                                           │
│              🎯 AI-Powered Meeting Intelligence          │
│                                                           │
│         Meet Smarter with AI-Generated Notes             │
│                                                           │
│     Experience seamless video conferencing with...       │
│                                                           │
│     [Start Free Meeting]  [View Demo]                    │
│                                                           │
├─────────────────────────────────────────────────────────┤
│                                                           │
│     Everything You Need for Productive Meetings          │
│                                                           │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐                 │
│  │ 📝 AI   │  │ 🎥 Video│  │ 📊 Anal │                 │
│  │ Notes   │  │ Conf    │  │ ytics   │                 │
│  └─────────┘  └─────────┘  └─────────┘                 │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐                 │
│  │ ⏱️ Rec  │  │ 📅 Agen │  │ 🔐 Sec  │                 │
│  │ order   │  │ da      │  │ ure     │                 │
│  └─────────┘  └─────────┘  └─────────┘                 │
│                                                           │
├─────────────────────────────────────────────────────────┤
│                                                           │
│        Ready to Transform Your Meetings?                 │
│              [Get Started Free]                          │
│                                                           │
└─────────────────────────────────────────────────────────┘
```

---

## 2. Login Page (`/login`)

```
┌─────────────────────────────────────────────────────────┐
│                                                           │
│                    [Logo] MeetWise                       │
│                                                           │
│                    Welcome back                          │
│              Sign in to continue to your meetings        │
│                                                           │
│  ┌─────────────────────────────────────────────────┐   │
│  │                                                   │   │
│  │  Email Address                                    │   │
│  │  [📧 you@example.com                    ]        │   │
│  │                                                   │   │
│  │  Password                                         │   │
│  │  [🔒 ••••••••                          👁]       │   │
│  │                                                   │   │
│  │  [✓] Remember me        Forgot password?         │   │
│  │                                                   │   │
│  │              [Sign In]                            │   │
│  │                                                   │   │
│  │         ─────── Or continue with ───────          │   │
│  │                                                   │   │
│  │        [Google]         [GitHub]                  │   │
│  │                                                   │   │
│  │  Don't have an account? Sign up for free         │   │
│  │                                                   │   │
│  └─────────────────────────────────────────────────┘   │
│                                                           │
└─────────────────────────────────────────────────────────┘
```

---

## 3. Dashboard (`/dashboard`)

```
┌──────────┬──────────────────────────────────────────────┐
│          │  Welcome back, John!                         │
│  [Logo]  │  Here's what's happening with your meetings  │
│ MeetWise │                                              │
│          │  ┌──────┐  ┌──────┐  ┌──────┐              │
│──────────│  │ 24   │  │32h45m│  │ 18   │              │
│          │  │Meet. │  │Time  │  │Notes │              │
│ 📅 Dash  │  └──────┘  └──────┘  └──────┘              │
│ 📝 Notes │                                              │
│ ⚙️ Set   │  ┌─────────────┐  ┌─────────────┐          │
│          │  │ Start New   │  │ Schedule    │          │
│──────────│  │ Meeting  +  │  │ Meeting  📅 │          │
│          │  └─────────────┘  └─────────────┘          │
│ [JD]     │                                              │
│ John Doe │  Meeting Agenda & Notes        [Search...]  │
│ Sign Out │                                              │
│          │  ┌────────────────────────────────────────┐ │
└──────────┤  │ Product Strategy Meeting               │ │
           │  │ 📅 2025-09-30  ⏱️ 10:00 AM  👥 8      │ │
           │  │ [Notes Available]                      │ │
           │  └────────────────────────────────────────┘ │
           │  ┌────────────────────────────────────────┐ │
           │  │ Weekly Team Sync                       │ │
           │  │ 📅 2025-09-29  ⏱️ 2:00 PM   👥 12     │ │
           │  │ [Notes Available]                      │ │
           │  └────────────────────────────────────────┘ │
           └──────────────────────────────────────────────┘
```

---

## 4. Meeting Room (`/meeting/[id]`)

```
┌─────────────────────────────────────────────────────────┐
│ ⏱️ 00:15:30  🔴 Recording    Product Strategy Meeting   │
│                              Meeting ID: abc123         │
│                                            [Copy Link]  │
├─────────────────────────────────────────────────────────┤
│                                                           │
│  ┌──────────────────┐  ┌──────────────────┐            │
│  │                  │  │                  │            │
│  │   John Doe (You) │  │   Jane Smith     │            │
│  │   🎤 Speaking... │  │   🎤             │            │
│  └──────────────────┘  └──────────────────┘            │
│                                                           │
│  ┌──────────────────┐  ┌──────────────────┐            │
│  │                  │  │                  │            │
│  │   Mike Johnson   │  │   Sarah Williams │            │
│  │   🔇 Muted       │  │   📹 Video Off   │            │
│  └──────────────────┘  └──────────────────┘            │
│                                                           │
├─────────────────────────────────────────────────────────┤
│                                                           │
│  [🎤] [📹]    [🖥️] [⏺️] [✋] [💬] [👥] [⋮]   [📞 End]  │
│                                                           │
└─────────────────────────────────────────────────────────┘

With Chat Panel Open:
┌────────────────────────────┬────────────────────────────┐
│                            │ Chat | Participants (4)    │
│   Video Grid               │────────────────────────────│
│   (as above)               │ Jane Smith      10:05 AM   │
│                            │ Hello everyone!            │
│                            │                            │
│                            │ Mike Johnson    10:07 AM   │
│                            │ Can you share the...       │
│                            │                            │
│                            │                            │
│                            │────────────────────────────│
│                            │ [Type a message...] [Send] │
└────────────────────────────┴────────────────────────────┘
```

---

## 5. Meeting Notes Overview (`/notes`)

```
┌──────────┬──────────────────────────────────────────────┐
│          │  Meeting Notes & Agenda                      │
│  [Logo]  │  View and manage all your meeting notes      │
│ MeetWise │                                              │
│          │  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐    │
│──────────│  │ 24   │  │ 18   │  │ 32   │  │ 87%  │    │
│          │  │Total │  │Notes │  │Action│  │Engag.│    │
│ 📅 Dash  │  └──────┘  └──────┘  └──────┘  └──────┘    │
│ 📝 Notes │                                              │
│ ⚙️ Set   │  [Search meetings...]  [All|Notes|None]     │
│          │                                [Export All]  │
│──────────│                                              │
│          │  📅 Today                        2 meetings  │
│ [JD]     │  ┌────────────────────────────────────────┐ │
│ John Doe │  │ Product Strategy Meeting               │ │
│ Sign Out │  │ Discuss Q4 product roadmap...          │ │
│          │  │ ⏱️ 10:00 AM • 1h 30m  👥 8  📝 5 pts   │ │
└──────────┤  │ [Notes Available] [Recorded]           │ │
           │  └────────────────────────────────────────┘ │
           │  ┌────────────────────────────────────────┐ │
           │  │ Engineering Standup                    │ │
           │  │ Daily progress updates...              │ │
           │  │ ⏱️ 3:00 PM • 30m  👥 15  📝 3 pts      │ │
           │  │ [Notes Available] [Recorded]           │ │
           │  └────────────────────────────────────────┘ │
           │                                              │
           │  📅 Yesterday                    1 meeting   │
           │  ┌────────────────────────────────────────┐ │
           │  │ Weekly Team Sync                       │ │
           │  └────────────────────────────────────────┘ │
           └──────────────────────────────────────────────┘
```

---

## 6. Meeting Notes Detail (`/notes/[id]`)

```
┌─────────────────────────────────────────────────────────┐
│ [←] Product Strategy Meeting                            │
│     📅 2025-09-30  ⏱️ 10:00-11:30  👥 8 participants   │
│                    [Analytics] [Share] [Export]         │
├──────────────────────────────────┬──────────────────────┤
│                                  │                      │
│ 📋 Meeting Agenda                │ Participants         │
│ Discuss Q4 product roadmap...    │ [JD] John Doe       │
│                                  │ [JS] Jane Smith     │
│ ✨ AI-Generated Summary          │ [MJ] Mike Johnson   │
│ The team discussed the Q4...     │ [SW] Sarah Williams │
│                                  │ +4 more             │
│ ✓ Key Points                     │                      │
│ • AI analytics feature approved  │ Meeting Info         │
│ • Mobile app redesign to start   │ Duration: 1h 30m    │
│ • API v3 beta launch scheduled   │ Date: 2025-09-30    │
│ • Budget increase approved       │ Recording: View →   │
│ • Marketing campaign alignment   │                      │
│                                  │ [Analytics Panel]    │
│ ⚠️ Action Items                  │ Engagement: 87%     │
│ ☐ Create technical spec          │ ████████░░ 87%      │
│   Mike Johnson • Due: 2025-10-05 │                      │
│ ☐ Hire 2 mobile developers       │ Speaking Time       │
│   Sarah Williams • Due: 10-10    │ John: ████░ 20%     │
│                                  │ Jane: ███░░ 17%     │
│ ✓ Decisions Made                 │ Mike: ██░░░ 13%     │
│ ✓ Approved $200K budget          │                      │
│ ✓ Prioritize AI analytics        │ 12 Questions        │
│ ✓ Delay customer portal to Q1    │ 4 Topics            │
│                                  │                      │
└──────────────────────────────────┴──────────────────────┘
```

---

## 7. End Meeting Modal

```
┌─────────────────────────────────────────────────────────┐
│                                                           │
│                  ╔═══════════════════════╗               │
│                  ║                       ║               │
│                  ║   End Meeting?        ║               │
│                  ║                       ║               │
│                  ║   Are you sure you    ║               │
│                  ║   want to end this    ║               │
│                  ║   meeting for         ║               │
│                  ║   everyone?           ║               │
│                  ║                       ║               │
│                  ║  [Cancel]  [End]      ║               │
│                  ║                       ║               │
│                  ╚═══════════════════════╝               │
│                                                           │
└─────────────────────────────────────────────────────────┘
```

---

## 8. AI Notes Generation Prompt

```
┌─────────────────────────────────────────────────────────┐
│                                                           │
│              ╔═══════════════════════════════╗           │
│              ║                               ║           │
│              ║  ✨ Generate Meeting Notes?  ║           │
│              ║                               ║           │
│              ║  Would you like to generate   ║           │
│              ║  AI-powered meeting notes?    ║           │
│              ║                               ║           │
│              ║  This will include:           ║           │
│              ║  ✓ Meeting summary            ║           │
│              ║  ✓ Key discussion points      ║           │
│              ║  ✓ Action items               ║           │
│              ║  ✓ Important decisions        ║           │
│              ║  ✓ Meeting analytics          ║           │
│              ║                               ║           │
│              ║  [Skip]  [✨ Generate Notes]  ║           │
│              ║                               ║           │
│              ╚═══════════════════════════════╝           │
│                                                           │
└─────────────────────────────────────────────────────────┘
```

---

## Layout Patterns Used

### 1. **Full Width Layout**
- Landing page
- Login/Register pages

### 2. **Sidebar + Content Layout**
- Dashboard
- Notes overview
- Uses fixed sidebar (w-64) and main content (ml-64)

### 3. **Full Screen Layout**
- Meeting room
- No sidebar, maximizes video space

### 4. **Two Column Layout**
- Meeting notes detail
- Left: Main content (2/3 width)
- Right: Sidebar (1/3 width)

### 5. **Modal Overlay**
- End meeting confirmation
- Notes generation prompt
- Centered with backdrop

---

## Responsive Behavior

### Mobile (< 640px)
- Sidebar collapses to hamburger menu
- Grid layouts become single column
- Video grid becomes 1x4 vertical
- Chat/participants become full-screen overlays

### Tablet (640px - 1024px)
- Sidebar remains visible
- Grid layouts become 2 columns
- Video grid stays 2x2
- Reduced padding and spacing

### Desktop (> 1024px)
- Full layout as designed
- Maximum content width: 7xl (80rem)
- Optimal spacing and sizing

---

## Color Coding

### Status Badges
- 🟢 **Green** - Notes Available, Active, Success
- 🔵 **Blue** - Recorded, Info, Primary actions
- 🟡 **Yellow** - Warning, Attention needed
- 🔴 **Red** - Recording, Error, Danger
- ⚪ **Gray** - No notes, Inactive, Neutral

### UI Elements
- **Primary Actions** - Blue gradient (primary-600)
- **Secondary Actions** - Gray (gray-600)
- **Danger Actions** - Red (red-600)
- **Success States** - Green (green-600)
- **Cards** - White with gray border

---

## Icon Legend

- 🎤 Microphone
- 📹 Camera
- 🖥️ Screen Share
- ⏺️ Record
- ✋ Raise Hand
- 💬 Chat
- 👥 Participants
- 📞 Phone/End Call
- ⏱️ Timer/Clock
- 📅 Calendar
- 📝 Notes
- ✓ Checkmark/Complete
- ⚠️ Warning/Action
- ✨ AI/Sparkle
- 🔒 Lock/Security
- 📊 Analytics/Chart
- 🔍 Search
- ⚙️ Settings

---

## Grid Systems

### Dashboard Stats
```
grid-cols-1 md:grid-cols-3 gap-6
```

### Meeting Notes Stats
```
grid-cols-1 md:grid-cols-4 gap-6
```

### Video Grid
```
grid-cols-2 gap-4
```

### Feature Cards (Landing)
```
grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8
```

---

This layout reference helps you understand the visual structure of each page and how elements are organized!
