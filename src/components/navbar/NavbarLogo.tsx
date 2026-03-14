import { Link } from 'react-router-dom';

const NavbarLogo = () => (
  <Link to="/" className="flex items-center">
    <div className="flex flex-col">
      <span className="font-playfair font-bold text-xl sm:text-2xl text-romania-blue">Romanian</span>
      <div className="flex w-full">
        <span className="h-0.5 sm:h-1 flex-1 bg-romania-blue"></span>
        <span className="h-0.5 sm:h-1 flex-1 bg-romania-yellow"></span>
        <span className="h-0.5 sm:h-1 flex-1 bg-romania-red"></span>
      </div>
      <span className="font-playfair text-sm sm:text-lg text-muted-foreground">Business Hub</span>
    </div>
  </Link>
);

export default NavbarLogo;
