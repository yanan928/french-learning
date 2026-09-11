import { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { flushSync } from 'react-dom';
import { practices, sources, bookRoles, type Practice } from './content';
import { useLearningState, type Edition, type LearningState } from './state';
import './styles.css';

const steps = ['听懂情景', '拆解表达', '练习巩固', '完成任务'];
type Update = (change: (previous: LearningState) => LearningState) => void;

function Sound({ text, label = '朗读', notify }: { text: string; label?: string; notify: (message: string) => void }) {
  function speak() {
    if (!('speechSynthesis' in window)) return notify('当前浏览器不支持朗读，可以先阅读文字。');
    const voice = speechSynthesis.getVoices().find(v => v.lang.toLowerCase().startsWith('fr'));
    if (!voice) return notify('设备暂无法语语音，请在系统语音设置中添加法语后重试。');
    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text.split(' / ')[0].replaceAll('…', ''));
    utterance.voice = voice; utterance.lang = 'fr-FR'; utterance.rate = 0.8;
    utterance.onerror = e => { if (!['interrupted', 'canceled'].includes(e.error)) notify('朗读暂时不可用，请检查系统语音设置。'); };
    speechSynthesis.speak(utterance);
  }
  return <button className="sound" onClick={speak} aria-label={label}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M11 4 5 9H2v6h3l6 5  V4Z"/><path d="M15 8a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14"/></svg></button>;
}

function Choice({ item }: { item: Practice['listening'] }) {
  const [answer, setAnswer] = useState<number | null>(null);
  return <div className="micro-exercise"><h3>{item.question}</h3><div className="options">{item.options.map((option, index) => <button key={option} className={`option ${answer === null ? '' : index === item.answer ? 'correct' : index === answer ? 'wrong' : ''}`} disabled={answer !== null} onClick={() => setAnswer(index)}>{option}</button>)}</div>{answer !== null && <p className="feedback" role="status">{answer === item.answer ? '答对了。' : '再留意一下。'}{item.explanation} <button className="text-button" onClick={() => setAnswer(null)}>重新作答</button></p>}</div>;
}

function Scene({ practice, notify }: { practice: Practice; notify: (message: string) => void }) {
  const [showText, setShowText] = useState(false);
  const [showChinese, setShowChinese] = useState(false);
  return <><div className="scene-lead"><span className="eyebrow">ÉCOUTER & COMPRENDRE</span><h3>先听一遍，抓住关键信息。</h3><p>{practice.scene}</p><div className="listen-control"><Sound label="播放情景对话" text={practice.dialogue.map(line => line.fr).join('\n')} notify={notify}/><span>播放对话<small>设备合成语音 · 非教材原音</small></span><button className="text-button" aria-expanded={showText} onClick={() => setShowText(!showText)}>{showText ? '收起文字' : '查看文字'}</button></div></div>{showText && <div className="dialogue"><div className="dialogue-heading"><span>情景对话</span><button className="text-button" onClick={() => setShowChinese(!showChinese)}>{showChinese ? '隐藏中文' : '显示中文'}</button></div>{practice.dialogue.map((line, i) => <div className="dialogue-line" key={i}><span>{line.speaker}</span><div><p lang="fr">{line.fr}</p>{showChinese && <small>{line.zh}</small>}</div><Sound label={`朗读第 ${i + 1} 句`} text={line.fr} notify={notify}/></div>)}</div>}<Choice item={practice.listening}/></>;
}

function Language({ practice, notify }: { practice: Practice; notify: (message: string) => void }) {
  const [cards, setCards] = useState(false);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const word = practice.words[index];
  return <><div className="card-count"><span>词汇与常用表达</span><button className="text-button" onClick={() => setCards(!cards)}>{cards ? '返回表达列表' : '翻卡记一记 ↻'}</button></div>{cards ? <><button className="flashcard" onClick={() => setFlipped(!flipped)} aria-label={flipped ? '返回法语' : '翻卡查看中文'}><small>{index + 1} / {practice.words.length}</small><span className="french" lang={flipped ? 'zh-CN' : 'fr'}>{word[flipped ? 1 : 0]}</span><small>点击{flipped ? '返回法语' : '查看释义'}</small></button><div className="panel-footer"><button className="secondary" disabled={index === 0} onClick={() => { setIndex(index - 1); setFlipped(false); }}>上一张</button><Sound text={word[0]} label={`朗读：${word[0]}`} notify={notify}/><button className="secondary" disabled={index === practice.words.length - 1} onClick={() => { setIndex(index + 1); setFlipped(false); }}>下一张</button></div></> : practice.words.map(word => <div className="phrase" key={word[0]}><div className="phrase-main"><span className="french" lang="fr">{word[0]}</span><span className="ipa">/{word[2]}/</span><div className="translation">{word[1]}</div></div><Sound text={word[0]} label={`朗读：${word[0]}`} notify={notify}/></div>)}<div className="language-notes"><section><p className="eyebrow">GRAMMAIRE</p><h3>{practice.grammar.title}</h3><p>{practice.grammar.explanation}</p><ul>{practice.grammar.examples.map(example => <li lang="fr" key={example}>{example}</li>)}</ul></section><section><p className="eyebrow">PRONONCIATION</p><h3>{practice.phonetics.title}</h3><p>{practice.phonetics.explanation}</p><div className="pronounce"><span lang="fr">{practice.phonetics.sample}</span><Sound text={practice.phonetics.sample} label="朗读语音示例" notify={notify}/></div></section></div><div className="tip">文化与使用 · {practice.tip}</div></>;
}

