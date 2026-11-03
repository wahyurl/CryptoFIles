import { $ } from '../core/utils.js';
import { PEEK } from '../core/config.js';

const slug = s => s.toLowerCase().replace(/[^a-z0-9]+/g, '_');

/** Menggambar tumpukan folder + tab + panel, dan menangani klik lewat event delegation. */
export function renderStack(root, folders) {
  const active = folders.map(() => 0);
  root.innerHTML = folders.map((f, i) => `
    <section class="fd" id="fd${i}" style="--c:${f.color};--top:${i * PEEK}px;z-index:${i + 1}">
      <div class="tabs">${f.files.map((x, j) => `<button class="tab" data-f="${i}" data-j="${j}">${x.tab}</button>`).join('')}</div>
      <div class="bd"><div class="lab">0${i + 1} ${f.title} / ${f.subtitle}</div><div class="pn" id="pn${i}"></div></div>
    </section>`).join('');

  function fill(i) {
    const j = active[i], file = folders[i].files[j]; let n = 0; const s = () => `style="--n:${n++}"`;
    root.querySelectorAll(`#fd${i} .tab`).forEach((b, m) => b.classList.toggle('on', m === j));
    $('pn' + i).innerHTML =
      `<div class="fn" ${s()}>0${i + 1}/0${j + 1}_${slug(file.name)}.crypto</div><h2 ${s()}>${file.name}</h2><p class="d" ${s()}>${file.desc}</p>` +
      file.fields.map(f => `<div ${s()}><label>${f.label}</label>${f.id === 'text' ? `<textarea id="f${i}_${f.id}" rows="3">${f.value}</textarea>` : `<input id="f${i}_${f.id}" value="${f.value}">`}</div>`).join('') +
      `<div class="act" ${s()}>${file.actions.map((a, r) => `<button data-i="${i}" data-r="${r}">${a.label}</button>`).join('')}</div><pre id="out${i}" ${s()}>Hasil tampil di sini.</pre>`;
  }
  folders.forEach((_, i) => fill(i));

  root.addEventListener('click', async e => {
    const d = e.target.dataset; if (!d) return;
    if (d.f !== undefined) {                       // ganti berkas (tab)
      const i = +d.f; active[i] = +d.j; fill(i);
      const p = $('pn' + i); p.classList.remove('sw'); void p.offsetWidth; p.classList.add('sw');
    } else if (d.r !== undefined) {                // jalankan aksi
      const i = +d.i, file = folders[i].files[active[i]], v = {}, out = $('out' + i);
      file.fields.forEach(f => v[f.id] = $(`f${i}_${f.id}`).value);
      try { out.textContent = await file.actions[d.r].run(v); } catch (err) { out.textContent = 'Error: ' + err.message; }
    }
  });
}
