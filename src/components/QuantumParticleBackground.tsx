"use client";

import { useEffect, useRef } from 'react';

type CodeToken = {
  x: number;
  y: number;
  homeX: number;
  homeY: number;
  dx: number;
  dy: number;
  text: string;
  size: number;
  alpha: number;
  color: string;
};

type TypingLine = {
  x: number;
  y: number;
  text: string;
  typed: number;
  speed: number;
  life: number;
  maxLife: number;
  size: number;
  drift: number;
  color: string;
};

const MAX_TOKENS = 13;
const MIN_TOKENS = 6;
const CURSOR_REPEL_RADIUS = 220;
const TOKEN_SPLIT_RADIUS = 18;

const TOKEN_POOL = [
  '0', '1', ';', '{', '}', '(', ')', '[', ']', '<', '>', '=>', '==', '===', '!=', '!==', '&&', '||',
  '+', '-', '*', '/', '%', '++', '--', ':', '::', '?.', '??',
  'if', 'else', 'for', 'while', 'switch', 'case', 'return', 'break', 'continue',
  'true', 'false', 'null', 'undefined', 'None', 'nil', 'NaN',
  'const', 'let', 'var', 'function', 'class', 'import', 'export', 'public', 'private', 'static',
  'def', 'lambda', 'fn', 'mut', 'pub', 'async', 'await', 'try', 'catch',
  '"str"', "'txt'", '`tpl`', '42', '3.14', '1024', '0xFF', '0b1010',
  'int', 'float', 'bool', 'string', 'char', 'void',
  'SELECT', 'FROM', 'WHERE', 'JOIN', 'INSERT', 'UPDATE', 'DELETE',
];

const CODE_LINE_POOL = [
  'const ok = retries > 0 && ready;',
  'if (!token) return false;',
  'let status: boolean = true;',
  'SELECT id FROM users WHERE active = 1;',
  'for (let i = 0; i < n; i++) { sum += i; }',
  'result = value ?? "fallback";',
  'fn main() { println!("ok"); }',
  'def validate(msg: str) -> bool:',
  'await api.post("/contact", payload);',
  'String name = "JertineTech";',
  'public static void init() { }',
  'isOnline = true; retries = 3;',
  'if (x === 0 || y === 1) return;',
  'payload["safe"] = sanitize(input);',
  'let bits = 0b10101010;',
];

function randomToken(): string {
  return TOKEN_POOL[Math.floor(Math.random() * TOKEN_POOL.length)];
}

function randomCodeLine(): string {
  return CODE_LINE_POOL[Math.floor(Math.random() * CODE_LINE_POOL.length)];
}

function randomColor(): string {
  const palette = [
    () => `hsla(${Math.random() * 20 + 95}, 90%, 68%, 0.9)`,
    () => `hsla(${Math.random() * 16 + 350}, 85%, 64%, 0.75)`,
    () => `hsla(${Math.random() * 20 + 195}, 75%, 62%, 0.7)`,
  ];
  return palette[Math.floor(Math.random() * palette.length)]();
}

function randomLineColor(): string {
  const palette = [
    () => `hsla(${Math.random() * 15 + 95}, 85%, 68%, 0.9)`,
    () => `hsla(${Math.random() * 10 + 350}, 78%, 66%, 0.8)`,
    () => `hsla(${Math.random() * 18 + 195}, 72%, 64%, 0.75)`,
  ];
  return palette[Math.floor(Math.random() * palette.length)]();
}

function createToken(width: number, height: number): CodeToken {
  const x = Math.random() * width;
  const y = Math.random() * height;
  return {
    x,
    y,
    homeX: x,
    homeY: y,
    dx: (Math.random() - 0.5) * 0.22,
    dy: (Math.random() - 0.5) * 0.22,
    text: randomToken(),
    size: Math.random() * 7 + 10,
    alpha: Math.random() * 0.55 + 0.35,
    color: randomColor(),
  };
}

function createTypingLine(width: number, height: number): TypingLine {
  return {
    x: Math.random() * Math.max(220, width - 320) + 24,
    y: Math.random() * Math.max(120, height - 120) + 24,
    text: randomCodeLine(),
    typed: 0,
    speed: Math.random() * 0.45 + 0.2,
    life: 0,
    maxLife: Math.floor(Math.random() * 260) + 220,
    size: Math.random() * 2 + 11,
    drift: (Math.random() - 0.5) * 0.1,
    color: randomLineColor(),
  };
}

