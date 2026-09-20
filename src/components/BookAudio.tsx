import { useState } from 'react';

const tracks = {
  vocabulary: { page: 35, title: '词汇 · Vocabulaire', detail: '第五课词汇', duration: '1:56' },
  expressions: { page: 36, title: '表达 · Savoir dire', detail: '第五课交际表达', duration: '0:34' },
  dialogue: { page: 37, title: '课文 · 找出物品', detail: '教材音轨 27 · 学生 p38', duration: '1:20' },
  restaurant: { page: 38, title: '听力 · 给客人指座位', detail: '教材音轨 28–30 · 学生 p41', duration: '2:35' },
  pronunciation: { page: 39, title: '语音 · 单数与复数', detail: '教材音轨 31 · 学生 p41', duration: '1:22' },
};
type Track = keyof typeof tracks;

export function BookAudio({ items }: { items: Track[] }) {
  const [active, setActive] = useState<Track | null>(null);
  return <section className="book-audio" aria-label="配套音频">
    <div className="audio-heading"><strong>配套音频</strong><span>B 站 · 音频与文本</span></div>
    <div className="audio-tracks">{items.map(id => {
      const track = tracks[id];
      return <div key={id} className="audio-track"><button className="audio-select" aria-expanded={active === id} onClick={() => { if ('speechSynthesis' in window) speechSynthesis.cancel(); setActive(active === id ? null : id); }}>
        <span className="audio-play" aria-hidden="true">▶</span><span className="audio-track-copy"><strong>{track.title}</strong><small>{track.detail} · {track.duration}</small></span><span className="audio-open">{active === id ? '收起' : '播放'}</span></button><a className="audio-open" href={`https://www.bilibili.com/video/BV1DL411879a/?p=${track.page}`} target="_blank" rel="noopener noreferrer">去 B 站 ↗<span className="sr-only">（在新标签页打开 B 站第 {track.page} 集）</span></a></div>;
    })}</div>
    {active && <div className="audio-embed"><iframe key={active} title={`配套音频：${tracks[active].title}`} src={`https://player.bilibili.com/player.html?bvid=BV1DL411879a&page=${tracks[active].page}&autoplay=0`} allowFullScreen referrerPolicy="strict-origin-when-cross-origin"/><p>点击播放器开始。如未加载或无法播放，请使用“去 B 站”入口。</p></div>}
    <p>配套音频由 B 站提供；页面上的扬声器按钮为设备合成朗读。来源：糖不腻啵的《你好！法语 A1》音频合集。</p>
  </section>;
}
