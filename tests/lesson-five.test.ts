import test from 'node:test';
import assert from 'node:assert/strict';
import { allLessonQuestions, isAnswerCorrect, normalizeFrench, readLessonFive } from '../src/lesson-five.ts';

test('accepts typographic apostrophes and punctuation without discarding accents', () => {
  assert.equal(normalizeFrench('  À côté de l’ étagère ! '), normalizeFrench("à côté de l'étagère"));
  const question = allLessonQuestions.find(q => q.id === 'plural-photo')!;
  assert.ok(isAnswerCorrect(question, "il y a des photos à côté de l'étagère"));
  assert.ok(!isAnswerCorrect(question, "Il y a des photos a cote de l'etagere."));
});

test('requires the actual plural noun and verb rather than a keyword match', () => {
  const hats = allLessonQuestions.find(q => q.id === 'plural-hat')!;
  assert.ok(isAnswerCorrect(hats, 'Ce sont des chapeaux !'));
  assert.ok(!isAnswerCorrect(hats, 'Ce sont des chapeaus.'));
  assert.ok(!isAnswerCorrect(hats, "C'est des chapeaux."));
  const books = allLessonQuestions.find(q => q.id === 'plural-location')!;
  assert.ok(!isAnswerCorrect(books, 'Les livres est sur les étagères.'));
});

test('validates persisted work and drops unknown or empty checked answers', () => {
  const progress = readLessonFive({
    step: 9,
    responses: { 'name-books': 'Ce sont des livres.', 'name-photos': '', ghost: 'answer' },
    checked: ['name-books', 'name-books', 'name-photos', 'ghost'],
    canDo: [true, 'true', 1, false, true, true],
  });
  assert.equal(progress.step, 0);
  assert.deepEqual(progress.checked, ['name-books']);
  assert.deepEqual(progress.responses, { 'name-books': 'Ce sont des livres.', 'name-photos': '' });
  assert.deepEqual(progress.canDo, [true, false, false, false, true]);
  assert.deepEqual(readLessonFive(null).checked, []);
});
