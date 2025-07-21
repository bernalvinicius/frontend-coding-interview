import React from 'react';
import LogoIcon from '../../assets/icons/logo.svg?react';
import LinksIcon from '../../assets/icons/links.svg?react';
import StarFilledIcon from '../../assets/icons/star-filled.svg?react';
import StarOutlineIcon from '../../assets/icons/star-outline.svg?react';

interface IconProps {
  name: 'logo' | 'links' | 'star-filled' | 'star-outline';
  className?: string;
  size?: number;
}

export const Icon: React.FC<IconProps> = ({
  name,
  className = '',
  size,
  ...props
}) => {
  const style = size ? { width: size, height: size } : {};

          switch (name) {
          case 'logo':
            return <LogoIcon className={className} style={style} data-testid="logo-icon" {...props} />;
          case 'links':
            return <LinksIcon className={className} style={style} data-testid="links-icon" {...props} />;
          case 'star-filled':
            return <StarFilledIcon className={className} style={style} data-testid="star-filled-icon" {...props} />;
          case 'star-outline':
            return <StarOutlineIcon className={className} style={style} data-testid="star-outline-icon" {...props} />;
          default:
            return null;
        }
};
