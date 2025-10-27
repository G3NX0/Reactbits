import React from 'react';
import CircularText from './CircularText';

export default function CurvedLoopText({ text = 'Curved Loop Text', radius = 70, className = '' }) {
  return <CircularText text={text} radius={radius} animate className={className} />;
}
