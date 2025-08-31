import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Form, Head } from '@inertiajs/react';
import { Mail, Phone, MapPin, Globe, MessageSquare, Plus, Edit, Trash2, Save, X, Send, Clock, User, Eye } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Contact Info Management',
        href: '/admin/contact',
    },
];

interface ContactInfo {
    id: number;
    type: 'email' | 'phone' | 'address' | 'social' | 'other';
    label: string;
    value: string;
    icon: string;
    is_primary: boolean;
    is_active: boolean;
    order: number;
}

interface ContactForm {
    id: number;
    name: string;
    email: string;
    subject: string;
    message: string;
    status: 'new' | 'read' | 'replied' | 'spam';
    created_at: string;
}

export default function ContactInfoManagement() {
    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [contactInfo, setContactInfo] = useState<ContactInfo[]>([
        {
            id: 1,
            type: 'email',
            label: 'Personal Email',
            value: 'edizontabac1996@gmail.com',
            icon: 'mail',
            is_primary: true,
            is_active: true,
            order: 1
        },
        {
            id: 2,
            type: 'email',
            label: 'Work Email',
            value: 'edizon.tabac@dssc.edu.ph',
            icon: 'mail',
            is_primary: false,
            is_active: true,
            order: 2
        },
        {
            id: 3,
            type: 'phone',
            label: 'Mobile Phone',
            value: '+63 946 051 2537',
            icon: 'phone',
            is_primary: true,
            is_active: true,
            order: 3
        },
        {
            id: 4,
            type: 'address',
            label: 'Location',
            value: 'Punta Biao, Cogon, Digos City, Davao del Sur, Philippines',
            icon: 'map-pin',
            is_primary: true,
            is_active: true,
            order: 4
        },
        {
            id: 5,
            type: 'social',
            label: 'GitHub',
            value: 'https://github.com/lokihanji',
            icon: 'globe',
            is_primary: false,
            is_active: true,
            order: 5
        },
        {
            id: 6,
            type: 'social',
            label: 'Facebook',
            value: 'https://www.facebook.com/edizon.tabac.9',
            icon: 'globe',
            is_primary: false,
            is_active: true,
            order: 6
        }
    ]);

    const [contactForms, setContactForms] = useState<ContactForm[]>([
        {
            id: 1,
            name: 'John Doe',
            email: 'john@example.com',
            subject: 'Project Collaboration',
            message: 'Hi Edizon, I would like to discuss a potential project collaboration. Are you available for a call?',
            status: 'new',
            created_at: '2024-03-15 10:30:00'
        },
        {
            id: 2,
            name: 'Jane Smith',
            email: 'jane@company.com',
            subject: 'Job Opportunity',
            message: 'Hello! We have an opening for a Full-Stack Developer position. Would you be interested?',
            status: 'read',
            created_at: '2024-03-14 14:20:00'
        }
    ]);

    const types = ['email', 'phone', 'address', 'social', 'other'];
    const statuses = ['new', 'read', 'replied', 'spam'];

    const handleAdd = () => {
        setIsAdding(true);
    };

    const handleEdit = (id: number) => {
        setEditingId(id);
    };

    const handleDelete = (id: number) => {
        setContactInfo(contactInfo.filter(item => item.id !== id));
    };

    const handleSave = (item: ContactInfo) => {
        if (editingId) {
            setContactInfo(contactInfo.map(p => p.id === editingId ? item : p));
            setEditingId(null);
        } else {
            setContactInfo([...contactInfo, { ...item, id: Date.now(), order: contactInfo.length + 1 }]);
            setIsAdding(false);
        }
    };

    const handleCancel = () => {
        setIsAdding(false);
        setEditingId(null);
    };

    const handleStatusChange = (id: number, status: string) => {
        setContactForms(contactForms.map(form => 
            form.id === id ? { ...form, status: status as any } : form
        ));
    };

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'email': return <Mail className="h-5 w-5" />;
            case 'phone': return <Phone className="h-5 w-5" />;
            case 'address': return <MapPin className="h-5 w-5" />;
            case 'social': return <Globe className="h-5 w-5" />;
            default: return <MessageSquare className="h-5 w-5" />;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'new': return 'text-blue-400 bg-blue-400/20 border-blue-400/30';
            case 'read': return 'text-gray-400 bg-gray-400/20 border-gray-400/30';
            case 'replied': return 'text-green-400 bg-green-400/20 border-green-400/30';
            case 'spam': return 'text-red-400 bg-red-400/20 border-red-400/30';
            default: return 'text-gray-400 bg-gray-400/20 border-gray-400/30';
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Contact Info Management" />

            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
                <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-6">
                    {/* Header */}
                    <div className="rounded-2xl border border-gray-700/50 bg-gray-800/30 p-6 backdrop-blur-sm shadow-2xl">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-3xl font-bold text-transparent">
                                    Contact Info Management
                                </h1>
                                <p className="mt-2 text-gray-300">Manage your contact information and incoming messages</p>
                            </div>
                            <button
                                onClick={handleAdd}
                                className="flex items-center space-x-2 rounded-xl bg-gradient-to-r from-green-600 to-blue-600 px-6 py-3 text-white transition-all duration-300 hover:from-green-700 hover:to-blue-700 hover:shadow-lg shadow-lg"
                            >
                                <Plus className="h-5 w-5" />
                                <span>Add Contact Info</span>
                            </button>
                        </div>
                    </div>

                    <div className="grid gap-6 lg:grid-cols-2">
                        {/* Contact Information */}
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-white">Contact Information</h2>
                            <div className="space-y-4">
                                {contactInfo.map((item) => (
                                    <div key={item.id} className="rounded-2xl border border-gray-700/50 bg-gray-800/30 p-4 backdrop-blur-sm shadow-2xl">
                                        <div className="flex items-start justify-between">
                                            <div className="flex items-start space-x-3 flex-1">
                                                <div className="p-2 rounded-lg bg-gray-700/50 border border-gray-600/50">
                                                    {getTypeIcon(item.type)}
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center space-x-2 mb-1">
                                                        <h3 className="text-lg font-semibold text-white">{item.label}</h3>
                                                        {item.is_primary && (
                                                            <span className="px-2 py-1 bg-gradient-to-r from-green-500 to-blue-500 text-white text-xs font-bold rounded-lg">
                                                                Primary
                                                            </span>
                                                        )}
                                                        {!item.is_active && (
                                                            <span className="px-2 py-1 bg-gray-600 text-gray-300 text-xs rounded-lg">
                                                                Inactive
                                                            </span>
                                                        )}
                                                    </div>
                                                    <p className="text-gray-300">{item.value}</p>
                                                    <span className="text-xs text-gray-400 capitalize">{item.type}</span>
                                                </div>
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
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Contact Forms */}
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-white">Incoming Messages</h2>
                            <div className="space-y-4">
                                {contactForms.map((form) => (
                                    <div key={form.id} className="rounded-2xl border border-gray-700/50 bg-gray-800/30 p-4 backdrop-blur-sm shadow-2xl">
                                        <div className="flex items-start justify-between mb-3">
                                            <div className="flex items-center space-x-2">
                                                <User className="h-4 w-4 text-gray-400" />
                                                <span className="font-semibold text-white">{form.name}</span>
                                                <span className="text-gray-400">•</span>
                                                <span className="text-gray-400">{form.email}</span>
                                            </div>
                                            <select
                                                value={form.status}
                                                onChange={(e) => handleStatusChange(form.id, e.target.value)}
                                                className="px-2 py-1 bg-gray-700/50 border border-gray-600/50 rounded-lg text-xs text-white"
                                            >
                                                {statuses.map(status => (
                                                    <option key={status} value={status}>{status}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <h4 className="font-medium text-white mb-2">{form.subject}</h4>
                                        <p className="text-gray-300 text-sm mb-3 line-clamp-2">{form.message}</p>
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs text-gray-400">
                                                <Clock className="h-3 w-3 inline mr-1" />
                                                {form.created_at}
                                            </span>
                                            <div className="flex items-center space-x-2">
                                                <button className="p-2 text-gray-400 hover:text-blue-400 transition-colors duration-200 rounded-lg hover:bg-gray-700/50">
                                                    <Eye className="h-4 w-4" />
                                                </button>
                                                <button className="p-2 text-gray-400 hover:text-green-400 transition-colors duration-200 rounded-lg hover:bg-gray-700/50">
                                                    <Send className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Add/Edit Form Modal */}
                    {(isAdding || editingId) && (
                        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                            <div className="bg-gray-800 rounded-2xl border border-gray-700/50 p-6 w-full max-w-2xl mx-4 shadow-2xl max-h-[90vh] overflow-y-auto">
                                <h2 className="text-2xl font-bold text-white mb-6">
                                    {editingId ? 'Edit Contact Info' : 'Add New Contact Info'}
                                </h2>
                                
                                <Form method="post" action="/admin/contact" className="space-y-6">
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">Type</label>
                                            <select
                                                name="type"
                                                defaultValue={editingId ? contactInfo.find(p => p.id === editingId)?.type : ''}
                                                className="w-full rounded-xl border border-gray-600/50 bg-gray-700/30 px-4 py-3 text-white transition-all duration-300 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none"
                                            >
                                                <option value="">Select Type</option>
                                                {types.map(type => (
                                                    <option key={type} value={type}>{type}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">Label</label>
                                            <input
                                                type="text"
                                                name="label"
                                                defaultValue={editingId ? contactInfo.find(p => p.id === editingId)?.label : ''}
                                                className="w-full rounded-xl border border-gray-600/50 bg-gray-700/30 px-4 py-3 text-white placeholder-gray-400 transition-all duration-300 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none"
                                                placeholder="e.g., Personal Email"
                                            />
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">Value</label>
                                        <input
                                            type="text"
                                            name="value"
                                            defaultValue={editingId ? contactInfo.find(p => p.id === editingId)?.value : ''}
                                            className="w-full rounded-xl border border-gray-600/50 bg-gray-700/30 px-4 py-3 text-white placeholder-gray-400 transition-all duration-300 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none"
                                            placeholder="e.g., edizon@example.com"
                                        />
                                    </div>
                                    
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div className="flex items-center space-x-3">
                                            <input
                                                type="checkbox"
                                                name="is_primary"
                                                id="is_primary"
                                                defaultChecked={editingId ? contactInfo.find(p => p.id === editingId)?.is_primary : false}
                                                className="rounded border-gray-600 bg-gray-700/30 text-green-500 focus:ring-green-500 focus:ring-2"
                                            />
                                            <label htmlFor="is_primary" className="text-sm font-medium text-gray-300">
                                                Primary Contact
                                            </label>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <input
                                                type="checkbox"
                                                name="is_active"
                                                id="is_active"
                                                defaultChecked={editingId ? contactInfo.find(p => p.id === editingId)?.is_active : true}
                                                className="rounded border-gray-600 bg-gray-700/30 text-green-500 focus:ring-green-500 focus:ring-2"
                                            />
                                            <label htmlFor="is_active" className="text-sm font-medium text-gray-300">
                                                Active
                                            </label>
                                        </div>
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
                                            <span>Save Contact Info</span>
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
