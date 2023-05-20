import * as icons from 'assets/icons/index';

type SvgIconName = keyof typeof icons;

interface SvgIconProps {
  name: SvgIconName;
  width: number;
  height: number;
  fill: string;
}

export const SvgIcon: React.FC<SvgIconProps> = ({
  name,
  width,
  height,
  fill,
}) => {
  const Icon = icons[name];
  return <Icon width={width} height={height} fill={fill} />;
};
