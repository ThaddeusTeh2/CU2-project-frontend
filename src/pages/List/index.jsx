import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

//import api
import { getCars } from "@/utils/api_car";

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

export default function List() {
  const [cars, setCars] = useState([]);
  const [oricars, setOricars] = useState([]);
  const [search, setSearch] = useState("");
  const [sortType, setSortType] = useState("latest");

  useEffect(() => {
    const brandId = localStorage.getItem("brand");
    const typeId = localStorage.getItem("type");

    getCars(typeId, brandId, sortType).then((data) => {
      console.log(data);
      setOricars(data);
      setCars(data);
    });
  }, [sortType]);

  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  const handleSortType = (type) => {
    setSortType(type);
  };

  useEffect(() => {
    if (search.trim() === "") {
      setCars(oricars);
    } else {
      setCars(
        oricars.filter((car) =>
          car.name.toLowerCase().includes(search.trim().toLowerCase())
        )
      );
    }
  }, [search, oricars]);

  return (
    <>
      <div className="flex justify-center">
        <div className="container py-5">
          <div className="grid grid-rows-3">
            <div className="mb-5">
              <h1>Anything interesting?</h1>
            </div>
            <div className="mb-5 flex place-content-between">
              <div className="flex w-full max-w-sm items-center space-x-2">
                <Input
                  type="text"
                  placeholder="Search"
                  onChange={handleChange}
                />
              </div>
              <div>
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
                      <CardDescription>{car.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="justify-center content-center">
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
