import React, { useState, useRef, useEffect } from 'react';
import {
  MessageSquare,
  Send,
  Pin,
  CheckCheck,
  User,
  Users,
  ShieldCheck,
  Search,
  Filter,
  Paperclip,
  Smile,
  BookOpen,
  Sparkles,
  HelpCircle,
  FileText,
  Volume2,
} from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

interface ChatMessage {
  id: string;
  sender: string;
  role: 'mentor' | 'student' | 'ta';
  avatar?: string;
  time: string;
  text: string;
  tag?: 'Doubt' | 'Solution' | 'Announcement' | 'Lecture Note';
  isPinned?: boolean;
  likes: number;
  userLiked?: boolean;
}

interface CourseChannel {
  id: string;
  name: string;
  subject: string;
  activeUsers: number;
  mentor: string;
  unread: number;
}

const INITIAL_CHANNELS: CourseChannel[] = [
  {
    id: 'math-2026',
    name: 'Combined Maths 2026 (Pure & Applied)',
    subject: 'Mathematics',
    activeUsers: 342,
    mentor: 'Eng. S. Perera (BSc. Eng Hons)',
    unread: 2,
  },
  {
    id: 'phys-2026',
    name: 'Advanced Level Physics Masterclass',
    subject: 'Physics',
    activeUsers: 289,
    mentor: 'Dr. S. Gunawardana (PhD, Senior Lecturer)',
    unread: 0,
  },
  {
    id: 'chem-2026',
    name: 'A/L Chemistry Inorganic & Organic',
    subject: 'Chemistry',
    activeUsers: 215,
    mentor: 'Mrs. K. Jayasuriya (MSc, NIE Syllabus Specialist)',
    unread: 1,
  },
  {
    id: 'bio-2026',
    name: 'Biology NIE Curriculum Study Group',
    subject: 'Biology',
    activeUsers: 178,
    mentor: 'Dr. N. Wickramasinghe (MBBS)',
    unread: 0,
  },
];

const INITIAL_MESSAGES: Record<string, ChatMessage[]> = {
  'math-2026': [
    {
      id: 'm1',
      sender: 'Eng. S. Perera',
      role: 'mentor',
      time: '10:15 AM',
      text: 'Good morning everyone! The model solutions for Integration by Parts (Tutorial 08, Questions 14 to 22) have been uploaded to the Materials vault. Make sure to review the reduction formula proof before tomorrow’s live session.',
      tag: 'Announcement',
      isPinned: true,
      likes: 48,
    },
    {
      id: 'm2',
      sender: 'Kaveen Fernando',
      role: 'student',
      time: '10:42 AM',
      text: 'Sir, on question 18: when we integrate ∫ x² · e^(3x) dx, do we need to state the tabular integration method explicitly, or is standard integration by parts twice required by the NIE marking scheme?',
      tag: 'Doubt',
      likes: 12,
    },
    {
      id: 'm3',
      sender: 'Eng. S. Perera',
      role: 'mentor',
      time: '10:45 AM',
      text: 'Great question Kaveen. The G.C.E. A/L marking scheme awards discrete method marks for writing out u = x² and dv = e^(3x)dx with both derivation steps. Do NOT jump directly using DI tabular shorthand on Paper II, as you risk forfeiting 2 step marks!',
      tag: 'Solution',
      likes: 35,
    },
    {
      id: 'm4',
      sender: 'Dilshan Silva',
      role: 'student',
      time: '11:02 AM',
      text: 'Understood Sir, thank you! I verified with the 2022 marking criteria and they specifically penalize unproven recurrence steps.',
      likes: 6,
    },
  ],
  'phys-2026': [
    {
      id: 'p1',
      sender: 'Dr. S. Gunawardana',
      role: 'mentor',
      time: '09:00 AM',
      text: 'Reminder: Today at 4:30 PM we will conduct the live simulation on Doppler Effect in Sound with moving reflector boundary conditions. Please download the simulation worksheet.',
      tag: 'Announcement',
      isPinned: true,
      likes: 54,
    },
    {
      id: 'p2',
      sender: 'Nimna Jayakody',
      role: 'student',
      time: '09:20 AM',
      text: 'Dr. Gunawardana, if the source and wind are moving in the same direction towards a stationary observer, does the apparent frequency formula use (v + w) or (v - w)?',
      tag: 'Doubt',
      likes: 9,
    },
    {
      id: 'p3',
      sender: 'Dr. S. Gunawardana',
      role: 'mentor',
      time: '09:26 AM',
      text: 'The effective velocity of sound relative to the stationary ground becomes (v + w). Therefore, f′ = f₀ · [(v + w) / ((v + w) - uₛ)]. We will draw the wavefront compression diagrams in the interactive whiteboard today.',
      tag: 'Solution',
      likes: 29,
    },
  ],
  'chem-2026': [
    {
      id: 'c1',
      sender: 'Mrs. K. Jayasuriya',
      role: 'mentor',
      time: 'Yesterday',
      text: 'All Unit 12 Transition Metal complex color summaries are now pinned. Memorize the coordination numbers for d-block aqueous complexes [Cu(H2O)6]2+ vs [CuCl4]2-.',
      tag: 'Announcement',
      isPinned: true,
      likes: 41,
    },
    {
      id: 'c2',
      sender: 'Anuki Perera',
      role: 'student',
      time: '08:15 AM',
      text: 'Maam, why does adding concentrated HCl to copper sulphate solution result in yellow-green coloration instead of pure blue?',
      tag: 'Doubt',
      likes: 7,
    },
  ],
  'bio-2026': [
    {
      id: 'b1',
      sender: 'Dr. N. Wickramasinghe',
      role: 'mentor',
      time: 'Yesterday',
      text: 'Welcome students to the Biology NIE discussion stream. Feel free to raise questions regarding Photosynthesis C3 vs C4 cycle anatomical adaptations.',
      tag: 'Announcement',
      isPinned: true,
      likes: 33,
    },
  ],
};

