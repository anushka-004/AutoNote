# Developer Guide - MeetWise

## 🛠️ Quick Reference for Developers

### Project Overview
MeetWise is a Next.js 14 application built with TypeScript and TailwindCSS, featuring a Google Meet-like interface with AI-powered meeting notes.

---

## 📂 File Structure Reference

### Core Application Files

```
app/
├── page.tsx                    # Landing page (public)
├── layout.tsx                  # Root layout with metadata
├── globals.css                 # Global styles + Tailwind
│
├── login/page.tsx             # Login page
├── register/page.tsx          # Registration page
│
├── dashboard/page.tsx         # Main dashboard (authenticated)
│
├── meeting/
│   ├── new/page.tsx          # Meeting creation (redirects)
│   └── [id]/page.tsx         # Meeting room interface
│
└── notes/
    ├── page.tsx              # All notes (date-organized)
    └── [id]/page.tsx         # Individual meeting notes
```

### Utility Files

```
lib/
└── utils.ts                   # Helper functions (cn, formatDate, etc.)

components/
├── Button.tsx                 # Reusable button component
└── Card.tsx                   # Reusable card component
```

---

## 🎨 Styling Guide

### TailwindCSS Configuration

**Primary Colors:**
```typescript
primary: {
  50: '#f0f9ff',
  100: '#e0f2fe',
  // ... through to 900
  600: '#0284c7',  // Main brand color
}
```

### Common Utility Classes

**Buttons:**
```tsx
className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-all shadow-lg"
```

**Cards:**
```tsx
className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
```

**Inputs:**
```tsx
className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
```

---

## 🔧 Component Patterns

### Page Component Structure

```tsx
'use client';  // For interactive pages

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Icon1, Icon2 } from 'lucide-react';

export default function PageName() {
  const router = useRouter();
  const [state, setState] = useState(initialValue);

  const handleAction = () => {
    // Logic here
  };

  return (
    <div className="container">
      {/* Content */}
    </div>
  );
}
```

### Modal Pattern

```tsx
{showModal && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Title</h2>
      <p className="text-gray-600 mb-6">Description</p>
      <div className="flex space-x-3">
        <button onClick={handleCancel}>Cancel</button>
        <button onClick={handleConfirm}>Confirm</button>
      </div>
    </div>
  </div>
)}
```

### Sidebar Layout Pattern

```tsx
<div className="min-h-screen bg-gray-50">
  {/* Sidebar */}
  <aside className="fixed left-0 top-0 h-full w-64 bg-white border-r">
    {/* Sidebar content */}
  </aside>

  {/* Main Content */}
  <main className="ml-64 p-8">
    {/* Page content */}
  </main>
</div>
```

---

## 🔄 State Management

### Common State Patterns

**Toggle States:**
```tsx
const [isOpen, setIsOpen] = useState(false);
const toggle = () => setIsOpen(!isOpen);
```

**Form States:**
```tsx
const [formData, setFormData] = useState({
  field1: '',
  field2: '',
});

const handleChange = (field: string, value: string) => {
  setFormData({ ...formData, [field]: value });
};
```

**List States:**
```tsx
const [items, setItems] = useState<Item[]>([]);

const addItem = (item: Item) => {
  setItems([...items, item]);
};

const removeItem = (id: number) => {
  setItems(items.filter(item => item.id !== id));
};
```

---

## 🎯 Navigation Patterns

### Link Navigation
```tsx
import Link from 'next/link';

<Link href="/path" className="...">
  Link Text
</Link>
```

### Programmatic Navigation
```tsx
import { useRouter } from 'next/navigation';

const router = useRouter();
router.push('/path');
```

### Dynamic Routes
```tsx
import { useParams } from 'next/navigation';

const params = useParams();
const id = params.id as string;
```

---

## 📊 Mock Data Patterns

### Meeting Data
```tsx
const mockMeetings = [
  {
    id: 1,
    title: 'Meeting Title',
    date: '2025-09-30',
    time: '10:00 AM',
    duration: '1h 30m',
    participants: 8,
    hasNotes: true,
    agenda: 'Meeting agenda text'
  }
];
```

### Notes Data
```tsx
const mockNotes = {
  summary: 'Meeting summary...',
  keyPoints: ['Point 1', 'Point 2'],
  actionItems: [
    { task: 'Task', assignee: 'Name', deadline: '2025-10-05' }
  ],
  decisions: ['Decision 1', 'Decision 2']
};
```

---

## 🎨 Icon Usage (Lucide React)

### Import Pattern
```tsx
import { 
  Video, 
  Calendar, 
  FileText,
  // ... more icons
} from 'lucide-react';
```

### Usage in JSX
```tsx
<Video className="h-5 w-5 text-primary-600" />
```

### Common Icons by Feature
- **Video:** Video, VideoOff
- **Audio:** Mic, MicOff
- **Screen:** Monitor, MonitorOff
- **Actions:** PhoneOff, Hand, MessageSquare
- **Navigation:** ChevronRight, ArrowLeft
- **Status:** CheckCircle, AlertCircle, Circle
- **UI:** Search, Filter, Settings, MoreVertical

---

