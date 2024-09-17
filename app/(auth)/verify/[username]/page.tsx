'use client'

import React from "react";
import { useToast } from "@/components/ui/use-toast";
import { verifySchema } from "@/schemas/verifySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import {redirect} from 'next/navigation'
import { useForm } from "react-hook-form";
import axios, { AxiosError } from "axios";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ApiResponse } from "@/lib/types/ApiResponse";

export default function VerifyAccount () {
  // const router = useRouter();
  const params = useParams<{ username: string }>();
  // const {toast} = useToast();

  const form = useForm<z.infer<typeof verifySchema>>({
    resolver: zodResolver(verifySchema),
  });
  const onSubmit = async (data: z.infer<typeof verifySchema>) => {
    try {
      await axios.post("/api/verifyCode", {
        username: params.username,
        code: data.code,
      });

      // toast({title: "Success", description: response.data.message})
      redirect('/sign-in')
    } catch (error) {
      console.log('Error in veryfying code', error);
      const axiosError = error as AxiosError<ApiResponse>;
      // toast({
      //   title: "Sign Up fail",
      //   description: axiosError.response?.data.message,
      //   variant: "destructive",
      // });
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
    <div className="w-full max-w-lg p-8 space-y-8 bg-white rounded-lg shadow-md">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
          Join Mystery Message
        </h1>
        <p className="mb-4">Start your Anonomous Adventure</p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Verification Code</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter the code here..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  </div>
)}

