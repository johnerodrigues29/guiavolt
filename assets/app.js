(() => {
  'use strict';

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const esc = (value) => String(value).replace(/[&<>"']/g, (char) => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#039;' }[char]));
  const productData = [
    { slug:'nado-k3-750w', name:'Nado K3 750W', category:'bike', sourceType:'seller', review:'/bicicletas-eletricas/reviews/nado-k3-750w/', url:'https://meli.la/1EBDnZv', maxSpeed:'32 km/h (limitada)', eyebrow:'Ficha em monitoramento', specs:[['Motor declarado','750 W · pico de 1000 W'],['Bateria declarada','48 V · 15 Ah · 720 Wh'],['Autonomia anunciada','45–60 km']], ideal:'Formato compacto, pneus largos e conjunto robusto.', watch:'Confirme versão, potência nominal e enquadramento.' },
    { slug:'streetgo-s12', name:'StreetGo S12', category:'bike', sourceType:'seller', review:'/bicicletas-eletricas/reviews/streetgo-s12/', url:'https://meli.la/1qSxfk5', maxSpeed:'32 km/h', eyebrow:'Dados do anúncio', specs:[['Motor declarado','750 W · 80 Nm'],['Bateria declarada','48 V · 15 Ah · 720 Wh'],['Autonomia estimada','20–60 km']], ideal:'Ficha detalhada, freios hidráulicos e componentes identificados.', watch:'Confirme a versão, pois componentes podem variar.' },
    { slug:'v9-max-1000w', name:'V9 Max 1000W', category:'bike', sourceType:'variants', review:'/bicicletas-eletricas/reviews/v9-max-1000w/', url:'https://meli.la/1FmEcKV', maxSpeed:'32 km/h limitada · até 48 km/h em anúncio', eyebrow:'Versões conflitantes', specs:[['Motor anunciado','1000 W · pico'],['Bateria no anúncio','48 V · 15,6 Ah'],['Autonomia divergente','até 50–60 km']], ideal:'Modelo robusto após confirmar a variante exata.', watch:'Velocidade, bateria e autonomia divergem entre fontes.' },
    { slug:'honeywhale-b20', name:'Honeywhale B20', category:'bike', sourceType:'official', review:'/bicicletas-eletricas/reviews/honeywhale-b20/', url:'https://meli.la/2j9zEq2', maxSpeed:'25 km/h padrão · até 32 km/h desbloqueada', eyebrow:'Ficha oficial localizada', specs:[['Motor oficial','350 W nominal · 440 W pico'],['Bateria oficial','36 V · 7,8 Ah · 280,8 Wh'],['Autonomia declarada','até 35 km']], ideal:'Rotinas curtas com pouco espaço para guardar.', watch:'Confira peso, medidas dobrada e configuração.' },
    { slug:'honeywhale-e9-max-n', name:'Honeywhale E9 Max-N', category:'scooter', sourceType:'official', review:'/patinetes-eletricos/reviews/honeywhale-e9-max-n/', url:'https://meli.la/24kiTuG', maxSpeed:'32 km/h', eyebrow:'Ficha oficial localizada', specs:[['Motor máximo oficial','650 W'],['Bateria oficial','36 V · 15 Ah · 540 Wh'],['Autonomia declarada','até 40 km']], ideal:'Trajetos urbanos maiores com prioridade para conforto.', watch:'Valide peso, autonomia real, assistência e peças.' },
    { slug:'honeywhale-m2-pro', name:'Honeywhale M2 Pro', category:'scooter', sourceType:'official', review:'/patinetes-eletricos/reviews/honeywhale-m2-pro/', url:'https://meli.la/2YTbUqt', maxSpeed:'32 km/h', eyebrow:'Ficha oficial localizada', specs:[['Motor informado','500 W'],['Bateria oficial','36 V · 7,8 Ah · 280,8 Wh'],['Autonomia declarada','até 22 km']], ideal:'Trajetos curtos com formato dobrável e leve.', watch:'Mantenha margem sobre ida e volta.' },
    { slug:'veg-s250', name:'VEG S250', category:'trike', sourceType:'seller', review:'/triciclos-eletricos/reviews/veg-s250/', url:'https://meli.la/28r1qGY', maxSpeed:'32 km/h', eyebrow:'Três lugares anunciados', specs:[['Motor declarado','600 W'],['Bateria declarada','48 V · 20 Ah · 960 Wh'],['Autonomia anunciada','até 45 km']], ideal:'Apoio de três rodas, assentos e pequenas cargas.', watch:'Confirme medidas, freios, regras, garantia e assistência.' }
  ];
  const evidenceLabels = {
    official:{ label:'Ficha oficial localizada', detail:'Especificações conferidas em fonte oficial; sem teste físico.' },
    seller:{ label:'Dados declarados pelo vendedor', detail:'Confirme a ficha da unidade antes da compra.' },
    variants:{ label:'Especificações variam entre versões', detail:'Há divergências entre fontes; confirme etiqueta e manual.' }
  };

  function setDialog(element, open) {
    if (!element) return;
    element.hidden = !open;
    document.body.classList.toggle('nav-open', open);
    if (open) setTimeout(() => $('input', element)?.focus(), 0);
  }
  const mobilePanel = $('[data-mobile-panel]');
  const searchOverlay = $('[data-search-overlay]');
  $('[data-menu-open]')?.addEventListener('click', () => setDialog(mobilePanel, true));
  $('[data-menu-close]')?.addEventListener('click', () => setDialog(mobilePanel, false));
  $('[data-search-open]')?.addEventListener('click', () => setDialog(searchOverlay, true));
  $('[data-search-close]')?.addEventListener('click', () => setDialog(searchOverlay, false));
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape') { setDialog(mobilePanel, false); setDialog(searchOverlay, false); } });

  const consent = $('[data-consent]');
  const measurementId = $('meta[name="ga4-id"]')?.content || '';
  function loadAnalytics() {
    if (!measurementId || $('script[data-guia-ga]')) return;
    const script = document.createElement('script');
    script.async = true; script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`; script.dataset.guiaGa = 'true';
    document.head.append(script);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function(){ window.dataLayer.push(arguments); };
    window.gtag('js', new Date()); window.gtag('config', measurementId, { anonymize_ip:true });
  }
  const choice = localStorage.getItem('gv-consent');
  if (!choice && consent) consent.hidden = false;
  if (choice === 'granted') { const lazy = () => loadAnalytics(); setTimeout(lazy, 2000); addEventListener('pointerdown', lazy, { once:true }); addEventListener('keydown', lazy, { once:true }); }
  $('[data-consent-accept]')?.addEventListener('click', () => { localStorage.setItem('gv-consent','granted'); consent.hidden = true; loadAnalytics(); });
  document.addEventListener('click', (event) => { const target = event.target.closest('[data-affiliate]'); if (target && window.gtag) window.gtag('event','affiliate_click',{ item_name:target.dataset.product, merchant:'mercado_livre' }); });
  const trackTool = (name) => window.gtag?.('event','tool_completed',{ tool_name:name });

  const finder = $('#finder-root');
  if (finder) {
    const questions = [
      { key:'type', title:'Qual formato faz mais sentido?', options:[['bike','Bicicleta','Pedalar com assistência'],['scooter','Patinete','Compacto e dobrável'],['trike','Triciclo','Mais apoio e capacidade']] },
      { key:'terrain', title:'Como é seu trajeto principal?', options:[['plano','Mais plano','Poucas inclinações'],['misto','Misto','Algumas subidas'],['acidentado','Com subidas','Exige atenção ao conjunto']] },
      { key:'priority', title:'O que pesa mais na decisão?', options:[['portabilidade','Portabilidade','Guardar e transportar'],['conforto','Conforto','Piso irregular e postura'],['equilibrio','Equilíbrio','Um pouco de tudo']] }
    ];
    const answers = { type:'bike', terrain:'plano', priority:'equilibrio' };
    let step = 0;
    const questionBox = $('[data-finder-question]', finder); const back = $('[data-finder-back]', finder); const next = $('[data-finder-next]', finder); const result = $('[data-finder-result]');
    function renderFinder() {
      const question = questions[step];
      $('[data-finder-progress]', finder).textContent = `Etapa ${step + 1} de ${questions.length}`;
      $('[data-finder-bar]', finder).style.width = `${((step + 1) / questions.length) * 100}%`;
      questionBox.innerHTML = `<h2>${question.title}</h2><div class='choice-grid'>${question.options.map(([value,title,text]) => `<button type='button' class='choice${answers[question.key]===value?' active':''}' data-value='${value}'><span class='radio'></span><strong>${title}</strong><small>${text}</small></button>`).join('')}</div>`;
      $$('.choice', questionBox).forEach(button => button.addEventListener('click', () => { answers[question.key] = button.dataset.value; renderFinder(); }));
      back.disabled = step === 0; next.textContent = step === questions.length - 1 ? 'Ver resultado' : 'Continuar';
    }
    back.addEventListener('click', () => { step = Math.max(0, step - 1); renderFinder(); });
    next.addEventListener('click', () => {
      if (step < questions.length - 1) {
        step += 1;
        renderFinder();
        return;
      }

      const pool = productData.filter(p => p.category === answers.type);
      let found = pool[0];
      if (answers.priority === 'portabilidade') found = pool.find(p => /b20|m2/.test(p.slug)) || found;
      else found = pool.find(p => /streetgo|e9/.test(p.slug)) || found;

      finder.hidden = true;
      result.hidden = false;
      result.innerHTML = `
        <span class='result-kicker'>✓ Ponto de partida encontrado</span>
        <div class='finder-result-layout'>
          <a class='finder-result-photo' href='${found.review}' aria-label='Ler análise completa do ${esc(found.name)}'>
            <img src='/assets/products/${found.slug}.webp' alt='${esc(found.name)}' width='1200' height='900' decoding='async'>
          </a>
          <div class='finder-result-content'>
            <h2>${esc(found.name)}</h2>
            <p>${esc(found.ideal)}</p>
            <div class='result-rationale'>
              <strong>Por que apareceu</strong>
              <p>O formato combina com suas escolhas. Isso não é uma recomendação automática de compra.</p>
            </div>
            <div class='tool-actions'>
              <a class='button' href='${found.review}'>Ver análise completa</a>
              <button class='button button-ghost' type='button' data-finder-reset>Refazer</button>
            </div>
            <small>Confirme versão, medidas, regras locais e assistência.</small>
          </div>
        </div>`;
      $('[data-finder-reset]', result).addEventListener('click', () => {
        step = 0;
        finder.hidden = false;
        result.hidden = true;
        renderFinder();
      });
      trackTool('finder');
    });
    renderFinder();
  }

  const rangeTool = $('[data-range-tool]');
  if (rangeTool) {
    const form = $('form', rangeTool); const result = $('[data-range-result]', rangeTool);
    form.km.addEventListener('input', () => $('[data-km-output]', form).textContent = `${form.km.value} km`);
    form.days.addEventListener('input', () => $('[data-days-output]', form).textContent = form.days.value);
    form.addEventListener('submit', (event) => { event.preventDefault(); const km=Number(form.km.value), days=Number(form.days.value), terrain=Number(form.terrain.value), battery=Number(form.battery.value); const consumption=12*terrain, estimate=Math.max(8,Math.round(battery/consumption)), ideal=Math.ceil(km*2*1.3); const status=estimate>=ideal?'Folga estimada':estimate>=km*2?'Margem curta':'Capacidade possivelmente insuficiente'; result.classList.remove('placeholder'); result.innerHTML=`<span>Estimativa educativa</span><strong>${estimate} km</strong><p>${status}</p><dl><div><dt>Necessidade com 30% de margem</dt><dd>${ideal} km</dd></div><div><dt>Uso semanal estimado</dt><dd>${km*2*days} km</dd></div><div><dt>Consumo adotado</dt><dd>${consumption.toFixed(1).replace('.',',')} Wh/km</dd></div></dl><small>Não é promessa de autonomia. Temperatura, peso, pneus, relevo, vento e idade da bateria mudam o resultado.</small>`; trackTool('range_calculator'); });
  }

  const legalTool = $('[data-legal-tool]');
  if (legalTool) {
    const form=$('form',legalTool), result=$('[data-legal-result]',legalTool), bikeFields=$('[data-bike-fields]',legalTool); let vehicle='bike';
    $$('[data-vehicle]',legalTool).forEach(button => button.addEventListener('click', () => { vehicle=button.dataset.vehicle; $$('[data-vehicle]',legalTool).forEach(x=>x.classList.toggle('active',x===button)); bikeFields.hidden=vehicle!=='bike'; }));
    form.addEventListener('submit', event => { event.preventDefault(); const speed=Number(form.speed.value), motor=Number(form.motor.value), pedals=form.pedals.checked, accelerator=form.accelerator.checked; const attention=speed>32||motor>1000||(vehicle==='bike'&&(!pedals||accelerator)); result.className=`legal-result active${attention?' warning':''}`; result.innerHTML=`<div aria-hidden='true'>${attention?'⚠':'✓'}</div><div><span>Triagem educativa</span><h2>${attention?'A configuração pede verificação reforçada':'A configuração pode se aproximar de uma categoria regulamentada'}</h2><p>${attention?'Velocidade, potência ou configuração pode mudar o enquadramento. Não use só o título do anúncio.':'Confira dimensões, equipamentos obrigatórios, características completas e regras municipais.'}</p><a class='text-link' href='https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-contran/resolucoes/Resolucao9962023.pdf' target='_blank' rel='noopener'>Ler a Resolução CONTRAN nº 996/2023 ↗</a><small>Esta ferramenta não presta consultoria jurídica.</small></div>`; trackTool('legal_checker'); });
  }

  const comparator = $('[data-comparator]');
  if (comparator) {
    const a=$('[data-compare-a]',comparator), b=$('[data-compare-b]',comparator), table=$('[data-compare-table]',comparator);
    const params=new URLSearchParams(location.search); const pre=params.get('modelos'); if(pre&&productData.some(p=>p.slug===pre)) a.value=pre;
    function renderComparison() { const chosen=[a.value,b.value].map(slug=>productData.find(p=>p.slug===slug)); table.innerHTML=`<table><thead><tr><th>Critério</th>${chosen.map(p=>`<th><a class='compare-product-photo product-photo' href='${p.review}' aria-label='Ler análise do ${esc(p.name)}'><img src='/assets/products/${p.slug}.webp' alt='${esc(p.name)}' width='1200' height='900' loading='lazy' decoding='async'></a><span>${esc(p.eyebrow)}</span><strong class='compare-product-name'>${esc(p.name)}</strong></th>`).join('')}</tr></thead><tbody>${[0,1,2].map(i=>`<tr><th>${esc(chosen[0].specs[i]?.[0]||chosen[1].specs[i]?.[0]||'Dado')}</th>${chosen.map(p=>`<td>${esc(p.specs[i]?.[1]||'Não informado')}</td>`).join('')}</tr>`).join('')}<tr><th>Velocidade máxima</th>${chosen.map(p=>`<td><strong>${esc(p.maxSpeed)}</strong><small>Valor declarado; confirme a versão.</small></td>`).join('')}</tr><tr><th>Indicado para</th>${chosen.map(p=>`<td>${esc(p.ideal)}</td>`).join('')}</tr><tr><th>Ponto de atenção</th>${chosen.map(p=>`<td class='warning-cell'>${esc(p.watch)}</td>`).join('')}</tr><tr><th>Origem dos dados</th>${chosen.map(p=>{const evidence=evidenceLabels[p.sourceType];return `<td><strong>${esc(evidence.label)}</strong><small>${esc(evidence.detail)}</small></td>`;}).join('')}</tr><tr class='compare-actions-row'><th>Ver modelo</th>${chosen.map(p=>`<td><div class='compare-actions'><a class='button button-small button-ghost' href='${p.review}'>Ver análise completa</a><a class='button button-small' data-affiliate data-product='${esc(p.name)}' href='${p.url}' target='_blank' rel='sponsored nofollow noopener'>Ver preço atualizado</a></div></td>`).join('')}</tr></tbody></table>`; }
    a.addEventListener('change',()=>{renderComparison();trackTool('comparator');}); b.addEventListener('change',()=>{renderComparison();trackTool('comparator');}); renderComparison();
  }

  const searchForm = $('[data-search-page]');
  if (searchForm) {
    const results=$('[data-search-results]'); const entries=[...productData.map(p=>({type:'Análise',title:p.name,text:p.ideal,href:p.review})),{type:'Hub',title:'Guias de mobilidade elétrica',text:'Central de escolha, bateria, autonomia, legislação, patinetes e triciclos.',href:'/guias/'},{type:'Guia',title:'Como escolher uma bicicleta elétrica',text:'Trajeto, bateria, motor, conforto, freios e suporte.',href:'/bicicletas-eletricas/guias/como-escolher/'},{type:'Guia',title:'Autonomia de bicicleta elétrica',text:'Wh, consumo, percurso, relevo e margem.',href:'/guias/autonomia-bicicleta-eletrica/'},{type:'Guia',title:'Bateria de bicicleta elétrica',text:'Volts, ampère-hora, watt-hora, recarga e reposição.',href:'/guias/bateria-bicicleta-eletrica/'},{type:'Guia',title:'Bicicleta elétrica precisa de CNH?',text:'Bicicleta elétrica, autopropelido, ciclomotor e Resolução 996.',href:'/guias/bicicleta-eletrica-precisa-cnh/'},{type:'Guia',title:'Como escolher um patinete elétrico',text:'Peso, dobra, pneus, suspensão, freios e peças.',href:'/guias/como-escolher-patinete-eletrico/'},{type:'Guia',title:'Como escolher um triciclo elétrico',text:'Largura, estabilidade, carga, freios e classificação.',href:'/guias/como-escolher-triciclo-eletrico/'},{type:'Ferramenta',title:'Calculadora de autonomia',text:'Simule distância, bateria e relevo.',href:'/calculadora-autonomia/'}];
    function renderSearch(query) { const q=query.trim().toLocaleLowerCase('pt-BR'); const filtered=entries.filter(e=>!q||`${e.title} ${e.text}`.toLocaleLowerCase('pt-BR').includes(q)); results.innerHTML=filtered.length?filtered.map(e=>`<a class='search-result' href='${e.href}'><span>${e.type}</span><h2>${esc(e.title)}</h2><p>${esc(e.text)}</p></a>`).join(''):`<p class='search-empty'>Nenhum resultado. Tente “bicicleta”, “autonomia” ou o nome de um modelo.</p>`; }
    const q=new URLSearchParams(location.search).get('q')||''; searchForm.q.value=q; renderSearch(q); searchForm.addEventListener('submit',event=>{event.preventDefault();const value=searchForm.q.value;history.replaceState(null,'',`?q=${encodeURIComponent(value)}`);renderSearch(value);});
  }

  const backToTop = document.createElement('button');
  backToTop.type = 'button';
  backToTop.className = 'back-to-top';
  backToTop.tabIndex = -1;
  backToTop.setAttribute('aria-label', 'Voltar ao topo');
  backToTop.setAttribute('aria-hidden', 'true');
  backToTop.setAttribute('title', 'Voltar ao topo');
  backToTop.innerHTML = "<svg width='20' height='20' viewBox='0 0 24 24' fill='none' aria-hidden='true'><path d='m6 15 6-6 6 6' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/></svg>";
  document.body.append(backToTop);

  function updateBackToTopOffset() {
    backToTop.style.removeProperty('--back-to-top-bottom');
    if (consent && !consent.hidden) {
      const consentRect = consent.getBoundingClientRect();
      const buttonRect = backToTop.getBoundingClientRect();
      const horizontalOverlap = buttonRect.left < consentRect.right + 14 && buttonRect.right > consentRect.left - 14;
      if (horizontalOverlap) {
        const occupiedHeight = Math.max(0, window.innerHeight - consentRect.top);
        backToTop.style.setProperty('--back-to-top-bottom', `${Math.ceil(occupiedHeight + 14)}px`);
      }
    }
  }

  function updateBackToTopVisibility() {
    const isVisible = window.scrollY >= 700;
    backToTop.classList.toggle('visible', isVisible);
    backToTop.tabIndex = isVisible ? 0 : -1;
    backToTop.setAttribute('aria-hidden', String(!isVisible));
  }

  let backToTopFrame = 0;
  window.addEventListener('scroll', () => {
    if (backToTopFrame) return;
    backToTopFrame = window.requestAnimationFrame(() => {
      updateBackToTopVisibility();
      backToTopFrame = 0;
    });
  }, { passive: true });

  window.addEventListener('resize', updateBackToTopOffset, { passive: true });
  if (consent) {
    new MutationObserver(updateBackToTopOffset).observe(consent, { attributes: true, attributeFilter: ['hidden'] });
    if ('ResizeObserver' in window) new ResizeObserver(updateBackToTopOffset).observe(consent);
  }

  backToTop.addEventListener('click', () => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
  });

  updateBackToTopOffset();
  updateBackToTopVisibility();

})();
