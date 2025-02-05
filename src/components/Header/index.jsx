import { Button } from "@/components/ui/button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { isUserLoggedIn } from "../../utils/api_auth";
import { useCookies } from "react-cookie";

export default function Header() {
  const location = useLocation();
  const [cookies, removeCookie] = useCookies(["currentUser"]);
  const navigate = useNavigate();

  const handleLogout = () => {
    removeCookie("currentUser");
    navigate("/");
  };

  //stuff to display current logged in user
  const currentUser = cookies.currentUser;
  const userName = currentUser?.name;

  const isActive = (path) => location.pathname === path;

  return (
    <div className="container flex flex-col lg:flex-row items-center justify-between w-full p-5">
      <div className="flex flex-wrap justify-center gap-2 lg:gap-4">
        <Button
          variant="solid"
          className="text-white bg-black px-6 py-3 rounded-full shadow-md transition-all duration-300"
          disabled={isActive("/")}
          onClick={() => navigate("/")}
        >
          Home
        </Button>
        <Button
          variant="solid"
          className="text-white bg-black px-6 py-3 rounded-full shadow-md transition-all duration-300"
          disabled={isActive("/explore")}
          onClick={() => navigate("/explore")}
        >
          Explore
        </Button>
        {isUserLoggedIn(cookies) && (
          <Button
            variant="solid"
            className="text-white bg-black px-6 py-3 rounded-full shadow-md transition-all duration-300"
            disabled={isActive("/dashboard")}
            onClick={() => navigate("/dashboard")}
          >
            Dashboard
          </Button>
        )}
      </div>

      <div className="flex flex-col lg:flex-row items-center gap-2 lg:gap-4 mt-4 lg:mt-0">
        {isUserLoggedIn(cookies) ? (
          <div className="flex items-center gap-4">
            <span className="text-center">Logged in as: {userName}</span>
            <Button
              variant="solid"
              className="text-white bg-red-600 px-6 py-3 rounded-full shadow-md transition-all duration-300"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        ) : (
          <div className="flex gap-2 lg:gap-4">
            <Button
              variant="solid"
              className="text-white bg-black px-6 py-3 rounded-full shadow-md transition-all duration-300"
              disabled={isActive("/login")}
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
            <Button
              variant="solid"
              className="text-white bg-black px-6 py-3 rounded-full shadow-md transition-all duration-300"
              disabled={isActive("/signup")}
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
