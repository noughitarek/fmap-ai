import { icons } from 'lucide-react';
interface IconProps {
  name: string;
  color?: string;
  size?: string | number;
  className?: string;
}

const Icon: React.FC<IconProps> = ({ name, color, size, className }) => {
  const LucideIcon = icons[name as keyof typeof icons];
  if (!LucideIcon) {
    console.warn(`Icon with name "${name}" does not exist in lucide-react icons.`);
    return null;
  }

  return <LucideIcon color={color} size={size} className={className} />;
};

export default Icon;
