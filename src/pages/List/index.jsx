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

  useEffect(() => {
    const brandId = localStorage.getItem("brand");
    const typeId = localStorage.getItem("type");

    getCars(typeId, brandId, "latest").then((data) => {
      console.log(data);
      setCars(data);
    });
  }, []);

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
                <Input car="text" placeholder="Search" />
                <Button car="submit">Go</Button>
              </div>
              <div>
                <DropdownMenu>
                  <DropdownMenuTrigger className="text-white">
                    Filter
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>Name</DropdownMenuItem>
                    <DropdownMenuItem>Recently added</DropdownMenuItem>
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
