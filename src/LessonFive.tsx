import { useRef, useState } from 'react';
import { Sound } from './components/Sound';
import {
  allLessonQuestions, bookDialogue, canDoStatements, exerciseGroups, extraPositions,
  grammarNotes, isAnswerCorrect, lessonFiveSources, listeningQuestions, objectWords,
  positions, soundPairs, type LessonQuestion,
} from './lesson-five';
import type { LearningState } from './state';

type Props = { state: LearningState; update: (change: (state: LearningState) => LearningState) => void; notify: (message: string) => void };
const stepNames = ['认物与听读', '语法与语音', '同步练习', '描述房间'];

function Question({ question, state, update }: { question: LessonQuestion } & Pick<Props, 'state' | 'update'>) {
  const value = state.lessonFive.responses[question.id] || '';
  const checked = state.lessonFive.checked.includes(question.id);
  const correct = checked && isAnswerCorrect(question, value);
  const [empty, setEmpty] = useState(false);
  function change(answer: string) {
    setEmpty(false);
    update(s => ({ ...s, lessonFive: { ...s.lessonFive, responses: { ...s.lessonFive.responses, [question.id]: answer }, checked: s.lessonFive.checked.filter(id => id !== question.id) } }));
  }
  return (
    <form className={`lesson-question ${checked ? correct ? 'is-correct' : 'is-wrong' : ''}`} data-question={question.id} onSubmit={event => {
      event.preventDefault();
      if (!value.trim()) { setEmpty(true); return; }
      update(s => ({ ...s, lessonFive: { ...s.lessonFive, checked: [...new Set([...s.lessonFive.checked, question.id])] } }));
    }}>
      <label htmlFor={question.id}>{question.prompt}</label>
      <div className="question-input">
        {question.options ? <select id={question.id} value={value} onChange={event => change(event.target.value)} aria-describedby={`${question.id}-feedback`}>
          <option value="">选择答案</option>
          {question.options.map(option => <option value={option} key={option}>{option}</option>)}
        </select> : <input id={question.id} lang="fr" value={value} onChange={event => change(event.target.value)} maxLength={500} placeholder={question.hint || '输入法语答案'} autoComplete="off" spellCheck={false} aria-describedby={`${question.id}-feedback`}/>}
        <button className="secondary" type="submit">检查答案</button>
      </div>
      <div id={`${question.id}-feedback`} className="question-feedback" role="status">
        {empty && '请先填写或选择答案。'}
        {checked && <><strong>{correct ? '✓ 正确。' : '再改一下。'}</strong> {!correct && <>参考答案：<span lang="fr">{question.answers[0]}</span><br/></>}{question.explanation}</>}
      </div>
    </form>
  );
}

function PositionExplorer({ notify }: Pick<Props, 'notify'>) {
  const [selected, setSelected] = useState(0);
  const position = positions[selected];
  return <section className="position-explorer">
    <h3>用位置介词，把物品找出来</h3><p className="source-tag">学生 p38、40 · 点选一个介词</p>
    <div className="position-buttons">{positions.map((item, i) => <button className={selected === i ? 'selected' : ''} aria-pressed={selected === i} key={item.fr} lang="fr" onClick={() => setSelected(i)}>{item.fr}</button>)}</div>
    <div className="position-demo">
      <svg viewBox="0 0 200 155" role="img" aria-label={`绿色圆点${position.zh}方框`}>
        <rect x="70" y="52" width="60" height="52" rx="4" fill="#e5ecf2" stroke="#93a6bb" strokeWidth="2"/>
        <circle cx={position.x} cy={position.y} r="8" fill="var(--red)"/>
        <text x="100" y="145" textAnchor="middle" fill="#536583" fontSize="10">圆点 = 要定位的物品</text>
      </svg>
      <div aria-live="polite"><strong lang="fr">{position.fr}</strong><p>{position.zh}</p><p lang="fr">{position.sentence}</p><small>{position.translation}</small></div>
      <Sound text={position.sentence} label="朗读位置例句" notify={notify}/>
    </div>
    <details className="lesson-details"><summary>再认识 5 个位置表达</summary>{extraPositions.map(([fr, zh, sentence]) => <div className="position-extra" key={fr}><div><strong lang="fr">{fr}</strong><span>{zh}</span><p lang="fr">{sentence}</p></div><Sound text={sentence} label={`朗读：${fr}`} notify={notify}/></div>)}</details>
    <p className="tip">注意参照物：à gauche / à droite 可以单独用；说“在某物左边／右边”时，用 à gauche de / à droite de。sur 强调在表面上，au-dessus de 强调在上方。</p>
  </section>;
}

