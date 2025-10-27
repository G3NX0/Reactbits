import React from 'react';
import { Typewriter } from '../../components/Typewriter';

export default function CursorText({ text = 'Text Cursor', ...props }) {
  return <Typewriter words={[text]} {...props} />;
}