function Quiz({ practice, onPassed }: { practice: Practice; onPassed: () => void }) {
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const count = practice.words.length;
  if (index === count) return <><div className="result"><p className="eyebrow">BILAN DES EXPRESSIONS</p><strong>{score} / {count}</strong><h3>{score === count ? '表达练习通过了。' : '回看没记牢的表达，再试一次。'}</h3><p>理解选项之后，再试试用自己的话完成交际任务。</p><button className="secondary" onClick={() => { setIndex(0); setAnswer(null); setScore(0); }}>重新练习</button></div><Choice item={practice.conjugation}/></>;
  return <><div className="card-count"><span>表达练习</span><span>{index + 1} / {count}</span></div><h3 className="quiz-prompt">“{practice.words[index][1]}” 用法语怎么说？</h3><div className="options">{practice.words.map((_, offset) => {
    const i = (offset + index + 1) % count;
    return <button key={i} data-answer={i} className={`option ${answer === null ? '' : i === index ? 'correct' : i === answer ? 'wrong' : ''}`} lang="fr" disabled={answer !== null} onClick={() => { setAnswer(i); if (i === index) setScore(score + 1); }}>{practice.words[i][0]}</button>;
  })}</div>{answer !== null && <><p className="feedback" role="status">{answer === index ? '答对了！' : `正确答案：${practice.words[index][0]}`}</p><button className="primary" onClick={() => { if (index === count - 1 && score === count) onPassed(); setIndex(index + 1); setAnswer(null); }}>{index === count - 1 ? '查看结果与语法练习' : '下一题 →'}</button></>}</>;
}

function Mission({ practice, state, update }: { practice: Practice; state: LearningState; update: Update }) {
  const [showExample, setShowExample] = useState(false);
  const draft = state.drafts[practice.id] || '';
  const checks = state.checks[practice.id] || [];
  const checkedCount = checks.filter(Boolean).length;
  return <><div className="mission-brief"><p className="eyebrow">À VOUS ! · 轮到你了</p><h3>把学会的法语，用在一次真实表达里。</h3><p>{practice.mission.instruction}</p></div><label className="writing-label" htmlFor="mission-draft">我的表达</label><textarea id="mission-draft" value={draft} maxLength={3000} placeholder={practice.mission.placeholder} onChange={e => update(s => ({ ...s, drafts: { ...s.drafts, [practice.id]: e.target.value } }))}/><div className="card-count"><small>草稿与自评仅保存在当前浏览器</small><span>{draft.length} / 3000</span></div><button className="text-button" aria-expanded={showExample} onClick={() => setShowExample(!showExample)}>{showExample ? '收起参考表达' : '写完了，看看参考表达'}</button>{showExample && <div className="reference"><p lang="fr">{practice.mission.example}</p><small>一种可能的表达，不是唯一答案。请对照检查词形和礼貌用语。</small></div>}<fieldset className="can-do"><legend>现在，我能……</legend>{practice.mission.checks.map((check, i) => <label key={check}><input type="checkbox" checked={checks[i] === true} onChange={e => update(s => { const next = [...(s.checks[practice.id] || [false, false, false])]; next[i] = e.target.checked; return { ...s, checks: { ...s.checks, [practice.id]: next } }; })}/><span>{check}</span></label>)}<p role="status">{checkedCount === practice.mission.checks.length ? '已自评完成。下次试着不看提示，再表达一遍。' : `已自评 ${checkedCount} / ${practice.mission.checks.length} 项。还不熟悉的内容，可以回到前面再练。`}</p><small>这是你的能力自评，网站不会自动判定自由表达或发音是否正确。</small></fieldset></>;
}

