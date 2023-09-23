Welcome to NextJs project

### Install NextJs project setup
run command from root folder - npx create-next-app@latest

### Install clerk authentication 
First login to https://clerk.com/ and select authentication option

run command from root folder - npm install @clerk/nextjs

create new file ".env.local" under root folder

copy the values from website and paste in .env.local file
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=*****************************
CLERK_SECRET_KEY=*****************************

### Coding
update in layout.tsx
```
import { ClerkProvider } from '@clerk/nextjs'
....
....
return (
  <ClerkProvider>
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  </ClerkProvider>
)
```

create new file "middleware.ts" under main root folder <br/>
```
import { authMiddleware } from "@clerk/nextjs";
 
// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your middleware
export default authMiddleware({});
 
export const config = {
      matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
```

### NavBar
create new folder "components" and <br/>
create new file "NavBar.tsx" <br/>
and import into layout.tsx <br/>
NavBar.tsx 
```
import { UserButton } from '@clerk/nextjs';
import Image from 'next/image';
import React from 'react'

const NavBar = () => {
  return (
    <div className='flex items-center justify-between p-3 px-5 shadow-md border-b-[1px]'>
      <Image src='/logo.png' alt='logo' width={100} height={100} />
      <div className='hidden md:flex gap-5'>
        <h2 className='hover:bg-blue-500 px-3 cursor-pointer p-2 rounded-full hover:text-white'>Home</h2>
        <h2 className='hover:bg-blue-500 px-3 cursor-pointer p-2 rounded-full hover:text-white'>History</h2>
        <h2 className='hover:bg-blue-500 px-3 cursor-pointer p-2 rounded-full hover:text-white'>Contact Us</h2>
      </div>
      <UserButton />
    </div>
  )
}

export default NavBar
```

