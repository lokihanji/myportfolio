import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Form, Head } from '@inertiajs/react';
import { Settings, Save, Globe, Palette, Bell, Shield, Database, User, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Settings',
        href: '/admin/settings',
    },
];

export default function SettingsPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [activeTab, setActiveTab] = useState('general');

    const tabs = [
        { id: 'general', label: 'General', icon: Settings },
        { id: 'appearance', label: 'Appearance', icon: Palette },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'security', label: 'Security', icon: Shield },
        { id: 'database', label: 'Database', icon: Database },
        { id: 'email', label: 'Email', icon: Mail }
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Settings" />

            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
                <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-6">
                    {/* Header */}
                    <div className="rounded-2xl border border-gray-700/50 bg-gray-800/30 p-6 backdrop-blur-sm shadow-2xl">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-3xl font-bold text-transparent">
                                    Settings
                                </h1>
                                <p className="mt-2 text-gray-300">Configure your portfolio and admin preferences</p>
                            </div>
                            <button
                                type="submit"
                                form="settings-form"
                                className="flex items-center space-x-2 rounded-xl bg-gradient-to-r from-green-600 to-blue-600 px-6 py-3 text-white transition-all duration-300 hover:from-green-700 hover:to-blue-700 hover:shadow-lg shadow-lg"
                            >
                                <Save className="h-5 w-5" />
                                <span>Save Changes</span>
                            </button>
                        </div>
                    </div>

                    <div className="grid gap-6 lg:grid-cols-4">
                        {/* Sidebar Navigation */}
                        <div className="lg:col-span-1">
                            <div className="rounded-2xl border border-gray-700/50 bg-gray-800/30 p-4 backdrop-blur-sm shadow-2xl">
                                <nav className="space-y-2">
                                    {tabs.map((tab) => (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveTab(tab.id)}
                                            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-300 ${
                                                activeTab === tab.id
                                                    ? 'bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-500/30 text-green-400'
                                                    : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                                            }`}
                                        >
                                            <tab.icon className="h-5 w-5" />
                                            <span className="font-medium">{tab.label}</span>
                                        </button>
                                    ))}
                                </nav>
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="lg:col-span-3">
                            <Form id="settings-form" method="post" action="/admin/settings" className="space-y-6">
                                {/* General Settings */}
                                {activeTab === 'general' && (
                                    <div className="rounded-2xl border border-gray-700/50 bg-gray-800/30 p-6 backdrop-blur-sm shadow-2xl">
                                        <div className="flex items-center space-x-3 mb-6">
                                            <div className="p-2 rounded-lg bg-gradient-to-r from-green-500/20 to-blue-500/20">
                                                <Settings className="h-6 w-6 text-green-400" />
                                            </div>
                                            <h2 className="text-2xl font-bold text-white">General Settings</h2>
                                        </div>
                                        
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-300 mb-2">Site Name</label>
                                                <input
                                                    type="text"
                                                    name="site_name"
                                                    defaultValue="Edizon Tabac Portfolio"
                                                    className="w-full rounded-xl border border-gray-600/50 bg-gray-700/30 px-4 py-3 text-white placeholder-gray-400 transition-all duration-300 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-300 mb-2">Site URL</label>
                                                <input
                                                    type="url"
                                                    name="site_url"
                                                    defaultValue="https://edizontabac.com"
                                                    className="w-full rounded-xl border border-gray-600/50 bg-gray-700/30 px-4 py-3 text-white placeholder-gray-400 transition-all duration-300 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-300 mb-2">Admin Email</label>
                                                <input
                                                    type="email"
                                                    name="admin_email"
                                                    defaultValue="edizon.tabac@dssc.edu.ph"
                                                    className="w-full rounded-xl border border-gray-600/50 bg-gray-700/30 px-4 py-3 text-white placeholder-gray-400 transition-all duration-300 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-300 mb-2">Timezone</label>
                                                <select
                                                    name="timezone"
                                                    defaultValue="Asia/Manila"
                                                    className="w-full rounded-xl border border-gray-600/50 bg-gray-700/30 px-4 py-3 text-white transition-all duration-300 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none"
                                                >
                                                    <option value="Asia/Manila">Asia/Manila (UTC+8)</option>
                                                    <option value="UTC">UTC (UTC+0)</option>
                                                    <option value="America/New_York">America/New_York (UTC-5)</option>
                                                    <option value="Europe/London">Europe/London (UTC+0)</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Appearance Settings */}
                                {activeTab === 'appearance' && (
                                    <div className="rounded-2xl border border-gray-700/50 bg-gray-800/30 p-6 backdrop-blur-sm shadow-2xl">
                                        <div className="flex items-center space-x-3 mb-6">
                                            <div className="p-2 rounded-lg bg-gradient-to-r from-green-500/20 to-blue-500/20">
                                                <Palette className="h-6 w-6 text-green-400" />
                                            </div>
                                            <h2 className="text-2xl font-bold text-white">Appearance Settings</h2>
                                        </div>
                                        
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-300 mb-2">Theme</label>
                                                <select
                                                    name="theme"
                                                    defaultValue="dark"
                                                    className="w-full rounded-xl border border-gray-600/50 bg-gray-700/30 px-4 py-3 text-white transition-all duration-300 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none"
                                                >
                                                    <option value="dark">Dark Theme</option>
                                                    <option value="light">Light Theme</option>
                                                    <option value="auto">Auto (System)</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-300 mb-2">Primary Color</label>
                                                <input
                                                    type="color"
                                                    name="primary_color"
                                                    defaultValue="#10b981"
                                                    className="w-full h-12 rounded-xl border border-gray-600/50 bg-gray-700/30 transition-all duration-300 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-300 mb-2">Secondary Color</label>
                                                <input
                                                    type="color"
                                                    name="secondary_color"
                                                    defaultValue="#3b82f6"
                                                    className="w-full h-12 rounded-xl border border-gray-600/50 bg-gray-700/30 transition-all duration-300 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-300 mb-2">Font Family</label>
                                                <select
                                                    name="font_family"
                                                    defaultValue="inter"
                                                    className="w-full rounded-xl border border-gray-600/50 bg-gray-700/30 px-4 py-3 text-white transition-all duration-300 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none"
                                                >
                                                    <option value="inter">Inter</option>
                                                    <option value="roboto">Roboto</option>
                                                    <option value="open-sans">Open Sans</option>
                                                    <option value="poppins">Poppins</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Security Settings */}
                                {activeTab === 'security' && (
                                    <div className="rounded-2xl border border-gray-700/50 bg-gray-800/30 p-6 backdrop-blur-sm shadow-2xl">
                                        <div className="flex items-center space-x-3 mb-6">
                                            <div className="p-2 rounded-lg bg-gradient-to-r from-green-500/20 to-blue-500/20">
                                                <Shield className="h-6 w-6 text-green-400" />
                                            </div>
                                            <h2 className="text-2xl font-bold text-white">Security Settings</h2>
                                        </div>
                                        
                                        <div className="space-y-6">
                                            <div className="grid md:grid-cols-2 gap-6">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-300 mb-2">Current Password</label>
                                                    <div className="relative">
                                                        <input
                                                            type={showPassword ? "text" : "password"}
                                                            name="current_password"
                                                            className="w-full rounded-xl border border-gray-600/50 bg-gray-700/30 px-4 py-3 pr-12 text-white placeholder-gray-400 transition-all duration-300 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none"
                                                            placeholder="Enter current password"
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() => setShowPassword(!showPassword)}
                                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-green-400 transition-colors duration-200 p-1"
                                                        >
                                                            {showPassword ? (
                                                                <EyeOff className="h-5 w-5" />
                                                            ) : (
                                                                <Eye className="h-5 w-5" />
                                                            )}
                                                        </button>
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-300 mb-2">New Password</label>
                                                    <div className="relative">
                                                        <input
                                                            type={showConfirmPassword ? "text" : "password"}
                                                            name="new_password"
                                                            className="w-full rounded-xl border border-gray-600/50 bg-gray-700/30 px-4 py-3 pr-12 text-white placeholder-gray-400 transition-all duration-300 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none"
                                                            placeholder="Enter new password"
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-green-400 transition-colors duration-200 p-1"
                                                        >
                                                            {showConfirmPassword ? (
                                                                <EyeOff className="h-5 w-5" />
                                                            ) : (
                                                                <Eye className="h-5 w-5" />
                                                            )}
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div className="grid md:grid-cols-2 gap-6">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-300 mb-2">Two-Factor Authentication</label>
                                                    <select
                                                        name="two_factor"
                                                        defaultValue="enabled"
                                                        className="w-full rounded-xl border border-gray-600/50 bg-gray-700/30 px-4 py-3 text-white transition-all duration-300 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none"
                                                    >
                                                        <option value="enabled">Enabled</option>
                                                        <option value="disabled">Disabled</option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-300 mb-2">Session Timeout</label>
                                                    <select
                                                        name="session_timeout"
                                                        defaultValue="30"
                                                        className="w-full rounded-xl border border-gray-600/50 bg-gray-700/30 px-4 py-3 text-white transition-all duration-300 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none"
                                                    >
                                                        <option value="15">15 minutes</option>
                                                        <option value="30">30 minutes</option>
                                                        <option value="60">1 hour</option>
                                                        <option value="120">2 hours</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Notifications Settings */}
                                {activeTab === 'notifications' && (
                                    <div className="rounded-2xl border border-gray-700/50 bg-gray-800/30 p-6 backdrop-blur-sm shadow-2xl">
                                        <div className="flex items-center space-x-3 mb-6">
                                            <div className="p-2 rounded-lg bg-gradient-to-r from-green-500/20 to-blue-500/20">
                                                <Bell className="h-6 w-6 text-green-400" />
                                            </div>
                                            <h2 className="text-2xl font-bold text-white">Notification Settings</h2>
                                        </div>
                                        
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between p-4 rounded-xl bg-gray-700/20 border border-gray-600/30">
                                                <div>
                                                    <h3 className="font-medium text-white">Email Notifications</h3>
                                                    <p className="text-sm text-gray-400">Receive notifications via email</p>
                                                </div>
                                                <input
                                                    type="checkbox"
                                                    name="email_notifications"
                                                    defaultChecked
                                                    className="rounded border-gray-600 bg-gray-700/30 text-green-500 focus:ring-green-500 focus:ring-2"
                                                />
                                            </div>
                                            
                                            <div className="flex items-center justify-between p-4 rounded-xl bg-gray-700/20 border border-gray-600/30">
                                                <div>
                                                    <h3 className="font-medium text-white">Contact Form Submissions</h3>
                                                    <p className="text-sm text-gray-400">Notify when someone submits a contact form</p>
                                                </div>
                                                <input
                                                    type="checkbox"
                                                    name="contact_notifications"
                                                    defaultChecked
                                                    className="rounded border-gray-600 bg-gray-700/30 text-green-500 focus:ring-green-500 focus:ring-2"
                                                />
                                            </div>
                                            
                                            <div className="flex items-center justify-between p-4 rounded-xl bg-gray-700/20 border border-gray-600/30">
                                                <div>
                                                    <h3 className="font-medium text-white">Portfolio Views</h3>
                                                    <p className="text-sm text-gray-400">Daily summary of portfolio views</p>
                                                </div>
                                                <input
                                                    type="checkbox"
                                                    name="portfolio_notifications"
                                                    defaultChecked
                                                    className="rounded border-gray-600 bg-gray-700/30 text-green-500 focus:ring-green-500 focus:ring-2"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Database Settings */}
                                {activeTab === 'database' && (
                                    <div className="rounded-2xl border border-gray-700/50 bg-gray-800/30 p-6 backdrop-blur-sm shadow-2xl">
                                        <div className="flex items-center space-x-3 mb-6">
                                            <div className="p-2 rounded-lg bg-gradient-to-r from-green-500/20 to-blue-500/20">
                                                <Database className="h-6 w-6 text-green-400" />
                                            </div>
                                            <h2 className="text-2xl font-bold text-white">Database Settings</h2>
                                        </div>
                                        
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-300 mb-2">Database Host</label>
                                                <input
                                                    type="text"
                                                    name="db_host"
                                                    defaultValue="localhost"
                                                    className="w-full rounded-xl border border-gray-600/50 bg-gray-700/30 px-4 py-3 text-white placeholder-gray-400 transition-all duration-300 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-300 mb-2">Database Name</label>
                                                <input
                                                    type="text"
                                                    name="db_name"
                                                    defaultValue="portfolio_db"
                                                    className="w-full rounded-xl border border-gray-600/50 bg-gray-700/30 px-4 py-3 text-white placeholder-gray-400 transition-all duration-300 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-300 mb-2">Database User</label>
                                                <input
                                                    type="text"
                                                    name="db_user"
                                                    defaultValue="portfolio_user"
                                                    className="w-full rounded-xl border border-gray-600/50 bg-gray-700/30 px-4 py-3 text-white placeholder-gray-400 transition-all duration-300 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-300 mb-2">Database Port</label>
                                                <input
                                                    type="number"
                                                    name="db_port"
                                                    defaultValue="3306"
                                                    className="w-full rounded-xl border border-gray-600/50 bg-gray-700/30 px-4 py-3 text-white placeholder-gray-400 transition-all duration-300 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none"
                                                />
                                            </div>
                                        </div>
                                        
                                        <div className="mt-6 p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/30">
                                            <p className="text-yellow-400 text-sm">
                                                ⚠️ Database settings should only be changed by experienced developers. 
                                                Incorrect settings may break your application.
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {/* Email Settings */}
                                {activeTab === 'email' && (
                                    <div className="rounded-2xl border border-gray-700/50 bg-gray-800/30 p-6 backdrop-blur-sm shadow-2xl">
                                        <div className="flex items-center space-x-3 mb-6">
                                            <div className="p-2 rounded-lg bg-gradient-to-r from-green-500/20 to-blue-500/20">
                                                <Mail className="h-6 w-6 text-green-400" />
                                            </div>
                                            <h2 className="text-2xl font-bold text-white">Email Settings</h2>
                                        </div>
                                        
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-300 mb-2">SMTP Host</label>
                                                <input
                                                    type="text"
                                                    name="smtp_host"
                                                    defaultValue="smtp.gmail.com"
                                                    className="w-full rounded-xl border border-gray-600/50 bg-gray-700/30 px-4 py-3 text-white placeholder-gray-400 transition-all duration-300 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-300 mb-2">SMTP Port</label>
                                                <input
                                                    type="number"
                                                    name="smtp_port"
                                                    defaultValue="587"
                                                    className="w-full rounded-xl border border-gray-600/50 bg-gray-700/30 px-4 py-3 text-white placeholder-gray-400 transition-all duration-300 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-300 mb-2">SMTP Username</label>
                                                <input
                                                    type="email"
                                                    name="smtp_username"
                                                    defaultValue="edizon.tabac@dssc.edu.ph"
                                                    className="w-full rounded-xl border border-gray-600/50 bg-gray-700/30 px-4 py-3 text-white placeholder-gray-400 transition-all duration-300 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-300 mb-2">Encryption</label>
                                                <select
                                                    name="smtp_encryption"
                                                    defaultValue="tls"
                                                    className="w-full rounded-xl border border-gray-600/50 bg-gray-700/30 px-4 py-3 text-white transition-all duration-300 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none"
                                                >
                                                    <option value="tls">TLS</option>
                                                    <option value="ssl">SSL</option>
                                                    <option value="none">None</option>
                                                </select>
                                            </div>
                                        </div>
                                        
                                        <div className="mt-6 p-4 rounded-xl bg-blue-500/10 border border-blue-500/30">
                                            <p className="text-blue-400 text-sm">
                                                ℹ️ Test your email configuration after saving changes to ensure emails are sent correctly.
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
