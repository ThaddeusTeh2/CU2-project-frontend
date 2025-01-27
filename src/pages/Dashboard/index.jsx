import Header from "@/components/Header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  return (
    <>
      <div className="px-5 flex flex-col items-center justify-center">
        <Header />
        <h1 className="mb-5">Your Dash</h1>
      </div>

      <div className="px-10">
        {/* manage car body types */}
        <div className="grid grid-rows-3">
          <div className="flex flex-row place-content-between">
            <div className="flex flex-row">
              <p className="text-2xl mx-2"> All Car Types</p>
              <Button
                className="justify-center content-center text-white"
                variant="contained"
              >
                +
              </Button>
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
          <div>
            <Card className="flex flex-row place-content-between">
              <CardHeader>
                <CardTitle>Coupes</CardTitle>
              </CardHeader>
              <CardContent className="justify-center content-center">
                <Button
                  className="justify-center content-center mx-2"
                  variant="outline"
                >
                  Edit
                </Button>
                <Button
                  className="justify-center content-center"
                  variant="outline"
                >
                  Delete
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* manage brands */}
        <div className="grid grid-rows-3">
          <div className="flex flex-row place-content-between">
            <div className="flex flex-row">
              <p className="text-2xl mx-2">All Car Brands</p>
              <Button
                className="justify-center content-center text-white"
                variant="contained"
              >
                +
              </Button>
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
          <div>
            <Card className="flex flex-row place-content-between">
              <CardHeader>
                <CardTitle>Toyota</CardTitle>
              </CardHeader>
              <CardContent className="justify-center content-center">
                <Button
                  className="justify-center content-center mx-2"
                  variant="outline"
                >
                  Edit
                </Button>
                <Button
                  className="justify-center content-center"
                  variant="outline"
                >
                  Delete
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* manage cars */}
        <div className="grid grid-rows-3">
          <div className="flex flex-row place-content-between">
            <div className="flex flex-row">
              <p className="text-2xl mx-2">All Cars</p>
              <Button
                className="justify-center content-center text-white"
                variant="contained"
              >
                +
              </Button>
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
          <div>
            <Card className="flex flex-row place-content-between">
              <CardHeader>
                <CardTitle>Supra</CardTitle>
                <CardDescription>
                  BMW Z4 rebadge, but hey its fun.
                </CardDescription>
              </CardHeader>
              <CardContent className="justify-center content-center">
                <Button
                  className="justify-center content-center mx-2"
                  variant="outline"
                >
                  Edit
                </Button>
                <Button
                  className="justify-center content-center"
                  variant="outline"
                >
                  Delete
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
        {/* manage users */}
        <div className="grid grid-rows-3">
          <div className="flex flex-row place-content-between">
            <div className="flex flex-row">
              <p className="text-2xl mx-2">All Users</p>
              <Button
                className="justify-center content-center text-white"
                variant="contained"
              >
                +
              </Button>
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
          <div>
            <Card className="flex flex-row place-content-between">
              <CardHeader>
                <CardTitle>Keshen Naresh</CardTitle>
              </CardHeader>
              <CardContent className="justify-center content-center">
                <Button
                  className="justify-center content-center mx-2"
                  variant="outline"
                >
                  Edit
                </Button>
                <Button
                  className="justify-center content-center"
                  variant="outline"
                >
                  Ban
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* manage comments */}
        <div className="grid grid-rows-3">
          <div className="flex flex-row place-content-between">
            <div className="flex flex-row">
              <p className="text-2xl mx-2">All comments</p>
              <Button
                className="justify-center content-center text-white"
                variant="contained"
              >
                +
              </Button>
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
          <div>
            <Card className="flex flex-row place-content-between">
              <CardHeader>
                <CardTitle>If only i were rich</CardTitle>
                <CardDescription>Keshen Naresh</CardDescription>
                <CardDescription>@ Supra</CardDescription>
              </CardHeader>
              <CardContent className="justify-center content-center">
                <Button
                  className="justify-center content-center mx-2"
                  variant="outline"
                >
                  Edit
                </Button>
                <Button
                  className="justify-center content-center"
                  variant="outline"
                >
                  Delete
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
