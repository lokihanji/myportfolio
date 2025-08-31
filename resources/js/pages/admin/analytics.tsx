import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { TrendingUp, Users, Eye, MousePointer, Globe, Calendar, BarChart3, PieChart, Activity, Target, Zap, ArrowUp, ArrowDown } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Analytics',
        href: '/admin/analytics',
    },
];

export default function Analytics() {
    // Mock data - in a real app, this would come from your analytics service
    const stats = [
        {
            title: 'Total Visitors',
            value: '12,847',
            change: '+12.5%',
            changeType: 'increase',
            icon: Users,
            color: 'from-blue-500 to-blue-600'
        },
        {
            title: 'Page Views',
            value: '45,293',
            change: '+8.2%',
            changeType: 'increase',
            icon: Eye,
            color: 'from-green-500 to-green-600'
        },
        {
            title: 'Unique Visitors',
            value: '8,234',
            change: '+15.3%',
            changeType: 'increase',
            icon: Users,
            color: 'from-purple-500 to-purple-600'
        },
        {
            title: 'Bounce Rate',
            value: '32.1%',
            change: '-2.8%',
            changeType: 'decrease',
            icon: MousePointer,
            color: 'from-orange-500 to-orange-600'
        }
    ];

    const topPages = [
        { page: '/', views: 15420, change: '+12.5%' },
        { page: '/about', views: 8920, change: '+8.2%' },
        { page: '/projects', views: 6540, change: '+15.3%' },
        { page: '/contact', views: 4320, change: '+5.7%' },
        { page: '/skills', views: 3890, change: '+9.1%' }
    ];

    const trafficSources = [
        { source: 'Direct', percentage: 45, color: 'bg-blue-500' },
        { source: 'Organic Search', percentage: 32, color: 'bg-green-500' },
        { source: 'Social Media', percentage: 18, color: 'bg-purple-500' },
        { source: 'Referral', percentage: 5, color: 'bg-orange-500' }
    ];

    const recentActivity = [
        { action: 'New visitor from Philippines', time: '2 minutes ago', type: 'visit' },
        { action: 'Contact form submitted', time: '15 minutes ago', type: 'form' },
        { action: 'Portfolio viewed', time: '1 hour ago', type: 'view' },
        { action: 'Download requested', time: '2 hours ago', type: 'download' },
        { action: 'New visitor from USA', time: '3 hours ago', type: 'visit' }
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Analytics" />

            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
                <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-6">
                    {/* Header */}
                    <div className="rounded-2xl border border-gray-700/50 bg-gray-800/30 p-6 backdrop-blur-sm shadow-2xl">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-3xl font-bold text-transparent">
                                    Analytics Dashboard
                                </h1>
                                <p className="mt-2 text-gray-300">Track your portfolio performance and visitor insights</p>
                            </div>
                            <div className="flex items-center space-x-3">
                                <select className="px-4 py-2 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white text-sm">
                                    <option>Last 7 days</option>
                                    <option>Last 30 days</option>
                                    <option>Last 3 months</option>
                                    <option>Last year</option>
                                </select>
                                <button className="px-4 py-2 bg-gray-700/50 hover:bg-gray-600/50 border border-gray-600/50 rounded-xl text-white text-sm transition-all duration-300">
                                    <Calendar className="h-4 w-4 inline mr-2" />
                                    Export
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {stats.map((stat, index) => (
                            <div key={index} className="rounded-2xl border border-gray-700/50 bg-gray-800/30 p-6 backdrop-blur-sm shadow-2xl">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-400">{stat.title}</p>
                                        <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                                        <div className="flex items-center mt-2">
                                            {stat.changeType === 'increase' ? (
                                                <ArrowUp className="h-4 w-4 text-green-400 mr-1" />
                                            ) : (
                                                <ArrowDown className="h-4 w-4 text-red-400 mr-1" />
                                            )}
                                            <span className={`text-sm font-medium ${
                                                stat.changeType === 'increase' ? 'text-green-400' : 'text-red-400'
                                            }`}>
                                                {stat.change}
                                            </span>
                                        </div>
                                    </div>
                                    <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color}`}>
                                        <stat.icon className="h-6 w-6 text-white" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="grid gap-6 lg:grid-cols-2">
                        {/* Top Pages */}
                        <div className="rounded-2xl border border-gray-700/50 bg-gray-800/30 p-6 backdrop-blur-sm shadow-2xl">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-white">Top Pages</h2>
                                <BarChart3 className="h-5 w-5 text-gray-400" />
                            </div>
                            <div className="space-y-4">
                                {topPages.map((page, index) => (
                                    <div key={index} className="flex items-center justify-between p-3 rounded-xl bg-gray-700/20 border border-gray-600/30">
                                        <div className="flex items-center space-x-3">
                                            <span className="text-lg font-bold text-gray-400 w-6">{index + 1}</span>
                                            <div>
                                                <p className="font-medium text-white">{page.page}</p>
                                                <p className="text-sm text-gray-400">{page.views.toLocaleString()} views</p>
                                            </div>
                                        </div>
                                        <span className="text-sm text-green-400 font-medium">{page.change}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Traffic Sources */}
                        <div className="rounded-2xl border border-gray-700/50 bg-gray-800/30 p-6 backdrop-blur-sm shadow-2xl">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-white">Traffic Sources</h2>
                                <PieChart className="h-5 w-5 text-gray-400" />
                            </div>
                            <div className="space-y-4">
                                {trafficSources.map((source, index) => (
                                    <div key={index} className="flex items-center justify-between">
                                        <div className="flex items-center space-x-3">
                                            <div className={`w-3 h-3 rounded-full ${source.color}`}></div>
                                            <span className="text-white font-medium">{source.source}</span>
                                        </div>
                                        <span className="text-gray-300 font-bold">{source.percentage}%</span>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-6 p-4 rounded-xl bg-gray-700/20 border border-gray-600/30">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-400">Total Traffic</span>
                                    <span className="text-white font-bold">100%</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="rounded-2xl border border-gray-700/50 bg-gray-800/30 p-6 backdrop-blur-sm shadow-2xl">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-white">Recent Activity</h2>
                            <Activity className="h-5 w-5 text-gray-400" />
                        </div>
                        <div className="space-y-4">
                            {recentActivity.map((activity, index) => (
                                <div key={index} className="flex items-center space-x-4 p-4 rounded-xl bg-gray-700/20 border border-gray-600/30">
                                    <div className={`p-2 rounded-lg ${
                                        activity.type === 'visit' ? 'bg-blue-500/20 border border-blue-500/30' :
                                        activity.type === 'form' ? 'bg-green-500/20 border border-green-500/30' :
                                        activity.type === 'view' ? 'bg-purple-500/20 border border-purple-500/30' :
                                        'bg-orange-500/20 border border-orange-500/30'
                                    }`}>
                                        {activity.type === 'visit' && <Users className="h-4 w-4 text-blue-400" />}
                                        {activity.type === 'form' && <Target className="h-4 w-4 text-green-400" />}
                                        {activity.type === 'view' && <Eye className="h-4 w-4 text-purple-400" />}
                                        {activity.type === 'download' && <Zap className="h-4 w-4 text-orange-400" />}
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-white font-medium">{activity.action}</p>
                                        <p className="text-sm text-gray-400">{activity.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Performance Metrics */}
                    <div className="grid gap-6 md:grid-cols-3">
                        <div className="rounded-2xl border border-gray-700/50 bg-gray-800/30 p-6 backdrop-blur-sm shadow-2xl">
                            <div className="text-center">
                                <div className="p-3 rounded-xl bg-gradient-to-r from-green-500 to-blue-500 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                                    <TrendingUp className="h-8 w-8 text-white" />
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2">Conversion Rate</h3>
                                <p className="text-3xl font-bold text-green-400">2.8%</p>
                                <p className="text-sm text-gray-400 mt-1">+0.5% from last month</p>
                            </div>
                        </div>

                        <div className="rounded-2xl border border-gray-700/50 bg-gray-800/30 p-6 backdrop-blur-sm shadow-2xl">
                            <div className="text-center">
                                <div className="p-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                                    <Globe className="h-8 w-8 text-white" />
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2">Global Reach</h3>
                                <p className="text-3xl font-bold text-purple-400">47</p>
                                <p className="text-sm text-gray-400 mt-1">Countries visited</p>
                            </div>
                        </div>

                        <div className="rounded-2xl border border-gray-700/50 bg-gray-800/30 p-6 backdrop-blur-sm shadow-2xl">
                            <div className="text-center">
                                <div className="p-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                                    <Target className="h-8 w-8 text-white" />
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2">Engagement</h3>
                                <p className="text-3xl font-bold text-orange-400">4.2m</p>
                                <p className="text-sm text-gray-400 mt-1">Avg. session duration</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
