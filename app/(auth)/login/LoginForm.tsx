"use client";

import { LoginSchema, LoginValue } from "@/lib/validation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/PasswordInput";
import LoadingButton from "@/components/LoadingButton";
import { useState, useTransition } from "react";
import { login } from "./action";

const LoginForm = () => {
  const [isPending, startTransistion] = useTransition();

  const [error, setError] = useState<string>();
  async function onSubmit(values: LoginValue) {
    setError(undefined);
    startTransistion(async () => {
      const { error } = await login(values);
      if (error) setError(error);
    });
  }

  const form = useForm<LoginValue>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {error && <p className="text-center text-destructive">{error}</p>}

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="email" {...field}></Input>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        ></FormField>

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>password</FormLabel>
              <FormControl>
                <PasswordInput placeholder="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        ></FormField>

        <LoadingButton className="w-full" type="submit" loading={isPending}>
          {" "}
          Log in
        </LoadingButton>
      </form>
    </Form>
  );
};

export default LoginForm;
