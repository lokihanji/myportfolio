import { Breadcrumbs } from '@/components/breadcrumbs';
import { Icon } from '@/components/icon';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { NavigationMenu, NavigationMenuItem, NavigationMenuList, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { UserMenuContent } from '@/components/user-menu-content';
import { useInitials } from '@/hooks/use-initials';
import { cn } from '@/lib/utils';
import { type BreadcrumbItem, type NavItem, type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { BookOpen, Folder, LayoutGrid, Menu, Search } from 'lucide-react';
import AppLogo from './app-logo';
import AppLogoIcon from './app-logo-icon';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
    },
];

const rightNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: Folder,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
    },
];

const activeItemStyles = 'text-white bg-gradient-to-r from-gray-700/80 to-gray-800/80 border border-gray-500/50 shadow-lg';

interface AppHeaderProps {
    breadcrumbs?: BreadcrumbItem[];
}

export function AppHeader({ breadcrumbs = [] }: AppHeaderProps) {
    const page = usePage<SharedData>();
    const { auth } = page.props;
    const getInitials = useInitials();
    return (
        <>
            <div className="rounded-b-xl border-b border-gray-600/30 bg-gradient-to-r from-gray-800/95 via-gray-900/95 to-black/95 backdrop-blur-md shadow-xl">
                <div className="mx-auto flex h-16 items-center px-6 md:max-w-7xl">
                    {/* Mobile Menu */}
                    <div className="lg:hidden">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="mr-3 h-[38px] w-[38px] text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-gray-700/60 hover:to-gray-800/60 rounded-xl transition-all duration-300">
                                    <Menu className="h-5 w-5" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="flex h-full w-64 flex-col items-stretch justify-between bg-gradient-to-br from-gray-900 via-gray-800 to-black border-r border-gray-600/30">
                                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                                <SheetHeader className="flex justify-start text-left p-6">
                                    <AppLogoIcon className="h-8 w-8 fill-current text-green-400" />
                                </SheetHeader>
                                <div className="flex h-full flex-1 flex-col space-y-4 p-6">
                                    <div className="flex h-full flex-col justify-between text-sm">
                                        <div className="flex flex-col space-y-4">
                                            {mainNavItems.map((item) => (
                                                <Link key={item.title} href={item.href} className="flex items-center space-x-3 font-medium text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-gray-700/60 hover:to-gray-800/60 p-3 rounded-xl transition-all duration-300">
                                                    {item.icon && <Icon iconNode={item.icon} className="h-5 w-5 text-green-400" />}
                                                    <span>{item.title}</span>
                                                </Link>
                                            ))}
                                        </div>

                                        <div className="flex flex-col space-y-4">
                                            {rightNavItems.map((item) => (
                                                <a
                                                    key={item.title}
                                                    href={item.href}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center space-x-3 font-medium text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-gray-700/60 hover:to-gray-800/60 p-3 rounded-xl transition-all duration-300"
                                                >
                                                    {item.icon && <Icon iconNode={item.icon} className="h-5 w-5 text-green-400" />}
                                                    <span>{item.title}</span>
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>

                    <Link href="/dashboard" prefetch className="flex items-center space-x-3">
                        <AppLogo />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="ml-8 hidden h-full items-center space-x-6 lg:flex">
                        <NavigationMenu className="flex h-full items-stretch">
                            <NavigationMenuList className="flex h-full items-stretch space-x-3">
                                {mainNavItems.map((item, index) => (
                                    <NavigationMenuItem key={index} className="relative flex h-full items-center">
                                        <Link
                                            href={item.href}
                                            className={cn(
                                                'h-10 cursor-pointer px-4 rounded-xl text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-gray-700/60 hover:to-gray-800/60 transition-all duration-300 border border-transparent hover:border-gray-500/50',
                                                page.url === item.href && activeItemStyles,
                                            )}
                                        >
                                            {item.icon && <Icon iconNode={item.icon} className="mr-2 h-4 w-4 text-green-400" />}
                                            {item.title}
                                        </Link>
                                        {page.url === item.href && (
                                            <div className="absolute bottom-0 left-0 h-1 w-full translate-y-px bg-gradient-to-r from-green-400 to-blue-400 rounded-full"></div>
                                        )}
                                    </NavigationMenuItem>
                                ))}
                            </NavigationMenuList>
                        </NavigationMenu>
                    </div>

                    <div className="ml-auto flex items-center space-x-3">
                        <div className="relative flex items-center space-x-2">
                            <Button variant="ghost" size="icon" className="group h-10 w-10 cursor-pointer text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-gray-700/60 hover:to-gray-800/60 rounded-xl transition-all duration-300">
                                <Search className="!size-5 opacity-80 group-hover:opacity-100" />
                            </Button>
                            <div className="hidden lg:flex">
                                {rightNavItems.map((item) => (
                                    <TooltipProvider key={item.title} delayDuration={0}>
                                        <Tooltip>
                                            <TooltipTrigger>
                                                <a
                                                    href={item.href}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="group ml-2 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-transparent p-0 text-sm font-medium text-gray-300 ring-offset-background transition-all duration-300 hover:bg-gradient-to-r hover:from-gray-700/60 hover:to-gray-800/60 hover:text-white focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 border border-transparent hover:border-gray-500/50"
                                                >
                                                    <span className="sr-only">{item.title}</span>
                                                    {item.icon && <Icon iconNode={item.icon} className="size-5 opacity-80 group-hover:opacity-100 text-green-400" />}
                                                </a>
                                            </TooltipTrigger>
                                            <TooltipContent className="bg-gray-800 border border-gray-600/30 text-white backdrop-blur-sm">
                                                <p>{item.title}</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                ))}
                            </div>
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="size-11 rounded-xl p-2 text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-gray-700/60 hover:to-gray-800/60 border border-transparent hover:border-gray-500/50 transition-all duration-300">
                                    <Avatar className="size-8 overflow-hidden rounded-full">
                                        <AvatarImage src={auth.user.avatar} alt={auth.user.name} />
                                        <AvatarFallback className="rounded-lg bg-gray-700 text-white">
                                            {getInitials(auth.user.name)}
                                        </AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56 bg-gray-800/95 border border-gray-600/30 backdrop-blur-md shadow-2xl rounded-xl" align="end">
                                <UserMenuContent user={auth.user} />
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>
            {breadcrumbs.length > 1 && (
                <div className="flex w-full border-b border-gray-600/30 bg-gradient-to-r from-gray-900/90 to-gray-800/90 backdrop-blur-md">
                    <div className="mx-auto flex h-14 w-full items-center justify-start px-6 text-gray-400 md:max-w-7xl">
                        <Breadcrumbs breadcrumbs={breadcrumbs} />
                    </div>
                </div>
            )}
        </>
    );
}