## 🔍 Search & Filter Implementation

### Search Pattern
```tsx
const [searchQuery, setSearchQuery] = useState('');

const filteredItems = items.filter(item =>
  item.title.toLowerCase().includes(searchQuery.toLowerCase())
);

<input
  type="text"
  value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)}
  placeholder="Search..."
/>
```

### Filter Pattern
```tsx
const [filterType, setFilterType] = useState('all');

const filteredItems = items.filter(item => {
  if (filterType === 'all') return true;
  if (filterType === 'with-notes') return item.hasNotes;
  if (filterType === 'without-notes') return !item.hasNotes;
  return true;
});
```

---

## ⏱️ Timer Implementation

### Meeting Duration Timer
```tsx
const [duration, setDuration] = useState(0);

useEffect(() => {
  const timer = setInterval(() => {
    setDuration(prev => prev + 1);
  }, 1000);
  return () => clearInterval(timer);
}, []);

const formatDuration = (seconds: number) => {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};
```

---

## 🎭 Animation Classes

### Transitions
```tsx
className="transition-all duration-300"
className="transition-colors"
className="transition-transform"
```

### Hover Effects
```tsx
className="hover:bg-gray-100"
className="hover:shadow-lg"
className="hover:scale-105"
className="group-hover:translate-x-1"
```

### Loading Animations
```tsx
className="animate-spin"
className="animate-pulse"
```

---

## 📱 Responsive Design Patterns

### Grid Layouts
```tsx
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
```

### Flex Layouts
```tsx
className="flex flex-col sm:flex-row gap-4"
```

### Visibility
```tsx
className="hidden md:block"
className="block md:hidden"
```

---

## 🔐 Form Validation Pattern

### Basic Validation
```tsx
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  
  if (!formData.email) {
    alert('Email is required');
    return;
  }
  
  if (formData.password !== formData.confirmPassword) {
    alert('Passwords do not match');
    return;
  }
  
  // Submit logic
};
```

---

## 🎨 Badge Components

### Status Badges
```tsx
{/* Success */}
<span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
  Notes Available
</span>

{/* Info */}
<span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
  Recorded
</span>

{/* Warning */}
<span className="px-3 py-1 bg-gray-200 text-gray-600 text-xs font-medium rounded-full">
  No Notes
</span>
```

---

## 📊 Progress Bar Component

```tsx
<div className="w-full bg-gray-200 rounded-full h-2">
  <div
    className="bg-primary-600 h-2 rounded-full transition-all"
    style={{ width: `${percentage}%` }}
  ></div>
</div>
```

---

## 🔄 Common Utility Functions

### Date Formatting
```tsx
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}
```

### Time Formatting
```tsx
export function formatTime(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}
```

### Class Name Merging
```tsx
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

---

## 🚀 Performance Tips

1. **Use 'use client' only when needed** - Keep server components by default
2. **Lazy load heavy components** - Use dynamic imports
3. **Optimize images** - Use Next.js Image component
4. **Minimize state** - Only store what's necessary
5. **Memoize expensive calculations** - Use useMemo/useCallback
6. **Debounce search inputs** - Reduce unnecessary renders

---

## 🧪 Testing Checklist

### Manual Testing
- [ ] All links navigate correctly
- [ ] Forms validate properly
- [ ] Modals open and close
- [ ] Search filters work
- [ ] Responsive on mobile
- [ ] Icons display correctly
- [ ] Hover states work
- [ ] Transitions are smooth

### Browser Testing
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge

---

## 📝 Code Style Guidelines

### TypeScript
- Use explicit types for function parameters
- Define interfaces for complex objects
- Use type inference for simple cases

### React
- Use functional components
- Prefer hooks over class components
- Keep components focused and small
- Extract reusable logic to custom hooks

### CSS/Tailwind
- Use utility classes over custom CSS
- Group related classes together
- Use consistent spacing scale
- Prefer Tailwind colors over custom

---

## 🔗 Useful Commands

```bash
# Development
npm run dev

# Build
npm run build

# Start production
npm start

# Lint
npm run lint

# Type check
npx tsc --noEmit
```

---

## 📚 Resources

- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [TailwindCSS Docs](https://tailwindcss.com/docs)
- [TypeScript Docs](https://www.typescriptlang.org/docs)
- [Lucide Icons](https://lucide.dev)

---

## 🐛 Common Issues & Solutions

### Issue: Hydration Error
**Solution:** Ensure server and client render the same content initially

### Issue: Module Not Found
**Solution:** Check import paths, restart dev server

### Issue: Styles Not Applying
**Solution:** Verify Tailwind config, check class names

### Issue: TypeScript Errors
**Solution:** Check type definitions, install @types packages

---

## 🎯 Next Steps for Backend Integration

1. **Set up API routes** in `app/api/`
2. **Add authentication** with NextAuth.js or similar
3. **Connect to database** (PostgreSQL, MongoDB, etc.)
4. **Implement WebRTC** for real video/audio
5. **Add WebSocket** for real-time features
6. **Integrate AI service** for notes generation
7. **Set up file storage** for recordings
8. **Add email service** for notifications

---

**Happy Coding! 🚀**
