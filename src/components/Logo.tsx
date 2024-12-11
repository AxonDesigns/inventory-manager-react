interface LogoProps {
  className?: string
}

function Logo({ className }: LogoProps) {
  return (
    <svg
      viewBox="0 0 128 128"
      xmlns="http://www.w3.org/2000/svg"
      fillRule='evenodd'
      clipRule='evenodd'
      strokeLinejoin='round'
      strokeMiterlimit='2'
      fill="currentColor"
      className={className}
    >
      <path d="M72.3413 40.50734 34.16602 116.8579H4.80042L57.6585 11.14174l14.6828 29.3656ZM42.9757 116.8579 95.83378 11.14174h29.3656L72.3413 116.8579H42.9757Zm38.17528 0 14.6828-29.3656 14.6828 29.3656h-29.3656Z" />
    </svg>
  )
}

export default Logo