import {
  ArrowRight,
  Award,
  BookOpen,
  CheckCircle2,
  GraduationCap,
  Sparkles,
  UserCheck,
} from 'lucide-react';
import { CourseItem, Language, MaterialItem } from '../types';
import { SITE_CONFIG } from '../lib/config/site';
import { getTranslation } from '../lib/translations';
import { Container } from '../components/ui/Container';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Accordion } from '../components/ui/FeedbackStates';
import heroStudentsImg from '../assets/images/mentify_students_hero_1792947128104.jpg';
import { CourseCard } from '../components/courses/CourseCard';
import { MaterialCard } from '../components/marketplace/MaterialCard';
import { MOCK_FAQS } from '../data/mockData';
import { InteractiveAppSuite, FeatureTabKey } from '../components/features/InteractiveAppSuite';
import { GradeCourseExplorer } from '../components/courses/GradeCourseExplorer';

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
  onOpenResults?: () => void;
  onOpenTutorApply?: () => void;
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
  onOpenResults,
  onOpenTutorApply,
}) => {
  const [activeFeatureTab, setActiveFeatureTab] = useState<FeatureTabKey>('chat');
  const t = (key: string) => getTranslation(currentLang, key);

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* 1. HERO SECTION - CLEAN & PROFESSIONAL */}
      <section className="relative pt-10 sm:pt-16 overflow-hidden">
        {/* Subtle decorative background gradient */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[550px] pointer-events-none -z-10 opacity-60">
          <div className="absolute -top-32 left-1/4 w-80 h-80 bg-indigo-200/40 dark:bg-indigo-900/20 rounded-full blur-3xl" />
          <div className="absolute top-10 right-1/4 w-80 h-80 bg-blue-200/40 dark:bg-blue-900/20 rounded-full blur-3xl" />
        </div>

        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            {/* Left Column: Core Value Proposition & Clean CTAs */}
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
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 flex-wrap">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => onNavigate('courses')}
                  leftIcon={<GraduationCap className="w-5 h-5" />}
                  className="w-full sm:w-auto shadow-md shadow-indigo-500/20"
                >
                  {t('hero.cta.courses')}
                </Button>

                {onOpenResults && (
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={onOpenResults}
                    leftIcon={<Award className="w-5 h-5 text-amber-500" />}
                    className="w-full sm:w-auto border-amber-300 dark:border-amber-700/60 bg-amber-50/50 dark:bg-amber-950/20 text-amber-900 dark:text-amber-200 hover:bg-amber-100/60"
                  >
                    Check Exam Results
                  </Button>
                )}

                {onOpenTutorApply && (
                  <Button
                    variant="ghost"
                    size="lg"
                    onClick={onOpenTutorApply}
                    leftIcon={<UserCheck className="w-5 h-5 text-indigo-500" />}
                    className="w-full sm:w-auto text-slate-700 dark:text-slate-300"
                  >
                    Apply as a Tutor
                  </Button>
                )}
              </div>

              {/* Verified Trust Metrics from titjaffna.lk */}
              <div className="pt-6 border-t border-slate-200/80 dark:border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">Grades 1–13</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Primary to A/L</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">500+</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Zoom Videos & Notes</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">Alaveddy</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Jaffna Campus</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-indigo-600 dark:text-indigo-400">titjaffna.lk</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Official Platform</div>
                </div>
              </div>
            </div>

            {/* Right Column: Clean Photography with Real titjaffna.lk watermark */}
            <div className="lg:col-span-6 relative">
              <div className="relative mx-auto max-w-lg lg:max-w-none">
                <div className="relative rounded-3xl overflow-hidden border border-slate-200/90 dark:border-slate-800 shadow-2xl bg-slate-900">
                  <img
                    src={heroStudentsImg}
                    alt="TiT Online Education students collaborating in modern campus study hall"
                    className="w-full h-auto aspect-[4/3] object-cover rounded-3xl transition-transform duration-700 hover:scale-[1.01]"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none rounded-3xl" />

                  {/* Clean bottom watermark reflecting titjaffna.lk */}
                  <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 flex items-center gap-3 bg-slate-950/85 backdrop-blur-md text-white rounded-xl px-4 py-2.5 border border-white/10 text-xs shadow-lg">
                    <GraduationCap className="w-5 h-5 text-indigo-400 shrink-0" />
                    <div>
                      <p className="font-bold text-xs leading-none">TiT Online Education</p>
                      <p className="text-[10px] text-slate-300 mt-0.5">Alaveddy, Jaffna · titjaffna.lk · +94 77 015 8446</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* TiT Jaffna Institutional Capability Bar */}
          <div className="mt-12 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-5 shadow-2xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-100 dark:divide-slate-800">
              <div className="flex items-center gap-3.5 pt-2 sm:pt-0 sm:pr-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                    Live Zoom Tuition
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Interactive audio/chat & whiteboard
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3.5 pt-3 sm:pt-0 sm:px-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                    500+ Video Lessons
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    24/7 on-demand revision archives
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3.5 pt-3 sm:pt-0 sm:px-4 cursor-pointer group" onClick={onOpenResults}>
                <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      Exam Results Portal
                    </h4>
                    <span className="text-[9px] bg-amber-100 text-amber-800 px-1 py-0.2 rounded font-bold">New</span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Term 1, 2, 3 official report cards
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3.5 pt-3 sm:pt-0 sm:pl-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                    Alaveddy, Jaffna Head Office
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    WhatsApp: +94 77 015 8446
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. INTERACTIVE LMS SUITE - FULL WIDTH & PROMINENT */}
      <section id="features-demo" className="bg-slate-50/70 dark:bg-slate-950/60 py-12 sm:py-16 border-y border-slate-200/80 dark:border-slate-800 transition-colors">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-1.5">
                <Sparkles className="w-4 h-4" />
                <span>Interactive Learning Suite</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Try TiT Core Features in Action
              </h2>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
                Select any of the 5 modules above to test drive the live platform: Course chats, 24/7 AI tutor, academic calendar, quizzes, and grading insights.
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onNavigate('features')}
                className="text-xs"
              >
                All Features
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={onOpenAdmissions}
                className="text-xs"
              >
                Enroll in Batch
              </Button>
            </div>
          </div>

          {/* Master Interactive Suite with 5 modules and full width screenshot/live UI */}
          <InteractiveAppSuite
            activeTab={activeFeatureTab}
            onTabChange={setActiveFeatureTab}
            onOpenAdmissions={onOpenAdmissions}
          />
        </Container>
      </section>

      {/* 3. ACADEMIC GRADE & COURSE EXPLORER (GRADES 1 TO 13) */}
      <section id="grade-explorer" className="pt-2">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-1.5">
                <BookOpen className="w-4 h-4" />
                <span>Curriculum Directory</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Academic Grades & Available Courses
              </h2>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
                Choose any grade from Grade 1 to Grade 13 to explore current active batches, curriculum syllabus, master teachers, and class schedules.
              </p>
            </div>
            <Button
              variant="outline"
              size="md"
              onClick={() => onNavigate('courses')}
              rightIcon={<ArrowRight className="w-4 h-4" />}
              className="shrink-0 self-start md:self-end"
            >
              Full Course Directory
            </Button>
          </div>

          <GradeCourseExplorer
            courses={courses}
            onSelectCourse={onSelectCourse}
            onApplyCourse={onApplyCourse}
            initialGradeId="grade-5"
            showAllGradesOption={true}
          />
        </Container>
      </section>

      {/* 4. VERIFIED MARKETPLACE MATERIALS */}
      <section className="bg-slate-50 dark:bg-slate-950/50 py-12 sm:py-16 border-y border-slate-200/80 dark:border-slate-800 transition-colors">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <SectionHeading
              align="left"
              badge="Curated Resources"
              title="Verified Educational Materials"
              subtitle="Past papers, marking schemes, and revision guides vetted by national curriculum specialists."
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

      {/* 5. ADMISSIONS CALL TO ACTION */}
      <section>
        <Container>
          <div className="relative rounded-3xl bg-gradient-to-r from-indigo-900 via-indigo-800 to-blue-900 text-white p-8 sm:p-12 overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-2xl pointer-events-none" />
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
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={onOpenAdmissions}
                  className="bg-white text-indigo-950 hover:bg-slate-100 shadow-md"
                >
                  Apply Online Now
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => onNavigate('contact')}
                  className="border-white/30 text-white hover:bg-white/10"
                >
                  Contact Academic Campus
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 6. FREQUENTLY ASKED QUESTIONS */}
      <section>
        <Container size="md">
          <SectionHeading
            badge="Got Questions?"
            title="Frequently Asked Questions"
            subtitle="Everything you need to know about course admissions, learning resources, and portal access."
          />

          <div className="mt-8">
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
