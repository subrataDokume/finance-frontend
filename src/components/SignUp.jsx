import { cn, signup } from "@/lib/utils"
import { Button } from "./ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form"
import { Input } from "./ui/input"
import { useMutation } from "@tanstack/react-query";
import { useToast } from "../hooks/use-toast";
import { ToastAction } from "./ui/toast";
import { Link, useNavigate } from "react-router"
import { LoaderCircle } from "lucide-react"

const formSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
  name: z.string().min(3, { message: 'Please enter atleast 3 charecter.' }).trim(),
  password: z
    .string()
    .min(6, { message: 'Be at least 6 characters long' })
    .trim(),
})

function SignUp() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: "",
      password: '',
    },
  });
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: signup,
    onSuccess: () => {
      toast({
        variant: "success",
        description: "signup Sucessfully.",
      })
      form.reset();
      setTimeout(() => {
        navigate("/")
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
  })

  function onSubmit(values) {
    mutate(values)
    console.log(values)
  }
  return (
    <div className="min-w-screen min-h-screen px-4 flex flex-col justify-center items-center">
      <img className='w-36 mt-5 overflow-hidden h-auto' src='https://hirethen.com/wp-content/uploads/2024/11/New-Logo-copy.png' />
      <Card className="w-screen sm:w-[450px] md:w-[600px] m-auto">
        <CardHeader>
          <CardTitle className="text-2xl">SignUp</CardTitle>
          <CardDescription className="w-[50%] m-auto text-center text-lg text-destructive p-2 rounded-md">
            {isError ? error?.info?.message : ''}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter email" {...field} />
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
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type={"password"} placeholder="Enter password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isPending} className="w-[100%]">{isPending ? <LoaderCircle className="animate-spin" /> : "Submit"}</Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <div className="mt-4 text-center text-sm">
            Have an account?{" "}
            <Link to="/login" className="underline underline-offset-4">
              login
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
export default SignUp