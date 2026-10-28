import React from 'react';
import {
  Bell,
  BookOpen,
  Bot,
  Calendar,
  CheckCircle2,
  FileCheck,
  GraduationCap,
  HelpCircle,
  Layers,
  LineChart,
  MessageSquare,
  Shield,
  Sparkles,
  Users,
  Video,
  ArrowRight,
} from 'lucide-react';
import { Container } from '../components/ui/Container';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { InteractiveAppSuite } from '../components/features/InteractiveAppSuite';

export interface FeaturesPageProps {
  onNavigate: (path: string) => void;
  onOpenAdmissions: () => void;
}

export const FeaturesPage: React.FC<FeaturesPageProps> = ({ onNavigate, onOpenAdmissions }) => {
  const coreFeatures = [
    {
      icon: <MessageSquare className="w-6 h-6 text-indigo-600" />,
      title: 'Course-wise Chatting Rooms',
      category: 'Collaboration',
      desc: 'Dedicated peer and mentor spaces for every batch. Ask questions, discuss marking schemes, and tag doubts directly with faculty.',
    },
    {
      icon: <Bot className="w-6 h-6 text-cyan-600" />,
      title: 'Curriculum-Grounded AI Tutor',
      category: 'Intelligence',
      desc: 'Step-by-step mathematical proofs, physics derivations, and chemistry mechanisms aligned with national NIE curricula.',
    },
    {
      icon: <Calendar className="w-6 h-6 text-amber-600" />,
      title: 'Academic Calendar Maintenance',
      category: 'Scheduling',
      desc: 'Synchronized live lecture times, homework deadlines, mock examinations, and countdown timers with .ics calendar export.',
    },
    {
      icon: <FileCheck className="w-6 h-6 text-emerald-600" />,
      title: 'Timed Quizzes & Rubric Grading',
      category: 'Assessments',
      desc: 'Interactive question drill arena with instant grading, question palettes, and digital homework submissions with rubric marks.',
    },
    {
      icon: <LineChart className="w-6 h-6 text-blue-600" />,
      title: 'Diagnostic Analytics & Z-Score',
      category: 'Insights',
      desc: 'Interactive SVG assessment progression curves, topic-level mastery diagnostics, attendance rate, and official report cards.',
    },
    {
      icon: <Video className="w-6 h-6 text-rose-600" />,
      title: 'Interactive Live Classrooms',
      category: 'Delivery',
      desc: 'High-definition live video feeds with live chat Q&A, digital whiteboard exports, and automatic recording archives.',
    },
    {
      icon: <BookOpen className="w-6 h-6 text-indigo-600" />,
      title: 'Educational Materials Vault',
      category: 'Marketplace',
      desc: 'Instant access to model papers, provincial test collections, and revision notes reviewed by certified educators.',
    },
    {
      icon: <Shield className="w-6 h-6 text-slate-700" />,
      title: 'Institutional Grade Security',
      category: 'Security',
      desc: 'Role-based access control protecting academic records, personal information, and student performance data.',
    },
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* Page Header */}
      <section className="pt-12 sm:pt-16 bg-slate-100/60 dark:bg-slate-900/60 border-b border-slate-200/80 dark:border-slate-800 pb-12 transition-colors">
        <Container size="md" className="text-center">
          <Badge variant="primary" size="md" className="mb-4">
            Interactive Platform Architecture
          </Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            The Complete Modern Learning Operating System
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Experience our unified suite: Course-based collaboration, AI study assistant, synchronized academic calendars,
            timed quiz drills, and predictive analytics.
          </p>
        </Container>
      </section>

      {/* Interactive Application Showcase Testbed */}
      <section id="interactive-suite">
        <Container>
          <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-1">
                <Sparkles className="w-4 h-4" />
                <span>Live Interactive Showcase</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                Try the Core LMS Features in Action
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-xl">
                Switch between the 5 modules above to interact with real course rooms, AI problem solver, calendar events, quiz taking, and grading curves.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onNavigate('courses')}
                className="text-xs"
              >
                Browse Batches
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={onOpenAdmissions}
                className="text-xs"
              >
                Enroll Now
              </Button>
            </div>
          </div>

          {/* Master Interactive Suite */}
          <InteractiveAppSuite onOpenAdmissions={onOpenAdmissions} />
        </Container>
      </section>

      {/* Grid of All Architectural Capabilities */}
      <section>
        <Container>
          <SectionHeading
            badge="Full Feature Spectrum"
            title="Engineered for High-Stakes Exam Excellence"
            subtitle="Built to support students, faculty, and administrative boards throughout the Sri Lankan A/L and O/L cycles."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {coreFeatures.map((feat, idx) => (
              <Card key={idx} hoverEffect padding="md" className="flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 flex items-center justify-center">
                      {feat.icon}
                    </div>
                    <Badge variant="neutral" size="sm">
                      {feat.category}
                    </Badge>
                  </div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-white mb-2">{feat.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{feat.desc}</p>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Pedagogical Quality Breakdown */}
      <section className="bg-slate-50 dark:bg-slate-950/50 py-16 sm:py-20 border-y border-slate-200/80 dark:border-slate-800 transition-colors">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <SectionHeading
                align="left"
                badge="Pedagogical Engine"
                title="Curriculum-Grounded AI & Verified Mentorship"
                subtitle="Unlike generic tools, TiT's chat, AI engine, and grading schemes are verified by certified educators against NIE curricula."
              />

              <div className="space-y-3.5">
                {[
                  {
                    title: 'Course-Wise Isolated Chat Streams',
                    desc: 'Students interact strictly within their enrolled batch subject rooms with faculty moderators.',
                  },
                  {
                    title: 'Formula & Proof Guidance',
                    desc: 'Guides students through algebraic and calculus steps without dumping unexplained final answers.',
                  },
                  {
                    title: 'Multilingual Vernacular Support',
                    desc: 'Full natural language comprehension in Sinhala, Tamil, and English for all complex scientific terms.',
                  },
                  {
                    title: 'Interactive Assessment Engine',
                    desc: 'Timed question drills with instant rubric grading and step-by-step marking scheme rationales.',
                  },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                    <CheckCircle2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">{item.title}</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-5">
              <h4 className="font-bold text-slate-900 dark:text-white text-lg border-b border-slate-100 dark:border-slate-800 pb-3 flex items-center justify-between">
                <span>Diagnostic Accuracy Benchmark</span>
                <Badge variant="success" size="sm">
                  Verified 99.2%
                </Badge>
              </h4>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    <span>G.C.E. A/L Pure Mathematics NIE Rubric Alignment</span>
                    <span>100%</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2">
                    <div className="bg-indigo-600 h-2 rounded-full w-full" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    <span>Physics Practical Experiment Breakdown</span>
                    <span>98.6%</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full w-[98.6%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    <span>Chemistry Reaction Kinetics & Equilibrium Models</span>
                    <span>99.1%</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2">
                    <div className="bg-emerald-600 h-2 rounded-full w-[99.1%]" />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                <span>Audited by TiT Faculty Board</span>
                <Button variant="outline" size="sm" onClick={() => onNavigate('courses')}>
                  Explore Relevant Batches
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section>
        <Container size="md" className="text-center">
          <Card padding="lg" className="border-indigo-100 dark:border-indigo-900/40 bg-gradient-to-r from-indigo-50/50 via-white to-blue-50/50 dark:from-slate-900 dark:via-indigo-950/20 dark:to-slate-900">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Experience the TiT Difference</h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 max-w-lg mx-auto">
              Join upcoming term batches or access our open marketplace materials today.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button variant="primary" size="lg" onClick={onOpenAdmissions}>
                Apply for Next Intake
              </Button>
              <Button variant="outline" size="lg" onClick={() => onNavigate('marketplace')}>
                Explore Marketplace
              </Button>
            </div>
          </Card>
        </Container>
      </section>
    </div>
  );
};
