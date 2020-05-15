import React from 'react';
import Button from './components/button';
import Canvas from './components/canvas';

import { getRgbValues, sortColors } from './utils/colors';
import { Color, SortType } from './utils/types';

import './styles/main.scss';

function App() {
  const [colors, setColors] = React.useState<Color[]>([]);

  React.useEffect(() => {
    initColors();
  }, []);

  function handleSort(type: SortType) {
    const tempColors = sortColors(type, colors);
    setColors(tempColors);
  }

  function initColors() {
    setColors(getRgbValues());
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
      <h2>Sort colours</h2>
      <Button onClick={() => initColors()}>Reset</Button>
      <Button onClick={() => handleSort('shuffle')}>Shuffle</Button>
      <Button onClick={() => handleSort('luminance')}>Luminance</Button>
      <Button onClick={() => handleSort('hue')}>Hue</Button>
      <Button onClick={() => handleSort('sat')}>Sat</Button>
      <Button onClick={() => handleSort('lightness')}>Lightness</Button>
    </>
  );
}

export default App;
