export const lessonFiveId = 'lesson-5';
export const lessonFiveSources = [
  { book: '学生用书', printed: '38–41', pdf: '44–47', use: '对话、词汇、语法、发音和交际任务' },
  { book: '教师用书', printed: '28–30', pdf: '34–36', use: '先认物再听读的步骤、冠词解释、复数听辨与学生用书答案' },
  { book: '练习册', printed: '10–11', pdf: '12–13', use: '识物、分类、清单、冠词、问答、复数改写和房间描述' },
];

export const objectWords = [
  ['une étagère', '架子 / 书架', 'meuble'], ['une table', '桌子', 'meuble'],
  ['une chaise', '椅子', 'meuble'], ['un fauteuil', '扶手椅', 'meuble'],
  ['un lit', '床', 'meuble'], ['une fenêtre', '窗户', 'room'],
  ['un mur', '墙', 'room'], ['une pièce', '房间', 'room'],
  ['un livre', '书', 'object'], ['une photo', '照片', 'object'],
  ['une affiche', '海报', 'object'], ['un vase', '花瓶', 'object'],
  ['un verre', '玻璃杯', 'object'], ['une assiette', '盘子', 'object'],
  ['une fleur', '花', 'object'], ['un ordinateur', '电脑', 'object'],
  ['un téléphone', '电话', 'object'], ['un sac', '包', 'object'],
  ['un chapeau', '帽子', 'object'], ['un blouson', '夹克衫', 'object'],
];

export const positions = [
  { fr: 'sur', zh: '在……上面（接触）', sentence: 'Le livre est sur la table.', translation: '书在桌子上。', x: 100, y: 44 },
  { fr: 'sous', zh: '在……下面', sentence: 'Le sac est sous la table.', translation: '包在桌子下面。', x: 100, y: 118 },
  { fr: 'dans', zh: '在……里面', sentence: 'Le chapeau est dans le sac.', translation: '帽子在包里。', x: 100, y: 77 },
  { fr: 'contre', zh: '靠着 / 挨着', sentence: 'L’étagère est contre le mur.', translation: '书架靠着墙。', x: 62, y: 78 },
  { fr: 'à gauche de', zh: '在……左边', sentence: 'La chaise est à gauche de la table.', translation: '椅子在桌子左边。', x: 32, y: 78 },
  { fr: 'à droite de', zh: '在……右边', sentence: 'La chaise est à droite de la table.', translation: '椅子在桌子右边。', x: 168, y: 78 },
  { fr: 'à côté de', zh: '在……旁边', sentence: 'Le fauteuil est à côté de la table.', translation: '扶手椅在桌子旁边。', x: 154, y: 78 },
];

export const extraPositions = [
  ['devant', '在……前面', 'Le fauteuil est devant l’étagère.'],
  ['derrière', '在……后面', 'Le sac est derrière la chaise.'],
  ['entre', '在……之间', 'La table est entre le lit et le fauteuil.'],
  ['au-dessus de', '在……上方（不强调接触）', 'La photo est au-dessus du lit.'],
  ['au-dessous de', '在……下方', 'Le sac est au-dessous de la fenêtre.'],
];

export const bookDialogue = [
  ['A', 'Son chapeau et son blouson, c’est ça ?', '要找她的帽子和夹克衫，对吗？'],
  ['B', 'Oui, son chapeau et son blouson. Ils sont dans la chambre de Mélanie, sous l’étagère à côté de la fenêtre.', '对。它们在 Mélanie 的房间里，在窗户旁边的架子下面。'],
  ['A', 'L’étagère avec des livres, à gauche de la fenêtre ?', '放着书、在窗户左边的架子？'],
  ['B', 'Non ! L’étagère contre le mur, à droite de la fenêtre… sous les affiches ! Oh ! là, là !', '不是！靠着墙、在窗户右边的架子……海报下面！哎呀！'],
  ['A', 'À droite de… Ah oui ! Sur la chaise, il y a un blouson et un chapeau.', '在右边……啊，找到了！椅子上有一件夹克衫和一顶帽子。'],
  ['B', 'Voilà ! C’est ça !', '对，就是这些！'],
];

