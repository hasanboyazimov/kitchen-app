import { FaAngleDown } from "react-icons/fa6";
import { CiMenuBurger } from "react-icons/ci";

const Navigation = () => {
  return (
    <nav className="border-b  border-gray-300 py-4 lg:block">
      <div className="container mx-auto lg:flex hidden items-center justify-between px-4">
        <div>
          <h1 className="text-2xl font-bold mb-10">Choose your category</h1>
          <div className="flex space-x-4 mt-2 bg-[#F5F4F2] py-2 px-2 rounded-xl">
            <button className="bg-white rounded-xl py-2 px-4 hover:bg-white hover:bg-opacity-50 text-black">
              All
            </button>
            <button className="rounded-xl py-2 px-4 hover:bg-white hover:bg-opacity-50 text-black">
              Burgers
            </button>
            <button className="rounded-xl py-2 px-4 hover:bg-white hover:bg-opacity-50 text-black">
              Sushi
            </button>
            <button className="rounded-xl py-2 px-4 hover:bg-white hover:bg-opacity-50 text-black">
              Pizza
            </button>
            <button className="rounded-xl py-2 px-4 hover:bg-white hover:bg-opacity-50 text-black">
              Wok
            </button>
            <button className="rounded-xl py-2 px-4 hover:bg-white hover:bg-opacity-50 text-black">
              Breakfasts
            </button>
            <button className="rounded-xl py-2 px-4 hover:bg-white hover:bg-opacity-50 text-black">
              Lunch
            </button>
            <button className="rounded-xl py-2 px-4 hover:bg-white hover:bg-opacity-50 text-black">
              Uzbek
            </button>
            <button className="rounded-xl py-2 px-4 hover:bg-white hover:bg-opacity-50 text-black">
              Asia
            </button>
            <button className="rounded-xl py-2 px-4 hover:bg-white hover:bg-opacity-50 text-black">
              Japan
            </button>
            <button className="rounded-xl py-2 px-4 hover:bg-white hover:bg-opacity-50 text-black">
              Coffee
            </button>
            <button className="rounded-xl py-2 px-4 hover:bg-white hover:bg-opacity-50 text-black ">
              <div className="dropdown">
                <div
                  tabIndex={0}
                  role="button"
                  className="flex items-center gap-1"
                >
                  More <FaAngleDown />
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
                >
                  <li>
                    <a>Item 1</a>
                  </li>
                  <li>
                    <a>Item 2</a>
                  </li>
                </ul>
              </div>
            </button>
          </div>
        </div>
      </div>
      <details className="dropdown block lg:hidden">
        <summary className="btn m-1">
          <CiMenuBurger />
        </summary>
        <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
          <li>
            <a>Item 1</a>
          </li>
          <li>
            <a>Item 2</a>
          </li>
        </ul>
      </details>
    </nav>
  );
};

export default Navigation;
