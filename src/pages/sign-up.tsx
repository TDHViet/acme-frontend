import { useForm, useWatch } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Link, useNavigate } from "react-router-dom"
import { Check, Loader2, X } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { AuthLayout } from "@/features/auth/auth-layout"
import { PasswordInput } from "@/features/auth/password-input"
import { SocialButtons } from "@/features/auth/social-buttons"
import { signup } from "@/store/auth-slice"
import { useAppDispatch } from "@/store"
import { cn } from "@/lib/utils"

const MIN_PASSWORD_LENGTH = 8

const schema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  email: z.email("Enter a valid email address"),
  password: z.string().min(MIN_PASSWORD_LENGTH, `Use ${MIN_PASSWORD_LENGTH} or more characters`),
})

type FormValues = z.infer<typeof schema>

export default function SignUpPage() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", password: "" },
  })
  const password = useWatch({ control: form.control, name: "password" })
  const longEnough = password.length >= MIN_PASSWORD_LENGTH

  async function onSubmit(values: FormValues) {
    const result = await dispatch(signup(values))
    if (signup.fulfilled.match(result)) {
      toast.success("Account created. Please sign in.")
      navigate("/auth/sign-in")
    } else {
      form.setError("root", { message: result.payload ?? "Sign up failed." })
    }
  }

  return (
    <AuthLayout
      title="Create your account"
      description="Fill in the details to get started"
      footer={
        <p>
          Already have an account?{" "}
          <Link to="/auth/sign-in" className="text-foreground underline underline-offset-4">
            Sign in
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
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input autoComplete="name" placeholder="John Doe" {...field} />
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
                    <Input type="email" autoComplete="email" placeholder="m@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <PasswordInput autoComplete="new-password" {...field} />
                  </FormControl>
                  <p
                    className={cn(
                      "flex items-center gap-1.5 text-xs",
                      longEnough
                        ? "text-emerald-600 dark:text-emerald-500"
                        : fieldState.error
                          ? "text-destructive"
                          : "text-muted-foreground"
                    )}
                  >
                    {longEnough ? <Check className="size-3.5" /> : <X className="size-3.5" />}
                    {MIN_PASSWORD_LENGTH} or more characters
                  </p>
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
              Create account
            </Button>
          </form>
        </Form>
      </div>
    </AuthLayout>
  )
}
