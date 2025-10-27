import React, { useEffect } from 'react';
import './index.css';
import { Button } from './reactbits/components/Button';
import { Card } from './reactbits/components/Card';
import { Modal } from './reactbits/components/Modal';
import { Tabs } from './reactbits/components/Tabs';
import { Accordion } from './reactbits/components/Accordion';
import { BlurText } from './reactbits/components/BlurText';
import { SplitText } from './reactbits/components/SplitText';
import { Typewriter } from './reactbits/components/Typewriter';
import { FallingText } from './reactbits/components/FallingText';
import { FallingTextPhysics } from './reactbits/components/FallingTextPhysics';
import ElectricBorder from './reactbits/effects/ElectricBorder';
import LogoLoop from './reactbits/effects/LogoLoop';
import TargetCursor from './reactbits/effects/TargetCursor';
import Particles from './reactbits/effects/Particles';
// TextFX collection
import {
  TypingText,
  SplittingText,
  WritingText,
  RotatingText,
  RollingText,
  CountUp,
  SlideNumber,
  HighlightText,
  GradientText,
  ShimmerText,
  ColorfulText,
  TextGenerate,
  FlipWords,
  HoverText,
  ContainerFlip,
  RevealText,
  LineShadowText,
  ProximityText,
  ScrollVelocityText,
  GlitchText,
  CircularText,
  PressureText,
  CurvedLoopText,
  FuzzyText,
  TextTrail,
  CursorText,
  DecryptedText,
  TrueFocusText,
  ScrambledText,
} from './reactbits/textfx';
import TextFXPlayground from './reactbits/textfx/Playground';
import useToggle from './reactbits/hooks/useToggle';
import useLocalStorage from './reactbits/hooks/useLocalStorage';
import useDebounce from './reactbits/hooks/useDebounce';
import useCopyToClipboard from './reactbits/hooks/useCopyToClipboard';

