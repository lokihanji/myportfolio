import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { BookOpen, Folder, LayoutGrid, User, Briefcase, Code, Palette, Mail, Settings, BarChart3, FileText, Image, Globe, Database } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Profile Management',
        href: route('admin.profile'),
        icon: User,
    },
    {
        title: 'Experience',
        href: route('admin.experience'),
        icon: Briefcase,
    },
    {
        title: 'Skills',
        href: route('admin.skills'),
        icon: Code,
    },
    {
        title: 'Projects',
        href: route('admin.projects'),
        icon: Folder,
    },
    {
        title: 'Portfolio',
        href: route('admin.portfolio'),
        icon: Image,
    },
    {
        title: 'Contact Info',
        href: route('admin.contact'),
        icon: Mail,
    },
    {
        title: 'Analytics',
        href: route('admin.analytics'),
        icon: BarChart3,
    },
    {
        title: 'Content',
        href: route('admin.content'),
        icon: FileText,
    },
    {
        title: 'Settings',
        href: route('admin.settings'),
        icon: Settings,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'View Portfolio',
        href: route('home'),
        icon: Globe,
    },
    {
        title: 'Database',
        href: route('admin.database'),
        icon: Database,
    },
    {
        title: 'Documentation',
        href: route('admin.docs'),
        icon: BookOpen,
    },
];

export function AppSidebar() {
    return (
        <Sidebar 
            collapsible="icon" 
            variant="inset" 
            className="bg-transparent border-r border-gray-600/30 shadow-2xl"
        >
            <SidebarHeader className="border-b border-gray-600/30 bg-transparent p-6">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton 
                            size="lg" 
                            asChild 
                            className="hover:bg-gradient-to-r hover:from-gray-700/50 hover:to-gray-800/50 transition-all duration-300 rounded-2xl p-3"
                        >
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent className="bg-transparent p-6">
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter className="border-t border-gray-600/30 bg-transparent p-6">
                <NavFooter items={footerNavItems} />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
