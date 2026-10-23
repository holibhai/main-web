import React from 'react';
import {
  ArrowRight,
  BookOpen,
  Bot,
  CheckCircle2,
  ChevronRight,
  GraduationCap,
  Layers,
  PlayCircle,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
} from 'lucide-react';
import { CourseItem, Language, MaterialItem } from '../types';
import { SITE_CONFIG } from '../lib/config/site';
import { getTranslation } from '../lib/translations';
import { Container } from '../components/ui/Container';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Card } from '../components/ui/Card';
import { Accordion } from '../components/ui/FeedbackStates';
import { HeroInteractivePreview } from '../components/home/HeroInteractivePreview';
import { CourseCard } from '../components/courses/CourseCard';
import { MaterialCard } from '../components/marketplace/MaterialCard';
import { MOCK_FAQS } from '../data/mockData';
import { InteractiveAppSuite } from '../components/features/InteractiveAppSuite';
import { ZScoreCalculator } from '../components/home/ZScoreCalculator';
import { LiveCampusTicker } from '../components/home/LiveCampusTicker';

export interface HomePageProps {
  currentLang: Language;
  onNavigate: (path: string) => void;
  courses: CourseItem[];
  materials: MaterialItem[];
  onSelectCourse: (course: CourseItem) => void;
  onSelectMaterial: (material: MaterialItem) => void;
  onApplyCourse: (course: CourseItem) => void;
  onAddToCart: (material: MaterialItem) => void;
  onOpenAdmissions: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  currentLang,
  onNavigate,
  courses,
  materials,
  onSelectCourse,
  onSelectMaterial,
  onApplyCourse,
  onAddToCart,
  onOpenAdmissions,
}) => {
  const t = (key: string) => getTranslation(currentLang, key);

  return (
    <div className="space-y-20 sm:space-y-28 pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 sm:pt-20 overflow-hidden">
        {/* Subtle decorative background gradient */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] pointer-events-none -z-10 opacity-70">
          <div className="absolute -top-40 left-1/4 w-96 h-96 bg-indigo-200/40 rounded-full blur-3xl" />
          <div className="absolute top-10 right-1/4 w-96 h-96 bg-blue-200/40 rounded-full blur-3xl" />
        </div>

        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Side: SaaS Headline & CTAs */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/80 dark:border-indigo-800/60 text-xs font-semibold text-indigo-700 dark:text-indigo-300 shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                <span>{t('hero.badge')}</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.12]">
                {t('hero.headline')}
              </h1>

              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl mx-auto lg:mx-0">
                {t('hero.subheadline')}
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => onNavigate('courses')}
                  leftIcon={<GraduationCap className="w-5 h-5" />}
                  className="w-full sm:w-auto shadow-md shadow-indigo-500/20"
                >
                  {t('hero.cta.courses')}
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => onNavigate('marketplace')}
                  leftIcon={<BookOpen className="w-5 h-5" />}
                  className="w-full sm:w-auto"
                >
                  {t('hero.cta.resources')}
                </Button>
              </div>

              {/* Verified Trust Badges */}
              <div className="pt-6 border-t border-slate-200/80 dark:border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">100%</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{t('hero.stat.courses')}</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">500+</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{t('hero.stat.materials')}</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">Senior</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{t('hero.stat.teachers')}</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">Trilingual</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">EN • TA • SI</div>
                </div>
              </div>
            </div>

            {/* Right Side: Composed SaaS Learning Product Preview */}
            <div className="lg:col-span-6">
              <HeroInteractivePreview onNavigate={onNavigate} />
            </div>
          </div>
        </Container>
      </section>

      {/* 2. REAL-TIME CAMPUS PULSE & BROADCAST TICKER */}
      <section>
        <Container>
          <LiveCampusTicker onNavigate={onNavigate} />
        </Container>
      </section>

      {/* 3. INTERACTIVE LMS SUITE - LIVE WORKING MODULES */}
      <section id="features-demo" className="bg-slate-50/70 dark:bg-slate-950/60 py-16 sm:py-20 border-y border-slate-200/80 dark:border-slate-800 transition-colors">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-1.5">
                <Sparkles className="w-4 h-4" />
                <span>Interactive Platform Architecture</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Try Mentify Core LMS Features in Real-Time
              </h2>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
                Experience our 5 connected systems: Course-wise student and mentor chat rooms, curriculum-grounded AI problem solver,
                synchronized academic calendar, timed quiz assessments, and visual grading curves.
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onNavigate('features')}
                className="text-xs"
              >
                Full Feature Details
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={onOpenAdmissions}
                className="text-xs"
              >
                Join Next Batch
              </Button>
            </div>
          </div>

          {/* Master Interactive Suite embedded on Home Page */}
          <InteractiveAppSuite onOpenAdmissions={onOpenAdmissions} />
        </Container>
      </section>

      {/* 4. G.C.E. A/L Z-SCORE & FACULTY ELIGIBILITY SIMULATOR */}
      <section>
        <Container>
          <div className="mb-8 text-center max-w-2xl mx-auto">
            <Badge variant="primary" size="md" className="mb-2">
              University Admissions Planning
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              A/L Z-Score & Campus Cutoff Feasibility
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              Estimate your standardized marks across Pure Maths, Biology, Physics, or Commerce and simulate admission matches with Moratuwa, Colombo, and Peradeniya.
            </p>
          </div>

          <ZScoreCalculator onOpenAdmissions={onOpenAdmissions} />
        </Container>
      </section>

      {/* 3. ACADEMIC COURSE DISCOVERY */}
      <section>
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <SectionHeading
              align="left"
              badge="Structured Programs"
              title="Academic Courses & Master Revision Batches"
              subtitle="Taught by verified master lecturers with rigorous theory, problem sheets, and timed examination simulations."
            />
            <Button
              variant="outline"
              size="md"
              onClick={() => onNavigate('courses')}
              rightIcon={<ArrowRight className="w-4 h-4" />}
              className="shrink-0 self-start md:self-end"
            >
              View All Courses
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {courses.slice(0, 3).map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                onViewDetails={onSelectCourse}
                onApply={onApplyCourse}
              />
            ))}
          </div>
        </Container>
      </section>

      {/* 4. GRADE & STREAM EXPLORATION */}
      <section className="bg-slate-100/60 dark:bg-slate-900/60 py-16 sm:py-20 rounded-3xl mx-4 sm:mx-6 lg:mx-8 border border-slate-200/60 dark:border-slate-800 transition-colors">
        <Container>
          <SectionHeading
            badge="Targeted Preparation"
            title="Explore by Academic Grade and Stream"
            subtitle="Choose your current academic milestone to access tailored lecture streams and curated learning packs."
          />

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              {
                title: 'A/L Combined Mathematics',
                desc: 'Pure & Applied Maths, theory breakdowns, step-by-step model marking.',
                icon: <GraduationCap className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />,
                badge: 'Engineering Stream',
              },
              {
                title: 'A/L Biological Science',
                desc: 'Biology NIE resource book drills, organic chemistry reaction flowcharts.',
                icon: <Sparkles className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />,
                badge: 'Medical Stream',
              },
              {
                title: 'A/L Physical Science (Physics)',
                desc: 'In-depth conceptual mechanics, practical experiments & graph analytics.',
                icon: <Layers className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
                badge: 'High Yield',
              },
              {
                title: 'Grade 10 - 11 (O/L)',
                desc: 'Ordinary Level foundation mathematics, science, and English past paper drill.',
                icon: <BookOpen className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />,
                badge: 'Foundation',
              },
            ].map((stream, idx) => (
              <div
                key={idx}
                onClick={() => onNavigate('courses')}
                className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs hover:border-indigo-300 dark:hover:border-indigo-500 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                      {stream.icon}
                    </div>
                    <Badge variant="neutral" size="sm">
                      {stream.badge}
                    </Badge>
                  </div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {stream.title}
                  </h4>
                  <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{stream.desc}</p>
                </div>
                <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                  <span>Explore Stream</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 5. LEARNING FEATURES & AI ASSISTED EDUCATION */}
      <section>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-6">
              <SectionHeading
                align="left"
                badge="Platform Innovation"
                title="AI-Powered Study Guidance Built Into Your Curriculum"
                subtitle="Mentify provides round-the-clock academic coaching that guides students through difficult syllabus derivations without replacing human educator mentorship."
              />

              <div className="space-y-4 pt-2">
                {[
                  {
                    title: 'Step-by-Step Derivation Breakdown',
                    desc: 'Clear guidance on past paper mathematics, physical formulas, and balancing chemistry equations.',
                  },
                  {
                    title: 'Official NIE Marking Scheme Alignment',
                    desc: 'Trained exclusively on validated national curriculum rubrics to ensure exam-ready responses.',
                  },
                  {
                    title: 'Trilingual Understanding',
                    desc: 'Ask questions and receive explanations seamlessly in English, Tamil, or Sinhala.',
                  },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">{item.title}</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => onNavigate('features')}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Explore All Platform Capabilities
                </Button>
              </div>
            </div>

            <div className="lg:col-span-7">
              <Card padding="none" className="overflow-hidden border border-slate-200/90 shadow-xl bg-slate-900 text-white">
                <div className="p-6 sm:p-8 space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
                        <Bot className="w-4 h-4" />
                      </div>
                      <span className="font-bold text-sm">Mentify AI Diagnostic Simulation</span>
                    </div>
                    <Badge variant="accent" size="sm" className="bg-cyan-500 text-slate-950 font-bold">
                      Active
                    </Badge>
                  </div>

                  <div className="space-y-3 font-mono text-xs">
                    <div className="bg-slate-800/80 p-3.5 rounded-xl border border-white/5 text-slate-300">
                      <p className="text-indigo-400 font-bold mb-1">// Input Exam Question</p>
                      <p>Determine the horizontal range R of a projectile launched at speed u and angle θ.</p>
                    </div>

                    <div className="bg-indigo-950/60 p-4 rounded-xl border border-indigo-500/30 text-indigo-200 space-y-2">
                      <p className="text-emerald-400 font-bold">// Model Paper Marking Formula</p>
                      <p>Time of flight T = (2u sin θ) / g</p>
                      <p>Horizontal distance = u cos θ × T = (2u² sin θ cos θ) / g</p>
                      <p className="text-white font-bold">⇒ R = (u² sin 2θ) / g [Score: 4/4 marks]</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-400 pt-2">
                    <span>Target: G.C.E. A/L Physics Paper II</span>
                    <span className="text-indigo-400">Validated by TiT Education Faculty</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </Container>
      </section>

      {/* 6. FEATURED MARKETPLACE MATERIALS */}
      <section className="bg-slate-50 dark:bg-slate-950/50 py-16 sm:py-20 border-y border-slate-200/80 dark:border-slate-800 transition-colors">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <SectionHeading
              align="left"
              badge="Curated Resources"
              title="Verified Educational Materials Marketplace"
              subtitle="Download past papers, model marking schemes, and revision guides prepared by leading educators."
            />
            <Button
              variant="outline"
              size="md"
              onClick={() => onNavigate('marketplace')}
              rightIcon={<ArrowRight className="w-4 h-4" />}
              className="shrink-0 self-start md:self-end"
            >
              Browse All Materials
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {materials.slice(0, 3).map((item) => (
              <MaterialCard
                key={item.id}
                material={item}
                onViewDetails={onSelectMaterial}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        </Container>
      </section>

      {/* 7. STUDENT & TEACHER EXPERIENCE DUAL CARDS */}
      <section>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Student Experience */}
            <Card hoverEffect padding="lg" className="flex flex-col justify-between border-indigo-100 dark:border-indigo-900/40 bg-gradient-to-b from-white to-indigo-50/20 dark:from-slate-900 dark:to-indigo-950/30">
              <div>
                <Badge variant="primary" size="sm" className="mb-4">
                  For Students & Candidates
                </Badge>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white leading-snug">
                  One Unified Digital Campus for Notes, Recordings & Assessments
                </h3>
                <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Never miss a live class or misplace a paper. All session recordings, annotated whiteboard
                  PDFs, term test results, and homework grading are centralized within your personal student portal.
                </p>
                <ul className="mt-6 space-y-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Instant access to HD video recordings of every class</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Digital homework submissions with teacher feedback annotations</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Live AI revision tutor for rapid doubt clearing</span>
                  </li>
                </ul>
              </div>
              <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
                <Button
                  variant="primary"
                  size="md"
                  onClick={onOpenAdmissions}
                  className="w-full sm:w-auto"
                >
                  Apply as a Student
                </Button>
              </div>
            </Card>

            {/* Teacher Experience */}
            <Card hoverEffect padding="lg" className="flex flex-col justify-between border-blue-100 dark:border-blue-900/40 bg-gradient-to-b from-white to-blue-50/20 dark:from-slate-900 dark:to-blue-950/30">
              <div>
                <Badge variant="secondary" size="sm" className="mb-4">
                  For Teachers & Lecturers
                </Badge>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white leading-snug">
                  Automated Academic Workflows & Classroom Management
                </h3>
                <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Focus on impactful teaching while Mentify manages attendance recording, assignment tracking,
                  quiz grading, and digital marketplace distribution with high security.
                </p>
                <ul className="mt-6 space-y-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                    <span>Automated student attendance tracking & parent SMS alerts</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                    <span>Publish and monetize revision materials on the Mentify Marketplace</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                    <span>Integrated gradebook and term examination analytics</span>
                  </li>
                </ul>
              </div>
              <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
                <Button
                  variant="outline"
                  size="md"
                  onClick={() => onNavigate('portals')}
                  className="w-full sm:w-auto"
                >
                  Faculty Portal Access
                </Button>
              </div>
            </Card>
          </div>
        </Container>
      </section>

      {/* 8. ADMISSIONS CALL TO ACTION */}
      <section>
        <Container>
          <div className="relative rounded-3xl bg-gradient-to-r from-indigo-900 via-indigo-800 to-blue-900 text-white p-8 sm:p-14 overflow-hidden shadow-xl shadow-indigo-950/20">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-2xl pointer-events-none" />
            <div className="relative z-10 max-w-2xl space-y-4">
              <Badge variant="accent" size="md" className="bg-white/20 text-white border-white/20">
                Academic Intakes Open
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
                Secure Your Academic Placement for Upcoming Batches
              </h2>
              <p className="text-indigo-200 text-sm sm:text-base leading-relaxed">
                Pre-register online in under 2 minutes. Receive timetable details, syllabi previews, and
                personalized counseling for G.C.E. O/L and A/L streams.
              </p>
              <div className="pt-4 flex flex-col sm:flex-row gap-3">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={onOpenAdmissions}
                  className="bg-white text-indigo-950 hover:bg-slate-100 shadow-lg"
                >
                  Apply Online Now
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => onNavigate('contact')}
                  className="border-white/30 text-white hover:bg-white/10"
                >
                  Speak with an Academic Counselor
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 9. FREQUENTLY ASKED QUESTIONS */}
      <section>
        <Container size="md">
          <SectionHeading
            badge="Got Questions?"
            title="Frequently Asked Questions"
            subtitle="Everything you need to know about course admissions, learning resources, and portal access."
          />

          <div className="mt-10">
            <Accordion
              items={MOCK_FAQS.map((faq) => ({
                title: faq.question,
                content: <p>{faq.answer}</p>,
              }))}
            />
          </div>
        </Container>
      </section>
    </div>
  );
};
