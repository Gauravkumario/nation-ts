import Link from "next/link";
import ToggleBtn from "./ToggleBtn";

const Header = () => {
  return (
    <div className={`drop-shadow-lg border-b-4 dark:border-none border-solid border-black-100 dark:bg-[#2B3945] dark:text-white custom`}>
      <nav className="max-w-screen-xl py-6 px-6 m-auto flex justify-between items-center">
        <span className="font-semibold md:text-lg">
          <Link href={"/"}>Where in the World?</Link>
        </span>
        <span><ToggleBtn /></span>
      </nav>
    </div>
  );
};

export default Header;
