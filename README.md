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

### Homepage
create new folder "Home" under components <br/>
create new file "Hero.tsx" under Home folder <br/>
add this Hero.tsx into page.tsx <br/>
Hero.tsx <br/>
```
import React from 'react'
import Image from 'next/image'

const Hero = () => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2'>
      <div>
        <h2 className='text-[40px] md:text-[60px] font-bold'>Premium Car <span className='text-blue-600'>Rental</span> in Your Area</h2>
        <h2 className='text-[20px] text-gray-500 pr-20 mt-5'>Book the selected car effortlessly, 
        Pay for driving only, Book the Car Now</h2>
        <button className='p-2 mt-5 bg-blue-500 text-white px-4 rounded-full hover:scale-105 transition-all'>
          Explore Cars
        </button>
      </div>
      <div>
        <Image src='/hero.png' alt='hero' width={400} height={500} className='w-full object-cover align-middle' />
      </div>
    </div>
  )
}

export default Hero
```

### Custom Font
update in Layout.tsx <br/>
```
....
import { Outfit  } from 'next/font/google'
....
const inter = Outfit ({ subsets: ['latin'] })
....
```

