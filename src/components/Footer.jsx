import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="flex fixed bottom-0 w-full justify-center items-center p-2 mt-5 bg-gray-50">
      Copyright @2024 Created by{" "}
      <Link target="_blank" to="https://github.com/hasanboyazimov" className="px-1 link ">
        {" "}
        Hasanboy Azimov
      </Link>
    </div>
  );
}

export default Footer;
