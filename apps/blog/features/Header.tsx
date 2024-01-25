'use client'

import { Flex, Navbar, Typo } from '@zakelstorm/ui'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { Route } from 'nextjs-routes'
import { ReactNode } from 'react'

import Category from '@/public/category.svg'
import Home from '@/public/home.svg'
import User from '@/public/user.svg'

export const Header = () => {
  return (
    <AnimatePresence>
      <motion.div initial={{ translateY: '-100%' }} animate={{ translateY: 0 }}>
        <Flex direction='v' align='center' justify='center' className='h-200'>
          <Typo.Link href='/' className='bg-black text-white px-20'>
            코딩하는 폴제트
          </Typo.Link>
          <Typo.Text>
            프론트엔드 개발자, 코딩하는 폴제트의 작은 공간입니다.
          </Typo.Text>
          <GlobalNav />
        </Flex>
      </motion.div>
    </AnimatePresence>
  )
}

// @TODO: Link 수정
const GlobalNav = () => {
  return (
    <Navbar>
      <Flex>
        <NavIcon href={{ pathname: '/' }} title='Home' Icon={<Home />} />
        <NavIcon
          href={{ pathname: '/category' }}
          title='Category'
          Icon={<Category />}
        />
        <NavIcon href={{ pathname: '/user' }} title='User' Icon={<User />} />
      </Flex>
    </Navbar>
  )
}

const NavIcon = ({
  Icon,
  href,
  title,
}: {
  Icon: ReactNode
  href: Route
  title: string
}) => {
  return (
    <Link href={href} className='text-neutral-600'>
      <div className='flex justify-center text-transparent'>{Icon}</div>
      {title}
    </Link>
  )
}
