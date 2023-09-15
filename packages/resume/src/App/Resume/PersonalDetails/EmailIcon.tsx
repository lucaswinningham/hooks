import { SVGProps } from "react";

type EmailIconProps = SVGProps<SVGSVGElement>;

export const EmailIcon = (props: EmailIconProps) => (
  <svg
    viewBox="3.125 10.5 18 2"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3.75 5.25L3 6V18L3.75 18.75H20.25L21 18V6L20.25 5.25H3.75ZM4.5 7.6955V17.25H19.5V7.69525L11.9999 14.5136L4.5 7.6955ZM18.3099 6.75H5.68986L11.9999 12.4864L18.3099 6.75Z"
      fill="currentcolor"
    />
  </svg>
);