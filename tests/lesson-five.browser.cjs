async page => {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.evaluate(() => {
    localStorage.clear();
    localStorage.setItem('petit-companion-v2', JSON.stringify({ edition: 'original', unit: '3', bookLesson: '保留旧位置', active: 2, quizPassed: ['cafe'], drafts: { cafe: 'Un café, merci.' }, checks: { cafe: [true, false, true] } }));
  });
  await page.reload();
  await page.getByRole('heading', { name: 'Trouvez l’objet', exact: true }).waitFor();
  if (!await page.getByText('学生用书 p38–41', { exact: true }).isVisible()) throw new Error('Source mapping missing');
  await page.getByRole('button', { name: '展开课文', exact: true }).click();
  await page.getByRole('button', { name: '显示中文', exact: true }).click();
  await page.getByText('要找她的帽子和夹克衫，对吗？', { exact: true }).waitFor();
  const listening = page.locator('[data-question="listen-objects"]');
  await listening.locator('select').selectOption('一本书和一个包');
  await listening.getByRole('button', { name: '检查答案' }).click();
  if (!await listening.getByText('再改一下。', { exact: true }).isVisible()) throw new Error('Wrong answer feedback missing');
  await listening.locator('select').selectOption('一顶帽子和一件夹克衫');
  if (await listening.getByText('再改一下。', { exact: true }).count()) throw new Error('Stale feedback after edit');
  await listening.getByRole('button', { name: '检查答案' }).click();
  await page.getByRole('tab', { name: /语法与语音/ }).click();
  await page.getByRole('button', { name: 'sous', exact: true }).click();
  await page.getByText('包在桌子下面。', { exact: true }).waitFor();
  await page.getByRole('tab', { name: /同步练习/ }).click();
  const naming = page.locator('[data-question="name-chairs"]');
  await naming.getByRole('button', { name: '检查答案' }).click();
  await naming.getByText('请先填写或选择答案。').waitFor();
  await naming.locator('input').fill('Ce sont des chaises.');
  await naming.getByRole('button', { name: '检查答案' }).click();
  await page.getByText('05 · 从一个到多个', { exact: false }).click();
  const plural = page.locator('[data-question="plural-location"]');
  await plural.locator('input').fill('Les livres est sur les étagères.');
  await plural.getByRole('button', { name: '检查答案' }).click();
  if (!await plural.getByText('再改一下。', { exact: true }).isVisible()) throw new Error('Incorrect verb accepted');
  await plural.locator('input').fill('Les livres sont sur les étagères.');
  await plural.getByRole('button', { name: '检查答案' }).click();
  if (await page.getByRole('progressbar', { name: '第五课同步练习进度' }).getAttribute('value') !== '2') throw new Error('Exercise progress wrong');
  await page.getByRole('tab', { name: /描述房间/ }).click();
  await page.getByLabel('我的房间描述').fill('Dans la pièce, il y a une table.');
  await page.getByRole('checkbox').first().check();
  await page.reload();
  if (await page.getByLabel('我的房间描述').inputValue() !== 'Dans la pièce, il y a une table.') throw new Error('Draft not persisted');
  if (!await page.getByRole('checkbox').first().isChecked()) throw new Error('Self assessment not persisted');
  await page.getByRole('tab', { name: /同步练习/ }).click();
  if (await naming.locator('input').inputValue() !== 'Ce sont des chaises.') throw new Error('Responses not persisted');
  if (await page.getByRole('progressbar', { name: '第五课同步练习进度' }).getAttribute('value') !== '2') throw new Error('Score not persisted');
  await page.getByText('情景拓展 · 4 个原创任务', { exact: true }).click();
  await page.locator('[data-lesson="2"]').click();
  await page.getByRole('tab', { name: /完成任务/ }).click();
  if (await page.getByLabel('我的表达').inputValue() !== 'Un café, merci.') throw new Error('Old draft lost');
  if (!await page.getByRole('checkbox').first().isChecked()) throw new Error('Old checks lost');
  await page.locator('[data-textbook="lesson-5"]').click();
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const name of [/认物与听读/, /语法与语音/, /同步练习/, /描述房间/]) {
      await page.getByRole('tab', { name }).click();
      await page.locator('#lesson5-panel details').evaluateAll(items => items.forEach(item => { item.open = true; }));
      if (await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)) throw new Error(`Overflow ${width}: ${name}`);
    }
  }
  await page.getByRole('tab', { name: /认物与听读/ }).click();
  await page.keyboard.press('ArrowRight');
  if (await page.getByRole('tab', { name: /语法与语音/ }).getAttribute('aria-selected') !== 'true') throw new Error('Keyboard tabs failed');
  await page.evaluate(() => { localStorage.clear(); });
  await page.reload();
  await page.setViewportSize({ width: 1440, height: 1100 });
  await page.screenshot({ path: '/private/tmp/lesson-five-desktop.png', fullPage: true });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.screenshot({ path: '/private/tmp/lesson-five-mobile.png', fullPage: true });
  await page.evaluate(() => { Object.defineProperty(window, 'speechSynthesis', { configurable: true, value: { getVoices: () => [], cancel: () => {} } }); });
  await page.getByRole('button', { name: '朗读第五课对话', exact: true }).click();
  await page.getByRole('status').filter({ hasText: '设备暂无法语语音' }).waitFor();
  if (errors.length) throw new Error(errors.join(';'));
  return { status: 'passed', lesson: 5, widths: [320, 390, 768, 1440], checks: ['source mapping', 'listening', 'retry', 'prepositions', 'grammar grading', 'saved answers', 'saved drafts', 'self assessment', 'legacy preservation', 'keyboard', 'voice fallback', 'expanded panels overflow'] };
}
