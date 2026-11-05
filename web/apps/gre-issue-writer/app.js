/* Issue Essay Writer: the 30-minute Analyze an Issue essay with original prompts, a timer and feedback. */
(function () {
  'use strict';
  const KEY = 'gre-issue-writer.done';
  const CHECK = ['I took a clear position in the first paragraph.', 'Each body paragraph makes one point and supports it with a specific example.', 'I addressed what the instructions asked, not just the statement.', 'I considered at least one opposing view and answered it.', 'My conclusion follows from the body and does not add new arguments.', 'I left two minutes to proofread.'];
  const promptText = (data, p) => p.text + '\n\n' + data.issue_prompts.instructions[p.ins];
  const App = {
    about: 'The GRE has one essay task since September 2023: Analyze an Issue, in 30 minutes. This app gives you 40 original Issue prompts in six instruction styles, a 30-minute timer, a plain editor without spell check (as on the test), and feedback on length, structure and style.',
    how: ['Press **New prompt** in **Write**, or pick one in **Prompts**.', 'Start the timer. Spend about 5 minutes planning, 22 writing and 3 checking.', 'Press **Get feedback**, then work through the checklist honestly.', 'See your past essays in **History**.'],
    tabs: [
      { id: 'write', label: 'Write', render(el, ctx) {
        const prompts = ctx.data.issue_prompts.prompts;
        const pick = SK.store.get('gre-issue-writer.current', null) || SK.pick(SK.rng(SK.seedNow()), prompts).id;
        const p = prompts.find((x) => x.id === pick) || prompts[0];
        const box = SK.h('div', {});
        el.appendChild(SK.h('div', { class: 'sk-row', style: { marginBottom: '10px' } }, SK.btn('New prompt', () => { SK.store.set('gre-issue-writer.current', SK.pick(SK.rng(SK.seedNow()), prompts.filter((x) => x.id !== p.id)).id); SK.show('write'); }, 'ghost'), SK.h('span', { class: 'sk-pill', text: p.theme })));
        el.appendChild(box);
        SK.writer(box, { key: p.id, title: 'Analyze an Issue', prompt: promptText(ctx.data, p), promptText: p.text, minutes: 30, target: [400, 650], paragraphs: 4, checklist: CHECK,
          onSubmit: () => { const d = SK.store.get(KEY, {}); d[p.id] = SK.dayKey(); SK.store.set(KEY, d); } });
      } },
      { id: 'prompts', label: 'Prompts', render(el, ctx) {
        const done = SK.store.get(KEY, {});
        const prompts = ctx.data.issue_prompts.prompts;
        let theme = 'All';
        const list = SK.h('div', {});
        const draw = () => {
          SK.clear(list);
          list.appendChild(SK.table(['Theme', 'Statement', 'Written', ''], prompts.filter((p) => theme === 'All' || p.theme === theme).map((p) => [p.theme, p.text, done[p.id] || '', SK.btn('Write', () => { SK.store.set('gre-issue-writer.current', p.id); SK.show('write'); }, 'ghost small')])));
        };
        el.appendChild(SK.card('Prompt bank', SK.stats([['Prompts', prompts.length], ['Written', Object.keys(done).length]]), SK.select(['All'].concat([...new Set(prompts.map((p) => p.theme))]), theme, (v) => { theme = v; draw(); }, 'Theme'), list));
        draw();
      } },
      { id: 'history', label: 'History', render(el) {
        const hist = SK.store.get('gre-issue-writer.essays', []).slice().reverse();
        const card = SK.card('Your essays', hist.length ? null : SK.h('p', { class: 'sk-muted', text: 'Essays you submit for feedback are kept here.' }));
        hist.forEach((e) => card.appendChild(SK.h('details', { style: { borderTop: '1px solid var(--line)', padding: '8px 0' } }, SK.h('summary', { text: new Date(e.at).toLocaleString() + ' · ' + e.words + ' words · ' + (e.prompt || '').slice(0, 70) }), SK.h('div', { class: 'sk-passage', style: { marginTop: '8px' }, text: e.text }))));
        el.appendChild(card);
      } },
    ],
    promptText,
    checks: {
      'there are 40 prompts and every instruction style is used': (data, assert) => {
        const p = data.issue_prompts;
        assert.equal(p.prompts.length, 40);
        assert.equal(new Set(p.prompts.map((x) => x.ins)).size, p.instructions.length);
        for (const x of p.prompts) assert.ok(promptText(data, x).length > x.text.length + 40);
      },
    },
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = App; else SK.start(App);
})();
