import { toast } from "sonner"
import { GoogleIcon, MicrosoftIcon } from "@/components/icons/brand-icons"
import { Button } from "@/components/ui/button"

const providers = [
  { name: "Google", icon: GoogleIcon },
  { name: "Microsoft", icon: MicrosoftIcon },
]

export function SocialButtons() {
  return (
    <>
      <div className="grid grid-cols-2 gap-3">
        {providers.map(({ name, icon: Icon }) => (
          <Button
            key={name}
            type="button"
            variant="outline"
            onClick={() => toast.info(`${name} sign-in is not available yet.`)}
          >
            <Icon />
            {name}
          </Button>
        ))}
      </div>
      <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
        <span className="bg-card text-muted-foreground relative z-10 px-2">Or continue with email</span>
      </div>
    </>
  )
}