function BookProgress({ state, update }: { state: LearningState; update: Update }) {
  return <section className="book-progress"><div><p className="eyebrow">MON LIVRE · 我的教材</p><h2>《你好！法语》第一册</h2><p>{state.edition === 'original' ? '第一版 · A1 · 9 个单元 / 36 课' : state.edition === 'second' ? '第二版 · A1 · 含语音单元 / 共 40 课' : 'A1 入门 · 选择版本，记录跟书进度'}</p></div><details className="book-settings"><summary>设置教材进度</summary><div className="book-fields"><label>教材版本<select value={state.edition} onChange={e => update(s => ({ ...s, edition: e.target.value as Edition, unit: s.unit === 'phonetics' && e.target.value !== 'second' ? '1' : s.unit }))}><option value="original">第一版</option><option value="second">第二版</option></select></label><label>正在学<select value={state.unit} onChange={e => update(s => ({ ...s, unit: e.target.value }))}>{state.edition === 'second' && <option value="phonetics">语音单元</option>}{Array.from({ length: 9 }, (_, i) => <option value={String(i + 1)} key={i}>第 {i + 1} 单元</option>)}</select></label><label className="lesson-input">课名 / 页码<input value={state.bookLesson} maxLength={80} placeholder="记下书中的位置" onChange={e => update(s => ({ ...s, bookLesson: e.target.value }))}/></label></div><p className="book-caption">这里记录纸书进度；下方为原创 A1 情景练习，尚未按你的教材目录逐课对应。</p></details></section>;
}

