"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import niltekLogo from "../../../assets/logo/niltek-logo.png";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/config/firebase";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  email: z
    .string()
    .email({ message: "Geçerli bir e-posta adresi giriniz" })
    .max(50, { message: "E-posta adresi 50 karakterden uzun olamaz" })
    .min(5, { message: "E-posta adresi 5 karakterden kısa olamaz" }),
  password: z
    .string()
    .max(50, { message: "Şifre 50 karakterden uzun olamaz" })
    .min(3, { message: "Şifre 3 karakterden kısa olamaz" }),
});

export function LoginPage() {
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "@niltekyazilim.com.tr",
      password: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { email, password } = values;
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        // const user = userCredential.user;
        // console.log(user);
        navigate("/admin/dashboard");

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  return (
    <div>
      <div className="flex justify-center my-[50px]">
        {/* Logo */}
        <img src={niltekLogo} className="w-[150px]" />
        {/* Logo */}
      </div>
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle
            className="text-2xl 
          dark:text-white
          "
          >
            Niltek Finansa Hoşgeldiniz
          </CardTitle>
          <CardDescription className="text-sm dark:text-white">
            Lütfen giriş yapmak için bilgilerinizi giriniz
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <>
                      <FormLabel className="text-zinc-500 dark:text-secondary/70">
                        E Posta
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="email"
                          disabled={isLoading}
                          type="email"
                          className="bg-zinc-300/50 border-0 focus focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                          placeholder="niltek@niltekyazilim.com.tr"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500">
                        {form.formState.errors.email?.message}
                      </FormMessage>
                    </>
                  )}
                />
              </div>
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <>
                      <FormLabel className="text-zinc-500 dark:text-secondary/70">
                        Şire
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="password"
                          disabled={isLoading}
                          type="password"
                          className="bg-zinc-300/50 border-0 focus focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                          placeholder="********"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500">
                        {form.formState.errors.password?.message}
                      </FormMessage>
                    </>
                  )}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" disabled={isLoading} type="submit">
                Giriş Yap
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
