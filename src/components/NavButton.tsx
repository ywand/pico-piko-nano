import { Link } from "react-router-dom";

type Props = {
  to: string;
  children: React.ReactNode;
};

export function NavButton({ to, children }: Props) {
  return (
    <Link to={to} className="nav-button">
      {children}
    </Link>
  );
}

export default NavButton;