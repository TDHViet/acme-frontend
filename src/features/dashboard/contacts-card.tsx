import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export type ContactStat = { name: string; visits: number }

export function ContactsCard({ title, description, contacts }: { title: string; description: string; contacts: ContactStat[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {contacts.length === 0 ? (
          <p className="text-muted-foreground text-sm">No contacts yet.</p>
        ) : (
          <ul className="space-y-4">
            {contacts.map((contact) => (
              <li key={contact.name} className="flex items-center gap-3">
                <Avatar className="size-8">
                  <AvatarFallback className="text-xs">{contact.name[0]}</AvatarFallback>
                </Avatar>
                <span className="flex-1 truncate text-sm font-medium">{contact.name}</span>
                <span className="text-muted-foreground text-sm tabular-nums">{contact.visits}</span>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  )
}
