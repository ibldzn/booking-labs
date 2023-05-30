import {
  Avatar,
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from "@material-tailwind/react";
import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

export const ProfileMenu = ({ logout }: { logout: () => void }) => {
  const user = useContext(UserContext);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen}>
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-2 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
        >
          <Avatar
            variant="circular"
            size="sm"
            alt="candice wu"
            className="border border-blue-500 p-0.5"
            src="/profile.png"
          />
          <FontAwesomeIcon
            icon={faChevronDown}
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        {user ? (
          <MenuItem
            className="hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
            onClick={() => {
              closeMenu();
              logout();
            }}
          >
            Logout
          </MenuItem>
        ) : (
          <>
            <MenuItem
              color="blue-gray"
              onClick={() => {
                closeMenu();
                navigate("/register");
              }}
            >
              <Typography as="span" variant="small" className="font-normal">
                Register
              </Typography>
            </MenuItem>
            <MenuItem
              color="blue-gray"
              onClick={() => {
                closeMenu();
                navigate("/login");
              }}
            >
              <Typography as="span" variant="small" className="font-normal">
                Login
              </Typography>
            </MenuItem>
          </>
        )}
      </MenuList>
    </Menu>
  );
};
