import React, { useState } from "react";
import { Input, InputProps } from "./ui/input";
import { cn } from "@/lib/utils";
import { EyeOff } from "lucide-react";

const PasswordInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    return (
      <div className="relative">
        <Input
          type={showPassword ? "text" : "password"}
          className={cn("pr-10", className)}
          ref={ref}
          {...props}
        />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          title={showPassword ? "Hide Password" : "Show Password"}
          className="absolute right-3 top-1/2 -translate-y-1/2 transform text-muted-foreground"
        >
          {showPassword ? (
            <EyeOff className="size-5" />
          ) : (
            <EyeOff className="size-5" />
          )}
        </button>
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";
export { PasswordInput };
