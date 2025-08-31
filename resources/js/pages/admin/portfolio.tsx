import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Image, Plus, Edit, Trash2, Save, X, Eye, Download, Upload } from 'lucide-react';
import { useState, useEffect } from 'react';
import axios from 'axios';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Portfolio Management',
        href: '/admin/portfolio',
    },
];

interface PortfolioItem {
    id: number;
    title: string;
    description: string;
    category: string;
    image: string;
    url?: string;
    tags: string[];
    is_active: boolean;
    order: number;
    created_at: string;
}

export default function PortfolioManagement() {
    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const categories = ['Web Development', 'Mobile Design', 'Database', 'UI/UX', 'Graphics', 'Other'];

    useEffect(() => {
        loadPortfolioItems();
    }, []);

    const loadPortfolioItems = async () => {
        try {
            const response = await axios.get('/api/admin/portfolio');
            setPortfolioItems(response.data);
        } catch (error) {
            console.error('Error loading portfolio items:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAdd = () => {
        setIsAdding(true);
    };

    const handleEdit = (id: number) => {
        setEditingId(id);
    };

    const handleDelete = async (id: number) => {
        try {
            await axios.delete(`/api/admin/portfolio/${id}`);
            setPortfolioItems(portfolioItems.filter(item => item.id !== id));
        } catch (error) {
            console.error('Error deleting portfolio item:', error);
        }
    };

    const handleSave = async (item: PortfolioItem) => {
        setSaving(true);
        try {
            if (editingId) {
                // Update existing item
                const response = await axios.put(`/api/admin/portfolio/${editingId}`, item);
                setPortfolioItems(portfolioItems.map(p => p.id === editingId ? response.data : p));
                setEditingId(null);
            } else {
                // Create new item
                const response = await axios.post('/api/admin/portfolio', item);
                setPortfolioItems([...portfolioItems, response.data]);
                setIsAdding(false);
            }
        } catch (error) {
            console.error('Error saving portfolio item:', error);
        } finally {
            setSaving(false);
        }
    };

    const handleCancel = () => {
        setIsAdding(false);
        setEditingId(null);
    };

    const handleReorder = async (id: number, direction: 'up' | 'down') => {
        const currentIndex = portfolioItems.findIndex(item => item.id === id);
        if (currentIndex === -1) return;

        const newItems = [...portfolioItems];
        if (direction === 'up' && currentIndex > 0) {
            [newItems[currentIndex], newItems[currentIndex - 1]] = [newItems[currentIndex - 1], newItems[currentIndex]];
        } else if (direction === 'down' && currentIndex < newItems.length - 1) {
            [newItems[currentIndex], newItems[currentIndex + 1]] = [newItems[currentIndex + 1], newItems[currentIndex]];
        }

        // Update order numbers
        newItems.forEach((item, index) => {
            item.order = index + 1;
        });

        setPortfolioItems(newItems);

        // Save new order to database
        try {
            await axios.post('/api/admin/portfolio/reorder', {
                portfolioItems: newItems.map((item, index) => ({
                    id: item.id,
                    order: index + 1
                }))
            });
        } catch (error) {
            console.error('Error updating order:', error);
        }
    };

    if (loading) {
        return (
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Portfolio Management" />
                <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
                    <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-6">
                        <div className="rounded-2xl border border-gray-700/50 bg-gray-800/30 p-8 backdrop-blur-sm shadow-2xl">
                            <div className="text-center text-white">Loading portfolio items...</div>
                        </div>
                    </div>
                </div>
            </AppLayout>
        );
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Portfolio Management" />

            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
                <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-6">
                    {/* Header */}
                    <div className="rounded-2xl border border-gray-700/50 bg-gray-800/30 p-6 backdrop-blur-sm shadow-2xl">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-3xl font-bold text-transparent">
                                    Portfolio Management
                                </h1>
                                <p className="mt-2 text-gray-300">Manage your portfolio items and showcase your work</p>
                            </div>
                            <button
                                onClick={handleAdd}
                                className="flex items-center space-x-2 rounded-xl bg-gradient-to-r from-green-600 to-blue-600 px-6 py-3 text-white transition-all duration-300 hover:from-green-700 hover:to-blue-700 hover:shadow-lg shadow-lg"
                            >
                                <Plus className="h-5 w-5" />
                                <span>Add Portfolio Item</span>
                            </button>
                        </div>
                    </div>

                    {/* Portfolio Grid */}
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {portfolioItems.map((item) => (
                            <div key={item.id} className="rounded-2xl border border-gray-700/50 bg-gray-800/30 backdrop-blur-sm shadow-2xl hover:shadow-3xl transition-all duration-300">
                                {/* Portfolio Image */}
                                <div className="relative mb-4 h-48 rounded-xl bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center overflow-hidden">
                                    {item.image ? (
                                        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                                    ) : (
                                        <Image className="h-16 w-16 text-gray-500" />
                                    )}
                                    {item.is_active && (
                                        <div className="absolute top-2 right-2 px-2 py-1 bg-gradient-to-r from-green-500 to-blue-500 text-white text-xs font-bold rounded-lg">
                                            Active
                                        </div>
                                    )}
                                    <div className="absolute top-2 left-2 px-2 py-1 bg-gray-800/80 text-gray-300 text-xs font-medium rounded-lg">
                                        #{item.order}
                                    </div>
                                </div>

                                {/* Portfolio Info */}
                                <div className="p-4 space-y-3">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <h3 className="text-xl font-bold text-white mb-1">{item.title}</h3>
                                            <p className="text-sm text-gray-300 line-clamp-2">{item.description}</p>
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

                                    {/* Category and Date */}
                                    <div className="flex items-center justify-between">
                                        <span className="px-3 py-1 bg-gray-700/50 border border-gray-600/50 rounded-lg text-xs text-gray-300">
                                            {item.category}
                                        </span>
                                        <span className="text-xs text-gray-400">
                                            {new Date(item.created_at).toLocaleDateString()}
                                        </span>
                                    </div>

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-2">
                                        {item.tags.map((tag, index) => (
                                            <span
                                                key={index}
                                                className="px-2 py-1 bg-gray-700/50 border border-gray-600/50 rounded-lg text-xs text-gray-300"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Actions */}
                                    <div className="flex items-center justify-between pt-2">
                                        <div className="flex items-center space-x-2">
                                            <button
                                                onClick={() => handleReorder(item.id, 'up')}
                                                disabled={item.order === 1}
                                                className="px-2 py-1 bg-gray-700/50 hover:bg-gray-600/50 disabled:opacity-50 disabled:cursor-not-allowed text-gray-300 hover:text-white rounded-lg transition-colors duration-200 text-xs"
                                            >
                                                ↑
                                            </button>
                                            <button
                                                onClick={() => handleReorder(item.id, 'down')}
                                                disabled={item.order === portfolioItems.length}
                                                className="px-2 py-1 bg-gray-700/50 hover:bg-gray-600/50 disabled:opacity-50 disabled:cursor-not-allowed text-gray-300 hover:text-white rounded-lg transition-colors duration-200 text-xs"
                                            >
                                                ↓
                                            </button>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <button className="p-2 text-gray-400 hover:text-blue-400 transition-colors duration-200 rounded-lg hover:bg-gray-700/50">
                                                <Eye className="h-4 w-4" />
                                            </button>
                                            <button className="p-2 text-gray-400 hover:text-green-400 transition-colors duration-200 rounded-lg hover:bg-gray-700/50">
                                                <Download className="h-4 w-4" />
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
                            <div className="bg-gray-800 rounded-2xl border border-gray-700/50 p-6 w-full max-w-2xl mx-4 shadow-2xl max-h-[90vh] overflow-y-auto">
                                <h2 className="text-2xl font-bold text-white mb-6">
                                    {editingId ? 'Edit Portfolio Item' : 'Add New Portfolio Item'}
                                </h2>
                                
                                <form onSubmit={(e) => {
                                    e.preventDefault();
                                    const formData = new FormData(e.currentTarget);
                                    const item: PortfolioItem = {
                                        id: editingId || 0,
                                        title: formData.get('title') as string,
                                        description: formData.get('description') as string,
                                        category: formData.get('category') as string,
                                        image: formData.get('image') as string,
                                        url: formData.get('url') as string || undefined,
                                        tags: (formData.get('tags') as string).split(',').map(tag => tag.trim()).filter(tag => tag),
                                        is_active: formData.get('is_active') === 'on',
                                        order: editingId ? portfolioItems.find(p => p.id === editingId)?.order || 1 : portfolioItems.length + 1,
                                        created_at: editingId ? portfolioItems.find(p => p.id === editingId)?.created_at || '' : new Date().toISOString()
                                    };
                                    handleSave(item);
                                }} className="space-y-6">
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
                                            <input
                                                type="text"
                                                name="title"
                                                defaultValue={editingId ? portfolioItems.find(p => p.id === editingId)?.title : ''}
                                                className="w-full rounded-xl border border-gray-600/50 bg-gray-700/30 px-4 py-3 text-white placeholder-gray-400 transition-all duration-300 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none"
                                                placeholder="e.g., Web Development Showcase"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                                            <select
                                                name="category"
                                                defaultValue={editingId ? portfolioItems.find(p => p.id === editingId)?.category : ''}
                                                className="w-full rounded-xl border border-gray-600/50 bg-gray-700/30 px-4 py-3 text-white transition-all duration-300 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none"
                                            >
                                                <option value="">Select Category</option>
                                                {categories.map(category => (
                                                    <option key={category} value={category}>{category}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                                        <textarea
                                            name="description"
                                            rows={3}
                                            defaultValue={editingId ? portfolioItems.find(p => p.id === editingId)?.description : ''}
                                            className="w-full resize-none rounded-xl border border-gray-600/50 bg-gray-700/30 px-4 py-3 text-white placeholder-gray-400 transition-all duration-300 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none"
                                            placeholder="Describe your portfolio item..."
                                        />
                                    </div>
                                    
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">Image URL</label>
                                            <input
                                                type="url"
                                                name="image"
                                                defaultValue={editingId ? portfolioItems.find(p => p.id === editingId)?.image : ''}
                                                className="w-full rounded-xl border border-gray-600/50 bg-gray-700/30 px-4 py-3 text-white placeholder-gray-400 transition-all duration-300 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none"
                                                placeholder="https://example.com/image.jpg"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">Project URL</label>
                                            <input
                                                type="url"
                                                name="url"
                                                defaultValue={editingId ? portfolioItems.find(p => p.id === editingId)?.url : ''}
                                                className="w-full rounded-xl border border-gray-600/50 bg-gray-700/30 px-4 py-3 text-white placeholder-gray-400 transition-all duration-300 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none"
                                                placeholder="https://example.com/project"
                                            />
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">Tags</label>
                                        <input
                                            type="text"
                                            name="tags"
                                            defaultValue={editingId ? portfolioItems.find(p => p.id === editingId)?.tags.join(', ') : ''}
                                            className="w-full rounded-xl border border-gray-600/50 bg-gray-700/30 px-4 py-3 text-white placeholder-gray-400 transition-all duration-300 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none"
                                            placeholder="e.g., Laravel, React, Modern UI (comma separated)"
                                        />
                                    </div>
                                    
                                    <div className="flex items-center space-x-3">
                                        <input
                                            type="checkbox"
                                            name="is_active"
                                            id="is_active"
                                            defaultChecked={editingId ? portfolioItems.find(p => p.id === editingId)?.is_active : true}
                                            className="rounded border-gray-600 bg-gray-700/30 text-green-500 focus:ring-green-500 focus:ring-2"
                                        />
                                        <label htmlFor="is_active" className="text-sm font-medium text-gray-300">
                                            Active Item
                                        </label>
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
                                            disabled={saving}
                                            className="flex items-center space-x-2 rounded-xl bg-gradient-to-r from-green-600 to-blue-600 px-6 py-3 text-white transition-all duration-300 hover:from-green-700 hover:to-blue-700 hover:shadow-lg shadow-lg disabled:opacity-50"
                                        >
                                            <Save className="h-5 w-5" />
                                            <span>{saving ? 'Saving...' : 'Save Portfolio Item'}</span>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
