import Link from "next/link";
import { IoMoonOutline } from "react-icons/io5";

const Header = () => {
  return (
    <div className="drop-shadow-lg border-b-4 border-solid border-black-100">
      <nav className="max-w-screen-xl py-6 px-6 m-auto flex justify-between items-center">
        <span className="font-semibold md:text-lg">
          <Link href={"/"}>Where in the World?</Link>
        </span>
        <button className="flex items-center gap-2 md:font-medium">
          <IoMoonOutline size={20} />
          Dark
        </button>
      </nav>
    </div>
  );
};

export default Header;
