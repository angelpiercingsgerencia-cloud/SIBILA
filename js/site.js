/* Sibila Oráculo — interações do site */
(function () {
  var WA = 'https://wa.me/5519993454939?text=';

  function val(id) {
    var el = document.getElementById(id);
    return el ? el.value.trim() : '';
  }

  /* Formulários que abrem o WhatsApp com a mensagem pronta */
  var builders = {
    conselho: function () {
      var msg = 'Olá, Sibila! Gostaria de receber um conselho gratuito.';
      if (val('cg-nome')) msg += '\n\nNome: ' + val('cg-nome');
      if (val('cg-relato')) msg += '\n\nMeu relato: ' + val('cg-relato');
      return msg;
    },
    feedback: function () {
      var msg = 'Olá, Sibila! Quero deixar meu feedback.';
      if (val('fb-nome')) msg += '\n\nNome: ' + val('fb-nome');
      if (val('fb-consulta')) msg += '\nConsulta: ' + val('fb-consulta');
      if (val('fb-texto')) msg += '\n\nFeedback: ' + val('fb-texto');
      var ok = document.getElementById('fb-autoriza');
      msg += ok && ok.checked
        ? '\n\n(Autorizo publicar meu feedback no site.)'
        : '\n\n(Prefiro que meu feedback não seja publicado.)';
      return msg;
    }
  };

  document.querySelectorAll('a[data-wa-form]').forEach(function (link) {
    var build = builders[link.getAttribute('data-wa-form')];
    if (!build) return;
    function update() { link.href = WA + encodeURIComponent(build()); }
    update();
    var form = link.parentElement;
    form.addEventListener('input', update);
    form.addEventListener('change', update);
    link.addEventListener('click', update);
  });

  /* Página de horários: status ao vivo (horário de Brasília) */
  var statusText = document.getElementById('status-text');
  if (statusText) {
    var dot = document.getElementById('status-dot');
    var next = document.getElementById('status-next');
    var OPEN = 10 * 60, CLOSE = 16 * 60;

    var refresh = function () {
      var wd = 1, mins = 11 * 60;
      try {
        var parts = new Intl.DateTimeFormat('en-US', {
          timeZone: 'America/Sao_Paulo', weekday: 'short',
          hour: 'numeric', minute: 'numeric', hourCycle: 'h23'
        }).formatToParts(new Date());
        var get = function (t) {
          for (var i = 0; i < parts.length; i++) if (parts[i].type === t) return parts[i].value;
          return '';
        };
        wd = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(get('weekday'));
        mins = (parseInt(get('hour'), 10) % 24) * 60 + parseInt(get('minute'), 10);
      } catch (e) {}

      var weekday = wd >= 1 && wd <= 5;
      var open = weekday && mins >= OPEN && mins < CLOSE;
      statusText.textContent = open ? 'Atendendo agora' : 'Fora do horário';
      if (dot) dot.style.background = open ? '#7FC796' : '#E0A45A';
      if (next) {
        next.textContent = open
          ? 'Estamos em horário de atendimento. Respostas até as 16h de hoje.'
          : weekday && mins < OPEN ? 'Próximo atendimento: hoje, às 10h.'
          : wd >= 1 && wd <= 4 ? 'Próximo atendimento: amanhã, às 10h.'
          : 'Próximo atendimento: segunda-feira, às 10h.';
      }
      document.querySelectorAll('.dia').forEach(function (row) {
        var today = parseInt(row.getAttribute('data-day'), 10) === wd;
        row.style.background = today ? '#FBF8F2' : 'transparent';
        var badge = row.querySelector('.hoje');
        if (badge) badge.hidden = !today;
      });
    };
    refresh();
    setInterval(refresh, 60000);
  }
})();
