import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Form, Head } from '@inertiajs/react';
import { FileText, Plus, Edit, Trash2, Save, X, Eye, Calendar, User, Tag, Globe, Image as ImageIcon, Video, File } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Content Management',
        href: '/admin/content',
    },
];

interface ContentItem {
    id: number;
    title: string;
    type: 'blog' | 'article' | 'news' | 'tutorial' | 'case-study';
    status: 'draft' | 'published' | 'archived' | 'scheduled';
    author: string;
    category: string;
    tags: string[];
    excerpt: string;
    content: string;
    featured_image: string;
    published_at: string;
    created_at: string;
    updated_at: string;
    views: number;
    seo_title: string;
    seo_description: string;
    slug: string;
}

export default function ContentManagement() {
    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [contentItems, setContentItems] = useState<ContentItem[]>([
        {
            id: 1,
            title: 'Building Modern Web Applications with Laravel and React',
            type: 'tutorial',
            status: 'published',
            author: 'Edizon Tabac',
            category: 'Web Development',
            tags: ['Laravel', 'React', 'Full-Stack', 'Modern Web'],
            excerpt: 'Learn how to build scalable web applications using Laravel as the backend API and React for the frontend.',
            content: 'Full article content would go here...',
            featured_image: '/images/content/laravel-react.jpg',
            published_at: '2024-03-01',
            created_at: '2024-02-25',
            updated_at: '2024-03-01',
            views: 1247,
            seo_title: 'Laravel React Full-Stack Development Tutorial',
            seo_description: 'Complete guide to building modern web applications with Laravel and React',
            slug: 'laravel-react-fullstack-tutorial'
        },
        {
            id: 2,
            title: 'The Future of PHP Development in 2024',
            type: 'article',
            status: 'published',
            author: 'Edizon Tabac',
            category: 'PHP Development',
            tags: ['PHP', 'Future', 'Trends', 'Development'],
            excerpt: 'Exploring the latest trends and innovations in PHP development for the year 2024.',
            content: 'Full article content would go here...',
            featured_image: '/images/content/php-future.jpg',
            published_at: '2024-02-15',
            created_at: '2024-02-10',
            updated_at: '2024-02-15',
            views: 892,
            seo_title: 'PHP Development Trends 2024',
            seo_description: 'Latest trends and innovations in PHP development',
            slug: 'php-development-trends-2024'
        },
        {
            id: 3,
            title: 'Database Optimization Techniques for High-Performance Applications',
            type: 'case-study',
            status: 'draft',
            author: 'Edizon Tabac',
            category: 'Database',
            tags: ['Database', 'Optimization', 'Performance', 'MySQL'],
            excerpt: 'Real-world case study on optimizing database performance for high-traffic applications.',
            content: 'Full article content would go here...',
            featured_image: '/images/content/database-optimization.jpg',
            published_at: '',
            created_at: '2024-03-10',
            updated_at: '2024-03-10',
            views: 0,
            seo_title: 'Database Optimization Case Study',
            seo_description: 'Real-world database optimization techniques',
            slug: 'database-optimization-case-study'
        }
    ]);

    const types = ['blog', 'article', 'news', 'tutorial', 'case-study'];
    const statuses = ['draft', 'published', 'archived', 'scheduled'];
    const categories = ['Web Development', 'PHP Development', 'Database', 'Frontend', 'Backend', 'DevOps', 'Other'];

    const handleAdd = () => {
        setIsAdding(true);
    };

    const handleEdit = (id: number) => {
        setEditingId(id);
    };

    const handleDelete = (id: number) => {
        setContentItems(contentItems.filter(item => item.id !== id));
    };

    const handleSave = (item: ContentItem) => {
        if (editingId) {
            setContentItems(contentItems.map(p => p.id === editingId ? item : p));
            setEditingId(null);
        } else {
            setContentItems([...contentItems, { ...item, id: Date.now(), created_at: new Date().toISOString().split('T')[0], updated_at: new Date().toISOString().split('T')[0] }]);
            setIsAdding(false);
        }
    };

    const handleCancel = () => {
        setIsAdding(false);
        setEditingId(null);
    };

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'blog': return <FileText className="h-4 w-4" />;
            case 'article': return <FileText className="h-4 w-4" />;
            case 'news': return <Globe className="h-4 w-4" />;
            case 'tutorial': return <FileText className="h-4 w-4" />;
            case 'case-study': return <FileText className="h-4 w-4" />;
            default: return <FileText className="h-4 w-4" />;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'published': return 'text-green-400 bg-green-400/20 border-green-400/30';
            case 'draft': return 'text-yellow-400 bg-yellow-400/20 border-yellow-400/30';
            case 'archived': return 'text-gray-400 bg-gray-400/20 border-gray-400/30';
            case 'scheduled': return 'text-blue-400 bg-blue-400/20 border-blue-400/30';
            default: return 'text-gray-400 bg-gray-400/20 border-gray-400/30';
        }
    };

    const getTypeColor = (type: string) => {
        switch (type) {
            case 'tutorial': return 'text-blue-400 bg-blue-400/20 border-blue-400/30';
            case 'article': return 'text-green-400 bg-green-400/20 border-green-400/30';
            case 'case-study': return 'text-purple-400 bg-purple-400/20 border-purple-400/30';
            case 'blog': return 'text-orange-400 bg-orange-400/20 border-orange-400/30';
            case 'news': return 'text-red-400 bg-red-400/20 border-red-400/30';
            default: return 'text-gray-400 bg-gray-400/20 border-gray-400/30';
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Content Management" />

            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
                <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-6">
                    {/* Header */}
                    <div className="rounded-2xl border border-gray-700/50 bg-gray-800/30 p-6 backdrop-blur-sm shadow-2xl">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-3xl font-bold text-transparent">
                                    Content Management
                                </h1>
                                <p className="mt-2 text-gray-300">Manage your blog posts, articles, and content</p>
                            </div>
                            <button
                                onClick={handleAdd}
                                className="flex items-center space-x-2 rounded-xl bg-gradient-to-r from-green-600 to-blue-600 px-6 py-3 text-white transition-all duration-300 hover:from-green-700 hover:to-blue-700 hover:shadow-lg shadow-lg"
                            >
                                <Plus className="h-5 w-5" />
                                <span>Create Content</span>
                            </button>
                        </div>
                    </div>

                    {/* Content Grid */}
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {contentItems.map((item) => (
                            <div key={item.id} className="rounded-2xl border border-gray-700/50 bg-gray-800/30 backdrop-blur-sm shadow-2xl hover:shadow-3xl transition-all duration-300">
                                {/* Featured Image Placeholder */}
                                <div className="relative mb-4 h-48 rounded-xl bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center overflow-hidden">
                                    <ImageIcon className="h-16 w-16 text-gray-500" />
                                    <div className="absolute top-2 left-2 flex items-center space-x-2">
                                        <span className={`px-2 py-1 rounded-lg text-xs font-medium border ${getTypeColor(item.type)}`}>
                                            {getTypeIcon(item.type)}
                                            {item.type.replace('-', ' ')}
                                        </span>
                                        <span className={`px-2 py-1 rounded-lg text-xs font-medium border ${getStatusColor(item.status)}`}>
                                            {item.status}
                                        </span>
                                    </div>
                                </div>

                                {/* Content Info */}
                                <div className="p-4 space-y-3">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">{item.title}</h3>
                                            <p className="text-sm text-gray-300 line-clamp-3 mb-3">{item.excerpt}</p>
                                        </div>
                                        <div className="flex items-center space-x-2 ml-3">
                                            <button
                                                onClick={() => handleEdit(item.id)}
                                                className="p-2 text-gray-400 hover:text-green-400 transition-colors duration-200 rounded-lg hover:bg-gray-700/50"
                                            >
                                                <Edit className="h-4 w-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(item.id)}
                                                className="p-2 text-gray-400 hover:text-red-400 transition-colors duration-200 rounded-lg hover:bg-gray-700/50"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Meta Information */}
                                    <div className="space-y-2">
                                        <div className="flex items-center space-x-2 text-xs text-gray-400">
                                            <User className="h-3 w-3" />
                                            <span>{item.author}</span>
                                            <span>•</span>
                                            <Calendar className="h-3 w-3" />
                                            <span>{item.published_at || 'Not published'}</span>
                                        </div>
                                        <div className="flex items-center space-x-2 text-xs text-gray-400">
                                            <Tag className="h-3 w-3" />
                                            <span>{item.category}</span>
                                            <span>•</span>
                                            <Eye className="h-3 w-3" />
                                            <span>{item.views} views</span>
                                        </div>
                                    </div>

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-2">
                                        {item.tags.slice(0, 3).map((tag, index) => (
                                            <span
                                                key={index}
                                                className="px-2 py-1 bg-gray-700/50 border border-gray-600/50 rounded-lg text-xs text-gray-300"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                        {item.tags.length > 3 && (
                                            <span className="px-2 py-1 bg-gray-700/50 border border-gray-600/50 rounded-lg text-xs text-gray-400">
                                                +{item.tags.length - 3} more
                                            </span>
                                        )}
                                    </div>

                                    {/* Actions */}
                                    <div className="flex items-center justify-between pt-2">
                                        <button className="px-3 py-1 bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 hover:text-white rounded-lg transition-colors duration-200 text-xs">
                                            <Eye className="h-3 w-3 inline mr-1" />
                                            Preview
                                        </button>
                                        <div className="flex items-center space-x-2">
                                            <button className="p-2 text-gray-400 hover:text-blue-400 transition-colors duration-200 rounded-lg hover:bg-gray-700/50">
                                                <Globe className="h-4 w-4" />
                                            </button>
                                            <button className="p-2 text-gray-400 hover:text-green-400 transition-colors duration-200 rounded-lg hover:bg-gray-700/50">
                                                <File className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Add/Edit Form Modal */}
                    {(isAdding || editingId) && (
                        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                            <div className="bg-gray-800 rounded-2xl border border-gray-700/50 p-6 w-full max-w-4xl mx-4 shadow-2xl max-h-[90vh] overflow-y-auto">
                                <h2 className="text-2xl font-bold text-white mb-6">
                                    {editingId ? 'Edit Content' : 'Create New Content'}
                                </h2>
                                
                                <Form method="post" action="/admin/content" className="space-y-6">
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
                                            <input
                                                type="text"
                                                name="title"
                                                defaultValue={editingId ? contentItems.find(p => p.id === editingId)?.title : ''}
                                                className="w-full rounded-xl border border-gray-600/50 bg-gray-700/30 px-4 py-3 text-white placeholder-gray-400 transition-all duration-300 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none"
                                                placeholder="Enter content title..."
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">Type</label>
                                            <select
                                                name="type"
                                                defaultValue={editingId ? contentItems.find(p => p.id === editingId)?.type : ''}
                                                className="w-full rounded-xl border border-gray-600/50 bg-gray-700/30 px-4 py-3 text-white transition-all duration-300 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none"
                                            >
                                                <option value="">Select Type</option>
                                                {types.map(type => (
                                                    <option key={type} value={type}>{type.replace('-', ' ')}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                                            <select
                                                name="category"
                                                defaultValue={editingId ? contentItems.find(p => p.id === editingId)?.category : ''}
                                                className="w-full rounded-xl border border-gray-600/50 bg-gray-700/30 px-4 py-3 text-white transition-all duration-300 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none"
                                            >
                                                <option value="">Select Category</option>
                                                {categories.map(category => (
                                                    <option key={category} value={category}>{category}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">Status</label>
                                            <select
                                                name="status"
                                                defaultValue={editingId ? contentItems.find(p => p.id === editingId)?.status : ''}
                                                className="w-full rounded-xl border border-gray-600/50 bg-gray-700/30 px-4 py-3 text-white transition-all duration-300 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none"
                                            >
                                                <option value="">Select Status</option>
                                                {statuses.map(status => (
                                                    <option key={status} value={status}>{status}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">Excerpt</label>
                                        <textarea
                                            name="excerpt"
                                            rows={3}
                                            defaultValue={editingId ? contentItems.find(p => p.id === editingId)?.excerpt : ''}
                                            className="w-full resize-none rounded-xl border border-gray-600/50 bg-gray-700/30 px-4 py-3 text-white placeholder-gray-400 transition-all duration-300 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none"
                                            placeholder="Brief description of the content..."
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">Content</label>
                                        <textarea
                                            name="content"
                                            rows={8}
                                            defaultValue={editingId ? contentItems.find(p => p.id === editingId)?.content : ''}
                                            className="w-full resize-none rounded-xl border border-gray-600/50 bg-gray-700/30 px-4 py-3 text-white placeholder-gray-400 transition-all duration-300 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none"
                                            placeholder="Write your content here..."
                                        />
                                    </div>
                                    
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">Featured Image URL</label>
                                            <input
                                                type="url"
                                                name="featured_image"
                                                defaultValue={editingId ? contentItems.find(p => p.id === editingId)?.featured_image : ''}
                                                className="w-full rounded-xl border border-gray-600/50 bg-gray-700/30 px-4 py-3 text-white placeholder-gray-400 transition-all duration-300 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none"
                                                placeholder="https://example.com/image.jpg"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">Slug</label>
                                            <input
                                                type="text"
                                                name="slug"
                                                defaultValue={editingId ? contentItems.find(p => p.id === editingId)?.slug : ''}
                                                className="w-full rounded-xl border border-gray-600/50 bg-gray-700/30 px-4 py-3 text-white placeholder-gray-400 transition-all duration-300 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none"
                                                placeholder="url-friendly-slug"
                                            />
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">Tags</label>
                                        <input
                                            type="text"
                                            name="tags"
                                            defaultValue={editingId ? contentItems.find(p => p.id === editingId)?.tags.join(', ') : ''}
                                            className="w-full rounded-xl border border-gray-600/50 bg-gray-700/30 px-4 py-3 text-white placeholder-gray-400 transition-all duration-300 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none"
                                            placeholder="e.g., Laravel, React, Web Development (comma separated)"
                                        />
                                    </div>
                                    
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">SEO Title</label>
                                            <input
                                                type="text"
                                                name="seo_title"
                                                defaultValue={editingId ? contentItems.find(p => p.id === editingId)?.seo_title : ''}
                                                className="w-full rounded-xl border border-gray-600/50 bg-gray-700/30 px-4 py-3 text-white placeholder-gray-400 transition-all duration-300 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none"
                                                placeholder="SEO optimized title..."
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">Publish Date</label>
                                            <input
                                                type="date"
                                                name="published_at"
                                                defaultValue={editingId ? contentItems.find(p => p.id === editingId)?.published_at : ''}
                                                className="w-full rounded-xl border border-gray-600/50 bg-gray-700/30 px-4 py-3 text-white transition-all duration-300 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none"
                                            />
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">SEO Description</label>
                                        <textarea
                                            name="seo_description"
                                            rows={3}
                                            defaultValue={editingId ? contentItems.find(p => p.id === editingId)?.seo_description : ''}
                                            className="w-full resize-none rounded-xl border border-gray-600/50 bg-gray-700/30 px-4 py-3 text-white placeholder-gray-400 transition-all duration-300 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none"
                                            placeholder="SEO meta description..."
                                        />
                                    </div>
                                    
                                    <div className="flex items-center justify-end space-x-3 pt-4">
                                        <button
                                            type="button"
                                            onClick={handleCancel}
                                            className="px-6 py-3 bg-gray-700/50 hover:bg-gray-600/50 text-white rounded-xl transition-all duration-300 border border-gray-600/50"
                                        >
                                            <X className="h-5 w-5 inline mr-2" />
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="flex items-center space-x-2 rounded-xl bg-gradient-to-r from-green-600 to-blue-600 px-6 py-3 text-white transition-all duration-300 hover:from-green-700 hover:to-blue-700 hover:shadow-lg shadow-lg"
                                        >
                                            <Save className="h-5 w-5" />
                                            <span>Save Content</span>
                                        </button>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