function App() {
  const theme = useTheme();

  const nameToggle = useToggle(false);
  const modal = useToggle(false);
  const [search, setSearch] = React.useState('');
  const debounced = useDebounce(search, 500);
  const [copied, copy] = useCopyToClipboard();
  const blurToggle = useToggle(false);
  const [blurAmt, setBlurAmt] = React.useState(8);
  const [splitRun, setSplitRun] = React.useState(0);
  // Typewriter controls
  const [tyMode, setTyMode] = React.useState('type-once'); // 'type-once' | 'loop-words' | 'type-delete-loop'
  const [tyText, setTyText] = React.useState('Reactbits Cursor Animation');
  const [tySpeed, setTySpeed] = React.useState(80);
  const [tyDelSpeed, setTyDelSpeed] = React.useState(40);
  const [tyPause, setTyPause] = React.useState(1000);
  const [tyCursor, setTyCursor] = React.useState('bar'); // 'bar' | 'block'
  const [tyBlink, setTyBlink] = React.useState(true);
  const [tyRun, setTyRun] = React.useState(0);

  // Falling text controls
  const [fallText, setFallText] = React.useState('Falling Text Animation');
  const [fallDuration, setFallDuration] = React.useState(700);
  const [fallDistance, setFallDistance] = React.useState(24);
  const [fallStagger, setFallStagger] = React.useState(40);
  const [fallRandom, setFallRandom] = React.useState(20);
  const [fallRotate, setFallRotate] = React.useState(true);
  const [fallRun, setFallRun] = React.useState(0);

  // Physics falling text controls
  const [pText, setPText] = React.useState('Physics Falling Text Demo');
  const [pTrigger, setPTrigger] = React.useState('auto');
  const [pGravity, setPGravity] = React.useState(1);
  const [pWire, setPWire] = React.useState(false);
  const [pBg, setPBg] = React.useState('transparent');
  const [pStiff, setPStiff] = React.useState(0.2);
  const [pFont, setPFont] = React.useState('1.2rem');
  const [pHighlights, setPHighlights] = React.useState('React,Demo');
  const [pRun, setPRun] = React.useState(0);

  // Electric Border controls
  const [ebColor, setEbColor] = React.useState('#5227FF');
  const [ebSpeed, setEbSpeed] = React.useState(1);
  const [ebChaos, setEbChaos] = React.useState(1);
  const [ebThick, setEbThick] = React.useState(2);
  const [ebRadius, setEbRadius] = React.useState(14);

  // LogoLoop controls
  const [llSpeed, setLlSpeed] = React.useState(120);
  const [llDir, setLlDir] = React.useState('left');
  const [llFade, setLlFade] = React.useState(true);
  const [llScale, setLlScale] = React.useState(true);
  const logos = [
    { node: <span style={{ fontWeight: 800 }}>S</span>, title: 'Stripe' },
    { node: <span style={{ fontWeight: 800 }}>R</span>, title: 'React' },
    { node: <span style={{ fontWeight: 700 }}>N</span>, title: 'Next.js' },
    { node: <span style={{ fontWeight: 700 }}>TS</span>, title: 'TypeScript' },
    { node: <span style={{ fontWeight: 600 }}>TW</span>, title: 'Tailwind' },
    { node: <span style={{ fontWeight: 600 }}>VC</span>, title: 'Vercel' },
    { node: <span style={{ fontWeight: 600 }}>D</span>, title: 'Docker' },
    { node: <span style={{ fontWeight: 600 }}>P</span>, title: 'Prisma' },
    { node: <span style={{ fontWeight: 600 }}>V</span>, title: 'Vite' },
  ];

  

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme.value);
  }, [theme.value]);

  return (
    <div className="container">
      <Particles particleCount={240} particleSpread={9} speed={0.12} particleColors={["#8ab4ff","#a78bfa","#ffffff"]} alphaParticles particleBaseSize={85} sizeRandomness={0.8} cameraDistance={22} />
      <header className="header">
        <h1>ReactBits by Azzam</h1>
        <p>Kumpulan komponen dan hooks reusable untuk React.</p>
        <div className="row gap-sm">
          <Button onClick={theme.toggle}>
            Toggle Tema: {theme.value === 'dark' ? 'Dark' : 'Light'}
          </Button>
          <Button variant="secondary" onClick={() => copy('https://github.com/')}> 
            {copied ? 'Tersalin!' : 'Copy contoh URL'}
          </Button>
        </div>
      </header>

      <section className="section">
        <h2>Buttons</h2>
        <div className="row">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
          <Button disabled>Disabled</Button>
        </div>
      </section>

      <section className="section">
        <h2>Card</h2>
        <div className="grid">
          <Card title="Profil Singkat" footer={<small>Footer card</small>}>
            <p>Contoh komponen kartu sederhana yang bisa di-reuse.</p>
          </Card>
          <Card title="Interaksi">
            <p>Gunakan hooks kecil untuk kelola state.</p>
            <div className="row gap-sm">
              <Button onClick={nameToggle.toggle}>
                {nameToggle.on ? 'Sembunyikan' : 'Tampilkan'} Nama
              </Button>
            </div>
            {nameToggle.on && <p><strong>Halo, Reactbits!</strong></p>}
          </Card>
        </div>
      </section>

      <section className="section">
        <h2>Modal</h2>
        <div className="row gap-sm">
          <Button onClick={modal.setTrue}>Buka Modal</Button>
        </div>
        <Modal open={modal.on} onClose={modal.setFalse} title="Contoh Modal">
          <p>Ini modal sederhana tanpa dependency eksternal.</p>
          <div className="row gap-sm">
            <Button onClick={modal.setFalse}>Tutup</Button>
          </div>
        </Modal>
      </section>

      <section className="section">
        <h2>Tabs</h2>
        <Tabs
          tabs={[
            { id: 't1', label: 'Overview', content: <p>Ringkasan singkat reactbits.</p> },
            { id: 't2', label: 'Components', content: <p>Kumpulan komponen: Button, Card, Modal, Tabs, Accordion.</p> },
            { id: 't3', label: 'Hooks', content: <p>Hooks kecil: useToggle, useLocalStorage, useDebounce, useCopyToClipboard.</p> },
          ]}
        />
      </section>

      <section className="section">
        <h2>Accordion</h2>
        <Accordion
          items={[
            { id: 'a1', title: 'Apa itu Reactbits?', content: 'Kumpulan potongan kecil (bits) komponen dan hooks yang reusable.' },
            { id: 'a2', title: 'Perlu library eksternal?', content: 'Tidak, semua contoh ini murni React + CSS.' },
            { id: 'a3', title: 'Bisa dikembangkan?', content: 'Tentu. Tambahkan variasi, aksesibilitas, dan test sesuai kebutuhan.' },
          ]}
        />
      </section>

      <section className="section">
        <h2>useDebounce</h2>
        <div className="col gap-sm" style={{ maxWidth: 480 }}>
          <input
            className="rb-input"
            placeholder="Ketik sesuatu... (debounce 500ms)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <small>Value: {search}</small>
          <small>Debounced: {debounced}</small>
        </div>
      </section>

      <section className="section">
        <h2>Blur Text</h2>
        <div className="grid">
          <Card title="Toggle Reveal" footer={<small>Kendalikan dengan state</small>}>
            <p>
              <strong>Nomor kartu:</strong>{' '}
              <BlurText revealed={blurToggle.on}>4111 1111 1111 1111</BlurText>
            </p>
            <div className="row gap-sm">
              <Button onClick={blurToggle.toggle}>
                {blurToggle.on ? 'Sembunyikan' : 'Tampilkan'}
              </Button>
              <Button variant="secondary" onClick={blurToggle.setFalse}>Blur</Button>
              <Button variant="ghost" onClick={blurToggle.setTrue}>Reveal</Button>
            </div>
          </Card>

          <Card title="Hover Reveal" footer={<small>Arahkan kursor untuk melihat</small>}>
            <p>
              <strong>Email:</strong>{' '}
              <BlurText revealOnHover>user@example.com</BlurText>
            </p>
          </Card>

          <Card title="Custom Intensitas">
            <div className="col gap-sm">
              <label>
                Blur: <strong>{blurAmt}px</strong>
              </label>
              <input
                type="range"
                min="0"
                max="16"
                step="1"
                value={blurAmt}
                onChange={(e) => setBlurAmt(Number(e.target.value))}
              />
              <p>
                <strong>Password:</strong>{' '}
                <BlurText blur={blurAmt}>super-secret-password</BlurText>
              </p>
            </div>
          </Card>
        </div>
      </section>

      <section className="section">
        <div className="rb-titlebar">
          <h2 style={{ margin: 0 }}>Text Split Animation</h2>
          <Button variant="secondary" onClick={() => setSplitRun((n) => n + 1)}>Replay Animasi</Button>
        </div>
        <div className="grid">
          <Card title="Chars • Fade Up" footer={<small>Stagger 15ms, on view</small>}>
            <SplitText
              key={`chars-${splitRun}`}
              as="h3"
              text="Reactbits SplitText Animation"
              by="chars"
              variant="fade-up"
              stagger={15}
              delay={0}
              duration={700}
              onView
            />
          </Card>

          <Card title="Words • Fade In" footer={<small>Stagger 60ms</small>}>
            <SplitText
              key={`words-${splitRun}`}
              as="p"
              text="Animasi teks per kata dengan efek fade-in dan jeda bertahap."
              by="words"
              variant="fade-in"
              stagger={60}
              delay={100}
              duration={600}
            />
          </Card>

          <Card title="Custom Timing" footer={<small>Delay 300ms, durasi 1s</small>}>
            <SplitText
              key={`custom-${splitRun}`}
              as="h4"
              text="Timing dapat diatur sesuai kebutuhan proyek."
              by="chars"
              variant="fade-up"
              stagger={25}
              delay={300}
              duration={1000}
            />
          </Card>
        </div>
      </section>

      <section className="section">
        <div className="rb-titlebar">
          <h2 style={{ margin: 0 }}>Text Cursor Animation</h2>
          <Button variant="secondary" onClick={() => setTyRun((n) => n + 1)}>Replay</Button>
        </div>
        <div className="grid">
          <Card title="Preview" footer={<small>Cursor: {tyCursor}, Blink: {tyBlink ? 'On' : 'Off'}</small>}>
            <div className="rb-typebox">
              <div className="rb-typebox__preview">
                <Typewriter
                  key={`ty-${tyRun}-${tyMode}`}
                  words={tyMode === 'loop-words' ? tyText.split(',').map(s => s.trim()).filter(Boolean) : [tyText]}
                  loop={tyMode !== 'type-once'}
                  typingSpeed={tySpeed}
                  deleteSpeed={tyDelSpeed}
                  pauseBetween={tyPause}
                  cursor={tyCursor}
                  blink={tyBlink}
                />
              </div>
            </div>
          </Card>

          <Card title="Controls">
            <div className="col gap-sm">
              <label>
                Mode
                <select className="rb-input" value={tyMode} onChange={(e) => setTyMode(e.target.value)}>
                  <option value="type-once">Type Once</option>
                  <option value="type-delete-loop">Type + Delete Loop</option>
                  <option value="loop-words">Loop Words (pisahkan dengan koma)</option>
                </select>
              </label>

              <label>
                {tyMode === 'loop-words' ? 'Words (pisahkan dengan koma)' : 'Text'}
                <input className="rb-input" value={tyText} onChange={(e) => setTyText(e.target.value)} />
              </label>

              <label>
                Typing Speed: <strong>{tySpeed}ms</strong>
                <input type="range" min="20" max="200" step="5" value={tySpeed} onChange={(e) => setTySpeed(Number(e.target.value))} />
              </label>

              <label>
                Delete Speed: <strong>{tyDelSpeed}ms</strong>
                <input type="range" min="20" max="200" step="5" value={tyDelSpeed} onChange={(e) => setTyDelSpeed(Number(e.target.value))} />
              </label>

              <label>
                Pause Between: <strong>{tyPause}ms</strong>
                <input type="range" min="200" max="2000" step="50" value={tyPause} onChange={(e) => setTyPause(Number(e.target.value))} />
              </label>

              <div className="row gap-sm">
                <label>
                  Cursor Style
                  <select className="rb-input" value={tyCursor} onChange={(e) => setTyCursor(e.target.value)}>
                    <option value="bar">Bar</option>
                    <option value="block">Block</option>
                  </select>
                </label>

                <Button variant="secondary" onClick={() => setTyBlink((v) => !v)}>
                  Blink: {tyBlink ? 'On' : 'Off'}
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section className="section">
        <div className="rb-titlebar">
          <h2 style={{ margin: 0 }}>Falling Text</h2>
          <Button variant="secondary" onClick={() => setFallRun((n) => n + 1)}>Replay</Button>
        </div>
        <div className="grid">
          <Card title="Preview" footer={<small>Stagger {fallStagger}ms • Distance {fallDistance}px</small>}>
            <div className="rb-typebox">
              <div className="rb-typebox__preview">
                <FallingText
                  key={`fall-${fallRun}-${fallText}`}
                  text={fallText}
                  duration={fallDuration}
                  distance={fallDistance}
                  stagger={fallStagger}
                  randomness={fallRandom}
                  rotate={fallRotate}
                />
              </div>
            </div>
          </Card>

          <Card title="Controls">
            <div className="col gap-sm">
              <label>
                Text
                <input className="rb-input" value={fallText} onChange={(e) => setFallText(e.target.value)} />
              </label>

              <label>
                Duration: <strong>{fallDuration}ms</strong>
                <input type="range" min="200" max="1500" step="25" value={fallDuration} onChange={(e) => setFallDuration(Number(e.target.value))} />
              </label>

              <label>
                Distance: <strong>{fallDistance}px</strong>
                <input type="range" min="0" max="100" step="2" value={fallDistance} onChange={(e) => setFallDistance(Number(e.target.value))} />
              </label>

              <label>
                Stagger: <strong>{fallStagger}ms</strong>
                <input type="range" min="0" max="200" step="5" value={fallStagger} onChange={(e) => setFallStagger(Number(e.target.value))} />
              </label>

              <label>
                Randomness: <strong>{fallRandom}ms</strong>
                <input type="range" min="0" max="120" step="5" value={fallRandom} onChange={(e) => setFallRandom(Number(e.target.value))} />
              </label>

              <div className="row gap-sm">
                <Button variant="secondary" onClick={() => setFallRotate((v) => !v)}>
                  Rotate: {fallRotate ? 'On' : 'Off'}
                </Button>
                <Button onClick={() => setFallRun((n) => n + 1)}>Replay</Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section className="section">
        <div className="rb-titlebar">
          <h2 style={{ margin: 0 }}>Physics Falling Text</h2>
          <Button variant="secondary" onClick={() => setPRun((n) => n + 1)}>Replay</Button>
        </div>
        <div className="grid">
          <Card title="Preview" footer={<small>Trigger: {pTrigger} • Gravity {pGravity}</small>}>
            <div className="rb-typebox" style={{ background: pBg === 'transparent' ? undefined : pBg }}>
              <div className="rb-typebox__preview">
                <FallingTextPhysics
                  key={`pfall-${pRun}-${pText}-${pTrigger}`}
                  text={pText}
                  highlightWords={pHighlights.split(',').map(s => s.trim()).filter(Boolean)}
                  trigger={pTrigger}
                  backgroundColor={pBg}
                  wireframes={pWire}
                  gravity={pGravity}
                  mouseConstraintStiffness={pStiff}
                  fontSize={pFont}
                />
              </div>
            </div>
          </Card>

          <Card title="Controls">
            <div className="col gap-sm">
              <label>
                Text
                <input className="rb-input" value={pText} onChange={(e) => setPText(e.target.value)} />
              </label>

              <div className="row gap-sm">
                <label>
                  Trigger
                  <select className="rb-input" value={pTrigger} onChange={(e) => setPTrigger(e.target.value)}>
                    <option value="auto">Auto</option>
                    <option value="scroll">Scroll</option>
                    <option value="click">Click</option>
                    <option value="hover">Hover</option>
                  </select>
                </label>
                <label>
                  Highlight (comma)
                  <input className="rb-input" value={pHighlights} onChange={(e) => setPHighlights(e.target.value)} />
                </label>
              </div>

              <label>
                Gravity: <strong>{pGravity.toFixed(2)}</strong>
                <input type="range" min="-1" max="3" step="0.05" value={pGravity} onChange={(e) => setPGravity(Number(e.target.value))} />
              </label>

              <label>
                Mouse Stiffness: <strong>{pStiff.toFixed(2)}</strong>
                <input type="range" min="0" max="1" step="0.05" value={pStiff} onChange={(e) => setPStiff(Number(e.target.value))} />
              </label>

              <div className="row gap-sm">
                <Button variant="secondary" onClick={() => setPWire((v) => !v)}>
                  Wireframes: {pWire ? 'On' : 'Off'}
                </Button>
                <label>
                  Background
                  <select className="rb-input" value={pBg} onChange={(e) => setPBg(e.target.value)}>
                    <option value="transparent">Transparent</option>
                    <option value="#0b0c0f">Dark</option>
                    <option value="#ffffff">White</option>
                    <option value="#111827">Slate</option>
                    <option value="#1f2937">Gray</option>
                  </select>
                </label>
                <label>
                  Font Size
                  <select className="rb-input" value={pFont} onChange={(e) => setPFont(e.target.value)}>
                    <option value="1rem">1rem</option>
                    <option value="1.2rem">1.2rem</option>
                    <option value="1.5rem">1.5rem</option>
                    <option value="2rem">2rem</option>
                  </select>
                </label>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section className="section">
        <div className="rb-titlebar">
          <h2 style={{ margin: 0 }}>TextFX Playground</h2>
        </div>
        <TextFXPlayground />
      </section>

      <section className="section">
        <div className="rb-titlebar">
          <h2 style={{ margin: 0 }}>Electric Border Card</h2>
        </div>
        <div className="grid">
          <Card title="Preview" footer={<small>Chaos {ebChaos.toFixed(2)} • Speed {ebSpeed.toFixed(2)}</small>}>
            <ElectricBorder color={ebColor} speed={ebSpeed} chaos={ebChaos} thickness={ebThick} style={{ borderRadius: ebRadius }}>
              <h3 style={{ marginTop: 0 }}>Energi di Tepi</h3>
              <p>Contoh kartu dengan efek border elektrik (SVG turbulence + displacement).</p>
              <div className="row gap-sm">
                <Button>Action</Button>
                <Button variant="secondary">Secondary</Button>
              </div>
            </ElectricBorder>
          </Card>
          <Card title="Controls">
            <div className="col gap-sm">
              <label>
                Color
                <input className="rb-input" type="color" value={ebColor} onChange={(e)=>setEbColor(e.target.value)} />
              </label>
              <label>
                Speed: <strong>{ebSpeed.toFixed(2)}x</strong>
                <input type="range" min="0.2" max="3" step="0.05" value={ebSpeed} onChange={(e)=>setEbSpeed(Number(e.target.value))} />
              </label>
              <label>
                Chaos: <strong>{ebChaos.toFixed(2)}x</strong>
                <input type="range" min="0" max="3" step="0.05" value={ebChaos} onChange={(e)=>setEbChaos(Number(e.target.value))} />
              </label>
              <label>
                Thickness: <strong>{ebThick}px</strong>
                <input type="range" min="1" max="8" step="1" value={ebThick} onChange={(e)=>setEbThick(Number(e.target.value))} />
              </label>
              <label>
                Radius: <strong>{ebRadius}px</strong>
                <input type="range" min="0" max="28" step="1" value={ebRadius} onChange={(e)=>setEbRadius(Number(e.target.value))} />
              </label>
            </div>
          </Card>
        </div>
      </section>

      <section className="section">
        <div className="rb-titlebar">
          <h2 style={{ margin: 0 }}>Logo Loop</h2>
        </div>
        <div className="grid">
          <Card title="Preview" footer={<small>Hover to pause | Speed {llSpeed}</small>}>
            <div className="rb-typebox">
              <div className="rb-typebox__preview" style={{ padding: '12px 0' }}>
                <LogoLoop
                  logos={logos}
                  speed={llSpeed}
                  direction={llDir}
                  logoHeight={32}
                  gap={48}
                  pauseOnHover
                  fadeOut={llFade}
                  fadeOutColor={'var(--bg)'}
                  scaleOnHover={llScale}
                  ariaLabel="Tech logos"
                />
              </div>
            </div>
          </Card>
          <Card title="Controls">
            <div className="col gap-sm">
              <label>
                Speed: <strong>{llSpeed}</strong>
                <input type="range" min="20" max="300" step="5" value={llSpeed} onChange={(e)=>setLlSpeed(Number(e.target.value))} />
              </label>
              <div className="row gap-sm">
                <label>
                  Direction
                  <select className="rb-input" value={llDir} onChange={(e)=>setLlDir(e.target.value)}>
                    <option value="left">Left</option>
                    <option value="right">Right</option>
                  </select>
                </label>
                <Button variant="secondary" onClick={()=>setLlFade(v=>!v)}>Fade Edges: {llFade?'On':'Off'}</Button>
                <Button variant="secondary" onClick={()=>setLlScale(v=>!v)}>Scale On Hover: {llScale?'On':'Off'}</Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section className="section">
        <div className="rb-titlebar">
          <h2 style={{ margin: 0 }}>Target Cursor</h2>
        </div>
        <div className="grid">
          <Card title="Preview">
            <div className="rb-typebox">
              <div className="rb-typebox__preview" style={{ padding: '24px 0', display: 'grid', gap: '12px' }}>
                <div className="row gap-sm">
                  <Button className="cursor-target">Primary</Button>
                  <Button className="cursor-target" variant="secondary">Secondary</Button>
                  <Button className="cursor-target" variant="ghost">Ghost</Button>
                  <Button className="cursor-target" variant="danger">Danger</Button>
                </div>
                <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
                  <ElectricBorder color="#22d3ee" speed={1.4} chaos={1.2} thickness={2}>
                    <h4 className="cursor-target" style={{ marginTop: 0 }}>Electric CTA</h4>
                    <p className="cursor-target">Arahkan cursor ke elemen dengan class <code>cursor-target</code>.</p>
                    <div className="row gap-sm">
                      <Button className="cursor-target">Get Started</Button>
                      <Button className="cursor-target" variant="secondary">Docs</Button>
                    </div>
                  </ElectricBorder>
                </div>
              </div>
            </div>
          </Card>
          <Card title="How it works">
            <div className="col gap-sm">
              <small>- Custom cursor berputar (GSAP) dan mengikuti pointer.</small>
              <small>- Saat hover elemen bertarget, sudut-sudut cursor bergerak ke keempat sudut elemen, membentuk reticle.</small>
              <small>- Tambahkan class <code>cursor-target</code> ke elemen yang ingin ditarget.</small>
            </div>
          </Card>
        </div>
        {/* Cursor overlay (di akhir agar berada di atas konten) */}
        <TargetCursor targetSelector=".cursor-target" spinDuration={2} hideDefaultCursor />
      </section>

      

      <footer className="footer">
        <small>Contoh implementasi Reactbits. Dibuat sederhana tanpa package tambahan.</small>
      </footer>
    </div>
  );
}

function useTheme() {
  const [value, setValue] = useLocalStorage('theme', 'light');
  const toggle = () => setValue((v) => (v === 'light' ? 'dark' : 'light'));
  return { value, setValue, toggle };
}

export default App;