function Discovery({ state, update, notify }: Props) {
  const [textVisible, setTextVisible] = useState(false);
  const [translation, setTranslation] = useState(false);
  const keyWords = [objectWords[18], objectWords[19], objectWords[0], objectWords[5]];
  return <>
    <div className="teaching-note"><strong>这课，先认物品，再听对话。</strong><p>教师用书 p28 提醒：本课生词密集。先在学生用书 p38–39 的房间图中找到这四样东西，再听两人找物品。</p></div>
    <div className="object-grid">{keyWords.map(([fr, zh]) => <div className="object-word" key={fr}><div><strong lang="fr">{fr}</strong><small>{zh}</small></div><Sound text={fr} label={`朗读：${fr}`} notify={notify}/></div>)}</div>
    <div className="direction-primer"><span><b lang="fr">à gauche de</b>在……左边</span><span><b lang="fr">à droite de</b>在……右边</span><span><b lang="fr">sous</b>在……下面</span></div>
    <div className="scene-lead">
      <p className="eyebrow">DÉCOUVREZ · 学生用书 p38</p>
      <h3>要找什么？最后在哪里？</h3>
      <p>对照书中的房间图听两遍：第一遍抓住物品名；第二遍注意位置说明中的纠正。这里的朗读由设备合成，可搭配教材第 27 段原声。</p>
      <div className="listen-control"><Sound text={bookDialogue.map(line => line[1]).join('\n')} label="朗读第五课对话" notify={notify}/><span>朗读课文<small>合成语音 · 非教材原音</small></span><button className="text-button" onClick={() => setTextVisible(!textVisible)} aria-expanded={textVisible}>{textVisible ? '收起课文' : '展开课文'}</button></div>
    </div>
    {textVisible && <div className="dialogue"><div className="dialogue-heading"><span>学生 p38 · 中文为网站辅助翻译</span><button className="text-button" onClick={() => setTranslation(!translation)}>{translation ? '隐藏中文' : '显示中文'}</button></div>{bookDialogue.map(([speaker, fr, zh], i) => <div className="dialogue-line" key={i}><span>{speaker}</span><div><p lang="fr">{fr}</p>{translation && <small>{zh}</small>}</div><Sound text={fr} label={`朗读课文第 ${i + 1} 句`} notify={notify}/></div>)}</div>}
    <h3 className="lesson-subheading">听懂了吗？</h3><p className="source-tag">按教师 p28–29 的理解检查步骤编写</p>
    {listeningQuestions.map(question => <Question key={question.id} question={question} state={state} update={update}/>)}
    <div className="tip">听完后，两人分角色再说一遍。如果一个人学习，可以交替扮演 A 和 B。重点是准确确认位置，而不是只背单词。</div>
  </>;
}

