import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <>
      <div className="container flex place-content-between w-full m-5">
        <div>
          <div>
            <Button
              variant="solid"
              className=" text-white px-6 py-3 rounded-full shadow-md  transition-all duration-300 mx-1"
            >
              Home
            </Button>
            <Button
              variant="solid"
              className=" text-white px-6 py-3 rounded-full shadow-md  transition-all duration-300 mx-1"
            >
              Dashboard
            </Button>
          </div>
        </div>
        <div className="flex">
          <div className="mx-5">Logged in as: Admin</div>
          <div>
            <Button
              variant="solid"
              className=" text-white px-6 py-3 rounded-full shadow-md  transition-all duration-300 mx-1"
            >
              Login
            </Button>
            <Button
              variant="solid"
              className=" text-white px-6 py-3 rounded-full shadow-md  transition-all duration-300 mx-1"
            >
              Sign Up
            </Button>
            <Button
              variant="solid"
              className=" text-white px-6 py-3 rounded-full shadow-md  transition-all duration-300 mx-1"
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
