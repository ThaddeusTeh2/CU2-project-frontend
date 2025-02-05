import { useNavigate } from "react-router-dom";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { useCookies } from "react-cookie";

//APIs
import { addBrand, getBrands } from "@/utils/api_brand";
import { addType, getTypes } from "@/utils/api_type";
import { addCar } from "@/utils/api_car";
import { uploadImage } from "@/utils/api_image";
import { toast } from "sonner";
import { isAdmin } from "@/utils/api_auth";

export default function AddDialog({ type, handleChange, token }) {
  const [form, setForm] = useState(() => {
    if (type === "car") {
      return { name: "", description: "", type: "", brand: "", image: "" };
    } else if (type === "brand" || type === "type") {
      return { name: "" };
    }
    return {};
  });

  const [dialogOpen, setDialogOpen] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(null);
  const [brands, setBrands] = useState([]);
  const [types, setTypes] = useState([]);
  const [change, setChange] = useState(false);
  const [cookies, removeCookie] = useCookies(["currentUser"]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdmin(cookies)) {
      toast.error("Naughty naughty");
      navigate("/");
    }
  }, [cookies, navigate]);

  useEffect(() => {
    getBrands().then(setBrands).catch(console.error);
  }, [change]);

  useEffect(() => {
    getTypes().then(setTypes).catch(console.error);
  }, [change]);

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (files) => {
    if (files && files[0]) {
      const { image_url = "" } = await uploadImage(files[0]);
      setForm({ ...form, image: image_url });
    }
  };

  const handleSubmit = async () => {
    for (const column of Object.keys(form)) {
      if (form[column].trim() === "") return;
      form[column] = form[column].trim();
    }

    try {
      if (type === "type") {
        await addType(form.name, token);
      } else if (type === "brand") {
        await addBrand(form.name, token);
      } else if (type === "car") {
        await addCar(form, token);
      }
      handleChange();
      setForm(
        type === "car"
          ? { name: "", description: "", type: "", brand: "", image: "" }
          : { name: "" }
      );
      setDialogOpen(false);
    } catch (error) {
      console.error(error);
      toast.error(`Failed to add ${type}.`);
    }
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={() => setDialogOpen(true)}
          className="justify-center content-center mx-2"
          variant="outline"
        >
          Add
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add {type}</DialogTitle>
        </DialogHeader>

        {Object.keys(form).map((field) =>
          type === "car" && (field === "brand" || field === "type") ? (
            <Popover
              key={field}
              open={popoverOpen === field}
              onOpenChange={(isOpen) => setPopoverOpen(isOpen ? field : null)}
            >
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  className="w-[200px] justify-between my-2"
                >
                  {form[field]
                    ? (field === "brand"
                        ? brands.find((b) => b._id === form[field])?.name
                        : types.find((t) => t._id === form[field])?.name) ||
                      "Select..."
                    : `Select ${field}`}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0">
                <Command>
                  <CommandList>
                    <CommandEmpty>No {field} found.</CommandEmpty>
                    <CommandGroup>
                      {(field === "brand" ? brands : types).map((item) => (
                        <CommandItem
                          key={item._id}
                          value={item._id}
                          onSelect={(currentValue) => {
                            setForm({ ...form, [field]: currentValue });
                            setPopoverOpen(false);
                          }}
                        >
                          {item.name}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          ) : type === "car" && field === "image" ? (
            <Input
              key={field}
              name={field}
              type="file"
              className="my-2"
              onChange={(e) => handleImageUpload(e.target.files)}
            />
          ) : (
            <Input
              key={field}
              name={field}
              placeholder={`Enter ${field}`}
              value={form[field]}
              onChange={handleFormChange}
              className="my-2"
            />
          )
        )}

        <Button onClick={handleSubmit} className="mt-4">
          Save Changes
        </Button>
      </DialogContent>
    </Dialog>
  );
}
