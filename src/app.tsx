import React from 'react';
import Button from './components/button';
import Canvas from './components/canvas';

import { getRgbValues, rgbToHsl, sorter } from './utils/colors';
import { Color } from './utils/types';

import './styles/main.scss';

type SortType = 'hue' | 'sat' | 'lightness';

function App() {
  const [colors, setColors] = React.useState<Color[]>([]);

  React.useEffect(() => {
    initColors();
  }, []);

  function initColors() {
    setColors(getRgbValues());
  }

  function shuffleSort() {
    const tempColors = [...colors].sort(sorter.shuffle);
    setColors(tempColors);
  }

  function luminanceSort() {
    const tempColors = [...colors].sort(sorter.luminance);
    setColors(tempColors);
  }

  function hslSort(sortType: SortType = 'hue') {
    const tempColors = colors
      .map((c, i) => ({ color: rgbToHsl(c), i })) // track index for after sort
      .sort(sorter[sortType])
      .map((c) => colors[c.i]);

    setColors(tempColors);
  }

  if (!colors.length) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Canvas
        colors={colors}
        rectSize={5}
        itemsPerColumn={128}
        itemsPerRow={256}
      />

      <h2>Sort color values</h2>
      <Button onClick={initColors}>Reset</Button>
      <Button onClick={() => shuffleSort()}>Shuffle</Button>
      <Button onClick={() => luminanceSort()}>Luminance</Button>
      <Button onClick={() => hslSort('hue')}>Hue</Button>
      <Button onClick={() => hslSort('sat')}>Sat</Button>
      <Button onClick={() => hslSort('lightness')}>Lightness</Button>
    </>
  );
}

export default App;
