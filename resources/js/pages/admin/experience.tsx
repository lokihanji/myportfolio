import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Form, Head } from '@inertiajs/react';
import { Briefcase, Calendar, MapPin, Building, Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Experience Management',
        href: '/admin/experience',
    },
];

interface Experience {
    id: number;
    title: string;
    company: string;
    location: string;
    start_date: string;
    end_date: string;
    current: boolean;
    description: string;
    technologies: string[];
}

export default function ExperienceManagement() {
    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [experiences, setExperiences] = useState<Experience[]>([
        {
            id: 1,
            title: 'Full-Stack Developer',
            company: 'Davao del Sur State College',
            location: 'Digos City, Davao del Sur',
            start_date: '2021-06-01',
            end_date: '',
            current: true,
            description: 'Developing and maintaining e-FIMS and e-HRIS systems using Laravel PHP. Responsible for full-stack development, database design, and system integration.',
            technologies: ['Laravel', 'PHP', 'MySQL', 'JavaScript', 'Vue.js', 'Bootstrap']
        },
        {
            id: 2,
            title: 'Technical Support Specialist',
            company: 'Freelance',
            location: 'Remote',
            start_date: '2020-01-01',
            end_date: '2021-05-31',
            current: false,
            description: 'Provided technical support and web development services for various clients. Built custom websites and web applications.',
            technologies: ['HTML', 'CSS', 'JavaScript', 'PHP', 'WordPress']
        }
    ]);

    const handleAdd = () => {
        setIsAdding(true);
    };

    const handleEdit = (id: number) => {
        setEditingId(id);
    };

    const handleDelete = (id: number) => {
        setExperiences(experiences.filter(exp => exp.id !== id));
    };

    const handleSave = (experience: Experience) => {
        if (editingId) {
            setExperiences(experiences.map(exp => exp.id === editingId ? experience : exp));
            setEditingId(null);
        } else {
            setExperiences([...experiences, { ...experience, id: Date.now() }]);
            setIsAdding(false);
        }
    };

    const handleCancel = () => {
        setIsAdding(false);
        setEditingId(null);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Experience Management" />

            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
                <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-6">
                    {/* Header */}
                    <div className="rounded-2xl border border-gray-700/50 bg-gray-800/30 p-6 backdrop-blur-sm shadow-2xl">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-3xl font-bold text-transparent">
                                    Experience Management
                                </h1>
                                <p className="mt-2 text-gray-300">Manage your work experience and professional background</p>
                            </div>
                            <button
                                onClick={handleAdd}
                                className="flex items-center space-x-2 rounded-xl bg-gradient-to-r from-green-600 to-blue-600 px-6 py-3 text-white transition-all duration-300 hover:from-green-700 hover:to-blue-700 hover:shadow-lg shadow-lg"
                            >
                                <Plus className="h-5 w-5" />
                                <span>Add Experience</span>
                            </button>
                        </div>
                    </div>

                    {/* Experience List */}
                    <div className="space-y-6">
                        {experiences.map((experience) => (
                            <div key={experience.id} className="rounded-2xl border border-gray-700/50 bg-gray-800/30 p-6 backdrop-blur-sm shadow-2xl">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center space-x-3 mb-4">
                                            <div className="rounded-lg bg-gradient-to-r from-green-500/20 to-blue-500/20 p-2">
                                                <Briefcase className="h-6 w-6 text-green-400" />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold text-white">{experience.title}</h3>
                                                <p className="text-green-400 font-medium">{experience.company}</p>
                                            </div>
                                        </div>
                                        
                                        <div className="grid md:grid-cols-2 gap-4 mb-4">
                                            <div className="flex items-center space-x-2 text-gray-300">
                                                <MapPin className="h-4 w-4 text-green-400" />
                                                <span>{experience.location}</span>
                                            </div>
                                            <div className="flex items-center space-x-2 text-gray-300">
                                                <Calendar className="h-4 w-4 text-green-400" />
                                                <span>
                                                    {experience.start_date} - {experience.current ? 'Present' : experience.end_date}
                                                </span>
                                            </div>
                                        </div>
                                        
                                        <p className="text-gray-300 mb-4">{experience.description}</p>
                                        
                                        <div className="flex flex-wrap gap-2">
                                            {experience.technologies.map((tech, index) => (
                                                <span
                                                    key={index}
                                                    className="px-3 py-1 bg-gray-700/50 border border-gray-600/50 rounded-lg text-sm text-gray-300"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center space-x-2 ml-4">
                                        <button
                                            onClick={() => handleEdit(experience.id)}
                                            className="p-2 text-gray-400 hover:text-green-400 transition-colors duration-200 rounded-lg hover:bg-gray-700/50"
                                        >
                                            <Edit className="h-5 w-5" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(experience.id)}
                                            className="p-2 text-gray-400 hover:text-red-400 transition-colors duration-200 rounded-lg hover:bg-gray-700/50"
                                        >
                                            <Trash2 className="h-5 w-5" />
                                        </button>
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
                                    {editingId ? 'Edit Experience' : 'Add New Experience'}
                                </h2>
                                
                                <Form method="post" action="/admin/experience" className="space-y-6">
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">Job Title</label>
                                            <input
                                                type="text"
                                                name="title"
                                                defaultValue={editingId ? experiences.find(e => e.id === editingId)?.title : ''}
                                                className="w-full rounded-xl border border-gray-600/50 bg-gray-700/30 px-4 py-3 text-white placeholder-gray-400 transition-all duration-300 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none"
                                                placeholder="e.g., Full-Stack Developer"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">Company</label>
                                            <input
                                                type="text"
                                                name="company"
                                                defaultValue={editingId ? experiences.find(e => e.id === editingId)?.company : ''}
                                                className="w-full rounded-xl border border-gray-600/50 bg-gray-700/30 px-4 py-3 text-white placeholder-gray-400 transition-all duration-300 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none"
                                                placeholder="e.g., Company Name"
                                            />
                                        </div>
                                    </div>
                                    
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">Location</label>
                                            <input
                                                type="text"
                                                name="location"
                                                defaultValue={editingId ? experiences.find(e => e.id === editingId)?.location : ''}
                                                className="w-full rounded-xl border border-gray-600/50 bg-gray-700/30 px-4 py-3 text-white placeholder-gray-400 transition-all duration-300 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none"
                                                placeholder="e.g., City, Country"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">Start Date</label>
                                            <input
                                                type="date"
                                                name="start_date"
                                                defaultValue={editingId ? experiences.find(e => e.id === editingId)?.start_date : ''}
                                                className="w-full rounded-xl border border-gray-600/50 bg-gray-700/30 px-4 py-3 text-white placeholder-gray-400 transition-all duration-300 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none"
                                            />
                                        </div>
                                    </div>
                                    
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">End Date</label>
                                            <input
                                                type="date"
                                                name="end_date"
                                                defaultValue={editingId ? experiences.find(e => e.id === editingId)?.end_date : ''}
                                                className="w-full rounded-xl border border-gray-600/50 bg-gray-700/30 px-4 py-3 text-white placeholder-gray-400 transition-all duration-300 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none"
                                            />
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <input
                                                type="checkbox"
                                                name="current"
                                                id="current"
                                                defaultChecked={editingId ? experiences.find(e => e.id === editingId)?.current : false}
                                                className="rounded border-gray-600 bg-gray-700/30 text-green-500 focus:ring-green-500 focus:ring-2"
                                            />
                                            <label htmlFor="current" className="text-sm font-medium text-gray-300">
                                                Currently working here
                                            </label>
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                                        <textarea
                                            name="description"
                                            rows={4}
                                            defaultValue={editingId ? experiences.find(e => e.id === editingId)?.description : ''}
                                            className="w-full resize-none rounded-xl border border-gray-600/50 bg-gray-700/30 px-4 py-3 text-white placeholder-gray-400 transition-all duration-300 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none"
                                            placeholder="Describe your role and responsibilities..."
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">Technologies Used</label>
                                        <input
                                            type="text"
                                            name="technologies"
                                            defaultValue={editingId ? experiences.find(e => e.id === editingId)?.technologies.join(', ') : ''}
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
                                            <span>Save Experience</span>
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
