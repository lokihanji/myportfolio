import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';

export function NavMain({ items = [] }: { items: NavItem[] }) {
    const page = usePage();
    return (
        <SidebarGroup className="px-2 py-0">
            <SidebarGroupLabel className="text-gray-400 font-semibold text-sm uppercase tracking-wider mb-4 text-center">
                Platform
            </SidebarGroupLabel>
            <SidebarMenu className="space-y-2">
                {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton 
                            asChild 
                            isActive={page.url.startsWith(item.href)} 
                            tooltip={{ children: item.title }}
                            className="w-full text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-gray-700/60 hover:to-gray-800/60 transition-all duration-300 rounded-xl group border border-transparent hover:border-gray-500/30"
                        >
                            <Link href={item.href} prefetch className="flex items-center space-x-3 px-4 py-3">
                                {item.icon && (
                                    <item.icon className="h-5 w-5 text-gray-400 group-hover:text-green-400 transition-colors duration-300" />
                                )}
                                <span className="text-gray-400 font-medium">{item.title}</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
}
