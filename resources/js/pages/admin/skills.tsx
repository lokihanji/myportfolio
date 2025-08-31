import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Form, Head } from '@inertiajs/react';
import { Code, Star, Plus, Edit, Trash2, Save, X, TrendingUp } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Skills Management',
        href: '/admin/skills',
    },
];

interface Skill {
    id: number;
    name: string;
    category: string;
    proficiency: number;
    years_experience: number;
    description: string;
    icon?: string;
}

export default function SkillsManagement() {
    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [skills, setSkills] = useState<Skill[]>([
        {
            id: 1,
            name: 'Laravel',
            category: 'Backend',
            proficiency: 90,
            years_experience: 3,
            description: 'PHP framework for web application development'
        },
        {
            id: 2,
            name: 'PHP',
            category: 'Backend',
            proficiency: 85,
            years_experience: 4,
            description: 'Server-side scripting language'
        },
        {
            id: 3,
            name: 'JavaScript',
            category: 'Frontend',
            proficiency: 80,
            years_experience: 3,
            description: 'Client-side programming language'
        },
        {
            id: 4,
            name: 'MySQL',
            category: 'Database',
            proficiency: 75,
            years_experience: 3,
            description: 'Relational database management system'
        },
        {
            id: 5,
            name: 'Vue.js',
            category: 'Frontend',
            proficiency: 70,
            years_experience: 2,
            description: 'Progressive JavaScript framework'
        },
        {
            id: 6,
            name: 'HTML/CSS',
            category: 'Frontend',
            proficiency: 90,
            years_experience: 5,
            description: 'Markup and styling languages'
        }
    ]);

    const categories = ['Frontend', 'Backend', 'Database', 'DevOps', 'Design', 'Other'];

    const handleAdd = () => {
        setIsAdding(true);
    };

    const handleEdit = (id: number) => {
        setEditingId(id);
    };

    const handleDelete = (id: number) => {
        setSkills(skills.filter(skill => skill.id !== id));
    };

    const handleSave = (skill: Skill) => {
        if (editingId) {
            setSkills(skills.map(s => s.id === editingId ? skill : s));
            setEditingId(null);
        } else {
            setSkills([...skills, { ...skill, id: Date.now() }]);
            setIsAdding(false);
        }
    };

    const handleCancel = () => {
        setIsAdding(false);
        setEditingId(null);
    };

    const getProficiencyColor = (proficiency: number) => {
        if (proficiency >= 90) return 'text-green-400';
        if (proficiency >= 80) return 'text-blue-400';
        if (proficiency >= 70) return 'text-yellow-400';
        if (proficiency >= 60) return 'text-orange-400';
        return 'text-red-400';
    };

    const getProficiencyBarColor = (proficiency: number) => {
        if (proficiency >= 90) return 'bg-green-500';
        if (proficiency >= 80) return 'bg-blue-500';
        if (proficiency >= 70) return 'bg-yellow-500';
        if (proficiency >= 60) return 'bg-orange-500';
        return 'bg-red-500';
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Skills Management" />

            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
                <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-6">
                    {/* Header */}
                    <div className="rounded-2xl border border-gray-700/50 bg-gray-800/30 p-6 backdrop-blur-sm shadow-2xl">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-3xl font-bold text-transparent">
                                    Skills Management
                                </h1>
                                <p className="mt-2 text-gray-300">Manage your technical skills and expertise levels</p>
                            </div>
                            <button
                                onClick={handleAdd}
                                className="flex items-center space-x-2 rounded-xl bg-gradient-to-r from-green-600 to-blue-600 px-6 py-3 text-white transition-all duration-300 hover:from-green-700 hover:to-blue-700 hover:shadow-lg shadow-lg"
                            >
                                <Plus className="h-5 w-5" />
                                <span>Add Skill</span>
                            </button>
                        </div>
                    </div>

                    {/* Skills Grid */}
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {skills.map((skill) => (
                            <div key={skill.id} className="rounded-2xl border border-gray-700/50 bg-gray-800/30 p-6 backdrop-blur-sm shadow-2xl hover:shadow-3xl transition-all duration-300">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center space-x-3">
                                        <div className="rounded-lg bg-gradient-to-r from-green-500/20 to-blue-500/20 p-2">
                                            <Code className="h-6 w-6 text-green-400" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-white">{skill.name}</h3>
                                            <span className="inline-block px-3 py-1 bg-gray-700/50 border border-gray-600/50 rounded-lg text-sm text-gray-300">
                                                {skill.category}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <button
                                            onClick={() => handleEdit(skill.id)}
                                            className="p-2 text-gray-400 hover:text-green-400 transition-colors duration-200 rounded-lg hover:bg-gray-700/50"
                                        >
                                            <Edit className="h-4 w-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(skill.id)}
                                            className="p-2 text-gray-400 hover:text-red-400 transition-colors duration-200 rounded-lg hover:bg-gray-700/50"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>
                                
                                <p className="text-gray-300 mb-4 text-sm">{skill.description}</p>
                                
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-400">Proficiency</span>
                                        <span className={`font-semibold ${getProficiencyColor(skill.proficiency)}`}>
                                            {skill.proficiency}%
                                        </span>
                                    </div>
                                    <div className="w-full bg-gray-700/50 rounded-full h-2">
                                        <div 
                                            className={`h-2 rounded-full ${getProficiencyBarColor(skill.proficiency)} transition-all duration-300`}
                                            style={{ width: `${skill.proficiency}%` }}
                                        ></div>
                                    </div>
                                    
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-400">Experience</span>
                                        <span className="text-white font-medium">{skill.years_experience} years</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Add/Edit Form Modal */}
                    {(isAdding || editingId) && (
                        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                            <div className="bg-gray-800 rounded-2xl border border-gray-700/50 p-6 w-full max-w-2xl mx-4 shadow-2xl">
                                <h2 className="text-2xl font-bold text-white mb-6">
                                    {editingId ? 'Edit Skill' : 'Add New Skill'}
                                </h2>
                                
                                <Form method="post" action="/admin/skills" className="space-y-6">
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">Skill Name</label>
                                            <input
                                                type="text"
                                                name="name"
                                                defaultValue={editingId ? skills.find(s => s.id === editingId)?.name : ''}
                                                className="w-full rounded-xl border border-gray-600/50 bg-gray-700/30 px-4 py-3 text-white placeholder-gray-400 transition-all duration-300 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none"
                                                placeholder="e.g., Laravel, JavaScript"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                                            <select
                                                name="category"
                                                defaultValue={editingId ? skills.find(s => s.id === editingId)?.category : ''}
                                                className="w-full rounded-xl border border-gray-600/50 bg-gray-700/30 px-4 py-3 text-white transition-all duration-300 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none"
                                            >
                                                <option value="">Select Category</option>
                                                {categories.map(category => (
                                                    <option key={category} value={category}>{category}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">Proficiency Level (%)</label>
                                            <input
                                                type="number"
                                                name="proficiency"
                                                min="0"
                                                max="100"
                                                defaultValue={editingId ? skills.find(s => s.id === editingId)?.proficiency : ''}
                                                className="w-full rounded-xl border border-gray-600/50 bg-gray-700/30 px-4 py-3 text-white placeholder-gray-400 transition-all duration-300 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none"
                                                placeholder="0-100"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">Years of Experience</label>
                                            <input
                                                type="number"
                                                name="years_experience"
                                                min="0"
                                                step="0.5"
                                                defaultValue={editingId ? skills.find(s => s.id === editingId)?.years_experience : ''}
                                                className="w-full rounded-xl border border-gray-600/50 bg-gray-700/30 px-4 py-3 text-white placeholder-gray-400 transition-all duration-300 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none"
                                                placeholder="e.g., 2.5"
                                            />
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                                        <textarea
                                            name="description"
                                            rows={3}
                                            defaultValue={editingId ? skills.find(s => s.id === editingId)?.description : ''}
                                            className="w-full resize-none rounded-xl border border-gray-600/50 bg-gray-700/30 px-4 py-3 text-white placeholder-gray-400 transition-all duration-300 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none"
                                            placeholder="Brief description of the skill..."
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
                                            <span>Save Skill</span>
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
