export function Sound({ text, label = '朗读', notify }: { text: string; label?: string; notify: (message: string) => void }) {
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