function LanguageLab({ notify }: Pick<Props, 'notify'>) {
  const [word, setWord] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const selected = objectWords[word];
  return <>
    <details className="lesson-details"><summary>物品词卡 · 冠词和名词一起记</summary>
      <div className="card-count"><span>{word + 1} / {objectWords.length}</span><Sound text={selected[0]} label="朗读当前词卡" notify={notify}/></div>
      <button className="flashcard" aria-label={flipped ? '返回法语' : '翻卡查看中文'} onClick={() => setFlipped(!flipped)}><span className="french" lang={flipped ? 'zh-CN' : 'fr'}>{selected[flipped ? 1 : 0]}</span><small>点击翻卡</small></button>
      <div className="panel-footer"><button className="secondary" disabled={word === 0} onClick={() => { setWord(word - 1); setFlipped(false); }}>上一张</button><button className="secondary" disabled={word === objectWords.length - 1} onClick={() => { setWord(word + 1); setFlipped(false); }}>下一张</button></div>
      <p className="source-tag">学生 p38–39、教师 p28 · 选取 20 个物品与房间词</p>
    </details>
    <PositionExplorer notify={notify}/>
    <h3 className="lesson-subheading">从“有什么”，到“在哪里”</h3>
    {grammarNotes.map((note, i) => <details className="lesson-details grammar-detail" key={note.title} open={i === 0 ? true : undefined}><summary>{note.title}</summary><p className="source-tag">{note.source} · 网站归纳</p><p>{note.body}</p><ul>{note.examples.map(example => <li lang="fr" key={example}>{example}</li>)}</ul></details>)}
    <section className="pronunciation-lab"><h3>复数，不靠读出词尾 -s</h3><p className="source-tag">学生 p41；教师 p29–30</p><p>本课通过冠词、est / sont 和 /z/ 联诵辨认复数。下面的例子中，名词的复数词尾 -s 不单独发音；il y a 本身不变化。</p>
      {soundPairs.map(([singular, plural, explanation]) => <div className="sound-pair" key={singular}><div><span>单数</span><p lang="fr">{singular}</p><Sound text={singular} label={`朗读单数：${singular}`} notify={notify}/></div><div><span>复数</span><p lang="fr">{plural}</p><Sound text={plural} label={`朗读复数：${plural}`} notify={notify}/></div><small>{explanation}</small></div>)}
      <p className="tip">这是合成语音对照，不是听力评分。教材原声第 31 段需搭配随书音频使用。</p>
    </section>
  </>;
}

function PracticeLab({ state, update }: Pick<Props, 'state' | 'update'>) {
  const total = exerciseGroups.reduce((sum, group) => sum + group.questions.length, 0);
  const correct = exerciseGroups.flatMap(group => group.questions).filter(q => state.lessonFive.checked.includes(q.id) && isAnswerCorrect(q, state.lessonFive.responses[q.id] || '')).length;
  return <><div className="exercise-summary"><div><strong>{correct} <small>/ {total}</small></strong><span>已答对 · 修改答案后重新检查</span></div><progress value={correct} max={total} aria-label="第五课同步练习进度"/></div><p className="source-tag">题型与三书页面已核对。改编题及练习册题的解析由网站编写；练习册答案页不在此次读取范围内。</p>
    {exerciseGroups.map((group, index) => <details className="lesson-details exercise-group" key={group.id} open={index === 0 ? true : undefined}><summary>{group.title}<span>{group.questions.filter(q => state.lessonFive.checked.includes(q.id) && isAnswerCorrect(q, state.lessonFive.responses[q.id] || '')).length}/{group.questions.length}</span></summary><p className="source-tag">{group.source}</p><p>{group.note}</p>{group.questions.map(question => <Question key={question.id} question={question} state={state} update={update}/>)}</details>)}
    <details className="lesson-details"><summary>回书核对 · 学生 p40 第3题</summary><p>先在书上作答，再展开此处核对。以下答案已对照教师用书 p29；每行依次对应原题空格。</p><ol className="book-answer-key"><li lang="fr">le · un · le</li><li lang="fr">l’ · des · les</li><li lang="fr">le · Un · le</li><li lang="fr">Des · des</li><li lang="fr">la · une · des · le</li></ol><p className="tip">先用不定冠词引入物品，再用定冠词指回已经说过的物品；注意元音前的省音。</p></details>
  </>;
}

