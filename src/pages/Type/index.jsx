import { useEffect, useState } from "react";
//import api
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

export default function Type() {
  const [types, setTypes] = useState([]);

  useEffect(() => {
    const fetchTypes = async () => {
      const data = await getTypes();
      setTypes(data);
    };

    fetchTypes();
  }, []);

  return (
    <>
      <div className="flex justify-center">
        <div className="container py-5">
          <div className="grid grid-rows-3">
            <div className="mb-5">
              <h1>What's your type?</h1>
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
              {types.length > 0 ? (
                types.map((type) => (
                  <Card
                    key={type.id}
                    className="flex flex-row place-content-between"
                  >
                    <CardHeader>
                      <CardTitle>{type.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="justify-center content-center">
                      <Button
                        className="justify-center content-center"
                        variant="outline"
                      >
                        View
                      </Button>
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