export const grammarNotes = [
  { title: '第一次提到与已经确定：un / une / des → le / la / les', source: '学生 p39；教师 p29', body: '首次引入物品时，用不定冠词；再次提及、或双方明确知道是哪件物品时，用定冠词。这里先掌握这个常见用法。', examples: ['Il y a un livre. Le livre est sur la table.', 'Il y a des photos. Les photos sont sur le mur.'] },
  { title: '名词变复数，冠词也一起变', source: '学生 p39', body: '一般在名词后加 -s；以 -s、-x、-z 结尾时通常不变。-eau 常变为 -eaux，例如 chapeau → chapeaux。书中还列出 -au、-eu、-al 的常见变化；这些规则有例外，不能套用于所有单词。', examples: ['un livre → des livres', 'une chaise → des chaises', 'le chapeau → les chapeaux'] },
  { title: 'Il y a：介绍“某处有什么”', source: '学生 p39；教师 p29–30', body: '无论后面是一个还是多个物品，il y a 都不变。不要因为后面是复数，就改成 ils y ont 或 il y ont。', examples: ['Sur la table, il y a un vase.', 'Sur la table, il y a des verres.'] },
  { title: 'C’est / Ce sont：回答“这是什么”', source: '学生 p40；教师 p29', body: '介绍一个物品用 C’est un / une…；介绍多个物品用 Ce sont des…。“Qu’est-ce que c’est ?” 问物品；问人则用 “Qui est-ce ?”。', examples: ['Qu’est-ce que c’est ? C’est une affiche.', 'Qu’est-ce que c’est ? Ce sont des affiches.'] },
  { title: 'Être：说明“物品在哪里”', source: '教师 p28–30', body: '先区分单复数：Le livre est… / Les livres sont…。人物的复数形式也要回顾：nous sommes、vous êtes、ils / elles sont。', examples: ['Le livre est sur l’étagère.', 'Les livres sont sur l’étagère.', 'Vous êtes à côté de la fenêtre.'] },
  { title: '问物品、问存在、问位置', source: '学生 p40', body: 'Qu’est-ce que c’est ? 用于识别物品。Qu’est-ce qu’il y a… ? 问某处有什么。Où est / Où sont… ? 问已知物品的位置。先确定想问什么，再选句型。', examples: ['Qu’est-ce qu’il y a dans la pièce ?', 'Où est le sac ? Où sont les livres ?'] },
];

export const soundPairs = [
  ['le livre', 'les livres', '名词 livre / livres 的发音不变，听冠词 le / les。'],
  ['la photo', 'les photos', '名词结尾的 -s 不发音，听 la / les 的变化。'],
  ['une affiche', 'des affiches', 'des affiches 中有 /z/ 联诵；不要把词尾 -s 单独读成 /s/。'],
  ['Le livre est sur l’étagère.', 'Les livres sont sur les étagères.', '听 le / les、est / sont，以及 les étagères 的 /z/ 联诵。'],
];

export type LessonQuestion = {
  id: string;
  prompt: string;
  options?: string[];
  answers: string[];
  explanation: string;
  hint?: string;
};
export type QuestionGroup = { id: string; title: string; source: string; note: string; questions: LessonQuestion[] };

export const listeningQuestions: LessonQuestion[] = [
  { id: 'listen-objects', prompt: '两个人在找什么？', options: ['一本书和一个包', '一顶帽子和一件夹克衫', '一张照片和一个花瓶'], answers: ['一顶帽子和一件夹克衫'], explanation: '抓住 chapeau 和 blouson。这是教师用书 p28 指出的情景理解目标。' },
  { id: 'listen-side', prompt: '最后确认的架子在窗户哪一侧？', options: ['左边', '右边'], answers: ['右边'], explanation: '第一次猜的是左边，随后被纠正为 à droite de la fenêtre。' },
  { id: 'listen-found', prompt: '最终在哪儿找到了物品？', options: ['椅子上', '桌子下面', '书架上'], answers: ['椅子上'], explanation: '最后一句提到 Sur la chaise, il y a un blouson et un chapeau。' },
];

