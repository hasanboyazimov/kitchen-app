import React from "react";
import { GrLanguage } from "react-icons/gr";
import { FaCheck } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useGlobalContext } from "../hooks/useGlobalContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import toast from "react-hot-toast";

function Navbar() {
  const headerRef = useRef(null);
  const { user } = useGlobalContext();

  const signOutProfile = async () => {
    await signOut(auth);
    toast.success("See you soon...");
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        headerRef.current.classList.add("shadow-custom");
      } else {
        headerRef.current.classList.remove("shadow-custom");
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div
      ref={headerRef}
      className=" mx-auto z-50 bg-white  navbar px-10 border-b-[1px]  border-b-gray-100 fixed h-[60px] md:h-[80px] lg:h-[80px] xl:h-[80px] 2xl:[80px] border-transparent shadow-custom"
    >
      <div className="flex-1">
        <a className="btn btn-ghost hover:bg-gray-500 hover:bg-opacity-10 text-xl">
          Kitchen App
        </a>
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="">
            <div className="indicator flex flex-col items-center mr-5 hover:opacity-85">
              <GrLanguage />
              <span>English</span>
            </div>
          </div>
          <div
            tabIndex={0}
            className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow"
          >
            <div className="card-body">
              <Link to="#">
                <div className="text-base flex justify-between items-center border-b-[1px] p-2">
                  English
                  <span>
                    <FaCheck />
                  </span>
                </div>
              </Link>
              <Link to="#">
                <div className=" w-full text-base border-b-[1px] p-2">
                  <div
                    data-tip="will be soon..."
                    className="tooltip tooltip-right pr-2"
                  >
                    Russian
                  </div>
                </div>
              </Link>
              <Link to="#">
                <div className="w-full text-base border-b-[1px] p-2">
                  <div
                    data-tip="will be soon..."
                    className="tooltip tooltip-right pr-2"
                  >
                    Uzbek
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost hover:bg-gray-500 hover:bg-opacity-20 btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="User"
                src={user.photoURL}
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <p className="justify-between">{user.displayName}</p>
            </li>
            <li>
              <button className="btn btn-secondary" onClick={signOutProfile}>Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
