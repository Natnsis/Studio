import { View } from 'react-native';
import Svg, { Rect } from 'react-native-svg';
import { useEffect, useState } from 'react';

type Props = {
  bars?: number;
  width?: number;
  height?: number;
  activeColor?: string;
  inactiveColor?: string;
  progress?: number;
};

export default function Waveform({
  bars = 60,
  width = 320,
  height = 60,
  activeColor = '#ff6a00',
  inactiveColor = '#444',
  progress = 0,
}: Props) {
  const [waveData, setWaveData] = useState<number[]>(
    Array.from({ length: bars }, () => Math.random() * height * 0.5 + height * 0.1)
  );

  // Animate waveform
  useEffect(() => {
    const interval = setInterval(() => {
      setWaveData(Array.from({ length: bars }, () => Math.random() * height * 0.5 + height * 0.1));
    }, 100);
    return () => clearInterval(interval);
  }, [bars, height]);
  const barWidth = width / bars;
  const boundedProgress = Math.max(0, Math.min(1, progress ?? 0));
  const activeBars = Math.floor(boundedProgress * bars);

  return (
    <View>
      <Svg width={width} height={height}>
        {waveData.map((h, i) => (
          <Rect
            key={i}
            x={i * barWidth}
            y={(height - h) / 2}
            width={barWidth * 0.6}
            height={h}
            rx={2}
            fill={i <= activeBars ? activeColor : inactiveColor}
          />
        ))}
      </Svg>
    </View>
  );
}
