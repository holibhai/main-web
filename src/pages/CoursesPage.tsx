import React, { useState, useMemo } from 'react';
import { Filter, GraduationCap, RotateCcw, Search, SlidersHorizontal, Sparkles } from 'lucide-react';
import { CourseItem, Language } from '../types';
import { SITE_CONFIG } from '../lib/config/site';
import { getTranslation } from '../lib/translations';
import { Container } from '../components/ui/Container';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Input, Select } from '../components/ui/FormControls';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { EmptyState } from '../components/ui/FeedbackStates';
import { CourseCard } from '../components/courses/CourseCard';
import { Drawer } from '../components/ui/Modal';

export interface CoursesPageProps {
  currentLang: Language;
  courses: CourseItem[];
  onSelectCourse: (course: CourseItem) => void;
  onApplyCourse: (course: CourseItem) => void;
}

export const CoursesPage: React.FC<CoursesPageProps> = ({
  currentLang,
  courses,
  onSelectCourse,
  onApplyCourse,
}) => {
  const t = (key: string) => getTranslation(currentLang, key);

  const [search, setSearch] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedGrade, setSelectedGrade] = useState('all');
  const [selectedFormat, setSelectedFormat] = useState('all');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const formats = ['Online Live', 'Physical Classroom', 'Hybrid'];

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchesSearch =
        search === '' ||
        course.title.toLowerCase().includes(search.toLowerCase()) ||
        course.description.toLowerCase().includes(search.toLowerCase()) ||
        course.teacher.name.toLowerCase().includes(search.toLowerCase());

      const matchesSubject =
        selectedSubject === 'all' || course.subject.toLowerCase() === selectedSubject.toLowerCase();

      const matchesGrade = selectedGrade === 'all' || course.gradeId === selectedGrade;

      const matchesFormat = selectedFormat === 'all' || course.learningFormat === selectedFormat;

      return matchesSearch && matchesSubject && matchesGrade && matchesFormat;
    });
  }, [courses, search, selectedSubject, selectedGrade, selectedFormat]);

  const handleResetFilters = () => {
    setSearch('');
    setSelectedSubject('all');
    setSelectedGrade('all');
    setSelectedFormat('all');
  };

  const hasActiveFilters =
    search !== '' || selectedSubject !== 'all' || selectedGrade !== 'all' || selectedFormat !== 'all';

  return (
    <div className="space-y-12 pb-20">
      {/* Header Banner */}
      <section className="pt-12 sm:pt-16 bg-slate-100/50 dark:bg-slate-900/50 border-b border-slate-200/80 dark:border-slate-800 pb-12 transition-colors">
        <Container size="md" className="text-center">
          <Badge variant="primary" size="md" className="mb-3">
            Academic Programs
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t('courses.title')}
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
            {t('courses.subtitle')}
          </p>
        </Container>
      </section>

      <Container>
        {/* Search & Filter Toolbar */}
        <div className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs mb-8 transition-colors">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
            {/* Search Input */}
            <div className="sm:col-span-5 lg:col-span-5">
              <Input
                placeholder={t('courses.search.placeholder')}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                leftIcon={<Search className="w-4 h-4" />}
                className="py-2"
              />
            </div>

            {/* Desktop Quick Dropdowns */}
            <div className="hidden lg:grid lg:col-span-5 grid-cols-2 gap-3">
              <Select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                options={[
                  { value: 'all', label: 'All Subjects' },
                  ...SITE_CONFIG.subjects.map((s) => ({ value: s, label: s })),
                ]}
              />
              <Select
                value={selectedFormat}
                onChange={(e) => setSelectedFormat(e.target.value)}
                options={[
                  { value: 'all', label: 'All Formats' },
                  ...formats.map((f) => ({ value: f, label: f })),
                ]}
              />
            </div>

            {/* Filter Toggle on Mobile / Reset Button */}
            <div className="sm:col-span-7 lg:col-span-2 flex items-center justify-end gap-2">
              <Button
                variant="outline"
                size="md"
                onClick={() => setMobileFiltersOpen(true)}
                leftIcon={<SlidersHorizontal className="w-4 h-4" />}
                className="lg:hidden w-full sm:w-auto"
              >
                Filters {hasActiveFilters && '•'}
              </Button>

              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleResetFilters}
                  leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
                  className="text-xs text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
                >
                  Reset
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Results Metadata Bar */}
        <div className="flex items-center justify-between mb-6 text-xs text-slate-500 dark:text-slate-400 font-medium">
          <span>
            Showing <strong className="text-slate-800 dark:text-slate-200">{filteredCourses.length}</strong> academic programs
          </span>
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline">Curriculum:</span>
            <Badge variant="neutral" size="sm">
              Local G.C.E. & International
            </Badge>
          </div>
        </div>

        {/* Course Cards Grid */}
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                onViewDetails={onSelectCourse}
                onApply={onApplyCourse}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No academic programs found"
            description="We could not find any active courses matching your selected search keywords and filter criteria."
            actionText="Clear Filter Settings"
            onAction={handleResetFilters}
          />
        )}
      </Container>

      {/* Mobile Filter Drawer */}
      <Drawer
        isOpen={mobileFiltersOpen}
        onClose={() => setMobileFiltersOpen(false)}
        title="Filter Academic Courses"
      >
        <div className="space-y-5">
          <Select
            label="Subject"
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            options={[
              { value: 'all', label: 'All Subjects' },
              ...SITE_CONFIG.subjects.map((s) => ({ value: s, label: s })),
            ]}
          />

          <Select
            label="Grade / Target Stream"
            value={selectedGrade}
            onChange={(e) => setSelectedGrade(e.target.value)}
            options={[
              { value: 'all', label: 'All Grades' },
              ...SITE_CONFIG.grades.map((g) => ({ value: g.id, label: g.name })),
            ]}
          />

          <Select
            label="Learning Format"
            value={selectedFormat}
            onChange={(e) => setSelectedFormat(e.target.value)}
            options={[
              { value: 'all', label: 'All Formats' },
              ...formats.map((f) => ({ value: f, label: f })),
            ]}
          />

          <div className="pt-4 flex gap-3">
            <Button
              variant="outline"
              size="md"
              onClick={handleResetFilters}
              className="w-1/2 justify-center"
            >
              Reset
            </Button>
            <Button
              variant="primary"
              size="md"
              onClick={() => setMobileFiltersOpen(false)}
              className="w-1/2 justify-center"
            >
              Apply Filters
            </Button>
          </div>
        </div>
      </Drawer>
    </div>
  );
};
