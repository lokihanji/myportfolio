import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { BookOpen, Search, FileText, Code, Video, Download, ExternalLink, ChevronRight, Star, Clock, User, Tag, Bookmark } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Documentation',
        href: '/admin/docs',
    },
];

export default function DocumentationPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedTag, setSelectedTag] = useState('all');

    // Mock documentation categories
    const categories = [
        { id: 'all', name: 'All', count: 24 },
        { id: 'getting-started', name: 'Getting Started', count: 5 },
        { id: 'user-guide', name: 'User Guide', count: 8 },
        { id: 'api-reference', name: 'API Reference', count: 6 },
        { id: 'tutorials', name: 'Tutorials', count: 3 },
        { id: 'troubleshooting', name: 'Troubleshooting', count: 2 }
    ];

    // Mock documentation tags
    const tags = [
        { id: 'all', name: 'All', count: 24 },
        { id: 'portfolio', name: 'Portfolio', count: 8 },
        { id: 'admin', name: 'Admin', count: 6 },
        { id: 'api', name: 'API', count: 4 },
        { id: 'database', name: 'Database', count: 3 },
        { id: 'deployment', name: 'Deployment', count: 3 }
    ];

    // Mock documentation items
    const docs = [
        {
            id: 1,
            title: 'Getting Started with Portfolio Admin',
            category: 'getting-started',
            tags: ['portfolio', 'admin'],
            description: 'Learn how to set up and configure your portfolio admin dashboard for the first time.',
            type: 'guide',
            author: 'Edizon Tabac',
            created_at: '2024-03-01',
            updated_at: '2024-03-15',
            views: 1247,
            rating: 4.8,
            featured: true
        },
        {
            id: 2,
            title: 'Managing Your Profile Information',
            category: 'user-guide',
            tags: ['portfolio', 'admin'],
            description: 'Complete guide to managing your personal information, contact details, and professional background.',
            type: 'guide',
            author: 'Edizon Tabac',
            created_at: '2024-02-28',
            updated_at: '2024-03-10',
            views: 892,
            rating: 4.6,
            featured: false
        },
        {
            id: 3,
            title: 'Adding and Managing Projects',
            category: 'user-guide',
            tags: ['portfolio', 'admin'],
            description: 'Step-by-step instructions for adding new projects, updating existing ones, and organizing your portfolio.',
            type: 'guide',
            author: 'Edizon Tabac',
            created_at: '2024-02-25',
            updated_at: '2024-03-08',
            views: 654,
            rating: 4.7,
            featured: false
        },
        {
            id: 4,
            title: 'Skills Management System',
            category: 'user-guide',
            tags: ['portfolio', 'admin'],
            description: 'How to add, edit, and organize your technical skills with proficiency levels and categories.',
            type: 'guide',
            author: 'Edizon Tabac',
            created_at: '2024-02-20',
            updated_at: '2024-03-05',
            views: 543,
            rating: 4.5,
            featured: false
        },
        {
            id: 5,
            title: 'Content Management Guide',
            category: 'user-guide',
            tags: ['portfolio', 'admin', 'content'],
            description: 'Create and manage blog posts, articles, and other content for your portfolio website.',
            type: 'guide',
            author: 'Edizon Tabac',
            created_at: '2024-02-18',
            updated_at: '2024-03-03',
            views: 432,
            rating: 4.4,
            featured: false
        },
        {
            id: 6,
            title: 'Analytics and Performance Tracking',
            category: 'user-guide',
            tags: ['portfolio', 'admin', 'analytics'],
            description: 'Monitor your portfolio performance, track visitor analytics, and optimize your content.',
            type: 'guide',
            author: 'Edizon Tabac',
            created_at: '2024-02-15',
            updated_at: '2024-03-01',
            views: 389,
            rating: 4.3,
            featured: false
        },
        {
            id: 7,
            title: 'Database Management and Backups',
            category: 'user-guide',
            tags: ['portfolio', 'admin', 'database'],
            description: 'Learn how to manage your database, create backups, and monitor database health.',
            type: 'guide',
            author: 'Edizon Tabac',
            created_at: '2024-02-12',
            updated_at: '2024-02-28',
            views: 298,
            rating: 4.2,
            featured: false
        },
        {
            id: 8,
            title: 'API Integration Guide',
            category: 'api-reference',
            tags: ['portfolio', 'api'],
            description: 'Integrate external services and APIs with your portfolio website.',
            type: 'reference',
            author: 'Edizon Tabac',
            created_at: '2024-02-10',
            updated_at: '2024-02-25',
            views: 267,
            rating: 4.1,
            featured: false
        }
    ];

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'guide': return <FileText className="h-4 w-4" />;
            case 'reference': return <Code className="h-4 w-4" />;
            case 'tutorial': return <Video className="h-4 w-4" />;
            default: return <FileText className="h-4 w-4" />;
        }
    };

    const getTypeColor = (type: string) => {
        switch (type) {
            case 'guide': return 'text-blue-400 bg-blue-400/20 border-blue-400/30';
            case 'reference': return 'text-green-400 bg-green-400/20 border-green-400/30';
            case 'tutorial': return 'text-purple-400 bg-purple-400/20 border-purple-400/30';
            default: return 'text-gray-400 bg-gray-400/20 border-gray-400/30';
        }
    };

    const filteredDocs = docs.filter(doc => 
        doc.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedCategory === 'all' || doc.category === selectedCategory) &&
        (selectedTag === 'all' || doc.tags.includes(selectedTag))
    );

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Documentation" />

            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
                <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-6">
                    {/* Header */}
                    <div className="rounded-2xl border border-gray-700/50 bg-gray-800/30 p-6 backdrop-blur-sm shadow-2xl">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-3xl font-bold text-transparent">
                                    Documentation
                                </h1>
                                <p className="mt-2 text-gray-300">Comprehensive guides and references for your portfolio admin system</p>
                            </div>
                            <div className="flex items-center space-x-3">
                                <button className="flex items-center space-x-2 px-4 py-2 bg-gray-700/50 hover:bg-gray-600/50 border border-gray-600/50 rounded-xl text-white transition-all duration-300">
                                    <Download className="h-4 w-4" />
                                    <span>Download PDF</span>
                                </button>
                                <button className="flex items-center space-x-2 px-4 py-2 bg-green-600/50 hover:bg-green-500/50 border border-green-500/50 rounded-xl text-white transition-all duration-300">
                                    <ExternalLink className="h-4 w-4" />
                                    <span>View Online</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Search and Filters */}
                    <div className="rounded-2xl border border-gray-700/50 bg-gray-800/30 p-6 backdrop-blur-sm shadow-2xl">
                        <div className="flex items-center space-x-4 mb-6">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search documentation..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all duration-300"
                                />
                            </div>
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all duration-300"
                            >
                                {categories.map(category => (
                                    <option key={category.id} value={category.id}>
                                        {category.name} ({category.count})
                                    </option>
                                ))}
                            </select>
                            <select
                                value={selectedTag}
                                onChange={(e) => setSelectedTag(e.target.value)}
                                className="px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all duration-300"
                            >
                                {tags.map(tag => (
                                    <option key={tag.id} value={tag.id}>
                                        {tag.name} ({tag.count})
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Documentation Grid */}
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {filteredDocs.map((doc) => (
                            <div key={doc.id} className="rounded-2xl border border-gray-700/50 bg-gray-800/30 backdrop-blur-sm shadow-2xl hover:shadow-3xl transition-all duration-300">
                                <div className="p-6 space-y-4">
                                    {/* Header */}
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center space-x-2 mb-2">
                                                <span className={`px-2 py-1 rounded-lg text-xs font-medium border ${getTypeColor(doc.type)}`}>
                                                    {getTypeIcon(doc.type)}
                                                    {doc.type}
                                                </span>
                                                {doc.featured && (
                                                    <span className="px-2 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-bold rounded-lg">
                                                        Featured
                                                    </span>
                                                )}
                                            </div>
                                            <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">{doc.title}</h3>
                                            <p className="text-sm text-gray-300 line-clamp-3 mb-3">{doc.description}</p>
                                        </div>
                                    </div>

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-2">
                                        {doc.tags.map((tag, index) => (
                                            <span
                                                key={index}
                                                className="px-2 py-1 bg-gray-700/50 border border-gray-600/50 rounded-lg text-xs text-gray-300"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Meta Information */}
                                    <div className="space-y-2">
                                        <div className="flex items-center space-x-4 text-xs text-gray-400">
                                            <div className="flex items-center space-x-1">
                                                <User className="h-3 w-3" />
                                                <span>{doc.author}</span>
                                            </div>
                                            <div className="flex items-center space-x-1">
                                                <Clock className="h-3 w-3" />
                                                <span>{doc.updated_at}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-4 text-xs text-gray-400">
                                            <div className="flex items-center space-x-1">
                                                <BookOpen className="h-3 w-3" />
                                                <span>{doc.views} views</span>
                                            </div>
                                            <div className="flex items-center space-x-1">
                                                <Star className="h-3 w-3" />
                                                <span>{doc.rating}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex items-center justify-between pt-2">
                                        <button className="px-4 py-2 bg-gray-700/50 hover:bg-gray-600/50 border border-gray-600/50 rounded-lg text-gray-300 hover:text-white transition-all duration-300 text-sm">
                                            <Bookmark className="h-4 w-4 inline mr-2" />
                                            Bookmark
                                        </button>
                                        <div className="flex items-center space-x-2">
                                            <button className="p-2 text-gray-400 hover:text-blue-400 transition-colors duration-200 rounded-lg hover:bg-gray-700/50">
                                                <FileText className="h-4 w-4" />
                                            </button>
                                            <button className="p-2 text-gray-400 hover:text-green-400 transition-colors duration-200 rounded-lg hover:bg-gray-700/50">
                                                <Download className="h-4 w-4" />
                                            </button>
                                            <button className="p-2 text-gray-400 hover:text-purple-400 transition-colors duration-200 rounded-lg hover:bg-gray-700/50">
                                                <ExternalLink className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Quick Start Guide */}
                    <div className="rounded-2xl border border-gray-700/50 bg-gray-800/30 p-6 backdrop-blur-sm shadow-2xl">
                        <div className="flex items-center space-x-3 mb-6">
                            <div className="p-2 rounded-lg bg-gradient-to-r from-green-500/20 to-blue-500/20">
                                <BookOpen className="h-6 w-6 text-green-400" />
                            </div>
                            <h2 className="text-2xl font-bold text-white">Quick Start Guide</h2>
                        </div>
                        
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                            <div className="text-center p-4 rounded-xl bg-gray-700/20 border border-gray-600/30">
                                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                                    <span className="text-white font-bold text-lg">1</span>
                                </div>
                                <h3 className="font-semibold text-white mb-2">Setup Profile</h3>
                                <p className="text-sm text-gray-400">Configure your personal information and contact details</p>
                            </div>
                            
                            <div className="text-center p-4 rounded-xl bg-gray-700/20 border border-gray-600/30">
                                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                                    <span className="text-white font-bold text-lg">2</span>
                                </div>
                                <h3 className="font-semibold text-white mb-2">Add Projects</h3>
                                <p className="text-sm text-gray-400">Showcase your work with detailed project information</p>
                            </div>
                            
                            <div className="text-center p-4 rounded-xl bg-gray-700/20 border border-gray-600/30">
                                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                                    <span className="text-white font-bold text-lg">3</span>
                                </div>
                                <h3 className="font-semibold text-white mb-2">Manage Skills</h3>
                                <p className="text-sm text-gray-400">Organize your technical skills and expertise levels</p>
                            </div>
                            
                            <div className="text-center p-4 rounded-xl bg-gray-700/20 border border-gray-600/30">
                                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                                    <span className="text-white font-bold text-lg">4</span>
                                </div>
                                <h3 className="font-semibold text-white mb-2">Publish Content</h3>
                                <p className="text-sm text-gray-400">Share your knowledge through blog posts and articles</p>
                            </div>
                        </div>
                    </div>

                    {/* Help and Support */}
                    <div className="grid gap-6 md:grid-cols-2">
                        <div className="rounded-2xl border border-gray-700/50 bg-gray-800/30 p-6 backdrop-blur-sm shadow-2xl">
                            <div className="flex items-center space-x-3 mb-4">
                                <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500/20 to-blue-600/20">
                                    <FileText className="h-6 w-6 text-blue-400" />
                                </div>
                                <h3 className="text-xl font-bold text-white">Need Help?</h3>
                            </div>
                            <p className="text-gray-300 mb-4">
                                Can't find what you're looking for? Check our comprehensive guides or contact support.
                            </p>
                            <div className="space-y-2">
                                <button className="w-full text-left p-3 bg-gray-700/20 hover:bg-gray-700/30 border border-gray-600/30 rounded-lg text-white transition-all duration-300">
                                    <div className="flex items-center justify-between">
                                        <span>View All Guides</span>
                                        <ChevronRight className="h-4 w-4" />
                                    </div>
                                </button>
                                <button className="w-full text-left p-3 bg-gray-700/20 hover:bg-gray-700/30 border border-gray-600/30 rounded-lg text-white transition-all duration-300">
                                    <div className="flex items-center justify-between">
                                        <span>Contact Support</span>
                                        <ChevronRight className="h-4 w-4" />
                                    </div>
                                </button>
                            </div>
                        </div>

                        <div className="rounded-2xl border border-gray-700/50 bg-gray-800/30 p-6 backdrop-blur-sm shadow-2xl">
                            <div className="flex items-center space-x-3 mb-4">
                                <div className="p-2 rounded-lg bg-gradient-to-r from-green-500/20 to-green-600/20">
                                    <Video className="h-6 w-6 text-green-400" />
                                </div>
                                <h3 className="text-xl font-bold text-white">Video Tutorials</h3>
                            </div>
                            <p className="text-gray-300 mb-4">
                                Learn through step-by-step video tutorials covering all major features.
                            </p>
                            <div className="space-y-2">
                                <button className="w-full text-left p-3 bg-gray-700/20 hover:bg-gray-700/30 border border-gray-600/30 rounded-lg text-white transition-all duration-300">
                                    <div className="flex items-center justify-between">
                                        <span>Getting Started Videos</span>
                                        <ChevronRight className="h-4 w-4" />
                                    </div>
                                </button>
                                <button className="w-full text-left p-3 bg-gray-700/20 hover:bg-gray-700/30 border border-gray-600/30 rounded-lg text-white transition-all duration-300">
                                    <div className="flex items-center justify-between">
                                        <span>Advanced Features</span>
                                        <ChevronRight className="h-4 w-4" />
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
