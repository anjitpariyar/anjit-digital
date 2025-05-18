import { BookOpen } from 'lucide-react'
import React from 'react'

function Footer() {
  return (
    <footer className='bg-background w-full border-t py-6'>
      <div className='mx-absolute container px-4 md:px-6'>
        <div className='flex flex-col items-center justify-center gap-4 text-center'>
          <div className='flex items-center gap-2'>
            <BookOpen className='text-primary h-6 w-6' />
            <span className='text-xl font-bold'>SkillUp</span>
          </div>
          <p className='text-muted-foreground text-sm'>
            © {new Date().getFullYear()} SkillUp. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