export const CourseChatShowcase: React.FC = () => {
  const [selectedChannelId, setSelectedChannelId] = useState<string>('math-2026');
  const [messages, setMessages] = useState<Record<string, ChatMessage[]>>(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState<string>('');
  const [selectedTag, setSelectedTag] = useState<'Doubt' | 'General' | 'Solution'>('Doubt');
  const [activeFilter, setActiveFilter] = useState<'all' | 'doubts' | 'mentors'>('all');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const currentChannel = INITIAL_CHANNELS.find((c) => c.id === selectedChannelId) || INITIAL_CHANNELS[0];
  const channelMessages = messages[selectedChannelId] || [];

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, selectedChannelId, isTyping]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'You (Student - Batch 2026)',
      role: 'student',
      time: 'Just now',
      text: inputText.trim(),
      tag: selectedTag === 'General' ? undefined : selectedTag,
      likes: 0,
    };

    setMessages((prev) => ({
      ...prev,
      [selectedChannelId]: [...(prev[selectedChannelId] || []), userMsg],
    }));

    const questionAsked = inputText;
    setInputText('');

    // Simulate mentor/TA contextual response
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      let replyText = `Thanks for asking! That is covered in our syllabus guideline. Our teaching team has verified your query. Check the step breakdown in our course summary!`;

      if (selectedChannelId === 'math-2026') {
        replyText = `Excellent query! In Pure Mathematics Paper II, always verify your boundary conditions before integrating. Step marks are awarded sequentially: 1 Mark for substitution, 2 Marks for integration, and 1 Mark for the final simplified expression.`;
      } else if (selectedChannelId === 'phys-2026') {
        replyText = `Good observation! Always remember that sound wavelength compresses ahead of the moving source: λ' = (v - u_s)/f. We will demonstrate this on our live visual oscillator in today's broadcast!`;
      } else if (selectedChannelId === 'chem-2026') {
        replyText = `Notice the ligand substitution equilibrium: [Cu(H₂O)₆]²⁺ (blue) + 4Cl⁻ ⇌ [CuCl₄]²⁻ (yellow-green) + 6H₂O. The shift occurs according to Le Chatelier's principle.`;
      }

      const mentorReply: ChatMessage = {
        id: `mentor-${Date.now()}`,
        sender: currentChannel.mentor.split('(')[0].trim(),
        role: 'mentor',
        time: 'Just now',
        text: replyText,
        tag: 'Solution',
        likes: 1,
      };

      setMessages((prev) => ({
        ...prev,
        [selectedChannelId]: [...(prev[selectedChannelId] || []), mentorReply],
      }));
    }, 1400);
  };

  const handleLike = (msgId: string) => {
    setMessages((prev) => {
      const list = prev[selectedChannelId] || [];
      return {
        ...prev,
        [selectedChannelId]: list.map((m) => {
          if (m.id === msgId) {
            const liked = !m.userLiked;
            return {
              ...m,
              userLiked: liked,
              likes: liked ? m.likes + 1 : m.likes - 1,
            };
          }
          return m;
        }),
      };
    });
  };

  const filteredMessages = channelMessages.filter((m) => {
    if (activeFilter === 'doubts' && m.tag !== 'Doubt') return false;
    if (activeFilter === 'mentors' && m.role !== 'mentor') return false;
    if (searchTerm) {
      return (
        m.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.sender.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return true;
  });

  const pinnedMessage = channelMessages.find((m) => m.isPinned);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden transition-colors">
      {/* Top Banner Explainer */}
      <div className="px-6 py-4 bg-gradient-to-r from-indigo-900 via-slate-900 to-indigo-950 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-semibold tracking-wider uppercase text-indigo-300">
              Interactive Course Chat Application
            </span>
          </div>
          <h3 className="text-lg font-bold text-white mt-0.5">
            Peer & Mentor Collaboration Rooms
          </h3>
          <p className="text-xs text-slate-300">
            Enrolled students can debate past paper problems, clear subject doubts directly with faculty, and receive verified answers.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <div className="bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-xl border border-white/15 text-slate-200">
            Current Role: <span className="font-semibold text-emerald-300">Enrolled Student</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[580px]">
        {/* Left Sidebar: Course Channels Selector */}
        <div className="lg:col-span-4 border-r border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-950/40 p-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                My Enrolled Batches
              </span>
              <span className="text-xs font-medium text-indigo-600 dark:text-indigo-400">
                {INITIAL_CHANNELS.length} Active Rooms
              </span>
            </div>

            {/* Channels List */}
            <div className="space-y-2">
              {INITIAL_CHANNELS.map((ch) => {
                const isSelected = ch.id === selectedChannelId;
                return (
                  <button
                    key={ch.id}
                    onClick={() => setSelectedChannelId(ch.id)}
                    className={`w-full text-left p-3.5 rounded-2xl transition-all cursor-pointer border ${
                      isSelected
                        ? 'bg-white dark:bg-slate-800 border-indigo-300 dark:border-indigo-600 shadow-sm'
                        : 'bg-transparent border-transparent hover:bg-slate-100 dark:hover:bg-slate-800/50'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0 pr-2">
                        <h4
                          className={`text-xs font-bold truncate ${
                            isSelected ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-900 dark:text-white'
                          }`}
                        >
                          {ch.name}
                        </h4>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                          {ch.mentor}
                        </p>
                      </div>
                      {ch.unread > 0 && (
                        <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-600 text-white shrink-0">
                          {ch.unread}
                        </span>
                      )}
                    </div>
                    <div className="mt-2 flex items-center justify-between text-[10px] text-slate-400 dark:text-slate-500">
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3" /> {ch.activeUsers} students online
                      </span>
                      <span className="font-medium text-slate-600 dark:text-slate-400">{ch.subject}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Notice Card */}
          <div className="mt-4 p-3 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/60 text-xs text-indigo-950 dark:text-indigo-200">
            <div className="flex items-center gap-1.5 font-bold mb-1">
              <ShieldCheck className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span>Verified Mentor Room</span>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
              Faculty responses in this chat room carry official NIE curriculum accreditation status.
            </p>
          </div>
        </div>

        {/* Right Area: Active Course Chat Stream */}
        <div className="lg:col-span-8 flex flex-col justify-between h-[600px] bg-white dark:bg-slate-900">
          {/* Header Bar */}
          <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xs">
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                  {currentChannel.name}
                </h4>
                <Badge variant="success" size="sm">
                  Active
                </Badge>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Led by {currentChannel.mentor}
              </p>
            </div>

            {/* Filter Tabs & Search */}
            <div className="flex items-center gap-1.5">
              <div className="flex items-center p-0.5 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs">
                <button
                  onClick={() => setActiveFilter('all')}
                  className={`px-2.5 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
                    activeFilter === 'all'
                      ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setActiveFilter('doubts')}
                  className={`px-2.5 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
                    activeFilter === 'doubts'
                      ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  Doubts
                </button>
                <button
                  onClick={() => setActiveFilter('mentors')}
                  className={`px-2.5 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
                    activeFilter === 'mentors'
                      ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  Mentors
                </button>
              </div>
            </div>
          </div>

          {/* Pinned Announcement if available */}
          {pinnedMessage && (
            <div className="mx-4 mt-3 p-3 bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-800/60 rounded-2xl flex items-start gap-2.5">
              <Pin className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-amber-900 dark:text-amber-300">
                    Pinned Faculty Announcement
                  </span>
                  <span className="text-[10px] text-amber-700 dark:text-amber-400 font-medium">
                    {pinnedMessage.time}
                  </span>
                </div>
                <p className="text-xs text-amber-800 dark:text-amber-200 line-clamp-2 mt-0.5">
                  {pinnedMessage.text}
                </p>
              </div>
            </div>
          )}

          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {filteredMessages.map((msg) => {
              const isMe = msg.role === 'student' && msg.sender.startsWith('You');
              const isMentor = msg.role === 'mentor';

              return (
                <div
                  key={msg.id}
                  className={`flex items-start gap-3 ${isMe ? 'flex-row-reverse' : ''}`}
                >
                  {/* Avatar */}
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                      isMentor
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : isMe
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {isMentor ? 'M' : isMe ? 'ME' : msg.sender.charAt(0)}
                  </div>

                  {/* Message Bubble */}
                  <div
                    className={`max-w-lg rounded-2xl p-3.5 text-xs ${
                      isMe
                        ? 'bg-indigo-600 text-white rounded-tr-xs'
                        : isMentor
                        ? 'bg-indigo-50/80 dark:bg-indigo-950/50 border border-indigo-200/80 dark:border-indigo-800 text-slate-900 dark:text-slate-100 rounded-tl-xs'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-tl-xs'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3 mb-1">
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`font-bold ${
                            isMe
                              ? 'text-indigo-100'
                              : isMentor
                              ? 'text-indigo-700 dark:text-indigo-300'
                              : 'text-slate-800 dark:text-slate-200'
                          }`}
                        >
                          {msg.sender}
                        </span>
                        {isMentor && (
                          <span className="text-[10px] bg-indigo-200/60 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 px-1.5 py-0.2 rounded font-semibold">
                            Faculty Mentor
                          </span>
                        )}
                      </div>
                      <span
                        className={`text-[10px] ${
                          isMe ? 'text-indigo-200' : 'text-slate-400 dark:text-slate-500'
                        }`}
                      >
                        {msg.time}
                      </span>
                    </div>

                    {msg.tag && (
                      <div className="mb-1.5">
                        <span
                          className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                            msg.tag === 'Doubt'
                              ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                              : msg.tag === 'Solution'
                              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                              : 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
                          }`}
                        >
                          #{msg.tag}
                        </span>
                      </div>
                    )}

                    <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>

                    {/* Reactions Bar */}
                    <div className="mt-2.5 pt-2 border-t border-slate-200/40 dark:border-slate-700/60 flex items-center justify-between text-[11px]">
                      <button
                        onClick={() => handleLike(msg.id)}
                        className={`flex items-center gap-1 font-medium transition-colors cursor-pointer ${
                          msg.userLiked
                            ? 'text-rose-500 font-bold'
                            : isMe
                            ? 'text-indigo-200 hover:text-white'
                            : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                        }`}
                      >
                        <span>❤️</span>
                        <span>{msg.likes}</span>
                      </button>

                      {isMe && (
                        <span className="flex items-center gap-1 text-[10px] text-indigo-200">
                          <CheckCheck className="w-3.5 h-3.5" /> Delivered
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Mentor typing indicator */}
            {isTyping && (
              <div className="flex items-center gap-2 text-xs text-indigo-600 dark:text-indigo-400 italic bg-indigo-50/50 dark:bg-indigo-950/30 p-2.5 rounded-xl border border-indigo-100 dark:border-indigo-900/40 w-fit">
                <span className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce" />
                <span>Faculty Mentor is typing a verified answer...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Interactive Message Input Box */}
          <form
            onSubmit={handleSendMessage}
            className="p-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/60"
          >
            {/* Tag selector */}
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                Message Type:
              </span>
              {(['Doubt', 'General', 'Solution'] as const).map((tag) => (
                <button
                  type="button"
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-md transition-colors cursor-pointer ${
                    selectedTag === tag
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={`Ask a question or share steps in ${currentChannel.name}...`}
                className="flex-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <Button
                type="submit"
                variant="primary"
                size="sm"
                className="rounded-xl px-4 py-2.5 shrink-0"
                disabled={!inputText.trim()}
              >
                <Send className="w-4 h-4 mr-1.5" />
                Send
              </Button>
            </div>
            <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-1.5">
              Tip: Post your mathematics or physics doubts with question numbers for immediate faculty review.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
