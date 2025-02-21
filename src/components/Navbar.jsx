import React, { useState } from 'react'
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { Link } from 'react-router'
import { useLogout } from '@/hooks/useLogout'
import { Button } from './ui/button'
import { LoaderCircle, LogOut } from 'lucide-react'

const Navbar = () => {
    const [pending,setPending] = useState(false)
    const { logout, isLoading } = useLogout();
    return (
        <header className='fixed w-full h-16 top-0 left-0 z-50 backdrop-blur-3xl border-b-[1px] border-purple-300'>
            <nav className='container m-auto h-full flex items-center justify-between'>
                <img className='w-32 mt-5 overflow-hidden h-auto' src='https://hirethen.com/wp-content/uploads/2024/11/New-Logo-copy.png' />
                <NavigationMenu>
                    <NavigationMenuList className="flex gap-5">
                        <NavigationMenuItem>
                            <Link to="/">
                                <NavigationMenuLink>
                                    Dashboard
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <Link to="/transction">
                                <NavigationMenuLink>
                                    Transaction
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <Link to="/budget">
                                <NavigationMenuLink>
                                    Budget
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                        {pending ? <LoaderCircle className="animate-spin" /> :
                            <Button onClick={() => {setPending(true);logout()}} variant="outline">
                                <LogOut /> Logout
                            </Button>}
                    </NavigationMenuList>
                </NavigationMenu>
            </nav>
        </header>

    )
}

export default Navbar