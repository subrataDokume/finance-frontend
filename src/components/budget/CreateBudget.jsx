import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useCategory } from "@/hooks/usecategory";
import { LoaderCircle } from "lucide-react";
import { createnewBudget } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "../../hooks/use-toast";
import { ToastAction } from "../ui/toast";
import { useNavigate } from "react-router";
import { Card, CardContent } from "../ui/card";
import Loading from "../Loading";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Category is required"
  }),
  amount: z.number().positive({
    message: "Amount must be a positive number"
  }),
});

 function CreateBudget() {
   const navigate = useNavigate();
   const { toast } = useToast();
   const form = useForm({
     resolver: zodResolver(formSchema),
     defaultValues: {
       name: "",
       amount: '',
     },
   });

   const { mutate, isPending, isError, error:creteError } = useMutation({
     mutationFn: createnewBudget,
     onSuccess: () => {
       toast({
         variant: "success",
         description: "create Sucessfully.",
       })
       form.reset();
       setTimeout(() => {
         navigate("/budget")
       }, 1000)
     },
     onError: () => {
       toast({
         variant: "destructive",
         title: error,
         description: "There was a problem with your request.",
         action: <ToastAction altText="Try again">Try again</ToastAction>,
       })
     }
   });

  function onSubmit(values) {
    mutate(values)
    console.log(values);
  };

  return (
   <div className="container">
    <h2 className="text-center my-2 font-bold text-lg">Create New Budget</h2>
    <Card className="max-w-[500px] m-auto">
      <CardContent>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Enter name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Enter amount" {...field} onChange={(e) => field.onChange(+e.target.value)} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
              <div className="flex gap-3">
                <Button className="w-[50%]" onClick={() => navigate(-1)} type="button" variant="secondary">Cancle</Button>
          <Button type="submit" disabled={isPending} className="w-[50%]">{isPending ? <LoaderCircle className="animate-spin" /> : "Submit"}</Button>
       </div>
        </form>
      </Form>
      </CardContent>
    </Card>
   </div>
  );
}

export default CreateBudget