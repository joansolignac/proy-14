import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import '@fontsource-variable/dm-sans';
import '@fontsource-variable/playfair-display';
import memories from './memories.json';
import './style.css';

const files = import.meta.glob('../resources/**/*', { eager: true, query: '?url', import: 'default' });
const asset = (path) => files['../' + path];
const tracks = ['1G9wM0DIuyxn0m0QeENIkl', '3HMYsT5mnqQ57tVjvqlETb', '3Wno87vVBVbSVS2vUUFuKC', '6jHvX8ZnHKC1PnrPMJ0Emt'];

function Counter() {
  const [now, setNow] = useState(Date.now());
  useEffect(() => { const timer = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(timer); }, []);
  const total = Math.floor(Math.max(0, now - new Date(2020, 2, 11).getTime()) / 1000);
  const values = [[Math.floor(total / 86400), 'días'], [Math.floor(total % 86400 / 3600), 'horas'], [Math.floor(total % 3600 / 60), 'minutos'], [total % 60, 'segundos']];
  return <div className="counter" aria-label="Tiempo juntos">{values.map(([value, label]) => <span key={label}><strong>{String(value).padStart(2, '0')}</strong><small>{label}</small></span>)}</div>;
}

function App() {
  const reduced = useReducedMotion();
  const introRef = useRef(null);
  const { scrollYProgress: introProgress } = useScroll({ target: introRef, offset: ['start start', 'end end'] });
  const introGlowOpacity = useTransform(introProgress, [0, 0.12, 1], [1, 1, 0]);
  const [selected, setSelected] = useState(null);
  const dialog = useRef(null);
  useEffect(() => { if (selected && !dialog.current.open) dialog.current.showModal(); }, [selected]);
  const reveal = reduced ? {} : { initial: 'hidden', whileInView: 'visible', viewport: { once: true, amount: 0.15 } };
  const photoMotion = (i) => reduced ? {} : { variants: { hidden: { opacity: 0.35, x: i % 2 ? 70 : -70, scale: 0.9, rotate: i % 2 ? 5 : -5 }, visible: { opacity: 1, x: 0, scale: [0.9, 1.035, 1], rotate: [i % 2 ? 5 : -5, i % 2 ? -2 : 2, 0], transition: { duration: 2.8, ease: [0.16, 1, 0.3, 1], delay: 0.45 } } } };
  const textMotion = reduced ? {} : { variants: { hidden: {}, visible: { transition: { delayChildren: 1.05, staggerChildren: 0.4 } } } };
  const wordMotion = reduced ? {} : { variants: { hidden: { opacity: 0.2, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 3, ease: [0.16, 1, 0.3, 1] } } } };
  return <>
    <motion.div className="intro-glow" aria-hidden="true" style={{ opacity: reduced ? 0 : introGlowOpacity }} />
    <header className="topbar"><a href="#hero" className="brand">Nuestra historia<span>.</span></a><nav aria-label="Navegación principal"><a href="#timeline">Recuerdos</a><a href="#songs">Música</a><a href="#letter">Carta</a></nav></header>
    <main>
      <div ref={introRef} className="intro-stage"><section id="hero" className="hero wrap">
        <div className="hero-copy"><motion.h1 initial={reduced ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>Nuestro tiempo <em>juntos.</em></motion.h1><p>Gracias por todo este tiempo Puchi. Te amo infinito, ty? Aquí algunos recuerdo junto a ti, mi preciosa.</p><a className="button" href="#timeline">Explorar nuestros recuerdos <span aria-hidden="true">↗</span></a><div className="hero-counter"><p>Desde el 11 de marzo de 2020</p><Counter /></div></div>
        <motion.div className="hero-photo" initial={reduced ? false : { opacity: 0, clipPath: 'inset(8% 0 8% 0)' }} animate={{ opacity: 1, clipPath: 'inset(0% 0 0% 0)' }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}><img src={asset('resources/timeline/foto-1.jpg')} alt="Un recuerdo juntos" /><span>Para ti, Puchi</span></motion.div>
      </section></div>
      <section id="timeline" className="timeline wrap"><div className="section-heading"><h2>Una historia hecha de <em>momentos.</em></h2><p>Por muchos recuerdos más, y todos los que vienen contigo.</p></div><div className="memory-list">{memories.map((item, i) => <motion.article {...reveal} className={'memory ' + (i % 2 ? 'reverse' : '')} key={item.src}><motion.div className="memory-media" {...photoMotion(i)}>{item.type === 'video' ? <video controls preload="metadata" src={asset(item.src)} aria-label={item.title} /> : <button className="photo-button" onClick={() => setSelected(item)} aria-label={'Ampliar foto: ' + item.title}><img loading="lazy" src={asset(item.src)} alt={item.title} /><span>Ver foto <span aria-hidden="true">↗</span></span></button>}</motion.div><motion.div className="memory-copy" {...textMotion}><motion.time {...wordMotion}>{item.date}</motion.time><motion.h3 {...wordMotion}>{item.title}</motion.h3><motion.p {...wordMotion}>{item.description}</motion.p></motion.div></motion.article>)}</div><div className="finale">Y todos los que vienen <em>contigo.</em></div></section>
      <section id="songs" className="music"><div className="wrap"><div className="section-heading"><h2>Canciones que nos recuerdan <em>a nosotros.</em></h2><p>Y muchas más canciones que son de nosotros.</p></div><div className="tracks">{tracks.map((track, i) => <iframe key={track} title={'Canción ' + (i + 1) + ' para nosotros en Spotify'} src={'https://open.spotify.com/embed/track/' + track + '?utm_source=generator'} width="100%" height="152" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" />)}</div></div></section>
      <section id="letter" className="letter wrap">
        <div className="letter-inner">
          <div className="letter-copy">
            <h2>Carta a <em>Puchi.</em></h2>
            <p>Bueno amor, espero que te guste mucho este regalito para ti, lo hice con mucho esfuerzo. Te adoro con todo mi corazón, eres el amor de mi vida. Ya quiero que podamos tener nuestra propia casa y poder dormir juntos y despertar junto. Gracias por ser mi apoyo incondicional, siempre voy a estar para ti. Tú eres mi vida &lt;3</p>
          </div>
          <img className="letter-photo" src={asset('resources/timeline/foto-final.jpg')} alt="Un recuerdo juntos" loading="lazy" />
        </div>
      </section>
    </main><footer className="wrap"><span>Nuestra historia.</span><span>Siempre juntos ♥</span></footer>
    <dialog ref={dialog} className="lightbox" onClose={() => setSelected(null)} onClick={(event) => { if (event.target === dialog.current) dialog.current.close(); }}><button className="close" onClick={() => dialog.current.close()} aria-label="Cerrar foto">×</button>{selected && <img src={asset(selected.src)} alt={selected.title} />}</dialog>
  </>;
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>);
