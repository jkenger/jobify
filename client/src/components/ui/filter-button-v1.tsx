import { IconContext } from "react-icons";
import { Separator } from "./separator";
import { Button } from "./button";

import React from "react";
import { capitalize } from "@/utils/capitalize";
import { Badge } from "./badge";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./command";
import { AiOutlineCheck } from "react-icons/ai";

type Props<T> = {
  children: React.ReactNode;
  icon: React.ReactNode;
  title: string;

  // How do I make these two generic?
  // I want to be able to use this component for both JobStatus and JobType

  list?: T[]; // Can also be JobType type as well
  setList?: React.Dispatch<React.SetStateAction<T[]>>; // Can be JobType type as well

  options: T[]; // Can be JobType type as well
};

function FilterButton<T>({
  children,
  icon,
  title,
  list,
  setList,
  options,
}: Props<T>) {
  const filterCount = list?.length || 0;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="border-dashed w-full lg:w-auto">
          <span className="flex items-center justify-center gap-1">
            <IconContext.Provider value={{ size: "20px" }}>
              {icon}
            </IconContext.Provider>
            {children}
          </span>
          {filterCount !== 0 && (
            <Separator orientation="vertical" className="mx-2 h-4" />
          )}
          {filterCount <= 2 && (
            <div className=" space-x-2">
              {list?.map((list) => (
                <Badge>{capitalize(list as string)} </Badge>
              ))}
            </div>
          )}
          {filterCount > 2 && (
            <>
              <div className="bg-secondary py-.5 px-1 rounded-md ">
                <span className="text-xs">{filterCount} filters </span>
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start">
        <Command>
          <CommandInput placeholder={`Filter by ${title}`} />
          <CommandList>
            <CommandEmpty>No results found</CommandEmpty>
            <CommandGroup className="">
              {options?.map((s, i) => (
                <CommandItem
                  key={i}
                  onSelect={() => {
                    setList?.(
                      list?.includes(s)
                        ? list.filter((list) => list !== s)
                        : [...(list || []), s]
                    );
                  }}
                  className="space-x-1"
                >
                  <div
                    className={`flex items-center justify-center text-xs w-4 h-4 rounded-sm border text-white ${
                      list?.includes(s) ? "bg-primary" : "bg-white"
                    }`}
                  >
                    {list?.includes(s) && <AiOutlineCheck />}
                  </div>
                  <span>{capitalize(s as string)} </span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <Separator />
          <Button
            variant="ghost"
            className="w-full"
            onClick={() => {
              setList?.([]);
            }}
          >
            Clear filters
          </Button>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default FilterButton;
