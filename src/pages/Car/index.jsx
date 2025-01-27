import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";

export default function Car() {
  return (
    <>
      <div className="grid grid-cols-2 gap-4 mt-6">
        <Card className="h-full text-center flex flex-col justify-between items-center p-6 bg-gradient-to-r from-neutral-400 to-stone-500 text-white shadow-lg">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Car Name</CardTitle>
            <CardDescription className="mt-2 text-lg text-white">
              car photo here later
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              variant="solid"
              className=" text-white px-6 py-3 rounded-full shadow-md  transition-all duration-300"
            >
              Like
            </Button>
          </CardContent>
        </Card>

        <Card className="h-full text-center flex flex-col justify-between items-center p-6 bg-gray-100 shadow-lg hover:shadow-xl transition">
          <Card className="flex flex-row items-center w-full">
            <CardHeader>
              <CardTitle>Comment</CardTitle>
              <CardDescription>commenter</CardDescription>
            </CardHeader>
            <CardContent className="w-full">
              <div className="flex flex-row-reverse ">
                <Button
                  variant="solid"
                  className="mx-2 text-white  rounded-full shadow-md  transition-all duration-300"
                >
                  Like
                </Button>
                <p>like count</p>
              </div>
            </CardContent>
          </Card>
          <div className="flex w-full items-center space-x-2">
            <Input type="text" placeholder="Leave a comment" />
            <Button type="submit">Send</Button>
          </div>
        </Card>
      </div>
    </>
  );
}