function Draft({ id, label, placeholder, state, update }: { id: string; label: string; placeholder: string } & Pick<Props, 'state' | 'update'>) {
  return <div className="lesson-draft"><label htmlFor={id}>{label}</label><textarea id={id} lang="fr" value={state.drafts[id] || ''} maxLength={3000} placeholder={placeholder} onChange={event => update(s => ({ ...s, drafts: { ...s.drafts, [id]: event.target.value } }))}/><small>自动保存在当前浏览器 · {(state.drafts[id] || '').length}/3000</small></div>;
}

function RoomTask({ state, update, notify }: Props) {
  return <>
    <div className="mission-brief"><p className="eyebrow">À VOUS ! · 学生 p41；教师 p30</p><h3>让别人根据你的描述，画出房间。</h3><p>画一个简单的房间，放入至少 4 件家具或物品。写出物品与位置，再把描述读给伙伴听，让对方画出来，最后比较两张图。独自学习时，可以隔一会儿只看描述重新画一次。</p></div>
    <div className="sentence-scaffold"><span>介绍有什么</span><p lang="fr">Dans la pièce, il y a…</p><span>说清位置</span><p lang="fr">Le / La… est… · Les… sont…</p><span>询问和确认</span><p lang="fr">Où est… ? · Où sont… ? · À droite de… ?</p></div>
    <Draft id="lesson-5-room" label="我的房间描述" placeholder="Dans la pièce, il y a…" state={state} update={update}/>
    <details className="lesson-details"><summary>写完后，查看网站参考表达</summary><p lang="fr">Dans la pièce, il y a une table, une chaise et une étagère. La chaise est à droite de la table. Sur l’étagère, il y a des livres. Le sac est sous la table.</p><Sound text="Dans la pièce, il y a une table, une chaise et une étagère. La chaise est à droite de la table. Sur l’étagère, il y a des livres. Le sac est sous la table." label="朗读房间描述示例" notify={notify}/><p className="source-tag">网站原创示例，只是一个可行答案。自由表达不做自动对错评分。</p></details>
    <details className="lesson-details"><summary>配套写作 A · 给教材房间列清单</summary><p className="source-tag">练习册 p10 第3题 · 对照学生 p38–39 的房间图</p><p>分别列出家具、其他物品，以及桌上的东西。记得把冠词和名词写在一起，再用 il y a 串成句子。</p><Draft id="lesson-5-inventory" label="家具与物品清单" placeholder="Dans la pièce, il y a des meubles : …\nSur la table, il y a…" state={state} update={update}/></details>
    <details className="lesson-details"><summary>配套写作 B · 收拾一下房间</summary><p className="source-tag">练习册 p11 第7题 · 对照练习册原图</p><p>先描述图中物品现在的位置，再为它们安排更合适的位置。两步都要说清参照物。</p><div className="reference"><p lang="fr">Avant : Il y a des livres sous un fauteuil.<br/>Après : Les livres sont sur les étagères.</p><small>书中示例：先介绍物品，再用定冠词指回这些物品。</small></div><Draft id="lesson-5-tidy" label="整理前与整理后" placeholder="Avant : …\nAprès : …" state={state} update={update}/></details>
    <details className="lesson-details"><summary>口语延伸 · 给客人指座位</summary><p className="source-tag">学生 p41 第4题；教师 p29–30 · 网站原创替代练习</p><p>教材此处需要第 28–30 段随书音频。暂时没有原声时，可先用下面这段新对话练习 vous êtes 和位置表达：</p><p lang="fr">— Nous sommes trois.<br/>— Vous êtes à gauche de la fenêtre, à côté de la table de Paul.<br/>— À gauche de la fenêtre ? Merci !</p><Sound text="Nous sommes trois. Vous êtes à gauche de la fenêtre, à côté de la table de Paul. À gauche de la fenêtre ? Merci !" label="朗读餐馆拓展对话" notify={notify}/></details>
    <fieldset className="can-do"><legend>这一课，我能……</legend>{canDoStatements.map((statement, i) => <label key={statement}><input type="checkbox" checked={state.lessonFive.canDo[i] === true} onChange={event => update(s => { const canDo = [...s.lessonFive.canDo]; canDo[i] = event.target.checked; return { ...s, lessonFive: { ...s.lessonFive, canDo } }; })}/><span>{statement}</span></label>)}<p role="status">已自评 {state.lessonFive.canDo.filter(Boolean).length} / {canDoStatements.length} 项</p><small>理解题和填空题由规则检查；房间描述与发音由你对照示例自评，不代表自动测评通过。</small></fieldset>
  </>;
}

