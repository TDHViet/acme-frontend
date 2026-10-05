import type { ReactNode } from "react"
import { Link } from "react-router-dom"
import { AcmeLogo } from "@/components/icons/brand-icons"
import { ModeToggle } from "@/components/mode-toggle"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export function AuthLayout({
  title,
  description,
  footer,
  children,
}: {
  title: string
  description: string
  footer: ReactNode
  children: ReactNode
}) {
  return (
    <div className="bg-muted relative flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="absolute top-4 right-4">
        <ModeToggle />
      </div>
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link to="/" className="flex items-center gap-2 self-center font-medium">
          <div className="bg-primary text-primary-foreground flex size-7 items-center justify-center rounded-md">
            <AcmeLogo className="size-3.5" />
          </div>
          Acme
        </Link>
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-xl">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardHeader>
          <CardContent>{children}</CardContent>
          <CardFooter className="justify-center text-sm text-muted-foreground">{footer}</CardFooter>
        </Card>
      </div>
    </div>
  )
}
