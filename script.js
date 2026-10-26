(function () {
  var d = document;

  // Menú móvil
  var toggle = d.querySelector('.menu-toggle'), menu = d.getElementById('menu');
  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      var open = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open);
    });
    menu.addEventListener('click', function (e) { if (e.target.tagName === 'A') menu.classList.remove('open'); });
  }

  // Aparición al hacer scroll (sube y aparece); data-delay escalona los elementos
  var show = function (el) { setTimeout(function () { el.classList.add('in-view'); }, +el.dataset.delay || 0); };
  var io = 'IntersectionObserver' in window ? new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { show(e.target); io.unobserve(e.target); } });
  }, { threshold: 0.15 }) : null;
  var reveal = function (els) { els.forEach(function (el) { io ? io.observe(el) : el.classList.add('in-view'); }); };
  reveal(d.querySelectorAll('.reveal'));

  // Video de fondo: sin botón; se detiene si el visitante pide reducir animaciones y cae al degradado si falta el archivo
  var hv = d.querySelector('.hero-video');
  if (hv) {
    hv.querySelector('source').addEventListener('error', function () { hv.parentNode.classList.add('no-video'); });
    if (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) hv.pause();
  }

  // Contador "Candidatos encontrados"
  var c = d.querySelector('[data-count]');
  if (c) {
    var target = +c.dataset.count, started = false;
    var run = function () {
      if (started) return; started = true;
      var n = 0, step = Math.max(1, Math.round(target / 60));
      (function tick() { n = Math.min(target, n + step); c.textContent = n; if (n < target) setTimeout(tick, 25); })();
    };
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (es, o) { if (es[0].isIntersecting) { run(); o.disconnect(); } }).observe(c);
    } else { c.textContent = target; }
  }

  // Sección activa en el menú (solo en index)
  var secs = d.querySelectorAll('section[id]'), links = d.querySelectorAll('nav.links a');
  if (secs.length > 1) {
    var spy = function () {
      var y = window.scrollY + 120, cur = secs[0].id;
      secs.forEach(function (s) { if (s.offsetTop <= y) cur = s.id; });
      links.forEach(function (a) { a.classList.toggle('active', a.getAttribute('href') === '#' + cur || a.getAttribute('href') === 'index.html#' + cur); });
    };
    window.addEventListener('scroll', spy, { passive: true }); spy();
  }

  // ===== Empleos =====
  var box = d.getElementById('jobs');
  if (!box) return;
  var jobs = [
    {
      "loc": "Barcelona",
      "title": "Técnico/a de Selección de Personal",
      "salary": "26.000 – 30.000 € brutos/año",
      "desc": "Te incorporarás a un equipo de Recursos Humanos especializado en selección, participando en procesos completos para diferentes empresas cliente.",
      "funcs": [
        "Publicación y gestión de ofertas de empleo.",
        "Criba curricular y búsqueda activa de candidatos.",
        "Realización de entrevistas telefónicas y por videollamada.",
        "Coordinación de entrevistas con empresas cliente.",
        "Seguimiento de candidatos durante todo el proceso.",
        "Gestión y actualización de la base de datos de candidatos."
      ],
      "reqs": [
        "1-2 años de experiencia en selección de personal.",
        "Experiencia utilizando LinkedIn y portales de empleo.",
        "Buenas habilidades de comunicación y organización.",
        "Manejo habitual de herramientas ofimáticas.",
        "Valorable formación en Psicología, Relaciones Laborales, Recursos Humanos o similar."
      ],
      "contract": "Indefinido",
      "shift": "Jornada completa",
      "mode": "Híbrida",
      "place": "Barcelona"
    },
    {
      "loc": "Sant Adrià de Besòs",
      "title": "Consultor/a de RR.HH.",
      "salary": "32.000 – 38.000 € brutos/año",
      "desc": "Te unirás al equipo de consultoría para asesorar a empresas cliente en la mejora de sus prácticas de recursos humanos.",
      "funcs": [
        "Diagnóstico de procesos de selección y gestión de personal.",
        "Diseño de planes para reducir la rotación y el absentismo.",
        "Elaboración de encuestas de clima laboral e informes de resultados.",
        "Asesoramiento a responsables de equipo y dirección.",
        "Seguimiento de las acciones de mejora acordadas con el cliente.",
        "Preparación de propuestas y presentaciones."
      ],
      "reqs": [
        "Grado en Recursos Humanos, Psicología, Relaciones Laborales o similar.",
        "3 años de experiencia en consultoría o gestión de RR.HH.",
        "Capacidad analítica y de redacción de informes.",
        "Habilidades de comunicación y trato con clientes.",
        "Nivel alto de Excel y herramientas ofimáticas."
      ],
      "contract": "Indefinido",
      "shift": "Jornada completa",
      "mode": "Híbrida",
      "place": "Sant Adrià de Besòs"
    },
    {
      "loc": "Badalona",
      "title": "Administrativo/a de Nóminas",
      "salary": "20.000 – 24.000 € brutos/año",
      "desc": "Formarás parte del área administrativa gestionando las nóminas y la documentación laboral de varias empresas cliente.",
      "funcs": [
        "Elaboración y revisión mensual de nóminas.",
        "Confección de seguros sociales y retenciones.",
        "Altas, bajas y variaciones de trabajadores.",
        "Atención de consultas de empleados y empresas.",
        "Archivo y gestión de documentación laboral."
      ],
      "reqs": [
        "Experiencia mínima de 1 año en gestión de nóminas.",
        "Conocimientos de legislación laboral y Seguridad Social.",
        "Manejo de programas de nóminas.",
        "Nivel medio de Excel.",
        "Orientación al detalle y a los plazos."
      ],
      "contract": "Temporal (6 meses)",
      "shift": "Jornada completa",
      "mode": "Presencial",
      "place": "Badalona"
    },
    {
      "loc": "L'Hospitalet de Llobregat",
      "title": "Operario/a de Almacén (ETT)",
      "salary": "17.000 – 19.500 € brutos/año",
      "desc": "Trabajarás en un centro logístico de una empresa cliente a través de nuestro servicio de subcontratación de personal.",
      "funcs": [
        "Preparación y empaquetado de pedidos.",
        "Carga y descarga de mercancía.",
        "Control y reposición de stock.",
        "Uso de carretilla y transpaleta.",
        "Mantenimiento del orden y la limpieza de la zona de trabajo."
      ],
      "reqs": [
        "Experiencia previa en logística o almacén.",
        "Carnet de carretillero en vigor (valorable).",
        "Disponibilidad para turnos rotativos.",
        "Capacidad física para el manejo de cargas.",
        "Responsabilidad y trabajo en equipo."
      ],
      "contract": "Obra y servicio",
      "shift": "Turnos rotativos",
      "mode": "Presencial",
      "place": "L'Hospitalet de Llobregat"
    },
    {
      "loc": "Terrassa",
      "title": "Headhunter Junior",
      "salary": "24.000 – 28.000 € brutos/año + variable",
      "desc": "Te encargarás de identificar y captar candidatos para perfiles de difícil cobertura en distintas empresas cliente.",
      "funcs": [
        "Búsqueda activa de candidatos en LinkedIn y otras fuentes.",
        "Contacto y primera entrevista con los candidatos.",
        "Presentación de perfiles a las empresas cliente.",
        "Seguimiento del proceso hasta la incorporación.",
        "Mantenimiento de la base de datos de talento."
      ],
      "reqs": [
        "Experiencia en captación de talento o reclutamiento (valorable).",
        "Orientación comercial y a objetivos.",
        "Buen nivel de catalán y castellano.",
        "Habilidades de comunicación y negociación.",
        "Manejo habitual de herramientas ofimáticas."
      ],
      "contract": "Indefinido",
      "shift": "Jornada completa",
      "mode": "Híbrida",
      "place": "Terrassa"
    }
  ];
  var esc = function (s) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;'); };

  box.innerHTML = jobs.map(function (j, i) {
    return '<article class="job reveal" data-delay="' + (i * 110) + '" id="job' + i + '">' +
      '<button class="job-head" aria-expanded="false" aria-controls="p' + i + '">' +
        '<span class="job-loc">' + esc(j.loc) + '</span><span class="job-title">' + esc(j.title) + '</span><span class="job-salary">' + esc(j.salary) + '</span></button>' +
      '<div class="panel" id="p' + i + '" inert><div><div class="job-body">' +
        '<p>' + esc(j.desc) + '</p>' +
        '<h4>Funciones</h4><ul class="sd-list">' + j.funcs.map(function (r) { return '<li>' + esc(r) + '</li>'; }).join('') + '</ul>' +
        '<h4>Requisitos</h4><ul class="sd-list">' + j.reqs.map(function (r) { return '<li>' + esc(r) + '</li>'; }).join('') + '</ul>' +
        '<div class="job-meta"><span><b>Contrato:</b> ' + esc(j.contract) + '</span><span><b>Jornada:</b> ' + esc(j.shift) + '</span><span><b>Modalidad:</b> ' + esc(j.mode) + '</span><span><b>Ubicación:</b> ' + esc(j.place) + '</span></div>' +
        '<div class="job-actions"><button class="btn btn-primary" aria-expanded="false" aria-controls="f' + i + '">Inscríbete</button></div></div>' +
      '<div class="panel" id="f' + i + '" inert><div>' +
        '<form class="apply-form" aria-label="Inscripción a ' + esc(j.title) + '">' +
          '<input type="text" name="nombre" placeholder="Nombre" aria-label="Nombre" required>' +
          '<input type="email" name="email" placeholder="Email" aria-label="Email" required>' +
          '<textarea name="experiencia" placeholder="Experiencia" aria-label="Experiencia" required></textarea>' +
          '<button type="submit" class="btn btn-primary">Enviar</button></form>' +
        '<p class="apply-ok" role="status" hidden>Solicitud enviada. Gracias por inscribirte.</p>' +
      '</div></div></div></div></article>';
  }).join('');

  reveal(box.querySelectorAll('.job'));

  function setPanel(btn, panel, open) {
    btn.setAttribute('aria-expanded', open);
    panel.classList.toggle('show', open);
    if (open) panel.removeAttribute('inert'); else panel.setAttribute('inert', '');
  }
  function closeJob(job) {
    job.classList.remove('open');
    setPanel(job.querySelector('.job-head'), job.querySelector('.panel'), false);
    var ab = job.querySelector('.job-actions button'), fp = job.querySelector('[id^="f"]');
    setPanel(ab, fp, false);
    var fm = fp.querySelector('form'), ok = fp.querySelector('.apply-ok');
    fm.hidden = false; ok.hidden = true; fm.reset();
  }

  box.addEventListener('click', function (e) {
    var head = e.target.closest('.job-head'), apply = e.target.closest('.job-actions button');
    if (head) {
      var job = head.parentNode, willOpen = !job.classList.contains('open');
      box.querySelectorAll('.job.open').forEach(closeJob);
      if (willOpen) { job.classList.add('open'); setPanel(head, job.querySelector('.panel'), true); }
    } else if (apply) {
      var f = apply.closest('.job').querySelector('[id^="f"]');
      setPanel(apply, f, apply.getAttribute('aria-expanded') !== 'true');
    }
  });

  box.addEventListener('submit', function (e) {
    e.preventDefault(); // sin backend: solo confirmación en pantalla
    var form = e.target, ok = form.parentNode.querySelector('.apply-ok');
    form.reset(); form.hidden = true; ok.hidden = false;
  });
})();
