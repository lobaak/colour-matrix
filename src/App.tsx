import React from 'react';

interface RGB {
  red: number;
  blue: number;
  green: number;
}

const SIZE = 8;

const Color: React.FC<RGB> = ({ red, green, blue }) => {
  const style = {
    backgroundColor: `rgba(${red}, ${green}, ${blue} 1)`,
    width: '1px',
    height: '1px',
    float: `left`,
  } as React.CSSProperties;

  return <div style={style} />;
};

const getRgbValues = () => {
  const count = 256;
  let colors: RGB[] = [];

  for (let red = 8; red <= count; red += 8) {
    for (let blue = 8; blue <= count; blue += 8) {
      for (let green = 8; green <= count; green += 8) {
        const rgb = { red, green, blue };
        colors.push(rgb);
      }
    }
  }

  return colors;
};

function App() {
  const [colors, setColors] = React.useState<RGB[]>([]);

  const canvas = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const c = getRgbValues();
    setColors(c);
  }, []);

  React.useLayoutEffect(() => {
    if (canvas.current) {
      const ctx = canvas.current.getContext('2d');

      if (ctx) {
        let x = 0;
        let y = 0;

        colors.forEach(({ red, green, blue }, i) => {
          if (x >= 1024) {
            x = 0;
            y += SIZE;
          }

          ctx.beginPath();
          ctx.fillRect(x, y, SIZE, SIZE);
          ctx.fillStyle = `rgb(${red},${green},${blue})`;

          x += SIZE;
        });
      }
    }
  }, [colors]);

  return (
    <div className="App">
      <canvas ref={canvas} width="1024" height="1000" />
    </div>
  );
}

export default App;