export const exerciseGroups: QuestionGroup[] = [
  { id: 'naming', title: '01 · 看数量，说物品', source: '练习册 p10 · 第1题', note: '将原题图片转成文字提示。用完整句回答；以下为网站参考答案。', questions: [
    { id: 'name-chairs', prompt: '几把椅子。Qu’est-ce que c’est ?', answers: ['Ce sont des chaises.'], explanation: '多个物品用 Ce sont des…；chaise 的复数加 -s。', hint: 'Ce sont…' },
    { id: 'name-flowers', prompt: '几朵花。Qu’est-ce que c’est ?', answers: ['Ce sont des fleurs.'], explanation: 'une fleur → des fleurs。' },
    { id: 'name-books', prompt: '几本书。Qu’est-ce que c’est ?', answers: ['Ce sont des livres.'], explanation: 'un livre → des livres。' },
    { id: 'name-photos', prompt: '几张照片。Qu’est-ce que c’est ?', answers: ['Ce sont des photos.'], explanation: 'une photo → des photos。' },
  ] },
  { id: 'vocabulary', title: '02 · 按意义归类', source: '练习册 p10 · 第2题', note: '找出与另外两个词在这里的语义关联不同的一项，查看分类理由。', questions: [
    { id: 'odd-chair', prompt: '哪一项不属于“花瓶与插花”的组合？', options: ['un vase', 'des fleurs', 'une chaise'], answers: ['une chaise'], explanation: '花瓶与花组成插花组合；椅子是座椅。这里按意义归类，不按单复数。' },
    { id: 'odd-poster', prompt: '哪一项不是穿戴物？', options: ['une affiche', 'un blouson', 'un chapeau'], answers: ['une affiche'], explanation: '夹克和帽子是穿戴物；affiche 是海报。' },
    { id: 'odd-window', prompt: '哪一项不是座椅？', options: ['un fauteuil', 'une fenêtre', 'une chaise'], answers: ['une fenêtre'], explanation: 'fauteuil 和 chaise 用于坐；fenêtre 是窗户。' },
    { id: 'odd-phone', prompt: '哪一项不是通常展示在墙上的图像？', options: ['une photo', 'une affiche', 'un téléphone'], answers: ['un téléphone'], explanation: '照片与海报用于图像展示；电话在此作为通信物品。' },
    { id: 'odd-plate', prompt: '哪一项不属于家具？', options: ['une assiette', 'un meuble', 'une étagère'], answers: ['une assiette'], explanation: 'meuble 是家具，étagère 是一种家具；assiette 是盘子。' },
  ] },
  { id: 'articles', title: '03 · 冠词：先看语境', source: '学生 p40 · 第3题；教师 p29；练习册 p11 · 第4题', note: '按同一知识点改编；补充语境，使答案明确。书中学生用书第3题的答案已在教师 p29 核对。', questions: [
    { id: 'article-first', prompt: '第一次告诉别人桌上有一个花瓶：Sur la table, il y a ___ vase.', options: ['un', 'le', 'les'], answers: ['un'], explanation: '首次引入一个阳性物品，用 un。' },
    { id: 'article-known', prompt: '接着说刚才提到的花瓶：___ vase est à côté du verre.', options: ['Un', 'Le', 'Des'], answers: ['Le'], explanation: '已确定是哪一个花瓶，用 le。' },
    { id: 'article-plural', prompt: '第一次描述房间：Il y a ___ fenêtres dans la pièce.', options: ['des', 'la', 'un'], answers: ['des'], explanation: 'fenêtres 是复数，首次介绍用 des；il y a 保持不变。' },
    { id: 'article-elision', prompt: '问书架上有什么：Qu’est-ce qu’il y a sur ___ étagère ?', options: ['le', 'la', 'l’'], answers: ['l’'], explanation: 'étagère 以元音开头，单数定冠词 la 省音为 l’。' },
    { id: 'article-specified', prompt: '你想知道 Thomas 的特定地址：Tu as ___ adresse de Thomas ?', options: ['une', 'l’', 'les'], answers: ['l’'], explanation: 'de Thomas 明确了是哪一个地址，且 adresse 以元音开头。' },
  ] },
  { id: 'matching', title: '04 · 问什么，答什么', source: '练习册 p11 · 第5题', note: '保留原题问答，改为逐题选择；解析由网站编写，未冒充教师用书中的练习册答案。', questions: [
    { id: 'match-identify', prompt: 'Qu’est-ce que c’est ?', options: ['C’est un vase.', 'Ils sont sur les étagères.', 'Non, ce sont des photos.'], answers: ['C’est un vase.'], explanation: '问“这是什么”，回答物品名称。' },
    { id: 'match-wall', prompt: 'Qu’est-ce qu’il y a contre le mur ?', options: ['Il y a des étagères.', 'Ils sont sur les étagères.', 'C’est un vase.'], answers: ['Il y a des étagères.'], explanation: '问墙边有什么，用 Il y a… 介绍书架。' },
    { id: 'match-cat', prompt: 'Sur le fauteuil, qu’est-ce qu’il y a ?', options: ['Non, ce sont des photos.', 'Il y a un chat.', 'Ils sont sur les étagères.'], answers: ['Il y a un chat.'], explanation: '问扶手椅上有什么，回答有一只猫。' },
    { id: 'match-location', prompt: 'Où sont les livres ?', options: ['Il y a un chat.', 'C’est un vase.', 'Ils sont sur les étagères.'], answers: ['Ils sont sur les étagères.'], explanation: '问已知物品的位置，ils 代替 les livres，后面接 sont。' },
    { id: 'match-room', prompt: 'Qu’est-ce qu’il y a dans la pièce ?', options: ['Il y a une table, des chaises et un fauteuil.', 'Non, ce sont des photos.', 'Ils sont sur les étagères.'], answers: ['Il y a une table, des chaises et un fauteuil.'], explanation: '这里需要列出房间里的物品。' },
    { id: 'match-confirm', prompt: 'Sur le mur, ce sont des affiches ?', options: ['C’est un vase.', 'Non, ce sont des photos.', 'Il y a un chat.'], answers: ['Non, ce sont des photos.'], explanation: '对方在确认是不是海报；用 Non 否定并改正为照片。' },
  ] },
  { id: 'plural', title: '05 · 从一个到多个', source: '练习册 p11 · 第6题；学生 p41；教师 p30', note: '网站改编：明确指出要变复数的部分，避免地点是否跟着变复数的歧义。', questions: [
    { id: 'plural-display', prompt: '整句改为复数：C’est une affiche.', answers: ['Ce sont des affiches.'], explanation: 'C’est → Ce sont；une → des；affiche → affiches。' },
    { id: 'plural-exist', prompt: '只将 une affiche 变为复数：Il y a une affiche sur le mur.', answers: ['Il y a des affiches sur le mur.'], explanation: 'il y a 不变；只改指定物品，le mur 保持单数。' },
    { id: 'plural-photo', prompt: '只将 une photo 变为复数：Il y a une photo à côté de l’étagère.', answers: ['Il y a des photos à côté de l’étagère.'], explanation: 'une photo → des photos；不要漏掉 à 的重音。' },
    { id: 'plural-location', prompt: '将主语和地点都变成复数：Le livre est sur l’étagère.', answers: ['Les livres sont sur les étagères.'], explanation: 'Le livre → Les livres；est → sont；l’étagère → les étagères。', hint: 'Les livres…' },
    { id: 'plural-hat', prompt: '将物品变为复数：C’est un chapeau.', answers: ['Ce sont des chapeaux.'], explanation: 'chapeau 的复数是 chapeaux，不是 chapeaus。' },
  ] },
];

