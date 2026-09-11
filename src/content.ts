import { legacyLessons } from './legacy';

export type Practice = {
  id: string;
  title: string;
  name: string;
  fr: string;
  description: string;
  tip: string;
  words: string[][];
  goal: string;
  scene: string;
  dialogue: { speaker: string; fr: string; zh: string }[];
  listening: { question: string; options: string[]; answer: number; explanation: string };
  grammar: { title: string; explanation: string; examples: string[] };
  phonetics: { title: string; explanation: string; sample: string };
  conjugation: { question: string; options: string[]; answer: number; explanation: string };
  mission: { instruction: string; placeholder: string; example: string; checks: string[] };
};

const extensions = [
  {
    id: 'greetings', goal: '我能根据场合打招呼，并礼貌地结束一段对话。',
    scene: '上午，你走进一家小店。先听店员与顾客怎样打招呼，留意告别的表达。',
    dialogue: [
      { speaker: '店员', fr: 'Bonjour, madame !', zh: '您好，女士！' },
      { speaker: '顾客', fr: 'Bonjour !', zh: '您好！' },
      { speaker: '店员', fr: 'Voilà. Merci !', zh: '给您。谢谢！' },
      { speaker: '顾客', fr: 'Merci. Au revoir !', zh: '谢谢，再见！' },
    ],
    listening: { question: '顾客离开时说了什么？', options: ['Salut !', 'Au revoir !', 'Bonsoir !'], answer: 1, explanation: 'Au revoir 用于告别；Bonjour 是白天见面时的问候。' },
    grammar: { title: '先学会表达，再观察用法', explanation: 'Bonjour、Merci、Au revoir 是可以独立使用的交际表达。Salut 更随意，适合熟人之间；向陌生人打招呼，先用 Bonjour。', examples: ['Bonjour, monsieur !', 'Merci, madame !'] },
    phonetics: { title: '鼻化元音 /ɔ̃/', explanation: 'Bonjour 中的 on 表示鼻化元音 /ɔ̃/，气流同时经过口腔和鼻腔，不要在后面另加一个清晰的 n。先听，再慢慢模仿。', sample: 'Bonjour. Bonsoir.' },
    conjugation: { question: '上午第一次走进商店，哪一句更合适？', options: ['Bonjour, madame !', 'Au revoir, madame !', 'Salut, mon ami !'], answer: 0, explanation: '对不熟悉的店员，Bonjour, madame 是自然、礼貌的问候。' },
    mission: { instruction: '写一段两人的简短对话：上午见面问候，表达感谢，然后告别。写完后不看文字，再说一遍。', placeholder: 'A : …\nB : …', example: 'A : Bonjour, monsieur !\nB : Bonjour, madame !\nA : Merci ! Au revoir !\nB : Au revoir !', checks: ['我能用合适的表达问候陌生人', '我能表达感谢并告别', '我能不看提示说出这段对话'] },
  },
  {
    id: 'introductions', goal: '我能介绍姓名和来自哪里，并向对方提问。',
    scene: '第一次参加法语课，你认识了一位新同学。听听他们交换了哪些个人信息。',
    dialogue: [
      { speaker: 'Lina', fr: 'Bonjour ! Je m’appelle Lina. Et vous ?', zh: '你好！我叫 Lina。您呢？' },
      { speaker: 'Paul', fr: 'Je m’appelle Paul. Enchanté !', zh: '我叫 Paul。很高兴认识你！' },
      { speaker: 'Lina', fr: 'Enchantée ! Je viens de Chine.', zh: '很高兴认识你！我来自中国。' },
      { speaker: 'Paul', fr: 'Moi, je suis français.', zh: '我是法国人。' },
    ],
    listening: { question: 'Lina 来自哪里？', options: ['法国', '中国', '对话没有提到'], answer: 1, explanation: 'Je viens de Chine 表示“我来自中国”。' },
    grammar: { title: '用 je 介绍自己', explanation: 'Je m’appelle… 后接姓名；Je suis… 可以介绍身份或国籍。être（是）会随主语变化：je suis、tu es、il/elle est。使用 vous 表达礼貌，或称呼多个人。', examples: ['Je m’appelle Lina.', 'Je suis étudiant. / Je suis étudiante.', 'Vous êtes français ?'] },
    phonetics: { title: '分清 /y/ 和 /u/', explanation: 'Salut 的 u 发 /y/：舌位接近“衣”，双唇拢圆。Vous 中的 ou 发 /u/，舌位更靠后。交替听读，感受差别。', sample: 'Salut. Vous. Salut. Vous.' },
    conjugation: { question: '选择正确变位：Je ___ étudiant.', options: ['es', 'est', 'suis'], answer: 2, explanation: 'être 与 je 搭配时用 suis。Je suis étudiant. 表示“我是一名男学生”。' },
    mission: { instruction: '给新同学写三句自我介绍：说出你的名字、来自哪里，再问一句“您呢？”。随后大声说一遍。', placeholder: 'Bonjour ! Je m’appelle…', example: 'Bonjour ! Je m’appelle Mei.\nJe viens de Chine.\nEt vous ?', checks: ['我能说出自己的名字', '我能介绍来自哪里', '我能把话题交给对方'] },
  },
  {
    id: 'cafe', goal: '我能礼貌点单，并在结束时提出结账。',
    scene: '你在咖啡馆稍作休息。先听顾客点了什么，再留意怎样让请求更礼貌。',
    dialogue: [
      { speaker: '店员', fr: 'Bonjour ! Vous désirez ?', zh: '您好！您想要什么？' },
      { speaker: '顾客', fr: 'Un café et un croissant, s’il vous plaît.', zh: '请给我一杯咖啡和一个羊角面包。' },
      { speaker: '店员', fr: 'Voilà !', zh: '给您！' },
      { speaker: '顾客', fr: 'Merci ! L’addition, s’il vous plaît.', zh: '谢谢！请结账。' },
    ],
    listening: { question: '顾客点了什么？', options: ['一杯茶', '一杯咖啡和一个羊角面包', '两杯咖啡'], answer: 1, explanation: 'Un café et un croissant 中的 et 表示“和”。' },
    grammar: { title: '名词前的 un / une', explanation: '法语名词有语法性别。单数不定冠词 un 用在阳性名词前，une 用在阴性名词前。把冠词和名词一起记。L’addition 中，la 在元音前省音为 l’。', examples: ['un café · 一杯咖啡', 'un croissant · 一个羊角面包', 'une addition → l’addition'] },
    phonetics: { title: '词尾不一定读出来', explanation: 'Croissant 中的词尾 t 不发音，an 发鼻化元音 /ɑ̃/。不要根据单词的字母数量，给它添加额外音节。', sample: 'Un croissant. Un croissant, s’il vous plaît.' },
    conjugation: { question: '填入合适的冠词：___ café, s’il vous plaît.', options: ['Une', 'Un', 'Les'], answer: 1, explanation: 'Café 是阳性名词；点一杯咖啡，用 un café。' },
    mission: { instruction: '写下你在咖啡馆要说的话：先问好，点一杯咖啡和一个羊角面包，最后提出结账。两次请求都加上礼貌表达。', placeholder: 'Bonjour ! …', example: 'Bonjour ! Un café et un croissant, s’il vous plaît.\nMerci !\nL’addition, s’il vous plaît.', checks: ['我能清楚说出想点的东西', '我能用 s’il vous plaît 提出请求', '我能提出结账'] },
  },
  {
    id: 'directions', goal: '我能礼貌问路，并辨认向左、向右。',
    scene: '你想找到地铁站，向路人求助。先听懂关键方向，再查看文字。',
    dialogue: [
      { speaker: '游客', fr: 'Bonjour ! Excusez-moi, où est le métro ?', zh: '您好！打扰一下，地铁在哪里？' },
      { speaker: '路人', fr: 'Le métro ? À droite.', zh: '地铁？在右边。' },
      { speaker: '游客', fr: 'À droite ? Merci beaucoup !', zh: '在右边？非常感谢！' },
      { speaker: '路人', fr: 'Au revoir !', zh: '再见！' },
    ],
    listening: { question: '路人说地铁在哪边？', options: ['左边', '右边', '前方'], answer: 1, explanation: 'À droite 表示“在右边”；À gauche 表示“在左边”。' },
    grammar: { title: '用 Où est… ? 询问位置', explanation: 'Où 意为“在哪里”，ù 上的重音符号不能漏掉；ou 表示“或者”。询问单个地点的位置，可以用 Où est… ?。', examples: ['Où est le métro ?', 'Où est le café ?'] },
    phonetics: { title: '法语的 /ʁ/', explanation: 'Droite 中的 r 发 /ʁ/，发音部位在口腔后部。先听短语，再模仿；保持喉部放松，不必刻意用力。', sample: 'À droite. Au revoir.' },
    conjugation: { question: '填入正确形式：Où ___ le métro ?', options: ['suis', 'êtes', 'est'], answer: 2, explanation: 'Le métro 是第三人称单数，因此 être 用 est。' },
    mission: { instruction: '模拟向陌生人问路：先礼貌开口，询问地铁位置；对方回答“向左”，你重复确认并道谢。', placeholder: 'A : Bonjour ! …\nB : …', example: 'A : Bonjour ! Excusez-moi, où est le métro ?\nB : À gauche.\nA : À gauche ? Merci beaucoup !', checks: ['我能礼貌地发起问路', '我能用 Où est… ? 询问位置', '我能辨认并复述左右方向'] },
  },
];

export const practices: Practice[] = legacyLessons.map((lesson, index) => ({ ...lesson, ...extensions[index] }));
export const sources = [
  { title: '外研社 · 第一册旧版', url: 'https://mlp.fltrp.com/wys/bookstore/detail?id=1135&mid=' },
  { title: '外研社 · 第一册第二版', url: 'https://mlp.fltrp.com/edu/wys/bookstore/detail?id=2051&mid=13' },
  { title: 'Hachette · 原版教学理念', url: 'https://www.hachettefle.com/livre/le-nouveau-taxi-1-livre-de-leleve-a1-9782011555489/' },
];
