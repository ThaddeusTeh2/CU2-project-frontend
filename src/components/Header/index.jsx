import { Button } from "@/components/ui/button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { isUserLoggedIn } from "../../utils/api_auth";
import { useCookies } from "react-cookie";

export default function Header() {
  const location = useLocation();
  const [cookies, removeCookie] = useCookies(["currentUser"]);
  const navigate = useNavigate();

  const handleLogout = () => {
    // clear the cookies
    removeCookie("currentUser");
    // redirect the user back to login page
    navigate("/");
  };
  //stuff to display current logged in user
  const currentUser = cookies.currentUser;
  const userName = currentUser?.name;

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <div className="container flex place-content-between w-full m-5">
        <div>
          <div>
            <Button
              variant="solid"
              className=" text-white bg-black px-6 py-3 rounded-full shadow-md  transition-all duration-300 mx-1"
              disabled={isActive("/") ? true : false}
              onClick={() => {
                navigate("/");
              }}
            >
              Home
            </Button>
            {isUserLoggedIn(cookies) && (
              <Button
                variant="solid"
                className="text-white bg-black px-6 py-3 rounded-full shadow-md transition-all duration-300 mx-1"
                disabled={isActive("/dashboard")}
                onClick={() => {
                  navigate("/dashboard");
                }}
              >
                Dashboard
              </Button>
            )}
          </div>
        </div>
        <div className="flex">
          <div flex flex-row>
            {isUserLoggedIn(cookies) ? (
              <>
                <div className="mx-5">
                  Logged in as: {userName}
                  <Button
                    variant="solid"
                    className="text-white bg-red-600 px-6 py-3 rounded-full shadow-md transition-all duration-300 mx-1"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </div>
              </>
            ) : (
              <>
                <Button
                  variant="solid"
                  className="text-white bg-black px-6 py-3 rounded-full shadow-md transition-all duration-300 mx-1"
                  disabled={isActive("/login")}
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  Login{" "}
                </Button>
                <Button
                  variant="solid"
                  className="text-white bg-black px-6 py-3 rounded-full shadow-md transition-all duration-300 mx-1"
                  disabled={isActive("/signup")}
                  onClick={() => {
                    navigate("/signup");
                  }}
                >
                  Sign Up
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