export function normalizeFrench(value: string) {
  return value.normalize('NFC').toLocaleLowerCase('fr').replace(/[’‘`]/g, "'")
    .replace(/\s*'\s*/g, "'").replace(/[.,!?;:…]/g, '').replace(/\s+/g, ' ').trim();
}
export function isAnswerCorrect(question: LessonQuestion, value: string) {
  return question.answers.some(answer => normalizeFrench(answer) === normalizeFrench(value));
}
export const allLessonQuestions = [...listeningQuestions, ...exerciseGroups.flatMap(group => group.questions)];
export const canDoStatements = ['我能用冠词和名词说出常见物品', '我能用位置介词准确描述物品位置', '我能区分 il y a、c’est / ce sont 和 est / sont', '我能通过冠词、动词与联诵辨认复数', '我能让别人根据我的描述还原房间布局'];

export type LessonFiveProgress = {
  step: number;
  responses: Record<string, string>;
  checked: string[];
  canDo: boolean[];
};
export const emptyLessonFive = (): LessonFiveProgress => ({ step: 0, responses: {}, checked: [], canDo: [] });

export function readLessonFive(saved: unknown): LessonFiveProgress {
  const fresh = emptyLessonFive();
  if (!saved || typeof saved !== 'object') return fresh;
  const data = saved as Partial<LessonFiveProgress>;
  if (Number.isInteger(data.step) && data.step! >= 0 && data.step! < 4) fresh.step = data.step!;
  for (const question of allLessonQuestions) {
    if (typeof data.responses?.[question.id] === 'string') fresh.responses[question.id] = data.responses[question.id].slice(0, 500);
    if (Array.isArray(data.checked) && data.checked.includes(question.id) && fresh.responses[question.id]?.trim()) fresh.checked.push(question.id);
  }
  if (Array.isArray(data.canDo)) fresh.canDo = canDoStatements.map((_, i) => data.canDo?.[i] === true);
  return fresh;
}
