import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import toast from "react-hot-toast"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Button } from "../components/ui/button"
import { Eye, EyeOff, Mail, Lock } from "lucide-react"
import { LogoIcon } from "../components/icons/LogoIcon"
import { GoogleIcon } from "../components/icons/GoogleIcon"
import { MicrosoftIcon } from "../components/icons/MicrosoftIcon"
import AuthThemeSwitcher from "../components/AuthThemeSwitcher"
import { useAppDispatch, useAppSelector } from "./hooks"
import { login } from "../store"
import { Link, useNavigate } from "react-router-dom"

const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Password is required"),
})

type FormValues = z.infer<typeof schema>

export default function AuthSignIn() {
  const [show, setShow] = useState(false)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { status, error } = useAppSelector((s) => s.auth)
  const { handleSubmit, control } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", password: "" },
  })

  async function onSubmit(values: FormValues) {
    const res = await dispatch(login(values))
    if (login.fulfilled.match(res)) {
      toast.success("Đăng nhập thành công! Chào mừng bạn trở lại.")
      navigate("/dashboard")
    } else {
      toast.error("Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center gap-2 mb-8">
          <LogoIcon />
          <span className="text-lg font-semibold text-foreground">Acme</span>
        </div>
        <div className="bg-card rounded-lg border border-border p-8 space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-bold text-card-foreground">Sign in to your account</h1>
            <p className="text-sm text-muted-foreground">Welcome back! Please sign in to continue.</p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-card-foreground font-semibold">Email</Label>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Controller
                  control={control}
                  name="email"
                  render={({ field }) => <Input id="email" type="email" className="pl-9" {...field} />}
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-card-foreground font-semibold">Password</Label>
                <a className="text-sm text-card-foreground underline" href="#">Forgot password?</a>
              </div>
              <div className="relative mt-1">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Controller
                  control={control}
                  name="password"
                  render={({ field }) => (
                    <Input id="password" type={show ? "text" : "password"} className="pl-9 pr-9" {...field} />
                  )}
                />
                <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2" onClick={() => setShow((s) => !s)}>
                  {show ? <EyeOff className="h-4 w-4 text-muted-foreground" /> : <Eye className="h-4 w-4 text-muted-foreground" />}
                </button>
              </div>
            </div>
            {error && <div className="text-sm text-red-600">{error}</div>}
            <Button type="submit" className="w-full" disabled={status === "loading"}>
              Sign in
            </Button>
          </form>
          <div className="relative">
            <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-border" /></div>
            <div className="relative flex justify-center text-xs"><span className="bg-card px-2 text-muted-foreground">Or continue with</span></div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="flex items-center gap-2">
              <GoogleIcon size={16} />
              Google
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <MicrosoftIcon size={16} />
              Microsoft
            </Button>
          </div>
          <p className="text-center text-sm text-muted-foreground">
            Don't have an account? <Link to="/auth/sign-up" className="text-card-foreground underline">Sign up</Link>
          </p>
        </div>
      </div>
      <AuthThemeSwitcher />
    </div>
  )
}


