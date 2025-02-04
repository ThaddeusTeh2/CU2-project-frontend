import { useEffect, useState } from "react";

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

  const [cookies] = useCookies(["currentUser"]);

  const [change, setChange] = useState(false);

  const currentUserRole = cookies.currentUser?.role;

  //get all types
  useEffect(() => {
    getTypes()
      .then((data) => setTypes(data))
      .catch((error) => console.error(error));
  }, [change]);

  //get all brands
  useEffect(() => {
    getBrands()
      .then((data) => setBrands(data))
      .catch((error) => console.error(error));
  }, [change]);

  //get all cars
  useEffect(() => {
    getCarsAdmin()
      .then((data) => setCars(data))
      .catch((error) => console.error(error));
  }, [change]);

  //get all users
  useEffect(() => {
    getAllUsers()
      .then((data) => setUsers(data))
      .catch((error) => console.error(error));
  }, [change]);

  //get all comments
  useEffect(() => {
    if (cars.length > 0) {
      getAllComments(cars[0].id)
        .then((data) => setComments(data))
        .catch((error) => console.error(error));
    }
  }, [cars]);

  //TODO kill myself

  //refreshes page upon change
  const handleChange = () => {
    setChange(!change);
  };

  //all of the data being mapped comes from GET apis being passed as props down to these components (see 'Section' component)

  return currentUserRole == "admin" ? (
    <>
      <div className="px-5 flex flex-col items-center justify-center">
        <Header />
        <h1 className="mb-5">Your Dash</h1>
      </div>

      <div className="px-10">
        {/* types */}
        <Section
          title="All Car Types"
          data={types}
          type="type"
          handleChange={handleChange}
        />

        {/* brands */}
        <Section
          title="All Car Brands"
          data={brands}
          type="brand"
          handleChange={handleChange}
        />

        {/* cars */}
        <Section
          title="All Cars"
          data={cars}
          type="car"
          brands={brands}
          types={types}
          handleChange={handleChange}
        />

        {/* users */}
        <Section
          title="All Users"
          data={users}
          type="user"
          handleChange={handleChange}
        />

        {/* comments */}
        <Section
          title="All Comments"
          data={comments}
          type="comment"
          handleChange={handleChange}
        />
      </div>
    </>
  ) : (
    <>
      <div className="px-5 flex flex-col items-center justify-center">
        <Header />
        <h1 className="mb-5">Your Dash</h1>
      </div>
      <div className="px-10">
        <Section
          title="All Comments"
          data={comments}
          type="comment"
          handleChange={handleChange}
        />
      </div>
    </>
  );
}
