import { useEffect, useState } from "react";
import { getCar } from "@/utils/api_car";
import { getComments, addComment } from "@/utils/api_comment";
import { useCookies } from "react-cookie";

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
  const [car, setCar] = useState([]);
  const [comments, setComments] = useState([]);
  const [change, setChange] = useState(false);
  const [input, setInput] = useState("");
  const [cookies] = useCookies(["currentUser"]);

  const token = cookies.currentUser;

  useEffect(() => {
    const carId = localStorage.getItem("car");

    getCar(carId, "latest").then((data) => {
      console.log(data);
      setCar(data);
    });
    if (carId) {
      getComments(carId, "latest").then((data) => {
        console.log(data);
        //set comments into state
        setComments(data);
      });
    }
  }, [change]);

  const handleCommentInput = async (event) => {
    setInput(event.target.value);
    console.log(input);
  };
  ``;

  const handleAdd = async (event) => {
    event.preventDefault();
    const carId = localStorage.getItem("car");
    const currentUserId = cookies.currentUser?._id;

    console.log(input);
    if (!input) {
      toast.error("type something dei");
    } else {
      //trigger add api
      await addComment(carId, input, currentUserId, token);
      setChange(!change);
    }
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-4 mt-6">
        <Card className="h-full text-center flex flex-col justify-between items-center p-6 bg-gradient-to-r from-neutral-400 to-stone-500 text-white shadow-lg">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">{car.name}</CardTitle>
            <CardDescription className="mt-2 text-lg text-white">
              {car.description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              variant="solid"
              className=" text-white px-6 py-3 rounded-full shadow-md  transition-all duration-300"
            >
              Like
            </Button>
            <p>{car.likes ? car.likes.length : 0}</p>
          </CardContent>
        </Card>

        <Card className="h-full text-center flex flex-col justify-between items-center p-6 bg-gray-100 shadow-lg hover:shadow-xl transition">
          <div className="w-full">
            <CardHeader>
              <CardTitle>Comments</CardTitle>
              <CardDescription>What people are saying</CardDescription>
            </CardHeader>
            <CardContent>
              {comments.length > 0 ? (
                comments.map((comment) => (
                  <Card key={comment._id} className="mb-4">
                    <CardHeader>
                      <CardTitle>{comment.content}</CardTitle>
                      <CardDescription>{comment.user.name}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-row-reverse">
                        <Button
                          variant="solid"
                          className="mx-2 text-white rounded-full shadow-md transition-all duration-300"
                        >
                          Like
                        </Button>
                        <p>{comment.likes ? comment.likes.length : 0} Likes</p>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <p>No comments yet.</p>
              )}
            </CardContent>
          </div>

          <div className="flex w-full items-center space-x-2">
            <Input
              value={input}
              onChange={handleCommentInput}
              type="text"
              placeholder="Leave a comment"
            />
            <Button onClick={handleAdd} type="submit">
              Send
            </Button>
          </div>
        </Card>
      </div>
    </>
  );
}
