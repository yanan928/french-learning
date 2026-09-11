async page => {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.evaluate(() => {
    localStorage.clear();
    localStorage.setItem('petit-progress', '[0,1,99]');
  });
  await page.reload();
  await page.getByRole('heading', { name: '从一句你好开始' }).waitFor();
  if (!await page.getByText('✓ 表达练习已通过', { exact: true }).isVisible()) throw new Error('Legacy progress migration failed');
  await page.getByText('设置教材进度', {exact: true}).click();
  await page.getByLabel('教材版本').selectOption('second');
  await page.getByLabel('正在学').selectOption('phonetics');
  await page.getByLabel('教材版本').selectOption('original');
  await page.getByLabel('正在学').selectOption('3');
  await page.getByLabel('课名 / 页码').fill('我的当前课 / p. 24');
  await page.getByRole('button', { name: '查看文字', exact: true }).click();
  await page.getByRole('button', { name: '显示中文', exact: true }).click();
  await page.getByText('您好，女士！', { exact: true }).waitFor();
  await page.getByRole('button', { name: 'Salut !', exact: true }).click();
  if (await page.locator('.wrong').count() !== 1) throw new Error('Listening feedback missing');
  await page.getByRole('tab', { name: /拆解表达/ }).click();
  await page.getByRole('button', { name: '翻卡记一记' }).click();
  await page.getByRole('button', { name: '翻卡查看中文' }).click();
  await page.getByText('你好 / 日安', { exact: true }).waitFor();
  await page.getByRole('tab', { name: /练习巩固/ }).click();
  for (let i = 0; i < 4; i++) {
    await page.locator(`[data-answer="${i}"]`).click();
    await page.getByRole('button', { name: i === 3 ? '查看结果与语法练习' : '下一题 →', exact: true }).click();
  }
  await page.getByRole('heading', { name: '表达练习通过了。' }).waitFor();
  await page.getByRole('button', { name: 'Bonjour, madame !', exact: true }).click();
  await page.getByRole('tab', { name: /完成任务/ }).click();
  await page.getByLabel('我的表达').fill('Bonjour ! Merci. Au revoir !');
  const checks = page.getByRole('checkbox');
  for (let i = 0; i < 3; i++) await checks.nth(i).check();
  if (await page.getByRole('progressbar').getAttribute('value') !== '1') throw new Error('Self-assessment failed');
  await page.reload();
  if (await page.getByLabel('教材版本').inputValue() !== 'original') throw new Error('Edition not saved');
  if (await page.getByLabel('正在学').inputValue() !== '3') throw new Error('Book position not saved');
  await page.getByRole('tab', { name: /完成任务/ }).click();
  if (await page.getByLabel('我的表达').inputValue() !== 'Bonjour ! Merci. Au revoir !') throw new Error('Draft not saved');
  await page.getByRole('checkbox').first().uncheck();
  if (await page.getByRole('progressbar').getAttribute('value') !== '0') throw new Error('Self-assessment correction failed');
  await page.getByRole('tab', { name: /听懂情景/ }).click();
  await page.keyboard.press('ArrowRight');
  if (await page.getByRole('tab', { name: /拆解表达/ }).getAttribute('aria-selected') !== 'true') throw new Error('Keyboard tabs failed');
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    for (let lesson = 0; lesson < 4; lesson++) {
      await page.locator(`[data-lesson="${lesson}"]`).click();
      for (const name of [/听懂情景/, /拆解表达/, /练习巩固/, /完成任务/]) {
        await page.getByRole('tab', { name }).click();
        if (await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)) throw new Error(`Overflow at ${width}, lesson ${lesson}, ${name}`);
      }
    }
  }
  await page.evaluate(() => { localStorage.clear(); });
  await page.reload();
  await page.setViewportSize({ width: 1440, height: 1100 });
  await page.screenshot({ path: '/private/tmp/french-companion-desktop.png', fullPage: true });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.screenshot({ path: '/private/tmp/french-companion-mobile.png', fullPage: true });
  const webmcp = await page.evaluate(() => Boolean(document.modelContext?.registerTool));
  if (errors.length) throw new Error(errors.join('; '));
  return { status: 'passed', widths: [320, 390, 768, 1440], scenarios: 4, checks: ['legacy migration', 'book position', 'listening feedback', 'flashcards', 'quiz', 'draft persistence', 'self-assessment', 'keyboard tabs', 'overflow'], webmcp };
}
