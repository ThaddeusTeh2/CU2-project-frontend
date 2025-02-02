import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

//import api
import { getBrands } from "@/utils/api_brand";

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

  useEffect(() => {
    getBrands().then((data) => {
      setBrands(data);
    });
  }, []);

  return (
    <>
      <div className="flex justify-center">
        <div className="container py-5">
          <div className="grid grid-rows-3">
            <div className="mb-5">
              <h1>Pick a brand, any brand.</h1>
            </div>
            <div className="mb-5 flex place-content-between">
              <div className="flex w-full max-w-sm items-center space-x-2">
                <Input type="text" placeholder="Search" />
                <Button type="submit">Go</Button>
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
              {brands.length > 0 ? (
                brands.map((brand) => (
                  <Card
                    key={brand.id}
                    className="flex flex-row place-content-between"
                  >
                    <CardHeader>
                      <CardTitle>{brand.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="justify-center content-center">
                      <Button
                        className="justify-center content-center"
                        asChild
                        variant="outline"
                        onClick={() => localStorage.setItem("brand", brand._id)}
                      >
                        <Link to="/type">View</Link>
                      </Button>
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
