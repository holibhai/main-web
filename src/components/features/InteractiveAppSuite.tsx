import React, { useState } from 'react';
import {
  MessageSquare,
  Bot,
  Calendar,
  FileCheck,
  LineChart,
} from 'lucide-react';
import { CourseChatShowcase } from './CourseChatShowcase';
import { AIChatbotShowcase } from './AIChatbotShowcase';
import { AcademicCalendarShowcase } from './AcademicCalendarShowcase';
import { QuizAssignmentShowcase } from './QuizAssignmentShowcase';
import { GradingAnalyticsShowcase } from './GradingAnalyticsShowcase';

export type FeatureTabKey = 'chat' | 'ai' | 'calendar' | 'quiz' | 'analytics';

export interface InteractiveAppSuiteProps {
  initialTab?: FeatureTabKey;
  activeTab?: FeatureTabKey;
  onTabChange?: (tab: FeatureTabKey) => void;
  onOpenAdmissions?: () => void;
}

interface TabConfig {
  key: FeatureTabKey;
  label: string;
  sublabel: string;
  icon: React.ReactNode;
  tag: string;
  badge: string;
  colorClass: string;
  badgeColorClass: string;
  activeBorderClass: string;
  activeBgClass: string;
  highlights: string[];
}

export const InteractiveAppSuite: React.FC<InteractiveAppSuiteProps> = ({
  initialTab = 'chat',
  activeTab: controlledTab,
  onTabChange,
  onOpenAdmissions,
}) => {
  const [internalTab, setInternalTab] = useState<FeatureTabKey>(initialTab);
  const activeTab = controlledTab ?? internalTab;

  React.useEffect(() => {
    if (initialTab) {
      setInternalTab(initialTab);
    }
  }, [initialTab]);

  const handleTabSelect = (key: FeatureTabKey) => {
    setInternalTab(key);
    if (onTabChange) {
      onTabChange(key);
    }
  };

  const tabs: TabConfig[] = [
    {
      key: 'chat',
      label: 'Course-wise Chat App',
      sublabel: 'Mentor & peer rooms',
      icon: <MessageSquare className="w-4 h-4" />,
      tag: 'Collaboration',
      badge: 'Live Rooms',
      colorClass: 'text-indigo-600 dark:text-indigo-400',
      badgeColorClass: 'bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300',
      activeBorderClass: 'border-indigo-500 ring-2 ring-indigo-500/20',
      activeBgClass: 'bg-white dark:bg-slate-800',
      highlights: [
        'Batch-specific channels for Combined Maths, Physics, Chemistry',
        'Direct doubt tagging with verified mentor responses',
        'Peer discussion & marking scheme debates',
      ],
    },
    {
      key: 'ai',
      label: 'AI Study Chatbot',
      sublabel: 'NIE syllabus derivations',
      icon: <Bot className="w-4 h-4" />,
      tag: 'Intelligence',
      badge: '24/7 AI',
      colorClass: 'text-cyan-600 dark:text-cyan-400',
      badgeColorClass: 'bg-cyan-100 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-300',
      activeBorderClass: 'border-cyan-500 ring-2 ring-cyan-500/20',
      activeBgClass: 'bg-white dark:bg-slate-800',
      highlights: [
        'Step-by-step calculus proofs & Doppler effect derivations',
        'Direct alignment with NIE national marking schemes',
        'Trilingual support in English, Tamil, and Sinhala',
      ],
    },
    {
      key: 'calendar',
      label: 'Calendar & Deadlines',
      sublabel: 'Lectures, quizzes & exams',
      icon: <Calendar className="w-4 h-4" />,
      tag: 'Scheduling',
      badge: 'Live Sync',
      colorClass: 'text-amber-600 dark:text-amber-400',
      badgeColorClass: 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300',
      activeBorderClass: 'border-amber-500 ring-2 ring-amber-500/20',
      activeBgClass: 'bg-white dark:bg-slate-800',
      highlights: [
        'Synchronized live Zoom & campus lecture timetables',
        'Homework submission deadlines with countdown clocks',
        'Term test & provincial trial exam reminders with .ics export',
      ],
    },
    {
      key: 'quiz',
      label: 'Quizzes & Assignments',
      sublabel: 'Live drill & rubric grading',
      icon: <FileCheck className="w-4 h-4" />,
      tag: 'Assessments',
      badge: 'Timed Arena',
      colorClass: 'text-emerald-600 dark:text-emerald-400',
      badgeColorClass: 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300',
      activeBorderClass: 'border-emerald-500 ring-2 ring-emerald-500/20',
      activeBgClass: 'bg-white dark:bg-slate-800',
      highlights: [
        'Exam-conditioned MCQ drills with live timer & palette',
        'Instant scoring and solution step explanations',
        'Structured rubric marking for subjective questions',
      ],
    },
    {
      key: 'analytics',
      label: 'Grading & Analytics',
      sublabel: 'Progression curves & Z-score',
      icon: <LineChart className="w-4 h-4" />,
      tag: 'Insights',
      badge: 'Z-Score',
      colorClass: 'text-blue-600 dark:text-blue-400',
      badgeColorClass: 'bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300',
      activeBorderClass: 'border-blue-500 ring-2 ring-blue-500/20',
      activeBgClass: 'bg-white dark:bg-slate-800',
      highlights: [
        'Interactive SVG assessment score progression curves',
        'A/L Z-Score simulation & university cutoff feasibility',
        'Topic-level mastery diagnostics and attendance tracking',
      ],
    },
  ];

  return (
    <div className="w-full space-y-6">
      {/* Full-Width Feature Selection Bar (Placed Above the Images / Modules) */}
      <div className="w-full bg-slate-100/90 dark:bg-slate-900/90 p-2 sm:p-2.5 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-sm">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => handleTabSelect(tab.key)}
                className={`text-left p-3.5 rounded-2xl transition-all cursor-pointer flex flex-col justify-between border ${
                  isActive
                    ? `${tab.activeBgClass} ${tab.activeBorderClass} shadow-md`
                    : 'bg-white/60 dark:bg-slate-850/60 border-transparent text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 hover:shadow-xs'
                }`}
              >
                {/* Top Row: Icon and Badge */}
                <div className="flex items-center justify-between mb-2">
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                      isActive
                        ? 'bg-slate-100 dark:bg-slate-750 shadow-2xs ' + tab.colorClass
                        : 'bg-slate-200/60 dark:bg-slate-800 text-slate-500'
                    }`}
                  >
                    {tab.icon}
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${tab.badgeColorClass}`}
                  >
                    {tab.badge}
                  </span>
                </div>

                {/* Bottom Row: Title and Subtitle */}
                <div>
                  <h4
                    className={`text-xs sm:text-sm font-bold leading-tight ${
                      isActive ? 'text-slate-900 dark:text-white' : 'text-slate-800 dark:text-slate-200'
                    }`}
                  >
                    {tab.label}
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 truncate">
                    {tab.sublabel}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>


      {/* Main Full-Width Feature Canvas (Uses the complete width without any squeezing sidebar) */}
      <div className="w-full transition-all duration-200">
        {activeTab === 'chat' && <CourseChatShowcase />}
        {activeTab === 'ai' && <AIChatbotShowcase />}
        {activeTab === 'calendar' && <AcademicCalendarShowcase />}
        {activeTab === 'quiz' && <QuizAssignmentShowcase />}
        {activeTab === 'analytics' && <GradingAnalyticsShowcase />}
      </div>
    </div>
  );
};
