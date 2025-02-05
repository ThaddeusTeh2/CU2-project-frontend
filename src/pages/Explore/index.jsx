import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";

//import api
import { getCars, getCarsAdmin } from "@/utils/api_car";
import { getBrands } from "@/utils/api_brand";
import { getTypes } from "@/utils/api_type";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

export default function Explore() {
  const [cars, setCars] = useState([]);
  const [oricars, setOricars] = useState([]);
  const [search, setSearch] = useState("");
  const [sortType, setSortType] = useState("latest");
  const [brands, setBrands] = useState([]);
  const [types, setTypes] = useState([]);
  const [brand, setBrand] = useState("all");
  const [type, setType] = useState("all");
  useEffect(() => {
    getCars(type, brand, sortType, search).then((data) => {
      console.log(data);
      setOricars(data);
      setCars(data);
    });
  }, [sortType, search, brand, type]);

  useEffect(() => {
    getBrands().then((data) => {
      setBrands(data);
    });
    getTypes().then((data) => setTypes(data));
  }, []);

  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  const handleSortType = (type) => {
    setSortType(type);
  };

  const handleBrandChange = (brand) => {
    setBrand(brand);
  };

  const handleTypeChange = (type) => {
    setType(type);
  };

  return (
    <>
      <div className="flex flex-col justify-center">
        <Header />
        <div className="container py-5">
          <div className="">
            <div className="mb-5">
              <h1>Explore</h1>
            </div>
            <div className="mb-5 flex place-content-between">
              <div className="flex w-full max-w-sm items-center space-x-2">
                <Input
                  type="text"
                  placeholder="Search"
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-row">
                <div className="mx-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="text-white">
                      Sort
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onSelect={() => handleSortType("name")}>
                        Name
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onSelect={() => handleSortType("latest")}
                      >
                        Recently added
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="mx-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="text-white">
                      Brand
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem
                        onSelect={() => handleBrandChange("all")}
                      >
                        All
                      </DropdownMenuItem>
                      {brands.map((brand) => (
                        <DropdownMenuItem
                          onSelect={() => handleBrandChange(brand._id)}
                        >
                          {brand.name}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="mx-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="text-white">
                      Type
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem
                        onSelect={() => handleTypeChange("all")}
                      >
                        All
                      </DropdownMenuItem>
                      {types.map((type) => (
                        <DropdownMenuItem
                          onSelect={() => handleTypeChange(type._id)}
                        >
                          {type.name}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
            <div className="grid gap-4">
              {cars.length > 0 ? (
                cars.map((car) => (
                  <Card
                    key={car._id}
                    className="flex flex-row place-content-between"
                  >
                    <CardHeader>
                      <CardTitle>{car.name}</CardTitle>
                      <CardDescription>
                        {car.description.length > 25
                          ? `${car.description.substring(0, 25)}...`
                          : car.description}
                      </CardDescription>{" "}
                    </CardHeader>
                    <CardContent className="justify-center items-center">
                      <div className="flex justify-center items-center pt-5">
                        <Button
                          asChild
                          className="justify-center content-center"
                          variant="outline"
                          onClick={() => {
                            localStorage.setItem("car", car._id);
                          }}
                        >
                          <Link to="/car">View</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <p>No cars found.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
