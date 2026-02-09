import { View } from "react-native";
import Svg, { Rect } from "react-native-svg";
import { useMemo } from "react";
import { useProgress } from "react-native-track-player";

type Props = {
  bars?: number;
  width?: number;
  height?: number;
  activeColor?: string;
  inactiveColor?: string;
};

export default function Waveform({
  bars = 60,
  width = 320,
  height = 60,
  activeColor = "#ff6a00",
  inactiveColor = "#444",
}: Props) {
  const { position, duration } = useProgress();

  // Fake waveform (stable)
  const data = useMemo(
    () =>
      Array.from({ length: bars }, (_, i) =>
        Math.abs(Math.sin(i * 1.7)) * height + 10
      ),
    [bars, height]
  );

  const progress =
    duration > 0 ? position / duration : 0;

  const barWidth = width / bars;
  const activeBars = Math.floor(progress * bars);

  return (
    <View>
      <Svg width={width} height={height}>
        {data.map((h, i) => (
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
