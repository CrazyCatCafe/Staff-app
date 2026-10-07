(function () {
  var base = window.APP_URL, extra = window.APP_EXTRA || '';
  var qs = location.search ? location.search.replace(/^\?/, '') : '';
  var q = [extra, qs].filter(Boolean).join('&');
  var url = base + (q ? (base.indexOf('?') >= 0 ? '&' : '?') + q : '');
  var f = document.getElementById('f'), s = document.getElementById('splash'), m = document.getElementById('msg');
  if (/INCOLLA_QUI/.test(base)) { m.textContent = 'Manca il link dell\'app: apri config.js e incollalo.'; return; }
  function carica() {
    if (!navigator.onLine) { m.textContent = 'Nessuna connessione. Controlla Internet e riapri l\'app.'; return; }
    m.textContent = 'Carico…';
    f.src = url;
  }
  f.addEventListener('load', function () { if (f.src) { s.classList.add('off'); } });
  setTimeout(function () { if (!s.classList.contains('off')) m.textContent = 'Sta impiegando più del solito… controlla la connessione.'; }, 12000);
  window.addEventListener('online', carica);
  carica();
  if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(function () {});
})();
