import { useState, useEffect } from 'react';
import { useClearShortcut } from './hooks/useClearShortcut';
import tokenizer from 'gpt-tokenizer';
import githubLogo from './assets/github.svg';

const PASTEL_COLOURS = [
  "rgba(107,64,216,.3)",
  "rgba(104,222,122,.4)",
  "rgba(244,172,54,.4)",
  "rgba(239,65,70,.4)",
  "rgba(39,181,234,.4)",
];

export default function App() {
  const [input, setInput] = useState('');
  const [encodedTokens, setEncodedTokens] = useState<number[]>([]);
  const [decodedTokens, setDecodedTokens] = useState<string[]>([]);

  useClearShortcut(setInput);

  useEffect(() => {
    const handler = setTimeout(() => {
      const tokens = tokenizer.encode(input);
      setEncodedTokens(tokens);
      const decoded: string[] = [];
      for (const token of tokenizer.decodeGenerator(tokens)) {
        decoded.push(token);
      }
      setDecodedTokens(decoded);
    }, 300);

    return () => clearTimeout(handler);
  }, [input]);

  return (
    <div>
      <div className="header">
        <h1 className="title">LLM Token Counter</h1>
        <a href="https://github.com/kenwilde1" target="_blank" rel="noopener noreferrer">
          <img src={githubLogo} alt="GitHub Logo" className="github-logo" />
        </a>
      </div>

      <textarea
        placeholder="Type or paste input here..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button onClick={() => setInput('')}>Clear</button>

      <div className="token-display">
        {decodedTokens.slice(0, 1000).map((token, idx) => (
          <span
            key={idx}
            style={{
              background: PASTEL_COLOURS[idx % PASTEL_COLOURS.length],
              padding: '4px',
              margin: '2px',
              borderBottom: '1px solid #111'
            }}
          >
            {token}
          </span>
        ))}
        {decodedTokens.length > 1000 && (
          <span style={{ opacity: 0.6 }}>... ({decodedTokens.length - 1000} more tokens)</span>
        )}
      </div>

      <p><b>Tokens: {encodedTokens.length}</b></p>
      <p><b>Characters: {input.length}</b></p>
    </div>
  );
}
