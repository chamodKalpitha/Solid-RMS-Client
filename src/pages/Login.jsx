import { Link } from "react-router-dom";
import LoginPageImage from "../assets/loginPageImg.jpg";
import Logo from "../assets/logo.png";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm, FormProvider } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';

export const loginSchema = Joi.object({
  email: Joi.string().email({ tlds: { allow: false } }).required().messages({
    'string.empty': 'Email is required',
    'string.email': 'Invalid email address',
  }),
  password: Joi.string().min(8).required().messages({
    'string.empty': 'Password is required',
    'string.min': 'Password must be at least 8 characters long',
  }),
});

export function Login() {
  const form = useForm({
    resolver: joiResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="h-screen w-full flex flex-col lg:flex-row">
      <div className="flex flex-1 items-center justify-center p-6">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <img src={Logo} alt="Logo" className="mb-5" />
            <h1 className="text-3xl font-bold text-left">Login</h1>
            <p className="text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <FormControl>
                      <Input
                        id="email"
                        type="text"
                        placeholder="m@example.com"
                        required
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel htmlFor="password">Password</FormLabel>
                      <Link
                        to="/forgot-password"
                        className="ml-auto inline-block text-sm underline"
                      >
                        Forgot your password?
                      </Link>
                    </div>
                    <FormControl>
                      <Input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        required
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-center gap-2">
                <FormField
                  control={form.control}
                  name="rememberMe"
                  render={({ field }) => (
                    <>
                      <Input
                        id="remember-me"
                        type="checkbox"
                        className="h-4 w-4"
                        {...field}
                      />
                      <Label htmlFor="remember-me" className="text-sm">
                        Remember me
                      </Label>
                    </>
                  )}
                />
              </div>

              <div>
                <Button type="submit" className="w-full">
                  Login
                </Button>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
      <div className="hidden lg:flex lg:flex-1 relative">
        <img
          src={LoginPageImage}
          alt="Login page image"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
