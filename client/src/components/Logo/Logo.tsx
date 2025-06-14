import logo from '@/assets/logo.png';

export default function Logo() {
  return (
    <img
      src={logo}
      alt="Логотип"
      width={300}
      height={69}
      loading="eager"  
    />
  );
}
