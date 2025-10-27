import React from 'react';
import { Card } from '../../reactbits/components/Card';
import { Button } from '../../reactbits/components/Button';
import { Tabs } from '../../reactbits/components/Tabs';

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
} from './index';

function Field({ label, children }) {
  return (
    <label style={{ display: 'grid', gap: 6 }}>
      <span>{label}</span>
      {children}
    </label>
  );
}

export default function TextFXPlayground() {
  const effects = React.useMemo(() => ([
    { id: 'typing', label: 'Typing Text' },
    { id: 'writing', label: 'Writing Text' },
    { id: 'rotating', label: 'Rotating Text' },
    { id: 'rolling', label: 'Rolling Text' },
    { id: 'count', label: 'Counting Number' },
    { id: 'slidenum', label: 'Sliding Number' },
    { id: 'split', label: 'Splitting Text' },
    { id: 'highlight', label: 'Highlight Text' },
    { id: 'gradient', label: 'Gradient Text' },
    { id: 'shimmer', label: 'Shimmering Text' },
    { id: 'colorful', label: 'Colourful Text' },
    { id: 'generate', label: 'Text Generate Effect' },
    { id: 'flip', label: 'Flip Words' },
    { id: 'hover', label: 'Text Hover Effect' },
    { id: 'cflip', label: 'Container Text Flip' },
    { id: 'reveal', label: 'Text Reveal' },
    { id: 'lineshadow', label: 'Line Shadow Text' },
    { id: 'proximity', label: 'Variable Proximity Text' },
    { id: 'scrollvel', label: 'Scroll Velocity Text' },
    { id: 'glitch', label: 'Glitch Text' },
    { id: 'circular', label: 'Circular Text' },
    { id: 'pressure', label: 'Text Pressure Effect' },
    { id: 'curved', label: 'Curved Loop Text' },
    { id: 'fuzzy', label: 'Fuzzy Text' },
    { id: 'trail', label: 'Text Trail Effect' },
    { id: 'cursor', label: 'Text Cursor' },
    { id: 'decrypt', label: 'Decrypted Text Effect' },
    { id: 'focus', label: 'True Focus Effect' },
    { id: 'scrambled', label: 'Scrambled Text' },
  ]), []);

  const [active, setActive] = React.useState(effects[0].id);

  const tabs = effects.map((e) => ({ id: e.id, label: e.label, content: null }));

  const [run, setRun] = React.useState(0);

  // States for all effects
  const [text, setText] = React.useState('Reactbits TextFX');
  const [words, setWords] = React.useState('Reactbits, Text, Effects');
  const [duration, setDuration] = React.useState(800);
  const [interval, setIntervalMs] = React.useState(1500);
  const [cursor, setCursor] = React.useState('bar');
  const [blink, setBlink] = React.useState(true);
  const [typingSpeed, setTypingSpeed] = React.useState(80);
  const [deleteSpeed, setDeleteSpeed] = React.useState(40);
  const [pauseBetween, setPauseBetween] = React.useState(1000);
  const [loop, setLoop] = React.useState(true);
  const [by, setBy] = React.useState('chars');
  const [variant, setVariant] = React.useState('fade-up');
  const [stagger, setStagger] = React.useState(30);
  const [delay, setDelay] = React.useState(0);
  const [fromNum, setFromNum] = React.useState(0);
  const [toNum, setToNum] = React.useState(1234);
  const [decimals, setDecimals] = React.useState(0);
  const [color, setColor] = React.useState('#fde68a');
  const [gradFrom, setGradFrom] = React.useState('#60a5fa');
  const [gradTo, setGradTo] = React.useState('#a78bfa');
  const [animate, setAnimate] = React.useState(true);
  const [radius, setRadius] = React.useState(60);
  const [proxR, setProxR] = React.useState(160);
  const [dir, setDir] = React.useState('x');
  const [speed, setSpeed] = React.useState(30);
  const [step, setStep] = React.useState(2);
  

  const wordsArr = React.useMemo(() => words.split(',').map(s => s.trim()).filter(Boolean), [words]);

  const title = effects.find((e) => e.id === active)?.label || 'TextFX';

    const renderPreview = () => {
    const key = `${active}-${run}`;
    switch (active) {
      case 'typing':
        return (
          <TypingText
            key={key}
            words={[text]}
            loop={loop}
            typingSpeed={typingSpeed}
            deleteSpeed={deleteSpeed}
            pauseBetween={pauseBetween}
            cursor={cursor}
            blink={blink}
          />
        );
      case 'writing':
        return <WritingText key={key} text={text} duration={duration} />;
      case 'rotating':
        return <RotatingText key={key} words={wordsArr.length ? wordsArr : [text]} interval={interval} />;
      case 'rolling':
        return <RollingText key={key} text={text} duration={duration} />;
      case 'count':
        return <CountUp key={key} from={fromNum} to={toNum} duration={duration} decimals={decimals} />;
      case 'slidenum':
        return <SlideNumber key={key} value={toNum} />;
      case 'split':
        return (
          <SplittingText
            key={key}
            text={text}
            by={by}
            variant={variant}
            stagger={stagger}
            delay={delay}
            duration={duration}
          />
        );
      case 'highlight':
        return <HighlightText key={key} text={text} color={color} />;
      case 'gradient':
        return <GradientText key={key} text={text} from={gradFrom} to={gradTo} animate />;
      case 'shimmer':
        return <ShimmerText key={key} text={text} />;
      case 'colorful':
        return <ColorfulText key={key} text={text} />;
      case 'generate':
        return <TextGenerate key={key} text={text} speed={speed} />;
      case 'flip':
        return <FlipWords key={key} words={wordsArr.length ? wordsArr : [text]} interval={interval} />;
      case 'hover':
        return <HoverText key={key} text={text} />;
      case 'cflip':
        return <ContainerFlip key={key} front={text} back={wordsArr[0] || 'Back'} />;
      case 'reveal':
        return <RevealText key={key} text={text} direction={dir} />;
      case 'lineshadow':
        return <LineShadowText key={key} text={text} />;
      case 'proximity':
        return <ProximityText key={key} text={text} radius={proxR} />;
      case 'scrollvel':
        return <ScrollVelocityText key={key} text={text} />;
      case 'glitch':
        return <GlitchText key={key} text={text} />;
      case 'circular':
        return <CircularText key={key} text={text} radius={radius} animate={animate} />;
      case 'pressure':
        return <PressureText key={key} text={text} />;
      case 'curved':
        return <CurvedLoopText key={key} text={text} radius={radius} />;
      case 'fuzzy':
        return <FuzzyText key={key} text={text} />;
      case 'trail':
        return <TextTrail key={key} text={text} />;
      case 'cursor':
        return <CursorText key={key} text={text} cursor={cursor} blink={blink} typingSpeed={typingSpeed} />;
      case 'decrypt':
        return <DecryptedText key={key} text={text} speed={speed} step={step} />;
      case 'focus':
        return <TrueFocusText key={key} text={text} />;
      case 'scrambled':
        return <ScrambledText key={key} text={text} speed={speed} />;
      default:
        return null;
    }
  };
  const renderControls = () => {
    switch (active) {
      case 'typing':
        return (
          <div className="col gap-sm">
            <Field label="Text"><input className="rb-input" value={text} onChange={(e)=>setText(e.target.value)} /></Field>
            <div className="row gap-sm">
              <Field label="Cursor"><select className="rb-input" value={cursor} onChange={(e)=>setCursor(e.target.value)}><option value="bar">Bar</option><option value="block">Block</option></select></Field>
              <Button variant="secondary" onClick={()=>setBlink(v=>!v)}>Blink: {blink ? 'On' : 'Off'}</Button>
              <Button variant="secondary" onClick={()=>setLoop(v=>!v)}>Loop: {loop ? 'On' : 'Off'}</Button>
            </div>
            <Field label={`Typing Speed: ${typingSpeed}ms`}><input type="range" min="20" max="200" step="5" value={typingSpeed} onChange={(e)=>setTypingSpeed(Number(e.target.value))} /></Field>
            <Field label={`Delete Speed: ${deleteSpeed}ms`}><input type="range" min="20" max="200" step="5" value={deleteSpeed} onChange={(e)=>setDeleteSpeed(Number(e.target.value))} /></Field>
            <Field label={`Pause Between: ${pauseBetween}ms`}><input type="range" min="100" max="2000" step="50" value={pauseBetween} onChange={(e)=>setPauseBetween(Number(e.target.value))} /></Field>
          </div>
        );
      case 'writing':
      case 'rolling':
        return (
          <div className="col gap-sm">
            <Field label="Text"><input className="rb-input" value={text} onChange={(e)=>setText(e.target.value)} /></Field>
            <Field label={`Duration: ${duration}ms`}><input type="range" min="200" max="3000" step="50" value={duration} onChange={(e)=>setDuration(Number(e.target.value))} /></Field>
          </div>
        );
      case 'rotating':
        return (
          <div className="col gap-sm">
            <Field label="Words (comma)"><input className="rb-input" value={words} onChange={(e)=>setWords(e.target.value)} /></Field>
            <Field label={`Interval: ${interval}ms`}><input type="range" min="400" max="4000" step="50" value={interval} onChange={(e)=>setIntervalMs(Number(e.target.value))} /></Field>
          </div>
        );
      case 'count':
        return (
          <div className="col gap-sm">
            <div className="row gap-sm">
              <Field label="From"><input className="rb-input" type="number" value={fromNum} onChange={(e)=>setFromNum(Number(e.target.value))} /></Field>
              <Field label="To"><input className="rb-input" type="number" value={toNum} onChange={(e)=>setToNum(Number(e.target.value))} /></Field>
              <Field label="Decimals"><input className="rb-input" type="number" value={decimals} onChange={(e)=>setDecimals(Number(e.target.value))} /></Field>
            </div>
            <Field label={`Duration: ${duration}ms`}><input type="range" min="200" max="4000" step="50" value={duration} onChange={(e)=>setDuration(Number(e.target.value))} /></Field>
          </div>
        );
      case 'slidenum':
        return (
          <div className="col gap-sm">
            <Field label="Value"><input className="rb-input" type="number" value={toNum} onChange={(e)=>setToNum(Number(e.target.value))} /></Field>
          </div>
        );
      case 'split':
        return (
          <div className="col gap-sm">
            <Field label="Text"><input className="rb-input" value={text} onChange={(e)=>setText(e.target.value)} /></Field>
            <div className="row gap-sm">
              <Field label="By"><select className="rb-input" value={by} onChange={(e)=>setBy(e.target.value)}><option value="chars">Chars</option><option value="words">Words</option></select></Field>
              <Field label="Variant"><select className="rb-input" value={variant} onChange={(e)=>setVariant(e.target.value)}><option value="fade-up">Fade Up</option><option value="fade-in">Fade In</option></select></Field>
            </div>
            <Field label={`Stagger: ${stagger}ms`}><input type="range" min="0" max="200" step="5" value={stagger} onChange={(e)=>setStagger(Number(e.target.value))} /></Field>
            <Field label={`Delay: ${delay}ms`}><input type="range" min="0" max="1000" step="25" value={delay} onChange={(e)=>setDelay(Number(e.target.value))} /></Field>
            <Field label={`Duration: ${duration}ms`}><input type="range" min="200" max="2000" step="25" value={duration} onChange={(e)=>setDuration(Number(e.target.value))} /></Field>
          </div>
        );
      case 'highlight':
        return (
          <div className="col gap-sm">
            <Field label="Text"><input className="rb-input" value={text} onChange={(e)=>setText(e.target.value)} /></Field>
            <Field label="Color"><input className="rb-input" type="color" value={color} onChange={(e)=>setColor(e.target.value)} /></Field>
          </div>
        );
      case 'gradient':
        return (
          <div className="col gap-sm">
            <Field label="Text"><input className="rb-input" value={text} onChange={(e)=>setText(e.target.value)} /></Field>
            <div className="row gap-sm">
              <Field label="From"><input className="rb-input" type="color" value={gradFrom} onChange={(e)=>setGradFrom(e.target.value)} /></Field>
              <Field label="To"><input className="rb-input" type="color" value={gradTo} onChange={(e)=>setGradTo(e.target.value)} /></Field>
            </div>
          </div>
        );
      case 'generate':
      case 'decrypt':
      case 'scrambled':
        return (
          <div className="col gap-sm">
            <Field label="Text"><input className="rb-input" value={text} onChange={(e)=>setText(e.target.value)} /></Field>
            <Field label={`Speed: ${speed}ms`}><input type="range" min="10" max="200" step="5" value={speed} onChange={(e)=>setSpeed(Number(e.target.value))} /></Field>
            {active === 'decrypt' && (
              <Field label={`Step: ${step}`}><input type="range" min="1" max="6" step="1" value={step} onChange={(e)=>setStep(Number(e.target.value))} /></Field>
            )}
          </div>
        );
      case 'flip':
        return (
          <div className="col gap-sm">
            <Field label="Words (comma)"><input className="rb-input" value={words} onChange={(e)=>setWords(e.target.value)} /></Field>
            <Field label={`Interval: ${interval}ms`}><input type="range" min="400" max="4000" step="50" value={interval} onChange={(e)=>setIntervalMs(Number(e.target.value))} /></Field>
          </div>
        );
      case 'hover':
      case 'shimmer':
      case 'colorful':
      case 'lineshadow':
      case 'glitch':
      case 'fuzzy':
      case 'trail':
      case 'pressure':
        return (
          <div className="col gap-sm">
            <Field label="Text"><input className="rb-input" value={text} onChange={(e)=>setText(e.target.value)} /></Field>
          </div>
        );
      case 'cflip':
        return (
          <div className="col gap-sm">
            <Field label="Front"><input className="rb-input" value={text} onChange={(e)=>setText(e.target.value)} /></Field>
            <Field label="Back"><input className="rb-input" value={wordsArr[0] || ''} onChange={(e)=>setWords(e.target.value)} /></Field>
          </div>
        );
      case 'reveal':
        return (
          <div className="col gap-sm">
            <Field label="Text"><input className="rb-input" value={text} onChange={(e)=>setText(e.target.value)} /></Field>
            <Field label="Direction"><select className="rb-input" value={dir} onChange={(e)=>setDir(e.target.value)}><option value="x">X</option><option value="y">Y</option></select></Field>
          </div>
        );
      case 'proximity':
        return (
          <div className="col gap-sm">
            <Field label="Text"><input className="rb-input" value={text} onChange={(e)=>setText(e.target.value)} /></Field>
            <Field label={`Radius: ${proxR}px`}><input type="range" min="60" max="300" step="10" value={proxR} onChange={(e)=>setProxR(Number(e.target.value))} /></Field>
          </div>
        );
      case 'scrollvel':
        return (
          <div className="col gap-sm">
            <Field label="Text"><input className="rb-input" value={text} onChange={(e)=>setText(e.target.value)} /></Field>
            <small>Scroll halaman untuk melihat efek.</small>
          </div>
        );
      case 'circular':
        return (
          <div className="col gap-sm">
            <Field label="Text"><input className="rb-input" value={text} onChange={(e)=>setText(e.target.value)} /></Field>
            <Field label={`Radius: ${radius}px`}><input type="range" min="30" max="140" step="5" value={radius} onChange={(e)=>setRadius(Number(e.target.value))} /></Field>
            <Button variant="secondary" onClick={()=>setAnimate((v)=>!v)}>Animate: {animate ? 'On' : 'Off'}</Button>
          </div>
        );
      case 'curved':
        return (
          <div className="col gap-sm">
            <Field label="Text"><input className="rb-input" value={text} onChange={(e)=>setText(e.target.value)} /></Field>
            <Field label={`Radius: ${radius}px`}><input type="range" min="30" max="140" step="5" value={radius} onChange={(e)=>setRadius(Number(e.target.value))} /></Field>
          </div>
        );
      case 'cursor':
        return (
          <div className="col gap-sm">
            <Field label="Text"><input className="rb-input" value={text} onChange={(e)=>setText(e.target.value)} /></Field>
            <div className="row gap-sm">
              <Field label="Cursor"><select className="rb-input" value={cursor} onChange={(e)=>setCursor(e.target.value)}><option value="bar">Bar</option><option value="block">Block</option></select></Field>
              <Button variant="secondary" onClick={()=>setBlink(v=>!v)}>Blink: {blink ? 'On' : 'Off'}</Button>
            </div>
            <Field label={`Typing Speed: ${typingSpeed}ms`}><input type="range" min="20" max="200" step="5" value={typingSpeed} onChange={(e)=>setTypingSpeed(Number(e.target.value))} /></Field>
          </div>
        );
      case 'decrypt':
        return (
          <div className="col gap-sm">
            <Field label="Text"><input className="rb-input" value={text} onChange={(e)=>setText(e.target.value)} /></Field>
            <Field label={`Speed: ${speed}ms`}><input type="range" min="10" max="200" step="5" value={speed} onChange={(e)=>setSpeed(Number(e.target.value))} /></Field>
            <Field label={`Step: ${step}`}><input type="range" min="1" max="6" step="1" value={step} onChange={(e)=>setStep(Number(e.target.value))} /></Field>
          </div>
        );
      case 'focus':
        return (
          <div className="col gap-sm">
            <Field label="Text"><input className="rb-input" value={text} onChange={(e)=>setText(e.target.value)} /></Field>
          </div>
        );
      case 'scrambled':
        return (
          <div className="col gap-sm">
            <Field label="Text"><input className="rb-input" value={text} onChange={(e)=>setText(e.target.value)} /></Field>
            <Field label={`Speed: ${speed}ms`}><input type="range" min="10" max="200" step="5" value={speed} onChange={(e)=>setSpeed(Number(e.target.value))} /></Field>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <Tabs tabs={tabs} onChange={(id)=> setActive(id)} />
      <div className="rb-titlebar">
        <h3 style={{ margin: 0 }}>{title}</h3>
        <Button variant="secondary" onClick={()=> setRun((n)=> n+1)}>Replay</Button>
      </div>
      <div className="grid">
        <Card title="Preview">
          <div className="rb-typebox"><div className="rb-typebox__preview">{renderPreview()}</div></div>
        </Card>
        <Card title="Controls">
          {renderControls()}
        </Card>
      </div>
    </div>
  );
}



















