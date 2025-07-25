  import { Link } from "react-router-dom";

  const Navbar = () => {
    return (
      <nav className="w-full px-6 py-4 flex justify-between  items-center font-[Audiowide-Regular] text-sm">
        <div className="flex gap-6">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/login">Login</Link>
          
        </div>
      
      </nav>
    );
  };

  export default Navbar;
