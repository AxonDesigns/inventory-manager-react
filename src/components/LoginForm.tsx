"use client"
import { useAuth } from "@/components/AuthProvider"
import {
  Button
} from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Input
} from "@/components/ui/input"
import {
  PasswordInput
} from "@/components/ui/password-input"
import { Separator } from "@/components/ui/separator"
import {
  zodResolver
} from "@hookform/resolvers/zod"
import {
  useForm
} from "react-hook-form"
import { useNavigate } from "react-router-dom"
import * as z from "zod"
const formSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z.string().min(1, "Password is required"),
});

export default function LoginForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(values: z.infer<typeof formSchema>) {
    login(values.email, values.password, {
      onSuccess: async () => {
        navigate("/tables");
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-2">
        <h1 className="text-xl font-open-sans font-bold text-center">
          Welcome Back!
        </h1>
        <Separator />
        <FormField
          control={form.control}
          name="email"
          defaultValue=""
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="example@email.com"
                  type="email"
                  {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          defaultValue=""
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="mt-2">Log In</Button>
      </form>
    </Form>
  )
}