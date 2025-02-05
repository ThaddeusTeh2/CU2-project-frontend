import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import Autoplay from "embla-carousel-autoplay";
import { Button } from "@/components/ui/button";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import Header from "@/components/Header";
import { Link } from "react-router-dom";

import { getCarsAdmin } from "@/utils/api_car";
import { useEffect, useState } from "react";
import { getAllUsers } from "@/utils/api_user";
import { overview } from "@/utils/api_review";
import { isUserLoggedIn } from "@/utils/api_auth";

export default function Home() {
  const [over_view, setOverview] = useState([]);

  //get all cars
  useEffect(() => {
    overview()
      .then((data) => setOverview(data))
      .catch((error) => console.error(error));
  }, []);

  const images = [
    "../../../images/mclaren.jpg",
    "../../../images/porsche.jpg",
    "../../../images/supra.jpg",
  ];

  console.log(over_view);

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        {/* about us & carousel */}
        <Header />
        <div className="container py-5">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 mb-2">
            <div className="col-span-1 justify-center p-1 ">
              <Card className="h-full flex flex-col justify-between items-center p-8 bg-gradient-to-r from-neutral-400 to-stone-500 text-white shadow-xl rounded-xl hover:shadow-2xl transition-all">
                <CardHeader className="text-center">
                  <CardTitle className="text-5xl font-extrabold text-white">
                    Re-View
                  </CardTitle>
                  <CardDescription className="mt-2 text-md text-gray-300">
                    A unique platform to discover and connect with car
                    enthusiasts.
                  </CardDescription>
                </CardHeader>
                <CardContent className="mt-6 space-y-6 flex flex-col items-center">
                  <p className="text-lg text-gray-200 font-semibold text-center">
                    Join a growing community of passionate car lovers.
                  </p>

                  {!isUserLoggedIn ? (
                    <Button
                      variant="solid"
                      className="text-white bg-black px-6 py-3 rounded-full shadow-md transition-all duration-300"
                      asChild
                    >
                      <Link to="/signup">Join Us Today</Link>
                    </Button>
                  ) : (
                    <Button
                      variant="solid"
                      className="text-white bg-black px-6 py-3 rounded-full shadow-md transition-all duration-300"
                      asChild
                    >
                      <Link to="/brand">Start the Experience</Link>
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>
            <div className="col-span-1 lg:col-span-2 justify-center">
              <Carousel
                plugins={[
                  Autoplay({
                    delay: 2000,
                    loop: true,
                  }),
                ]}
                opts={{
                  align: "start",
                  loop: true,
                }}
                className="w-full h-full basis-1/3"
              >
                <CarouselContent>
                  {images.map((image, idx) => (
                    <CarouselItem key={idx}>
                      <div className="p-1">
                        <Card>
                          <CardContent className="flex aspect-video items-center justify-center p-6">
                            <img
                              src={image}
                              alt={`Image ${idx + 1}`}
                              className="w-full h-full object-cover"
                              rounded
                            />
                          </CardContent>
                        </Card>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>
          </div>

          <Card className="text-center bg-gray-100 shadow-lg hover:shadow-xl transition">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">About Us</CardTitle>
              <CardDescription className="text-lg mt-2">
                A passionate platform for car enthusiasts.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                Founded in 2025 by a mid software engineering student, our
                website serves as a community-driven car catalog and social
                interaction hub. The platform is designed to provide a social
                media-like experience for car enthusiasts, allowing users to
                engage by leaving comments, replying to others, and liking
                posts. You can discover, filter, and search for your favorite
                vehicles effortlessly, making it easier than ever to find your
                dream car.
              </p>
              <p className="text-gray-700">
                To ensure security and personalization, we offer multi-level
                role-based authentication with secure hashed passwords and
                JWT-based sessions. Users can create, read, update, and delete
                posts with proper authentication, while an intuitive admin
                dashboard allows for seamless management of car models and
                types. With a responsive design, our platform adapts perfectly
                to mobile devices, so you can stay connected wherever you are.
              </p>
              <p className="text-gray-700">
                Our platform also incorporates a democratic upvote system,
                allowing users to show approval for cars or comments, fostering
                a sense of community and collaboration. Together, we're building
                a space where car enthusiasts can connect, discuss, and share
                their passion for automobiles.
              </p>
            </CardContent>
          </Card>
          {/* end */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            {/* explore */}
            <Card className="h-full text-center flex flex-col justify-between items-center p-6 bg-gradient-to-r from-neutral-400 to-stone-500 text-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-3xl font-bold">Explore Us</CardTitle>
                <CardDescription className="mt-2 text-lg text-white">
                  Discover everything our website has to offer at a glance.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  variant="solid"
                  className=" text-white bg-black px-6 py-3 rounded-full shadow-md  transition-all duration-300"
                  asChild
                >
                  <Link to="/explore">Go</Link>
                </Button>
              </CardContent>
            </Card>

            {/* stats */}
            <Card className="h-full text-center flex flex-col justify-between items-center p-6 bg-gray-100 shadow-lg hover:shadow-xl transition">
              <CardHeader>
                <CardTitle className="text-3xl font-bold">
                  Site Statistics
                </CardTitle>
                <CardDescription className="mt-2 text-gray-600">
                  See how our platform is growing.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <p className="text-4xl font-bold ">
                  Cars: {over_view.cars?.length || 0}
                </p>
                <p className="text-2xl font-bold mt-2">
                  Users: {over_view.users?.length || 0}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
