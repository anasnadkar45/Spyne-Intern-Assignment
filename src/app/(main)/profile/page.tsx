import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mail, User } from 'lucide-react'

export default async function ProfilePage() {
  const { getUser } = getKindeServerSession()
  const user = await getUser()

  if (!user) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">User Profile</h1>
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="w-20 h-20">
            <AvatarImage src={user.picture || ''} alt={user.given_name || 'User'} />
            <AvatarFallback>{user.given_name?.[0] || user.family_name?.[0] || 'U'}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle>{user.given_name} {user.family_name}</CardTitle>
            <CardDescription>{user.email}</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">FirstName</Label>
            <div className="flex items-center space-x-2">
              <User className="w-4 h-4 text-muted-foreground" />
              <Input id="username" value={user.given_name || ''} readOnly disabled/>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="username">LastName</Label>
            <div className="flex items-center space-x-2">
              <User className="w-4 h-4 text-muted-foreground" />
              <Input id="username" value={user.family_name || ''} readOnly disabled/>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4 text-muted-foreground" />
              <Input id="email" value={user.email || ''} readOnly disabled />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}