export default function QuantumParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const motionReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const pointer = { x: 0, y: 0, active: false };
    const tokens: CodeToken[] = [];
    const lines: TypingLine[] = [];

    let width = 0;
    let height = 0;
    let raf = 0;

    const tokenTargetCount = () => {
      const byArea = Math.floor((width * height) / 232000);
      return Math.max(MIN_TOKENS, Math.min(MAX_TOKENS, byArea));
    };

    const lineTargetCount = () => {
      const byHeight = Math.floor(height / 95);
      return Math.max(8, Math.min(18, byHeight));
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const target = tokenTargetCount();
      while (tokens.length < target) tokens.push(createToken(width, height));
      while (tokens.length > target) tokens.pop();

      const lineTarget = lineTargetCount();
      while (lines.length < lineTarget) lines.push(createTypingLine(width, height));
      while (lines.length > lineTarget) lines.pop();

      tokens.forEach((token) => {
        token.x = Math.min(width, Math.max(0, token.x));
        token.y = Math.min(height, Math.max(0, token.y));
        token.homeX = Math.min(width, Math.max(0, token.homeX));
        token.homeY = Math.min(height, Math.max(0, token.homeY));
      });

      lines.forEach((line) => {
        line.x = Math.min(Math.max(24, line.x), Math.max(24, width - 280));
        line.y = Math.min(Math.max(24, line.y), Math.max(24, height - 24));
      });
    };

    const step = () => {
      ctx.clearRect(0, 0, width, height);

      // Layer 1: short "live typing" lines that appear/disappear behind tokens.
      lines.forEach((line) => {
        line.life += 1;
        line.typed = Math.min(line.text.length, line.typed + (motionReduced ? 0.05 : line.speed));
        line.x += line.drift;

        if (line.x < 20 || line.x > width - 240) line.drift *= -1;

        const fadeIn = Math.min(1, line.life / 28);
        const fadeOut = Math.min(1, (line.maxLife - line.life) / 36);
        const alpha = Math.max(0, Math.min(fadeIn, fadeOut));

        const visibleChars = Math.max(0, Math.floor(line.typed));
        const typedText = line.text.slice(0, visibleChars);
        const cursor = line.life % 34 < 18 ? '|' : ' ';

        ctx.font = `${Math.round(line.size)}px "Fira Code", "JetBrains Mono", "ZhiMaMono", monospace`;
        ctx.globalAlpha = alpha * 0.45;
        ctx.fillStyle = line.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = line.color;
        ctx.fillText(`${typedText}${cursor}`, line.x, line.y);
        ctx.shadowBlur = 0;

        if (line.life >= line.maxLife) {
          const next = createTypingLine(width, height);
          line.x = next.x;
          line.y = next.y;
          line.text = next.text;
          line.typed = 0;
          line.speed = next.speed;
          line.life = 0;
          line.maxLife = next.maxLife;
          line.size = next.size;
          line.drift = next.drift;
          line.color = next.color;
        }
      });

      tokens.forEach((token) => {
        // Local repulsion so tokens do not collapse into clusters.
        for (let i = 0; i < tokens.length; i++) {
          const other = tokens[i];
          if (other === token) continue;

          const ox = token.x - other.x;
          const oy = token.y - other.y;
          const od = Math.hypot(ox, oy);
          if (od > 0 && od < TOKEN_SPLIT_RADIUS) {
            const repel = (TOKEN_SPLIT_RADIUS - od) * 0.0022;
            token.dx += (ox / od) * repel;
            token.dy += (oy / od) * repel;
          }
        }

        let isNearPointer = false;
        if (!motionReduced && pointer.active) {
          const awayX = token.x - pointer.x;
          const awayY = token.y - pointer.y;
          const distance = Math.hypot(awayX, awayY);
          if (distance > 0 && distance < CURSOR_REPEL_RADIUS) {
            isNearPointer = true;
            const repel = (CURSOR_REPEL_RADIUS - distance) * 0.0105;
            token.dx += (awayX / distance) * repel;
            token.dy += (awayY / distance) * repel;
            token.dx += (-awayY / distance) * 0.018;
            token.dy += (awayX / distance) * 0.018;
          }
        }

        // Spring-back to preserve a continuous field across the viewport.
        token.dx += (token.homeX - token.x) * 0.0034;
        token.dy += (token.homeY - token.y) * 0.0034;

        const maxSpeed = isNearPointer ? 2.2 : 0.42;
        const speed = Math.hypot(token.dx, token.dy);
        if (speed > maxSpeed) {
          token.dx = (token.dx / speed) * maxSpeed;
          token.dy = (token.dy / speed) * maxSpeed;
        }

        token.dx *= isNearPointer ? 0.94 : 0.967;
        token.dy *= isNearPointer ? 0.94 : 0.967;

        if (!isNearPointer && !motionReduced) {
          token.dx += (Math.random() - 0.5) * 0.001;
          token.dy += (Math.random() - 0.5) * 0.001;
        }

        const moveFactor = motionReduced ? 0.1 : 1;
        token.x += token.dx * moveFactor;
        token.y += token.dy * moveFactor;

        if (token.x < 0 || token.x > width) token.dx *= -1;
        if (token.y < 0 || token.y > height) token.dy *= -1;

        if (Math.random() < 0.0022) token.text = randomToken();

        ctx.font = `${Math.round(token.size)}px "Fira Code", "JetBrains Mono", "ZhiMaMono", monospace`;
        ctx.fillStyle = token.color;
        ctx.globalAlpha = token.alpha;
        ctx.shadowBlur = 12;
        ctx.shadowColor = token.color;
        ctx.fillText(token.text, token.x, token.y);
        ctx.shadowBlur = 0;
      });

      ctx.globalAlpha = 1;
      raf = window.requestAnimationFrame(step);
    };

    const onPointerMove = (event: MouseEvent) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.active = true;
    };

    const onPointerLeave = () => {
      pointer.active = false;
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseleave', onPointerLeave);
    raf = window.requestAnimationFrame(step);

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mouseleave', onPointerLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-0 opacity-25" aria-hidden="true" />;
}
