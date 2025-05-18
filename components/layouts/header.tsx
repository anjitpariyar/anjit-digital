import { BookOpen } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

function Header() {
  return (
    <header className='bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur'>
      <div className='container mx-auto flex h-16 items-center justify-between'>
        <div className='flex items-center gap-2'>
          <BookOpen className='text-primary h-6 w-6' />
          <span className='text-xl font-bold'>SkillUp</span>
        </div>
        <nav className='hidden gap-6 md:flex'>
          <Link href='#' className='hover:text-primary text-sm font-medium'>
            Courses
          </Link>
          <Link href='#' className='hover:text-primary text-sm font-medium'>
            Categories
          </Link>
          <Link href='#' className='hover:text-primary text-sm font-medium'>
            Instructors
          </Link>
          <Link href='#' className='hover:text-primary text-sm font-medium'>
            About
          </Link>
        </nav>
        <div className='flex items-center gap-4'>
          <Link
            href='#'
            className='hover:text-primary hidden text-sm font-medium sm:block'
          >
            Sign In
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Header