export function LessonFive({ state, update, notify }: Props) {
  const step = state.lessonFive.step;
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  function go(next: number, focus = false) {
    if ('speechSynthesis' in window) speechSynthesis.cancel();
    update(s => ({ ...s, lessonFive: { ...s.lessonFive, step: next } }));
    if (focus) tabs.current[next]?.focus();
  }
  const correct = allLessonQuestions.filter(q => state.lessonFive.checked.includes(q.id) && isAnswerCorrect(q, state.lessonFive.responses[q.id] || '')).length;
  return <section className="learning textbook-lesson" aria-labelledby="lesson-title">
    <div className="lesson-heading"><div><p className="eyebrow">UNITÉ 2 · LEÇON 5</p><h2 id="lesson-title" lang="fr">Trouvez l’objet</h2><p className="lesson-translation">找出物品</p></div><span className="duration verified-badge">三书已核对</span></div>
    <div className="source-chips">{lessonFiveSources.map(source => <span key={source.book}>{source.book} p{source.printed}</span>)}</div>
    <div className="goal"><span>本课目标</span><p>说出物品名称，指出它们的位置，让别人能根据你的描述找到它们。</p></div>
    <div className="tabs" role="tablist" aria-label="第五课学习步骤">{stepNames.map((name, i) => <button key={name} ref={el => { tabs.current[i] = el; }} id={`lesson5-tab-${i}`} role="tab" aria-selected={step === i} aria-controls="lesson5-panel" tabIndex={step === i ? 0 : -1} onClick={() => go(i)} onKeyDown={event => {
      let next: number;
      if (event.key === 'ArrowRight') next = (i + 1) % 4;
      else if (event.key === 'ArrowLeft') next = (i + 3) % 4;
      else if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = 3;
      else return;
      event.preventDefault(); go(next, true);
    }}><span>0{i + 1}</span> {name}</button>)}</div>
    <div id="lesson5-panel" role="tabpanel" aria-labelledby={`lesson5-tab-${step}`} key={step}>
      {step === 0 && <Discovery state={state} update={update} notify={notify}/>}
      {step === 1 && <LanguageLab notify={notify}/>}
      {step === 2 && <PracticeLab state={state} update={update}/>}
      {step === 3 && <RoomTask state={state} update={update} notify={notify}/>}
    </div>
    <div className="panel-footer step-footer"><small>客观练习已答对 {correct} / {allLessonQuestions.length} 题</small>{step < 3 ? <button className="primary" onClick={() => go(step + 1, true)}>继续：{stepNames[step + 1]} →</button> : <button className="secondary" onClick={() => go(0, true)}>回到课文</button>}</div>
    <details className="lesson-details source-details"><summary>本课对应书页与材料范围</summary>{lessonFiveSources.map(source => <p key={source.book}><strong>{source.book} · 书内 p{source.printed}</strong><br/>PDF 第 {source.pdf} 页 · {source.use}</p>)}<p>已逐页核对以上 9 页。课文保留原文，中文讲解、改编题与解析由网站整理；明确标注的学生用书答案已对照教师用书。练习册答案页未在本次范围内核对。未提供教材原声，播放按钮使用设备合成语音。</p></details>
  </section>;
}
