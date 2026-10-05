import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { AuthLayout } from "@/features/auth/auth-layout"
import { PasswordInput } from "@/features/auth/password-input"
import { SocialButtons } from "@/features/auth/social-buttons"
import { login } from "@/store/auth-slice"
import { useAppDispatch } from "@/store"

const schema = z.object({
  email: z.email("Enter a valid email address"),
  password: z.string().min(1, "Password is required"),
})

type FormValues = z.infer<typeof schema>

export default function SignInPage() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", password: "" },
  })

  async function onSubmit(values: FormValues) {
    const result = await dispatch(login(values))
    if (login.fulfilled.match(result)) {
      toast.success("Welcome back!")
      const from = (location.state as { from?: { pathname: string } } | null)?.from?.pathname
      navigate(from ?? "/dashboard", { replace: true })
    } else {
      form.setError("root", { message: result.payload ?? "Sign in failed." })
    }
  }

  return (
    <AuthLayout
      title="Welcome back"
      description="Sign in to your Acme account"
      footer={
        <p>
          Don&apos;t have an account?{" "}
          <Link to="/auth/sign-up" className="text-foreground underline underline-offset-4">
            Sign up
          </Link>
        </p>
      }
    >
      <div className="grid gap-6">
        <SocialButtons />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4" noValidate>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" autoComplete="email" placeholder="m@example.com" {...field} />
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
                  <div className="flex items-center">
                    <FormLabel>Password</FormLabel>
                    <a href="#" className="ml-auto text-sm underline-offset-4 hover:underline">
                      Forgot password?
                    </a>
                  </div>
                  <FormControl>
                    <PasswordInput autoComplete="current-password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {form.formState.errors.root && (
              <p role="alert" className="text-destructive text-sm">
                {form.formState.errors.root.message}
              </p>
            )}
            <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting && <Loader2 className="animate-spin" />}
              Sign in
            </Button>
          </form>
        </Form>
      </div>
    </AuthLayout>
  )
}
