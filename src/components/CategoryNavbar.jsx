
import { Link } from "react-router-dom";

const CategoryNavbar = () => {
  return (
    <nav className="w-full flex justify-center mb-16">
      <div className="flex gap-6 px-6 py-4 font-[Audiowide-Regular] text-sm">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/login">Login</Link>
      </div>
    </nav>
  );
};

export default CategoryNavbar;
