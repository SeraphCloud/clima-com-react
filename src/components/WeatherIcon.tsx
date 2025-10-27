import { WiDaySunny } from "react-icons/wi";

interface WeatherIconProps {
  size: number;
  color: string;
}

const WeatherIcon: React.FC<WeatherIconProps> = ({ size, color }) => {
  return (
    <div>
      <WiDaySunny size={size} color={color} />
    </div>
  );
};

export default WeatherIcon;
