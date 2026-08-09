import React from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { auth } from "../utils/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Error from "./Error";

const Header = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/");
      })
      .catch((error) => {
        // An error happened.
        navigate("/error");
      });
  };
  return (
    <div className="absolute w-screen px-8 py-2 bg-linear-to-b from-black z-10 flex justify-between">
      <img
        className="w-44"
        src="https://occ.a.nflxso.net/dnmt/api/v6/iL4oJVDYZ8KLSrJ6eG2OwtghbfQ/AAAAAZge2REfWoSoWRs31izjUdgihldMUslSHTdfz-1aT4vVrgJuVByU92G8wIrBkwULJHWjM1khpzW0xWndigQFYViKFpy-pM6NZFnTKEPkpf9hcdSzCyzqBbcouyIpmgVLbodhaeyqCXaS.svg"
        alt="Netflix Logo"></img>
      <div>
        <Menu>
          <MenuButton className="flex items-center gap-2 focus:outline-none">
            {/* Netflix-style Profile Avatar */}
            <div className="w-10 h-10 rounded-md bg-blue-500 flex flex-col items-center justify-center shadow-sm">
              {/* Eyes */}
              <div className="flex gap-4 mb-1">
                <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
              </div>

              {/* Smile */}
              <div className="w-5 h-2 border-b-2 border-white rounded-full"></div>
            </div>

            {/* Dropdown Arrow */}
            <ChevronDownIcon className="w-5 h-5 text-white" />
          </MenuButton>

          <MenuItems
            transition
            anchor="bottom end"
            className="w-48 origin-top-right rounded-md bg-gray-900 py-1 shadow-lg ring-1 ring-white/10 focus:outline-none">
            <MenuItem>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-300 data-focus:bg-white/10 data-focus:text-white">
                Profile
              </a>
            </MenuItem>

            <MenuItem>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-300 data-focus:bg-white/10 data-focus:text-white">
                Account
              </a>
            </MenuItem>

            <MenuItem>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-300 data-focus:bg-white/10 data-focus:text-white">
                Settings
              </a>
            </MenuItem>

            <div className="border-t border-gray-700 my-1"></div>

            <MenuItem>
              <button
                className="block w-full px-4 py-2 text-left text-sm text-gray-300 data-focus:bg-white/10 data-focus:text-white"
                onClick={handleSignOut}>
                Sign Out
              </button>
            </MenuItem>
          </MenuItems>
        </Menu>
      </div>
    </div>
  );
};

export default Header;
