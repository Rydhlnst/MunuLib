"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Resolver } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useRouter } from "next/navigation";
import { bookSchema } from "@/lib/validations";
import FileUpload from "../../../components/FileUpload";
import ColorPicker from "../_components/ColorPicker";
import { Book } from "@/lib/types";
import { createBook } from "@/lib/actions/book.action";
import { toast } from "sonner";

interface Props extends Partial<Book> {
  type?: "create" | "update";
}

const BookForm = ({ type, ...book }: Props) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof bookSchema>>({
    resolver: zodResolver(bookSchema) as Resolver<z.infer<typeof bookSchema>>,
    defaultValues: {
      title: "",
      description: "",
      author: "",
      genre: "",
      rating: 1,
      totalCopies: 1,
      coverUrl: "",
      coverColor: "",
      videoUrl: "",
      summary: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof bookSchema>) => {
    const result = await createBook(values);

    if (result.success) {
      toast.success(result.message);
      router.push(`/admin/books/${result.data.id}`);
    } else {
      toast.error(result.message, {
        description: "Failed to create book."
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">

        {/* ===================== */}
        {/* BOOK INFORMATION CARD */}
        {/* ===================== */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Book Information
            </CardTitle>
          </CardHeader>

          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Book Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Book title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Author */}
            <FormField
              control={form.control}
              name="author"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Author</FormLabel>
                  <FormControl>
                    <Input placeholder="Book author" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Genre */}
            <FormField
              control={form.control}
              name="genre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Genre</FormLabel>
                  <FormControl>
                    <Input placeholder="Book genre" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Rating */}
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rating</FormLabel>
                  <FormControl>
                    <Input type="number" min={1} max={5} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Total Copies */}
            <FormField
              control={form.control}
              name="totalCopies"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Total Copies</FormLabel>
                  <FormControl>
                    <Input type="number" min={1} max={5000} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* ===================== */}
        {/* MEDIA & APPEARANCE    */}
        {/* ===================== */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Media & Appearance
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Cover Upload */}
              <FormField
                control={form.control}
                name="coverUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Book Cover Image</FormLabel>
                    <FormControl>
                      <FileUpload
                        type="image"
                        accept="image/*"
                        placeholder="Upload book cover"
                        folder="imageUpload"
                        variant="light"
                        onUploaded={field.onChange}
                        value={field.value}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Color Picker */}
              <FormField
                control={form.control}
                name="coverColor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Primary Color</FormLabel>
                    <FormControl>
                      <ColorPicker
                        value={field.value}
                        onPickerChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Trailer */}
            <FormField
              control={form.control}
              name="videoUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Book Trailer</FormLabel>
                  <FormControl>
                    <FileUpload
                      type="video"
                      accept="video/*"
                      placeholder="Upload book trailer"
                      folder="videoUpload"
                      variant="light"
                      onUploaded={field.onChange}
                      value={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* ===================== */}
        {/* BOOK DESCRIPTION CARD */}
        {/* ===================== */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Book Content
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Book description" rows={6} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Summary */}
            <FormField
              control={form.control}
              name="summary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Book Summary</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Short summary" rows={4} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* SUBMIT */}
        <div className="flex justify-end">
          <Button type="submit" className="px-7">
            {type === "update" ? "Update Book" : "Add Book to Library"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default BookForm;