function App() {
  const { state, update, storageError } = useLearningState();
  const [step, setStep] = useState(0);
  const [notice, setNotice] = useState('');
  const [showSources, setShowSources] = useState(false);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const practice = practices[state.active];
  useEffect(() => { if ('speechSynthesis' in window) speechSynthesis.getVoices(); return () => { if ('speechSynthesis' in window) speechSynthesis.cancel(); }; }, []);
  useEffect(() => { if (!notice) return; const timer = setTimeout(() => setNotice(''), 7000); return () => clearTimeout(timer); }, [notice]);
  function choose(index: number) { if ('speechSynthesis' in window) speechSynthesis.cancel(); update(s => ({ ...s, active: index })); setStep(0); }
  const completed = practices.filter(p => p.mission.checks.every((_, i) => state.checks[p.id]?.[i])).length;
  useEffect(() => {
    type Context = { registerTool: (tool: unknown, options: { signal: AbortSignal }) => unknown };
    const context = (document as Document & { modelContext?: Context }).modelContext;
    if (!context?.registerTool) return;
    const lifecycle = new AbortController();
    try { Promise.resolve(context.registerTool({ name: 'start_french_lesson', description: 'Open an original A1 practice scenario; does not mark a textbook lesson complete.', inputSchema: { type: 'object', properties: { lesson: { type: 'integer', minimum: 1, maximum: 4 } }, required: ['lesson'], additionalProperties: false }, annotations: { readOnlyHint: false }, execute(input: { lesson: number }) { if (!Number.isInteger(input?.lesson) || input.lesson < 1 || input.lesson > 4) throw new Error('lesson must be 1–4'); flushSync(() => choose(input.lesson - 1)); return { practice: practices[input.lesson - 1].id, step: '听懂情景' }; } }, { signal: lifecycle.signal })).catch(() => {}); } catch { /* Optional browser API. */ }
    return () => lifecycle.abort();
  }, []);
  return <><header className="topbar"><a className="brand" href="./"><span className="brand-icon">p.</span><span>petit à petit<small>每天一点法语</small></span></a><span className="header-note">跟着书学，把法语用起来。</span><span className="level">A1 · 学习伴侣</span></header><main><section className="intro"><div><p className="eyebrow">APPRENDRE POUR AGIR</p><h1>学一点，<span>就用一点。</span></h1><p className="intro-copy">从听懂一句对话，到独立完成一次表达。让书上的法语走进生活。</p></div><div className="date-stamp"><span>我的法语学习手记</span><strong>à vous<br/>de jouer.</strong><small>轮到你，开口试试。</small></div></section><BookProgress state={state} update={update}/>{storageError && <p className="storage-warning" role="alert">当前浏览器无法保存数据。请暂时保留此页面，并自行备份草稿。</p>}<div className="workspace"><aside className="curriculum"><div className="section-heading"><h2>情景实践</h2><span>4 个交际任务</span></div><div id="lessons">{practices.map((p, i) => <button className={`lesson-link ${state.active === i ? 'active' : ''}`} data-lesson={i} aria-current={state.active === i ? 'step' : undefined} key={p.id} onClick={() => choose(i)}><span className="lesson-number">0{i + 1}</span><span><strong>{p.name}</strong><small lang="fr">{p.fr}</small></span><span className="arrow">{p.mission.checks.every((_, j) => state.checks[p.id]?.[j]) ? '✓' : '↗'}</span></button>)}</div><div className="progress-note"><span>交际任务 · 自评完成 <b>{completed} / 4</b></span><progress value={completed} max="4" aria-label="自评完成任务"/><small>你的表达练习记录已保留</small></div><div className="study-method"><p className="eyebrow">一课，一次小实践</p><ol><li>先听情景，理解意思</li><li>留意表达、语音和语法</li><li>练习，再独立表达</li><li>对照“我能……”自评</li></ol></div></aside><section className="learning" aria-labelledby="lesson-title"><div className="lesson-heading"><div><p className="eyebrow">ATELIER 0{state.active + 1} · {practice.fr.toUpperCase()}</p><h2 id="lesson-title">{practice.title}</h2></div><span className="duration">原创拓展练习</span></div><div className="goal"><span>今天的目标</span><p>{practice.goal}</p></div><div className="tabs" role="tablist" aria-label="学习步骤">{steps.map((label, i) => <button ref={el => { tabRefs.current[i] = el; }} role="tab" id={`tab-${i}`} aria-controls="study-panel" aria-selected={step === i} tabIndex={step === i ? 0 : -1} key={label} onClick={() => setStep(i)} onKeyDown={e => { let next = i; if (e.key === 'ArrowRight') next = (i + 1) % steps.length; else if (e.key === 'ArrowLeft') next = (i + steps.length - 1) % steps.length; else if (e.key === 'Home') next = 0; else if (e.key === 'End') next = steps.length - 1; else return; e.preventDefault(); setStep(next); tabRefs.current[next]?.focus(); }}><span>0{i + 1}</span> {label}</button>)}</div><div id="study-panel" role="tabpanel" aria-labelledby={`tab-${step}`} key={`${practice.id}-${step}`}>{step === 0 && <Scene practice={practice} notify={setNotice}/>} {step === 1 && <Language practice={practice} notify={setNotice}/>} {step === 2 && <Quiz practice={practice} onPassed={() => update(s => ({ ...s, quizPassed: [...new Set([...s.quizPassed, practice.id])] }))}/>} {step === 3 && <Mission practice={practice} state={state} update={update}/>}</div><div className="panel-footer step-footer"><small>{state.quizPassed.includes(practice.id) ? '✓ 表达练习已通过' : '理解 → 练习 → 表达'}</small>{step < 3 ? <button className="primary" onClick={() => { setStep(step + 1); tabRefs.current[step + 1]?.focus(); }}>继续：{steps[step + 1]} →</button> : <button className="secondary" onClick={() => choose((state.active + 1) % practices.length)}>换一个情景 →</button>}</div></section></div><section className="bottom-note"><span className="quote-mark">“</span><div><p lang="fr">Petit à petit, l’oiseau fait son nid.</p><span>学会的不只是单词，还有用法语做一件事的能力。</span></div><span className="note-label">每一次表达，都是进步</span></section><section className="sources"><button className="text-button" aria-expanded={showSources} onClick={() => setShowSources(!showSources)}>教材依据与内容说明 {showSources ? '−' : '+'}</button>{showSources && <div><h3>三本书，围绕同一课学习</h3>{bookRoles.map(book => <p key={book.title}><strong>{book.title}</strong><br/>{book.description}</p>)}<p>已核对第一版学生用书、教师用书和配套练习册的出版社介绍。上述为网站的课程组织原则；三本书的具体课文、教学页与习题尚未逐课核对。参考《你好！法语》及原版 Le Nouveau Taxi! 的行动导向、语言训练与能力自评思路设计。当前四个情景、对话和练习为网站原创，不是教材原课文或官方配套题。教材目录、课号与页码需按你使用的版本核对。</p><p>第一版第一册为 9 单元、36 课；第二版包含语音单元，出版社标注共 40 课。教材原音和视频请使用随书资源；这里的朗读使用设备合成语音。</p><div>{sources.map(source => <a key={source.url} href={source.url} target="_blank" rel="noreferrer">{source.title} ↗</a>)}</div></div>}</section></main><footer><span>petit à petit · 《你好！法语》第一册学习伴侣</span><span>Fait avec plaisir ♡</span></footer>{notice && <p className="toast" role="status">{notice}</p>}</>;
}

createRoot(document.getElementById('root')!).render(<App/>);
