import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <>
      <div className="container flex place-content-between w-full m-5">
        <div>
          <div>
            <Button
              variant="solid"
              className=" text-white bg-black px-6 py-3 rounded-full shadow-md  transition-all duration-300 mx-1"
              asChild
            >
              <Link to="/">Home</Link>
            </Button>
            <Button
              variant="solid"
              className=" text-white bg-black px-6 py-3 rounded-full shadow-md  transition-all duration-300 mx-1"
              asChild
            >
              <Link to="/dashboard">Dash</Link>
            </Button>
          </div>
        </div>
        <div className="flex">
          <div className="mx-5">Logged in as: Admin</div>
          <div>
            <Button
              variant="solid"
              className=" text-white bg-black px-6 py-3 rounded-full shadow-md  transition-all duration-300 mx-1"
              asChild
            >
              <Link to="/login">Login</Link>
            </Button>
            <Button
              variant="solid"
              className=" text-white bg-black px-6 py-3 rounded-full shadow-md  transition-all duration-300 mx-1"
              asChild
            >
              <Link to="/signup">Sign Up</Link>
            </Button>
            <Button
              variant="solid"
              className=" text-white bg-black px-6 py-3 rounded-full shadow-md  transition-all duration-300 mx-1"
              asChild
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
