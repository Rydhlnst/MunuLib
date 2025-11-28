"use client";

import { useState } from "react";
import { HexColorPicker, HexColorInput } from "react-colorful";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface Props {
  value?: string;
  onPickerChange: (color: string) => void;
}

export default function ColorPicker({ value = "#000000", onPickerChange }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col gap-3 w-full">
      {/* Input Row */}
      <div className="flex items-center gap-2">
        {/* Color Preview Circle */}
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <button
              className={cn(
                "h-7 w-7 rounded-md border shadow-sm transition-all",
                "hover:ring-2 hover:ring-primary/40 hover:scale-105",
              )}
              style={{ backgroundColor: value }}
            />
          </PopoverTrigger>

          {/* Modern Floating Color Picker */}
          <PopoverContent
            className="p-3 bg-popover border shadow-xl rounded-xl"
            align="start"
          >
            <HexColorPicker color={value} onChange={onPickerChange} />
          </PopoverContent>
        </Popover>

        {/* Hex Input */}
        <div className="flex items-center gap-1">
          <span className="text-sm font-medium text-muted-foreground">#</span>
          <HexColorInput
            color={value}
            onChange={onPickerChange}
            prefixed={false}
            className={cn(
              "h-9 w-28 rounded-md border bg-background px-2 text-sm font-medium",
              "shadow-sm transition-all",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
            )}
          />
        </div>
      </div>
    </div>
  );
}
