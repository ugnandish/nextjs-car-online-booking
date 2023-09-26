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

### Search Filter
create new file "SearchInput.tsx" under components/Home
```
import React from 'react'

const SearchInput = () => {
  return (
    <div className="mt-5">
      <h2 className='text-center text-[20px] text-gray-400 mb-3'>Lets Search what you need</h2>
      <div className='flex justify-center'>
        <div className='flex bg-gray-100 p-1 px-5 gap-2 rounded-full divide-x'>
          <div className='flex items-center'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-black">
              <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
            </svg>
            <input type='text' placeholder='Location' className='p-2 outline-none bg-transparent'/>
          </div>
          <div>
            <input type='date' className='p-2 outline-none bg-transparent text-gray-400' />
          </div>
        </div>  
      </div>  
    </div>
  )
}

export default SearchInput
```

### Filter Options with Daisy UI
install daisy UI <br />
npm i -D daisyui@latest <br />
create new file "CarsFilterOption.tsx" under components/Home
and import into page.tsx
```
import React from 'react'

const CarsFiltersOption = () => {
  return (
    <div className='mt-10 flex items-center justify-between'>
      <div>
        <h2 className='text-[30px] font-bold'>Cars Catalog</h2>   
        <h2>Explore our cars you might likes</h2>
      </div>
      <div className='flex gap-5'>
        <select className="select select-bordered w-full max-w-xs">
          <option disabled selected>Price</option>
          <option>Min to Max</option>
          <option>Max to Min</option>
        </select>
        <select className="select select-bordered w-full md:block max-w-xs hidden">
          <option disabled selected>Manufactural</option>  
          <option>BMW</option>
          <option>Maruthi</option>
          <option>Honda</option>   
        </select>
      </div>
    </div>
  )
}

export default CarsFiltersOption
```

### HyGraph setup and updates 

### GraphQL API Request
install npm graphql <br/>
"npm add graphql-request graphql" <br/>
create new folder "services" under root folder <br />
create new file "index.tsx" under services folder <br/>
```
import request, {gql} from "graphql-request"

export const getCarsList = async() => {
  const query=gql`
    query CarLists {
      carLists {
        carAvg
        id
        name
        price
        publishedAt
        updatedAt
        createdAt
        seat
        image {
          url
        }
        carType
        carBrand
      }
    }
  `
  const result = await request('https://api-us-east-1-shared-usea1-02.hygraph.com/v2/clmzx8gld00mm01ug0hjs2njs/master', query)
  return result;
}
```
and update in page.tsx <br/>
```
"use client"
import CarsFiltersOption from "@/components/Home/CarsFiltersOption";
import Hero from "@/components/Home/Hero";
import SearchInput from "@/components/Home/SearchInput";
import { getCarsList } from "@/services";
import { useEffect, useState } from "react";

export default function Home() {
  const [carsList, setCarsList] = useState<any>([])

  useEffect(() => {
    getCarsList_();
  },[])

  const getCarsList_ = async() => {
    const result:any = await getCarsList();
    setCarsList(result?.carLists)
  }

  return (
    <div className="p-5 sm:px-10 md:px-20">
      <Hero />
      <SearchInput />
      <CarsFiltersOption />
    </div>    
  )
}
```

### Display Cars List
create a new file "CarsList.tsx" under components/Home <br />
and add/import to page.tsx <br />
```
import React from 'react'
import CarCard from './CarCard'

const CarsList = (props:any) => {
  return (
    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
      {props.carsList.map((car:any, index:number) => (
        <div key={index}>
          <CarCard car={car} />
        </div>
      ))}
    </div>
  )
}

export default CarsList
```

```
"use client"
import CarsFiltersOption from "@/components/Home/CarsFiltersOption";
import CarsList from "@/components/Home/CarsList";
import Hero from "@/components/Home/Hero";
import SearchInput from "@/components/Home/SearchInput";
import { getCarsList } from "@/services";
import { useEffect, useState } from "react";

export default function Home() {
  const [carsList, setCarsList] = useState<any>([])

  useEffect(() => {
    getCarsList_();
  },[])

  const getCarsList_ = async() => {
    const result:any = await getCarsList();
    setCarsList(result?.carLists)
  }

  return (
    <div className="p-5 sm:px-10 md:px-20">
      <Hero />
      <SearchInput />
      <CarsFiltersOption />
      <CarsList carsList={carsList} />
    </div>    
  )
}
```
create new file "CarCard.tsx" under components/Home <br/>
install React Icons <br/>
"npm install react-icons --save" <br/>
```
import React, { useState } from 'react'
import Image from 'next/image'
import { FaGasPump } from "react-icons/fa";
import { MdAirlineSeatReclineNormal } from "react-icons/md";
import { PiSteeringWheelFill } from "react-icons/pi";

const CarCard = (props:any) => {
  const [car, setCar] = useState(props.car);

  return (
    <div className='group bg-gray-50 p-2 sm:p-5 rounded-3xl m-1 sm:m-5 hover:bg-white hover:border-[1px] cursor-pointer duration-50 border-blue-500'>
      <h2 className='text-[20px] font-medium mb-2'>{car.name}</h2>
      <h2 className='text-[28px] font-bold mb-2'>
        <span className='text-[12px] font-light'>$ </span>
        {car.price}
        <span className='text-[12px] font-light'> /day</span>
      </h2>
      <div className='flex justify-center'>
        <Image src={car?.image?.url} alt={car.name} width={220} height={200} className='w-[250px] h-[150px] mb-3 object-contain' />
      </div>
      <div className='flex justify-around group-hover:hidden'>
        <div className='text-center text-gray-500'>
          <PiSteeringWheelFill className="w-full text-[22px] mb-2" />
          <h2 className='line-clamp-5 text-[14px] font-light'>{car?.carType}</h2>
        </div>
        <div className='text-center text-gray-500'>
          <MdAirlineSeatReclineNormal  className="w-full text-[22px] mb-2" />
          <h2 className='line-clamp-5 text-[14px] font-light'>{car.seat} Seat</h2>
        </div>
        <div className=' text-center text-gray-500 '>
          <FaGasPump className="w-full text-[22px] mb-2" />
          <h2 className='line-clamp-5 text-[14px] font-light'>{car.carAvg} MPG</h2>
        </div>
      </div>
      <button className='hidden group-hover:flex bg-gradient-to-r from-blue-400 to-blue-700 p-2 rounded-lg text-white w-full px-5 justify-between'>
        Rent Now
        <span className='bg-blue-400 p-1 rounded-md '>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-white">
            <path fillRule="evenodd" d="M12.97 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06l6.22-6.22H3a.75.75 0 010-1.5h16.19l-6.22-6.22a.75.75 0 010-1.06z" clipRule="evenodd" />
          </svg>
        </span>
      </button>
    </div>
  )
}

export default CarCard
```

if image not loaded, then update in "next.config.js" <br/>
```
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains:['media.graphassets.com']
    }
}

module.exports = nextConfig
```

### Build Filter List Functionality
