//shadcn ui stuff
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

import { deleteType } from "@/utils/api_type";
import { deleteBrand } from "@/utils/api_brand";
import { deleteCar } from "@/utils/api_car";
import { deleteUser } from "@/utils/api_user";
import { deleteComment } from "@/utils/api_comment";

//dynamic component INSIDE another dynamic component (please kill me)
import EditDialog from "../EditDialog";
import AddDialog from "../AddDialog";

//params n stuff from the dashboard (title is a string that represent the title *duh*, data is the item itself, type is the name of the item )
export default function Section({
  title,
  data,
  type,
  handleChange,
  brands,
  types,
  token,
  currentUser,
  currentUserRole,
}) {
  const handleDelete = async (
    itemId,
    currentUserId,
    currentUserRole,
    token
  ) => {
    if (type == "brand") {
      await deleteBrand(itemId, token);
    } else if (type == "type") {
      await deleteType(itemId, token);
    } else if (type == "car") {
      await deleteCar(itemId, token);
    } else if (type == "user") {
      await deleteUser(itemId, token);
    } else if (type == "comment") {
      await deleteComment(itemId, currentUserId, currentUserRole, token);
    }
    handleChange();
  };
  return (
    <div className="grid grid-rows-3">
      <div className="flex flex-row place-content-between">
        <div className="flex flex-row">
          <p className="text-2xl mx-2">{title}</p>
          {type !== "user" && type !== "comment" && (
            <AddDialog type={type} handleChange={handleChange} token={token} />
          )}
        </div>
        {/* TODO make these change the filtering of the items */}
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
      {/* dynamically mapped item */}
      <div>
        {/* map wrapped in a big ahh if else basically if nothing to map atleast show sum text */}
        {data && data.length > 0 ? (
          data.map((item) => (
            <Card
              key={item._id}
              className="flex flex-row place-content-between"
            >
              <CardHeader>
                <CardTitle>{item.name || item.title || item.content}</CardTitle>
                {/* only render the item description when the cars are mapped since cars are the only item w a description */}
                {type === "car" && (
                  <CardDescription>{item.description}</CardDescription>
                )}
                {/* show the comment's commenter and where it came from */}
                {type === "comment" && (
                  <CardDescription>
                    {item.user.name} @ {item.car.name}
                  </CardDescription>
                )}
              </CardHeader>
              <CardContent className="justify-center content-center">
                {type !== "user" ||
                (type === "user" && item._id !== currentUser) ? (
                  <>
                    {/* pass down the data to the edit dialog */}
                    {type !== "comment" ||
                    (type == "comment" && item.user._id == currentUser) ? (
                      <EditDialog
                        data={item}
                        type={type}
                        brands={brands}
                        types={types}
                        handleChange={handleChange}
                        token={token}
                        currentUser
                        currentUserRole
                      />
                    ) : null}
                    <Button
                      className="justify-center content-center"
                      variant="outline"
                      onClick={() =>
                        handleDelete(
                          item._id,
                          currentUser,
                          currentUserRole,
                          token
                        )
                      }
                    >
                      Delete
                    </Button>
                  </>
                ) : null}
              </CardContent>
            </Card>
          ))
        ) : (
          <p>No {type}s found</p>
        )}
      </div>
    </div>
  );
}
