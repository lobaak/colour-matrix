import React from 'react';
import { Color } from '../utils/types';

interface Rect {
  x: number;
  y: number;
  color: Color;
}

interface Props {
  colors: Color[];
  rectSize: number;
  itemsPerRow: number;
  itemsPerColumn: number;
}

const Canvas: React.FC<Props> = ({
  colors,
  rectSize,
  itemsPerRow,
  itemsPerColumn,
}) => {
  const canvas = React.useRef<HTMLCanvasElement>(null);
  const styles = {
    width: '100%',
    display: 'block',
    marginBottom: '2rem',
  } as React.CSSProperties;

  const drawRect = React.useCallback(
    ({ x, y, color: [red, green, blue] }: Rect): void => {
      if (canvas.current) {
        const ctx = canvas.current.getContext('2d');

        if (ctx) {
          ctx.fillStyle = `rgb(${red},${green},${blue})`;
          ctx.fillRect(x, y, rectSize, rectSize);
        }
      }
    },
    [rectSize]
  );

  const updateCanvas = React.useCallback((): void => {
    let i = 0;
    for (let x = 0; x < itemsPerRow; x++) {
      for (let y = 0; y < itemsPerColumn; y++) {
        drawRect({
          x: x * rectSize,
          y: y * rectSize,
          color: colors[i],
        });
        i++;
      }
    }
  }, [colors, drawRect, itemsPerColumn, itemsPerRow, rectSize]);

  React.useEffect(() => {
    if (colors.length) {
      updateCanvas();
    }
  }, [colors, updateCanvas]);

  return (
    <canvas
      ref={canvas}
      width={itemsPerRow * rectSize}
      height={itemsPerColumn * rectSize}
      style={styles}
    />
  );
};

export default Canvas;
