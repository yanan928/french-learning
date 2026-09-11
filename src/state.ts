import { useEffect, useState } from 'react';
import { practices } from './content';

export type Edition = 'original' | 'second';
export type LearningState = {
  edition: Edition;
  unit: string;
  bookLesson: string;
  active: number;
  quizPassed: string[];
  drafts: Record<string, string>;
  checks: Record<string, boolean[]>;
};
const key = 'petit-companion-v2';

export function loadState(): LearningState {
  const initial: LearningState = { edition: 'original', unit: '1', bookLesson: '', active: 0, quizPassed: [], drafts: {}, checks: {} };
  try {
    const old = JSON.parse(localStorage.getItem('petit-progress') || '[]');
    if (Array.isArray(old)) initial.quizPassed = [...new Set(old.filter(i => Number.isInteger(i) && practices[i]).map(i => practices[i].id))];
    const saved = JSON.parse(localStorage.getItem(key) || 'null');
    if (!saved || typeof saved !== 'object') return initial;
    if (['original', 'second'].includes(saved.edition)) initial.edition = saved.edition;
    if (/^[1-9]$/.test(saved.unit) || (initial.edition === 'second' && saved.unit === 'phonetics')) initial.unit = String(saved.unit);
    if (typeof saved.bookLesson === 'string') initial.bookLesson = saved.bookLesson.slice(0, 80);
    if (Number.isInteger(saved.active) && practices[saved.active]) initial.active = saved.active;
    if (Array.isArray(saved.quizPassed)) initial.quizPassed = [...new Set<string>(saved.quizPassed.filter((id: unknown) => practices.some(p => p.id === id)))];
    for (const practice of practices) {
      if (typeof saved.drafts?.[practice.id] === 'string') initial.drafts[practice.id] = saved.drafts[practice.id].slice(0, 3000);
      if (Array.isArray(saved.checks?.[practice.id])) initial.checks[practice.id] = practice.mission.checks.map((_, i) => saved.checks[practice.id][i] === true);
    }
  } catch { /* A damaged or unavailable store must not prevent learning. */ }
  return initial;
}

export function useLearningState() {
  const [state, setState] = useState(loadState);
  const [storageError, setStorageError] = useState(false);
  useEffect(() => {
    try { localStorage.setItem(key, JSON.stringify(state)); }
    catch { setStorageError(true); }
  }, [state]);
  function update(change: (previous: LearningState) => LearningState) {
    setState(change);
  }
  return { state, update, storageError };
}
