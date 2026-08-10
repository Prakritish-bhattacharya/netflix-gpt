import React, { useEffect } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { auth } from "../utils/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Error from "./Error";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { NETFLIX_LOGO } from "../utils/constants";

const Header = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        // An error happened.
        navigate("/error");
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties

        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          }),
        );
        navigate("/browse");
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("/");
      }
    });
    // unsubscribe when components unmounts
    return () => unsubscribe();
  }, []);

  return (
    <div className="absolute w-screen px-8 py-2 bg-linear-to-b from-black z-10 flex justify-between">
      <img
        className="w-44"
        src={NETFLIX_LOGO}
        alt="Netflix Logo"></img>
      <div>
        {user && (
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
              className="w-56 origin-top-right rounded-md bg-gray-900 py-1 shadow-lg ring-1 ring-white/10 focus:outline-none">
              {/* Profile */}
              <MenuItem>
                <button className="flex items-center gap-3 w-full px-4 py-3 text-left text-sm text-gray-300 data-focus:bg-white/10 data-focus:text-white">
                  <img
                    src={user?.photoURL}
                    alt="Profile"
                    className="w-6.5 h-6.5 rounded-md object-cover"
                  />

                  <span>{user?.displayName || "User"}</span>
                </button>
              </MenuItem>

              {/* Account */}
              <MenuItem>
                <button className="block w-full px-4 py-2 text-left text-sm text-gray-300 data-focus:bg-white/10 data-focus:text-white">
                  Account
                </button>
              </MenuItem>

              {/* Settings */}
              <MenuItem>
                <button className="block w-full px-4 py-2 text-left text-sm text-gray-300 data-focus:bg-white/10 data-focus:text-white">
                  Settings
                </button>
              </MenuItem>

              <div className="my-1 border-t border-gray-700"></div>

              {/* Sign Out */}
              <MenuItem>
                <button
                  onClick={handleSignOut}
                  className="block w-full px-4 py-2 text-left text-sm text-gray-300 data-focus:bg-white/10 data-focus:text-white">
                  Sign Out
                </button>
              </MenuItem>
            </MenuItems>
          </Menu>
        )}
      </div>
    </div>
  );
};

export default Header;