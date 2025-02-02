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

import { cn } from "@/lib/utils";
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

//APIs
import { addBrand, getBrands } from "@/utils/api_brand";
import { addType, getTypes } from "@/utils/api_type";
import { addCar } from "@/utils/api_car";

import { toast } from "sonner";

//params from the section component (data = item itself, type = name for d item, handleChange to refresh upon change)
export default function AddDialog({ type, handleChange }) {
  // form state based on item data
  const [form, setForm] = useState(() => {
    if (type === "car") {
      return { name: "", description: "", type: "", brand: "" };
    } else if (type === "brand" || type === "type") {
      return { name: "" };
    }
    return {}; // fallback for unexpected type values
  });
  //by default the dialog is closed yes
  const [dialogOpen, setDialogOpen] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(null); // Track open popover
  const [brands, setBrands] = useState([]);
  const [types, setTypes] = useState([]);
  const [change, setChange] = useState(false);

  //get all brands
  useEffect(() => {
    getBrands()
      .then((data) => setBrands([...data]))
      .catch((error) => console.error(error));
  }, [change]);

  //get all types
  useEffect(() => {
    getTypes()
      .then((data) => setTypes([...data]))
      .catch((error) => console.error(error));
  }, [change]);

  //handle input changes
  const handleFormChange = (e) => {
    //the form = form + entity value overrides the entity name
    setForm({ ...form, [e.target.name]: e.target.value });

    //TODO remove this after debug
    console.log(form);
  };

  // handle form submission
  const handleSubmit = async () => {
    // to make sure that all the inputs are not empty :D
    // x of x basically is for loop shorthand, in this case we are looping thru every column of the form n checking if they are filled or not
    for (const column of Object.keys(form)) {
      //make sure that user cannot trolling submit empty string (.trim remove white space frm front & back)
      if (form[column].trim() == "") {
        return;
      } else {
        //make sure that user cannot trolling spam spaces
        form[column] = form[column].trim();
      }
    }
    try {
      // if the type(name of the item) equals type(represent 'car body type') rizz the addType function from (API-->Dashboard-->Section-->AddDialog *you are here*)
      if (type === "type") {
        const response = await addType(form.name);
        console.log(response);
        //if not, if the type(name of the item) equals brand(car brand) rizz the addBrand function from (API-->Dashboard-->Section-->AddDialog *you are here*)
      } else if (type == "brand") {
        const response = await addBrand(form.name);
        console.log(response);
        //if not, if the type(name of the item) equals car, rizz the addBrand function from (API-->Dashboard-->Section-->AddDialog *you are here*)
      } else if (type == "car") {
        const response = await addCar(form);
        console.log(response);
      }
      handleChange();
      setForm(() => {
        if (type === "car") {
          return { name: "", description: "", type: "", brand: "" };
        } else if (type === "brand" || type === "type") {
          return { name: "" };
        }
        return {}; // fallback for unexpected type values
      });
      setChange((prev) => !prev);
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

        {/* here i map d object's keys(name, description, brandid type id all dat) from the form */}
        {Object.keys(form).map((field) =>
          // we only want to show this popup when we map the car and the column got brand and type
          type === "car" && (field === "brand" || field === "type") ? (
            <Popover
              key={field}
              open={popoverOpen === field} // Only open for the active field
              onOpenChange={(isOpen) => setPopoverOpen(isOpen ? field : null)}
            >
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
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
                            console.log(form);
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
          ) : (
            //otherwise show
            <Input
              key={field}
              name={field}
              placeholder={"Enter " + field}
              //we set the value of the input to the current value so it prefill the input box :D
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
