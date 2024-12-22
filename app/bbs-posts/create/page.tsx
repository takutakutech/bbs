"use client"

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from "@/components/ui/input"
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import Input_ from 'postcss/lib/input';
import React from 'react'
import { useForm } from 'react-hook-form';
import { z } from "zod"; 

const formSchema = z.object({
  username: z.string().min(2, {message:"ユーザー名は2文字以上にしてください。"}), 
  title: z.string().min(2, {message:"タイトルは2文字以上にしてください。"}), 
  content: z.string().min(2, {message:"本文は2文字以上にしてください。"}).max(150, {message:"本文は150字以内にしてください。"}), 
});


const CreateBBSPage = () => {
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema), 
    defaultValues:{
      username: "",
      title: "",
      content: "",
    },
  });
  
  async function onSubmit (value: z.infer<typeof formSchema>) {
    const {username, title, content} =value;
    try {
        await fetch("http://localhost:3000/api/post", {
            method: "POST",
            headers: {
                "Content-Type": "application/json", 
            },
            body: JSON.stringify({username, title, content}),
        });
        router.push("/")
    } catch (error) {
        console.error(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 w-1/2 px-7">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ユーザー名</FormLabel>
              <FormControl>
                <Input placeholder="ユーザー名" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>タイトル</FormLabel>
              <FormControl>
                <Input placeholder="タイトル" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>本文</FormLabel>
              <FormControl>
                <Textarea placeholder="投稿内容" className="resize-none" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">投稿</Button>
      </form>
    </Form>
  )
};

export default CreateBBSPage;