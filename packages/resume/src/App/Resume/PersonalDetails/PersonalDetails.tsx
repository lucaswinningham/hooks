import { Typography, color, spacing } from '@/styles';

import { EmailIcon } from './EmailIcon';
import './personal-details.css';
import { PhoneIcon } from './PhoneIcon';

const iconSize = 24;
const iconProps = {
  width: iconSize,
  height: iconSize,
  color: color.black,
  style: {
    marginRight: spacing.base
  },
};

export const PersonalDetails = () => (
  <div className="contact-information">
    <div className="contact-information-row" style={{ padding: spacing.base }}>
      <PhoneIcon {...iconProps} />

      <Typography size="xs">(317) 439-9747</Typography>
    </div>

    <div className="contact-information-row" style={{ padding: spacing.base }}>
      <EmailIcon {...iconProps} />

      <Typography size="xs">lucas.winningham@gmail.com</Typography>
    </div>
  </div>
);
