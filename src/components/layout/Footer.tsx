import React from 'react';
import {
  BookOpen,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  Shield,
  Sparkles,
} from 'lucide-react';
import { SITE_CONFIG } from '../../lib/config/site';

export interface FooterProps {
  onNavigate: (path: string) => void;
  onOpenResults?: () => void;
  onOpenTutorApply?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenResults, onOpenTutorApply }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-slate-800">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-blue-500 flex items-center justify-center text-white shadow-md">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xl font-extrabold text-white tracking-tight">
                  {SITE_CONFIG.brandName} Online Education
                </span>
                <span className="text-xs text-indigo-400 block -mt-0.5">
                  titjaffna.lk · Alaveddy, Jaffna
                </span>
              </div>
            </div>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Empowering students across Sri Lanka from Grade 1 to Grade 13 with live Zoom classes,
              500+ video lessons, past papers, and official exam results tracking.
            </p>
            <div className="pt-2 text-xs text-slate-400 space-y-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>{SITE_CONFIG.contact.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>Phone / WhatsApp: {SITE_CONFIG.contact.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>{SITE_CONFIG.contact.email}</span>
              </div>
            </div>
          </div>

          {/* Academic & Courses */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Academic Hub
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => onNavigate('courses')}
                  className="hover:text-indigo-400 transition-colors cursor-pointer"
                >
                  All Grades (1–13)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('courses')}
                  className="hover:text-indigo-400 transition-colors cursor-pointer"
                >
                  Grade 5 Scholarship
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('courses')}
                  className="hover:text-indigo-400 transition-colors cursor-pointer"
                >
                  G.C.E. O/L (Grades 10–11)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('courses')}
                  className="hover:text-indigo-400 transition-colors cursor-pointer"
                >
                  G.C.E. A/L (Grades 12–13)
                </button>
              </li>
              <li>
                {onOpenTutorApply && (
                  <button
                    onClick={onOpenTutorApply}
                    className="text-indigo-400 hover:text-indigo-300 transition-colors cursor-pointer font-medium"
                  >
                    Apply as a Tutor
                  </button>
                )}
              </li>
            </ul>
          </div>

          {/* Marketplace & Features */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Resources & Tests
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => onNavigate('marketplace')}
                  className="hover:text-indigo-400 transition-colors cursor-pointer"
                >
                  Download Model Papers
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('marketplace')}
                  className="hover:text-indigo-400 transition-colors cursor-pointer"
                >
                  Syllabus PDF Notes
                </button>
              </li>
              <li>
                {onOpenResults && (
                  <button
                    onClick={onOpenResults}
                    className="text-amber-400 hover:text-amber-300 transition-colors cursor-pointer font-semibold flex items-center gap-1.5"
                  >
                    <span>Check Exam Results</span>
                    <span className="text-[9px] bg-amber-400 text-slate-950 px-1 rounded font-bold">Portal</span>
                  </button>
                )}
              </li>
              <li>
                <button
                  onClick={() => onNavigate('features')}
                  className="hover:text-indigo-400 transition-colors cursor-pointer"
                >
                  Live Classroom & AI Tutor
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('admissions')}
                  className="hover:text-indigo-400 transition-colors cursor-pointer"
                >
                  Online Admissions
                </button>
              </li>
            </ul>
          </div>

          {/* Institutional Portals & Governance */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Institutional Portals
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href={SITE_CONFIG.officialUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-indigo-400 hover:underline flex items-center gap-1.5 font-medium"
                >
                  <span>titjaffna.lk</span>
                  <span className="text-[10px] bg-indigo-950 text-indigo-300 px-1 rounded border border-indigo-800">
                    Official
                  </span>
                </a>
              </li>
              <li>
                {onOpenResults ? (
                  <button
                    onClick={onOpenResults}
                    className="hover:text-indigo-400 transition-colors flex items-center gap-1.5"
                  >
                    <span>Student Result Tracker</span>
                  </button>
                ) : (
                  <a
                    href={SITE_CONFIG.portals.results}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-indigo-400 transition-colors flex items-center gap-1.5"
                  >
                    <span>Student Result Tracker</span>
                  </a>
                )}
              </li>
              <li>
                {onOpenTutorApply ? (
                  <button
                    onClick={onOpenTutorApply}
                    className="hover:text-indigo-400 transition-colors flex items-center gap-1.5"
                  >
                    <span>Tutor Registration</span>
                  </button>
                ) : (
                  <a
                    href={SITE_CONFIG.portals.teacher}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-indigo-400 transition-colors flex items-center gap-1.5"
                  >
                    <span>Tutor Portal</span>
                  </a>
                )}
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-indigo-400 transition-colors cursor-pointer"
                >
                  Jaffna Campus Support
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>
            © {new Date().getFullYear()} {SITE_CONFIG.brandName} Technologies. All rights reserved. In partnership with {SITE_CONFIG.instituteName}.
          </p>

          <div className="flex items-center gap-6">
            <button
              onClick={() => onNavigate('privacy')}
              className="hover:text-slate-400 transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => onNavigate('terms')}
              className="hover:text-slate-400 transition-colors cursor-pointer"
            >
              Terms of Use
            </button>
            <button
              onClick={() => onNavigate('portals')}
              className="hover:text-slate-400 transition-colors cursor-pointer flex items-center gap-1"
            >
              <Shield className="w-3.5 h-3.5 text-emerald-500" />
              Keycloak Authenticated
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
