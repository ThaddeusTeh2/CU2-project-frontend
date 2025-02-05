import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";

//import api
import { getTypes } from "@/utils/api_type";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

export default function Type() {
  const [types, setTypes] = useState([]);
  const [oritypes, setOriTypes] = useState([]);
  const [search, setSearch] = useState("");
  const [sortType, setSortType] = useState("latest");

  useEffect(() => {
    getTypes(sortType, search).then((data) => {
      setOriTypes(data);
      setTypes(data);
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

        <div className="container py-5">
          <div className="grid grid-rows-3">
            <div className="mb-5">
              <h1>What's your type?</h1>
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
              {types.length > 0 ? (
                types.map((type) => (
                  <Card
                    key={type.id}
                    className="flex flex-row place-content-between"
                  >
                    <CardHeader>
                      <CardTitle>{type.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="justify-center items-center">
                      <div className="flex justify-center items-center pt-5">
                        <Button
                          className="justify-center content-center"
                          asChild
                          variant="outline"
                          onClick={() => localStorage.setItem("type", type._id)}
                        >
                          <Link to="/list">View</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <p>No types found.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
