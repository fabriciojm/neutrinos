let narrativeFrames=new Set();
function setupAnimations(){
  narrativeFrames.forEach(cancelAnimationFrame);narrativeFrames.clear();
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.querySelectorAll('main svg').forEach(s=>{if(reduced)s.pauseAnimations()});
  const clamp=v=>Math.max(0,Math.min(1,v));
  const ease=v=>{v=clamp(v);return v*v*(3-2*v)};
  function timeline(root,duration,paint){
    let time=reduced?duration:0,paused=reduced,last=performance.now(),frame=0;
    const pause=root.querySelector('[data-pause]'),replay=root.querySelector('[data-replay]');
    function update(){paint(time);pause.textContent=paused?'▶':'Ⅱ';pause.setAttribute('aria-label',paused?'Reanudar animación':'Pausar animación');pause.setAttribute('aria-pressed',String(paused))}
    function schedule(){frame=requestAnimationFrame(tick);narrativeFrames.add(frame)}
    function tick(now){narrativeFrames.delete(frame);if(!root.isConnected||paused)return;time=Math.min(duration,time+Math.min((now-last)/1000,.1));last=now;if(time===duration)paused=true;update();if(!paused)schedule()}
    function stop(){cancelAnimationFrame(frame);narrativeFrames.delete(frame)}
    const svgs=[...root.querySelectorAll('svg')];
    function sync(){svgs.forEach(s=>paused?s.pauseAnimations():s.unpauseAnimations())}
    pause.onclick=()=>{if(time===duration)time=0;paused=!paused;last=performance.now();stop();sync();update();if(!paused)schedule()};
    replay.onclick=()=>{time=0;paused=false;last=performance.now();stop();svgs.forEach(s=>s.setCurrentTime(0));sync();update();schedule()};
    update();if(!paused)schedule();
  }
  const hand=document.querySelector('[data-hand-zoom]');
  if(hand){
    hand.insertAdjacentHTML('beforeend','<div class="animation-caption"><span data-hand-step>De la Tierra a una uña</span><div><button data-pause aria-label="Pausar zoom">Ⅱ</button><button data-replay aria-label="Repetir zoom">↺</button></div></div>');
    timeline(hand,10,t=>{
      const globe=hand.querySelector('[data-hand-earth]'),camera=hand.querySelector('[data-hand-camera]');
      globe.style.opacity=String(1-ease((t-1.8)/1));const z=1+ease((t-.5)/2)*2;globe.setAttribute('transform',`translate(280 180) scale(${z}) translate(-280 -180)`);
      camera.style.opacity=String(ease((t-2)/1));const p=ease((t-5)/3),scale=.85+2.35*p,cx=250+31*p,cy=185-112*p;camera.setAttribute('transform',`translate(280 175) scale(${scale}) translate(${-cx} ${-cy})`);
      hand.querySelector('[data-nail-number]').style.opacity=String(ease((t-5.5)/1));hand.querySelector('[data-nail-rays]').style.opacity=String(ease((t-5)/1));
      hand.querySelector('[data-hand-caption]').textContent=t<2?'Atravesando la Tierra':t<5?'También atraviesan tu mano':'Neutrinos solares cada segundo';
      hand.querySelector('[data-hand-step]').textContent=t<2?'La Tierra':t<5?'Una mano humana':'Una uña de un dedo';
    });
  }
  const beta=document.querySelector('[data-beta-story]');
  if(beta){timeline(beta,18,t=>{
    const reveal=ease((t-6)/1.4),detected=ease((t-13)/1);
    beta.querySelector('[data-beta-experiment]').style.opacity=String(detected);const arrival=beta.querySelector('[data-beta-arrival]'),q=ease((t-14)/2);arrival.setAttribute('cx',String(193+240*q));arrival.style.opacity=t<16?'1':'0';beta.querySelector('[data-beta-detection]').style.opacity=String(ease((t-16)/.6));
    beta.querySelector('[data-beta-mystery]').style.opacity=String(1-reveal);
    beta.querySelector('[data-beta-neutrino]').style.opacity=String(reveal);
    beta.querySelector('[data-beta-energy]').style.opacity=String(reveal);
    beta.querySelector('[data-beta-gap]').style.opacity=String(1-reveal);
    const electron=beta.querySelector('[data-beta-electron]'),e=ease((t%6)/3);
    electron.setAttribute('cx',String(321+147*e));electron.setAttribute('cy',String(149-54*e));
    const particle=beta.querySelector('[data-beta-particle]'),p=ease((t-6)/3);
    particle.setAttribute('cx',String(320+138*p));particle.setAttribute('cy',String(193+81*p));
    beta.querySelector('[data-beta-energy-label]').textContent=reveal<.5?'¿Energía que falta?':'La lleva el neutrino';
    beta.querySelector('[data-beta-heading]').textContent=t<6?'1 · Un misterio en el decaimiento beta':t<13?'2 · Pauli propone una partícula, 1930':'3 · La partícula se detecta, 1956';
    beta.querySelector('[data-beta-resolution]').textContent=t<6?'Algo se lleva energía sin dejarse ver.':t<13?'La energía se conserva: la partícula la transporta.':'Cowan y Reines la detectan junto a un reactor.';
    beta.querySelector('[data-beta-step]').textContent=t<6?'Las cuentas no cuadran':t<13?'Una hipótesis: el neutrino':'Una hipótesis confirmada';
  })}
  const build=document.querySelector('[data-construction]');
  if(build){timeline(build,25,t=>{
    const camera=build.querySelector('[data-camera]'),primary=build.querySelector('[data-primary-chain]');
    let scale,cx,cy;
    if(t<5){const p=ease((t-2)/3);scale=19.4-18.1*p;cx=280;cy=130+90*p}else if(t<14){scale=1.3;cx=280;cy=220}else{const p=ease((t-14)/3);scale=1.3-.3*p;cx=280;cy=220}
    camera.setAttribute('transform',`translate(280 220) scale(${scale}) translate(${-cx} ${-cy})`);
    const left=ease((t-5)/1.8),transfer=ease((t-10)/1.1),drop=ease((t-11.1)/2.8);
    primary.querySelectorAll('g').forEach((g,i)=>{g.style.opacity=i===0?'1':String(ease((t-2)/1.3))});primary.querySelector('path').style.opacity=String(ease((t-2)/1.3));
    primary.setAttribute('transform',`translate(${-110*left+185*transfer} ${t<10?0:-300*(transfer-drop)})`);
    build.querySelector('[data-ice]').style.opacity=String(ease((t-6)/1));build.querySelector('[data-borehole]').style.opacity=String(ease((t-7)/.4)*(1-ease((t-14)/2)));
    const depth=245*ease((t-7)/2.8);build.querySelector('[data-hole]').setAttribute('d',`M343 103h24v${depth}h-24Z`);
    const drill=build.querySelector('[data-drill]');drill.setAttribute('transform',`translate(0 ${depth})`);drill.style.opacity=String(1-ease((t-9.7)/.3));
    build.querySelectorAll('[data-string]').forEach((g,i)=>{g.style.opacity=String(ease((t-14-i*.07)/1.3))});
    const event=build.querySelector('[data-event]');event.style.opacity=t>=18?'1':'0';build.querySelector('[data-neutrino-label]').style.opacity=t>=18?'1':'0';
    const p=ease((t-18)/2.4),neutrino=build.querySelector('[data-neutrino]');neutrino.setAttribute('cx',String(8+294*p));neutrino.setAttribute('cy',String(274-38*p));neutrino.style.opacity=t<20.4?'1':'0';
    build.querySelector('[data-flash]').style.opacity=String(ease((t-20.4)/.45)*(.7+.3*Math.sin(Math.max(0,t-20.4)*3)**2));
    build.querySelectorAll('[data-lit-sensor]').forEach(g=>{const onset=20.5+Number(g.dataset.distance)/230;g.style.opacity=String(ease((t-onset)/.4)*(.7+.3*Math.sin((t-onset)*3)**2))});
    const phase=t<2?0:t<7?1:t<10?2:t<14?3:t<18?4:5;
    const titles=['1 / 5 · Un sensor de luz','2 / 5 · Zoom a la cadena de sensores','3 / 5 · Perforar con agua caliente','4 / 5 · Introducir la cadena en el hielo','5 / 5 · Zoom a todas las cadenas','Un neutrino llega y los sensores detectan luz.'];
    const labels=['Sensor de luz','Una cadena vertical','Un pozo cilíndrico','Se baja la cadena','86 cadenas forman IceCube','Los sensores se iluminan'];
    const notes=['Una esfera de vidrio protege la electrónica.','60 sensores en cada cable del IceCube original.','El agua caliente funde el hielo.','El agua vuelve a congelarse alrededor del cable.','Sensores entre 1,45 y 2,45 km de profundidad.','La luz del choque se propaga hasta los sensores.'];
    build.querySelector('[data-stage-title]').textContent=titles[phase];build.querySelector('[data-build-label]').textContent=labels[phase];build.querySelector('[data-build-note]').textContent=notes[phase];
  })}
  const animated=[...document.querySelectorAll('main svg')].filter(s=>s.querySelector('animate,animateMotion')&&!s.closest('[data-construction],[data-hand-zoom],[data-beta-story]'));
  if(animated.length){const button=document.createElement('button');button.className='quiet motion-control';let paused=reduced;button.textContent=paused?'▶ Animar ilustración':'Ⅱ Pausar animación';button.setAttribute('aria-pressed',String(paused));button.onclick=()=>{paused=!paused;animated.forEach(s=>paused?s.pauseAnimations():s.unpauseAnimations());button.textContent=paused?'▶ Animar ilustración':'Ⅱ Pausar animación';button.setAttribute('aria-pressed',String(paused))};const visual=document.querySelector('.visual')||document.querySelector('.particle-grid');visual.insertAdjacentElement('afterend',button)}
}
