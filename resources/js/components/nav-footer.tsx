import { Icon } from '@/components/icon';
import { SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { type ComponentPropsWithoutRef } from 'react';

export function NavFooter({
    items,
    className,
    ...props
}: ComponentPropsWithoutRef<typeof SidebarGroup> & {
    items: NavItem[];
}) {
    return (
        <SidebarGroup {...props} className={`group-data-[collapsible=icon]:p-0 ${className || ''}`}>
            <SidebarGroupContent>
                <SidebarMenu className="space-y-2">
                    {items.map((item) => (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton
                                asChild
                                className="w-full text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-gray-700/60 hover:to-gray-800/60 transition-all duration-300 rounded-xl group border border-transparent hover:border-gray-500/30"
                            >
                                <a href={item.href} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 px-4 py-3">
                                    {item.icon && <Icon iconNode={item.icon} className="h-5 w-5 text-gray-400 group-hover:text-green-400 transition-colors duration-300" />}
                                    <span className="text-gray-400 font-medium">{item.title}</span>
                                </a>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
}
