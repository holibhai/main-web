import React, { useState } from 'react';
import {
  MessageSquare,
  Bot,
  Calendar,
  FileCheck,
  LineChart,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Layers,
  GraduationCap,
} from 'lucide-react';
import { CourseChatShowcase } from './CourseChatShowcase';
import { AIChatbotShowcase } from './AIChatbotShowcase';
import { AcademicCalendarShowcase } from './AcademicCalendarShowcase';
import { QuizAssignmentShowcase } from './QuizAssignmentShowcase';
import { GradingAnalyticsShowcase } from './GradingAnalyticsShowcase';

export type FeatureTabKey = 'chat' | 'ai' | 'calendar' | 'quiz' | 'analytics';

export interface InteractiveAppSuiteProps {
  initialTab?: FeatureTabKey;
  onOpenAdmissions?: () => void;
}

export const InteractiveAppSuite: React.FC<InteractiveAppSuiteProps> = ({
  initialTab = 'chat',
  onOpenAdmissions,
}) => {
  const [activeTab, setActiveTab] = useState<FeatureTabKey>(initialTab);

  const tabs: {
    key: FeatureTabKey;
    label: string;
    sublabel: string;
    icon: React.ReactNode;
    tag: string;
  }[] = [
    {
      key: 'chat',
      label: 'Course-wise Chat App',
      sublabel: 'Mentor & peer rooms',
      icon: <MessageSquare className="w-4 h-4" />,
      tag: 'Collaboration',
    },
    {
      key: 'ai',
      label: 'AI Study Chatbot',
      sublabel: 'NIE syllabus derivations',
      icon: <Bot className="w-4 h-4" />,
      tag: 'Intelligence',
    },
    {
      key: 'calendar',
      label: 'Calendar & Deadlines',
      sublabel: 'Lectures, quizzes & exams',
      icon: <Calendar className="w-4 h-4" />,
      tag: 'Scheduling',
    },
    {
      key: 'quiz',
      label: 'Quizzes & Assignments',
      sublabel: 'Live drill & rubric grading',
      icon: <FileCheck className="w-4 h-4" />,
      tag: 'Assessments',
    },
    {
      key: 'analytics',
      label: 'Grading & Analytics',
      sublabel: 'Progression curves & Z-score',
      icon: <LineChart className="w-4 h-4" />,
      tag: 'Insights',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Master Feature Navigation Ribbon */}
      <div className="bg-slate-100 dark:bg-slate-900/90 p-1.5 sm:p-2 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-sm">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-1.5">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`text-left p-3 rounded-2xl transition-all cursor-pointer flex flex-col justify-between border ${
                  isActive
                    ? 'bg-white dark:bg-slate-800 border-indigo-400/80 dark:border-indigo-600 shadow-md text-indigo-600 dark:text-indigo-400'
                    : 'bg-transparent border-transparent text-slate-600 dark:text-slate-400 hover:bg-white/50 dark:hover:bg-slate-800/40 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div
                    className={`p-1.5 rounded-xl ${
                      isActive
                        ? 'bg-indigo-50 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400'
                        : 'bg-slate-200/60 dark:bg-slate-800 text-slate-500'
                    }`}
                  >
                    {tab.icon}
                  </div>
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                      isActive
                        ? 'bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300'
                        : 'text-slate-400'
                    }`}
                  >
                    {tab.tag}
                  </span>
                </div>

                <div>
                  <h4
                    className={`text-xs font-bold leading-tight ${
                      isActive ? 'text-slate-900 dark:text-white' : 'text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {tab.label}
                  </h4>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 truncate">
                    {tab.sublabel}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Feature Canvas Area */}
      <div className="transition-all duration-200">
        {activeTab === 'chat' && <CourseChatShowcase />}
        {activeTab === 'ai' && <AIChatbotShowcase />}
        {activeTab === 'calendar' && <AcademicCalendarShowcase />}
        {activeTab === 'quiz' && <QuizAssignmentShowcase />}
        {activeTab === 'analytics' && <GradingAnalyticsShowcase />}
      </div>
    </div>
  );
};
