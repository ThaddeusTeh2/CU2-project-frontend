import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

//APIs
import { getTypes } from "@/utils/api_type";
import { getBrands } from "@/utils/api_brand";
import { getCarsAdmin } from "@/utils/api_car";
import { getAllUsers } from "@/utils/api_user";
import { getAllComments } from "@/utils/api_comment";

import Header from "@/components/Header";
import Section from "@/components/Section";
import { useCookies } from "react-cookie";

export default function Dashboard() {
  //states
  const [types, setTypes] = useState([]);
  const [brands, setBrands] = useState([]);
  const [cars, setCars] = useState([]);
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);
  const [sortType, setSortType] = useState("name");

  const [cookies] = useCookies(["currentUser"]);

  const [change, setChange] = useState(false);

  const token = cookies.currentUser;

  const currentUserRole = cookies.currentUser?.role;
  const currentUserId = cookies.currentUser?._id;

  //get all types
  useEffect(() => {
    getTypes(sortType)
      .then((data) => setTypes(data))
      .catch((error) => console.error(error));
  }, [change, sortType]);

  //get all brands
  useEffect(() => {
    getBrands(sortType)
      .then((data) => setBrands(data))
      .catch((error) => console.error(error));
  }, [change, sortType]);

  //get all cars
  useEffect(() => {
    getCarsAdmin(token, sortType)
      .then((data) => setCars(data))
      .catch((error) => console.error(error));
  }, [change, sortType]);

  //get all users
  useEffect(() => {
    getAllUsers(sortType)
      .then((data) => setUsers(data))
      .catch((error) => console.error(error));
  }, [change, sortType]);

  //get all comments
  useEffect(() => {
    if (cars.length > 0) {
      getAllComments(sortType)
        .then((data) => setComments(data))
        .catch((error) => console.error(error));
    }
  }, [cars]);

  //TODO kill myself

  //refreshes page upon change
  const handleChange = () => {
    setChange(!change);
  };

  const handleSortType = (type) => {
    setSortType(type);
  };

  //all of the data being mapped comes from GET apis being passed as props down to these components (see 'Section' component)

  return currentUserRole == "admin" ? (
    <div className="flex justify-center items-center">
      <div className="container">
        <div className="px-5 flex flex-col items-center justify-center">
          <Header />
          <h1 className="mb-5">Your Dash</h1>
        </div>

        <div className="flex flex-row-reverse mx-5">
          <DropdownMenu>
            <DropdownMenuTrigger className="text-white">
              Filter
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onSelect={() => handleSortType("name")}>
                Name
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => handleSortType("latest")}>
                Recently added
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="px-10">
          {/* types */}
          <Section
            title="All Car Types"
            data={types}
            type="type"
            handleChange={handleChange}
            token={token}
            currentUser={currentUserId}
            currentUserRole={currentUserRole}
          />

          {/* brands */}
          <Section
            title="All Car Brands"
            data={brands}
            type="brand"
            handleChange={handleChange}
            token={token}
            currentUser={currentUserId}
            currentUserRole={currentUserRole}
          />

          {/* cars */}
          <Section
            title="All Cars"
            data={cars}
            type="car"
            brands={brands}
            types={types}
            handleChange={handleChange}
            token={token}
            currentUser={currentUserId}
            currentUserRole={currentUserRole}
          />

          {/* users */}
          <Section
            title="All Users"
            data={users}
            type="user"
            handleChange={handleChange}
            token={token}
            currentUser={currentUserId}
            currentUserRole={currentUserRole}
          />

          {/* comments */}
          <Section
            title="All Comments"
            data={comments}
            type="comment"
            handleChange={handleChange}
            token={token}
            currentUser={currentUserId}
            currentUserRole={currentUserRole}
          />
        </div>
      </div>
    </div>
  ) : (
    <>
      <div className="px-5 flex flex-col items-center justify-center">
        <Header />
        <h1 className="mb-5">Your Dash</h1>
      </div>
      <div className="px-10">
        {/* data is filtered for regular users so they can only view their own comments */}
        <Section
          title="All Comments"
          data={comments.filter((comment) => comment.user._id == currentUserId)}
          type="comment"
          handleChange={handleChange}
        />
      </div>
    </>
  );
}
