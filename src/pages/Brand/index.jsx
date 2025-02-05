import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

//import api
import { getBrands } from "@/utils/api_brand";
import Header from "@/components/Header";

//shadcn imports
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

export default function Brand() {
  const [brands, setBrands] = useState([]);
  const [oribrands, setOriBrands] = useState([]);

  const [search, setSearch] = useState("");
  const [sortType, setSortType] = useState("latest");

  useEffect(() => {
    getBrands(sortType, search).then((data) => {
      setOriBrands(data);
      setBrands(data);
    });
  }, [sortType, search]);

  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  const handleSortType = (type) => {
    setSortType(type);
  };

  return (
    <>
      <div className="flex flex-col px-10 justify-center">
        <Header />
        <div className="container">
          <div className="">
            <div className="mb-5">
              <h1>Pick a brand, any brand.</h1>
            </div>
            <div className="flex items-center justify-between mb-5">
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
                    Sort
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
            <div className="grid ">
              {brands.length > 0 ? (
                brands.map((brand) => (
                  <Card
                    key={brand.id}
                    className="flex flex-row place-content-between mb-5"
                  >
                    <CardHeader>
                      <CardTitle>{brand.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="justify-center items-center">
                      <div className="flex justify-center items-center pt-5">
                        <Button
                          className="justify-center content-center"
                          asChild
                          variant="outline"
                          onClick={() =>
                            localStorage.setItem("brand", brand._id)
                          }
                        >
                          <Link to="/type">View</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <p>No brands found.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
