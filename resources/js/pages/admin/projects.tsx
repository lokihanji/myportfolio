import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Form, Head } from '@inertiajs/react';
import { Folder, Calendar, Globe, Code, Plus, Edit, Trash2, Save, X, ExternalLink, Github } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Projects Management',
        href: '/admin/projects',
    },
];

interface Project {
    id: number;
    title: string;
    description: string;
    technologies: string[];
    image_url: string;
    live_url: string;
    github_url: string;
    start_date: string;
    end_date: string;
    status: 'completed' | 'in-progress' | 'planned';
    category: string;
    featured: boolean;
}

export default function ProjectsManagement() {
    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [projects, setProjects] = useState<Project[]>([
        {
            id: 1,
            title: 'e-FIMS System',
            description: 'Financial Information Management System for Davao del Sur State College. Built with Laravel PHP and modern web technologies.',
            technologies: ['Laravel', 'PHP', 'MySQL', 'JavaScript', 'Bootstrap'],
            image_url: '/images/projects/efims.jpg',
            live_url: 'https://efims.dssc.edu.ph',
            github_url: 'https://github.com/edizon/efims',
            start_date: '2023-01-01',
            end_date: '2023-06-30',
            status: 'completed',
            category: 'Web Application',
            featured: true
        },
        {
            id: 2,
            title: 'e-HRIS System',
            description: 'Human Resource Information System for managing employee data, attendance, and payroll.',
            technologies: ['Laravel', 'PHP', 'MySQL', 'Vue.js', 'Tailwind CSS'],
            image_url: '/images/projects/ehrs.jpg',
            live_url: 'https://ehrs.dssc.edu.ph',
            github_url: 'https://github.com/edizon/ehrs',
            start_date: '2023-07-01',
            end_date: '',
            status: 'in-progress',
            category: 'Web Application',
            featured: true
        },
        {
            id: 3,
            title: 'Portfolio Website',
            description: 'Personal portfolio website showcasing skills, projects, and professional experience.',
            technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Inertia.js'],
            image_url: '/images/projects/portfolio.jpg',
            live_url: 'https://edizontabac.com',
            github_url: 'https://github.com/edizon/portfolio',
            start_date: '2024-01-01',
            end_date: '2024-03-15',
            status: 'completed',
            category: 'Portfolio',
            featured: false
        }
    ]);

    const categories = ['Web Application', 'Mobile App', 'Portfolio', 'E-commerce', 'API', 'Other'];
    const statuses = ['completed', 'in-progress', 'planned'];

    const handleAdd = () => {
        setIsAdding(true);
    };

    const handleEdit = (id: number) => {
        setEditingId(id);
    };

    const handleDelete = (id: number) => {
        setProjects(projects.filter(project => project.id !== id));
    };

    const handleSave = (project: Project) => {
        if (editingId) {
            setProjects(projects.map(p => p.id === editingId ? project : p));
            setEditingId(null);
        } else {
            setProjects([...projects, { ...project, id: Date.now() }]);
            setIsAdding(false);
        }
    };

    const handleCancel = () => {
        setIsAdding(false);
        setEditingId(null);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed': return 'text-green-400 bg-green-400/20 border-green-400/30';
            case 'in-progress': return 'text-blue-400 bg-blue-400/20 border-blue-400/30';
            case 'planned': return 'text-yellow-400 bg-yellow-400/20 border-yellow-400/30';
            default: return 'text-gray-400 bg-gray-400/20 border-gray-400/30';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'completed': return '✓';
            case 'in-progress': return '⟳';
            case 'planned': return '📋';
            default: return '•';
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Projects Management" />

            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
                <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-6">
                    {/* Header */}
                    <div className="rounded-2xl border border-gray-700/50 bg-gray-800/30 p-6 backdrop-blur-sm shadow-2xl">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-3xl font-bold text-transparent">
                                    Projects Management
                                </h1>
                                <p className="mt-2 text-gray-300">Manage your portfolio projects and showcase your work</p>
                            </div>
                            <button
                                onClick={handleAdd}
                                className="flex items-center space-x-2 rounded-xl bg-gradient-to-r from-green-600 to-blue-600 px-6 py-3 text-white transition-all duration-300 hover:from-green-700 hover:to-blue-700 hover:shadow-lg shadow-lg"
                            >
                                <Plus className="h-5 w-5" />
                                <span>Add Project</span>
                            </button>
                        </div>
                    </div>

                    {/* Projects Grid */}
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {projects.map((project) => (
                            <div key={project.id} className="rounded-2xl border border-gray-700/50 bg-gray-800/30 p-6 backdrop-blur-sm shadow-2xl hover:shadow-3xl transition-all duration-300">
                                {/* Project Image Placeholder */}
                                <div className="relative mb-4 h-48 rounded-xl bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
                                    <Folder className="h-16 w-16 text-gray-500" />
                                    {project.featured && (
                                        <div className="absolute top-2 right-2 px-2 py-1 bg-gradient-to-r from-green-500 to-blue-500 text-white text-xs font-bold rounded-lg">
                                            Featured
                                        </div>
                                    )}
                                </div>

                                {/* Project Info */}
                                <div className="space-y-3">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <h3 className="text-xl font-bold text-white mb-1">{project.title}</h3>
                                            <p className="text-sm text-gray-300 line-clamp-2">{project.description}</p>
                                        </div>
                                        <div className="flex items-center space-x-2 ml-3">
                                            <button
                                                onClick={() => handleEdit(project.id)}
                                                className="p-2 text-gray-400 hover:text-green-400 transition-colors duration-200 rounded-lg hover:bg-gray-700/50"
                                            >
                                                <Edit className="h-4 w-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(project.id)}
                                                className="p-2 text-gray-400 hover:text-red-400 transition-colors duration-200 rounded-lg hover:bg-gray-700/50"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Status and Category */}
                                    <div className="flex items-center justify-between">
                                        <span className={`px-3 py-1 rounded-lg text-xs font-medium border ${getStatusColor(project.status)}`}>
                                            {getStatusIcon(project.status)} {project.status.replace('-', ' ')}
                                        </span>
                                        <span className="px-3 py-1 bg-gray-700/50 border border-gray-600/50 rounded-lg text-xs text-gray-300">
                                            {project.category}
                                        </span>
                                    </div>

                                    {/* Technologies */}
                                    <div className="flex flex-wrap gap-2">
                                        {project.technologies.slice(0, 3).map((tech, index) => (
                                            <span
                                                key={index}
                                                className="px-2 py-1 bg-gray-700/50 border border-gray-600/50 rounded-lg text-xs text-gray-300"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                        {project.technologies.length > 3 && (
                                            <span className="px-2 py-1 bg-gray-700/50 border border-gray-600/50 rounded-lg text-xs text-gray-400">
                                                +{project.technologies.length - 3} more
                                            </span>
                                        )}
                                    </div>

                                    {/* Dates */}
                                    <div className="flex items-center space-x-2 text-xs text-gray-400">
                                        <Calendar className="h-3 w-3" />
                                        <span>
                                            {project.start_date} - {project.end_date || 'Ongoing'}
                                        </span>
                                    </div>

                                    {/* Links */}
                                    <div className="flex items-center space-x-2 pt-2">
                                        {project.live_url && (
                                            <a
                                                href={project.live_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center space-x-1 px-3 py-1 bg-green-600/20 border border-green-600/30 rounded-lg text-green-400 hover:bg-green-600/30 transition-colors duration-200 text-xs"
                                            >
                                                <ExternalLink className="h-3 w-3" />
                                                <span>Live</span>
                                            </a>
                                        )}
                                        {project.github_url && (
                                            <a
                                                href={project.github_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center space-x-1 px-3 py-1 bg-gray-600/20 border border-gray-600/30 rounded-lg text-gray-400 hover:bg-gray-600/30 transition-colors duration-200 text-xs"
                                            >
                                                <Github className="h-3 w-3" />
                                                <span>Code</span>
                                            </a>
                                        )}
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
                                    {editingId ? 'Edit Project' : 'Add New Project'}
                                </h2>
                                
                                <Form method="post" action="/admin/projects" className="space-y-6">
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">Project Title</label>
                                            <input
                                                type="text"
                                                name="title"
                                                defaultValue={editingId ? projects.find(p => p.id === editingId)?.title : ''}
                                                className="w-full rounded-xl border border-gray-600/50 bg-gray-700/30 px-4 py-3 text-white placeholder-gray-400 transition-all duration-300 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none"
                                                placeholder="e.g., e-FIMS System"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                                            <select
                                                name="category"
                                                defaultValue={editingId ? projects.find(p => p.id === editingId)?.category : ''}
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
                                            defaultValue={editingId ? projects.find(p => p.id === editingId)?.description : ''}
                                            className="w-full resize-none rounded-xl border border-gray-600/50 bg-gray-700/30 px-4 py-3 text-white placeholder-gray-400 transition-all duration-300 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none"
                                            placeholder="Describe your project..."
                                        />
                                    </div>
                                    
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">Start Date</label>
                                            <input
                                                type="date"
                                                name="start_date"
                                                defaultValue={editingId ? projects.find(p => p.id === editingId)?.start_date : ''}
                                                className="w-full rounded-xl border border-gray-600/50 bg-gray-700/30 px-4 py-3 text-white transition-all duration-300 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">End Date</label>
                                            <input
                                                type="date"
                                                name="end_date"
                                                defaultValue={editingId ? projects.find(p => p.id === editingId)?.end_date : ''}
                                                className="w-full rounded-xl border border-gray-600/50 bg-gray-700/30 px-4 py-3 text-white transition-all duration-300 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none"
                                            />
                                        </div>
                                    </div>
                                    
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">Status</label>
                                            <select
                                                name="status"
                                                defaultValue={editingId ? projects.find(p => p.id === editingId)?.status : ''}
                                                className="w-full rounded-xl border border-gray-600/50 bg-gray-700/30 px-4 py-3 text-white transition-all duration-300 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none"
                                            >
                                                <option value="">Select Status</option>
                                                {statuses.map(status => (
                                                    <option key={status} value={status}>{status.replace('-', ' ')}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <input
                                                type="checkbox"
                                                name="featured"
                                                id="featured"
                                                defaultChecked={editingId ? projects.find(p => p.id === editingId)?.featured : false}
                                                className="rounded border-gray-600 bg-gray-700/30 text-green-500 focus:ring-green-500 focus:ring-2"
                                            />
                                            <label htmlFor="featured" className="text-sm font-medium text-gray-300">
                                                Featured Project
                                            </label>
                                        </div>
                                    </div>
                                    
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">Live URL</label>
                                            <input
                                                type="url"
                                                name="live_url"
                                                defaultValue={editingId ? projects.find(p => p.id === editingId)?.live_url : ''}
                                                className="w-full rounded-xl border border-gray-600/50 bg-gray-700/30 px-4 py-3 text-white placeholder-gray-400 transition-all duration-300 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none"
                                                placeholder="https://project.com"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">GitHub URL</label>
                                            <input
                                                type="url"
                                                name="github_url"
                                                defaultValue={editingId ? projects.find(p => p.id === editingId)?.github_url : ''}
                                                className="w-full rounded-xl border border-gray-600/50 bg-gray-700/30 px-4 py-3 text-white placeholder-gray-400 transition-all duration-300 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none"
                                                placeholder="https://github.com/user/project"
                                            />
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">Technologies Used</label>
                                        <input
                                            type="text"
                                            name="technologies"
                                            defaultValue={editingId ? projects.find(p => p.id === editingId)?.technologies.join(', ') : ''}
                                            className="w-full rounded-xl border border-gray-600/50 bg-gray-700/30 px-4 py-3 text-white placeholder-gray-400 transition-all duration-300 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none"
                                            placeholder="e.g., Laravel, PHP, MySQL, JavaScript (comma separated)"
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
                                            <span>Save Project</span>
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
