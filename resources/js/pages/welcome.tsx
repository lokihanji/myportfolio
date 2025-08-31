import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { useRef, useState, useEffect, type MouseEvent } from 'react';   

interface PortfolioData {
    profile?: {
        full_name: string;
        title: string;
        bio: string;
        avatar?: string;
    };
    experiences?: Array<{
        title: string;
        company: string;
        location: string;
        start_date: string;
        end_date?: string;
        is_current: boolean;
        description: string;
        achievements?: string;
    }>;
    skills?: Array<{
        name: string;
        category: string;
        proficiency: number;
        is_featured: boolean;
    }>;
    projects?: Array<{
        title: string;
        description: string;
        image?: string;
        technologies?: string[];
        category: string;
    }>;
    portfolioItems?: Array<{
        title: string;
        description: string;
        image: string;
        category: string;
        tags?: string[];
    }>;
    contactInfo?: Array<{
        type: string;
        label: string;
        value: string;
        icon: string;
    }>;
    content?: Record<string, { content: string }>;
}

export default function Welcome() {
    const { auth, profile, experiences, skills, projects, portfolioItems, contactInfo, content } = usePage<SharedData & PortfolioData>().props;
    const propertiesRef = useRef<HTMLDivElement>(null);
    
    const scrollProperties = (direction: 'prev' | 'next') => {
        const container = propertiesRef.current;
        if (!container) return;
        const amount = container.clientWidth * 0.9;
        container.scrollBy({ left: direction === 'next' ? amount : -amount, behavior: 'smooth' });
    };

    const [showBackToTop, setShowBackToTop] = useState(false);
    useEffect(() => {
        const sections = Array.from(document.querySelectorAll('section'));
        if (sections.length === 0) return;
        const visible = new Set<Element>();
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        visible.add(entry.target);
                    } else {
                        visible.delete(entry.target);
                    }
                });
                setShowBackToTop(visible.size > 0);
            },
            { threshold: 0.2 }
        );
        sections.forEach((sec) => observer.observe(sec));
        return () => observer.disconnect();
    }, []);

    const handleNavClick = (event: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
        event.preventDefault();
        const target = document.getElementById(targetId);
        target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    // Helper function to format date
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
    };

    return (
        <>
            <Head title="Portfolio - Full-Stack Developer">
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
                <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.5.2/css/all.min.css" rel="stylesheet" />
            </Head>
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white scroll-smooth">
                {/* Navigation */}
                <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-sm border-b border-gray-700">
                    <div className="max-w-7xl mx-auto px-6 py-4">
                        <div className="flex items-center justify-between">
                            <Link href={route('login')} className="text-xl font-semibold text-green-400 hover:text-green-300 transition-colors cursor-pointer">
                                {profile?.full_name}
                            </Link>
                            <div className="hidden md:flex items-center gap-8">
                                <a href="#home" onClick={(e) => handleNavClick(e, 'home')} className="text-gray-300 hover:text-green-400 transition-all duration-300 ease-in-out hover:scale-105">Home</a>
                                <a href="#about" onClick={(e) => handleNavClick(e, 'about')} className="text-gray-300 hover:text-green-400 transition-all duration-300 ease-in-out hover:scale-105">About</a>
                                <a href="#experience" onClick={(e) => handleNavClick(e, 'experience')} className="text-gray-300 hover:text-green-400 transition-all duration-300 ease-in-out hover:scale-105">Experience</a>
                                <a href="#skills" onClick={(e) => handleNavClick(e, 'skills')} className="text-gray-300 hover:text-green-400 transition-all duration-300 ease-in-out hover:scale-105">Skills</a>
                                <a href="#projects" onClick={(e) => handleNavClick(e, 'projects')} className="text-gray-300 hover:text-green-400 transition-all duration-300 ease-in-out hover:scale-105">Projects</a>
                                <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')} className="text-gray-300 hover:text-green-400 transition-all duration-300 ease-in-out hover:scale-105">Contact</a>
                            </div>
                            <div className="md:hidden">
                                <button className="text-gray-300 hover:text-green-400 transition-colors duration-300 ease-in-out">
                                    <i className="fas fa-bars text-xl"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Hero Section */}
                <section id="home" className="pt-24 pb-16 px-6 transition-all duration-500 ease-in-out">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-col lg:flex-row items-center gap-12">
                            <div className="flex-1 text-center lg:text-left">
                                <h1 className="text-5xl lg:text-6xl font-bold mb-6">
                                    Hi, I'm <span className="text-green-400">{profile?.full_name}</span>
                                </h1>
                                <h2 className="text-2xl lg:text-3xl text-gray-300 mb-6">
                                    {profile?.title}
                                </h2>
                                <p className="text-lg text-gray-400 mb-8 leading-relaxed max-w-3xl">
                                    {profile?.bio}
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                    <a href="#contact" className="inline-block bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-medium transition-colors">
                                        Get In Touch
                                    </a>
                                    <a href="#projects" className="inline-block border border-gray-600 hover:border-green-400 text-gray-300 hover:text-green-400 px-8 py-3 rounded-lg font-medium transition-colors">
                                        View My Work
                                    </a>
                                </div>
                            </div>
                            <div className="flex-1 flex justify-center">
                                <div className="relative">
                                    <div className="w-80 h-80 rounded-full bg-gradient-to-br from-green-600 to-blue-600 flex items-center justify-center text-white text-6xl">
                                        <img src={profile?.avatar||'https://placehold.co/600x400'} alt={profile?.full_name} className="w-full h-full object-cover rounded-full" />
                                    </div>
                                    <div className="absolute inset-0 rounded-full border-4 border-green-400/20 animate-pulse"></div>
                                    <div className="absolute -top-4 -right-4 w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white text-2xl animate-bounce" style={{ animationDelay: '0.2s' }}>
                                        <i className="fab fa-laravel"></i>
                                    </div>
                                    <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl animate-bounce" style={{ animationDelay: '0.5s' }}>
                                        <i className="fab fa-react"></i>
                                    </div>
                                    <div className="absolute bottom-4 -right-3 w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white text-xl animate-bounce" style={{ animationDelay: '1s' }}>
                                        <i className="fab fa-vuejs"></i>
                                    </div>
                                    <div className="absolute top-5 right-68 w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white text-xl animate-bounce" style={{ animationDelay: '1.5s' }}>
                                        <i className="fab fa-php"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* About Section */}
                <section id="about" className="py-16 px-6 bg-gray-800/50 transition-all duration-500 ease-in-out">
                    <div className="max-w-7xl mx-auto">
                        <h2 className="text-4xl font-bold text-center mb-12">{content?.['about_title']?.content || 'About Me'}</h2>
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <h3 className="text-2xl font-semibold mb-6 text-green-400">Professional Journey</h3>
                                <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                                    {profile?.bio || 'Currently working as a Full-Stack Developer at Davao del Sur State College, where I develop and maintain critical systems including e-FIMS (Financial Information Management System) and e-HRIS (Human Resource Information System) using Laravel PHP framework.'}
                                </p>
                                <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                                    My diverse background spans across multiple technical domains - from software and hardware 
                                    technical support to creative graphic design. This multidisciplinary experience allows me 
                                    to approach problems from different angles and deliver comprehensive solutions.
                                </p>
                                <p className="text-lg text-gray-300 leading-relaxed">
                                    I'm passionate about creating efficient, user-friendly systems that solve real-world problems 
                                    and improve organizational workflows.
                                </p>
                            </div>
                            <div className="grid grid-cols-3 gap-6">
                                <div className="text-center">
                                    <div className="text-4xl font-bold text-green-400 mb-2">{experiences?.length || 3}+</div>
                                    <div className="text-gray-400">Years Experience</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-4xl font-bold text-green-400 mb-2">{projects?.length || 2}</div>
                                    <div className="text-gray-400">Major Systems</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-4xl font-bold text-green-400 mb-2">{skills?.length || 10}+</div>
                                    <div className="text-gray-400">Technologies</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Experience Section */}
                <section id="experience" className="py-16 px-6 transition-all duration-500 ease-in-out">
                    <div className="max-w-7xl mx-auto">
                        <h2 className="text-4xl font-bold text-center mb-12">Professional Experience</h2>
                        <div className="space-y-8">
                            {experiences?.map((exp, index) => (
                                <div key={index} className="relative border-l-4 border-green-500 pl-8">
                                <div className="absolute -left-3 top-0 w-6 h-6 bg-green-500 rounded-full"></div>
                                <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
                                        <h3 className="text-xl font-semibold text-green-400">{exp.title}</h3>
                                        <h4 className="text-lg text-gray-300 mb-2">{exp.company}</h4>
                                        <p className="text-gray-400 mb-4">
                                            {formatDate(exp.start_date)} - {exp.is_current ? 'Present' : (exp.end_date ? formatDate(exp.end_date) : 'Present')}
                                        </p>
                                    <div className="text-gray-300 mb-4">
                                            <p className="mb-3">{exp.description}</p>
                                            {exp.achievements && (
                                        <ul className="list-disc list-inside space-y-2 ml-4">
                                                    <li>{exp.achievements}</li>
                                        </ul>
                                            )}
                                    </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Skills Section */}
                <section id="skills" className="py-16 px-6 bg-gray-800/50 transition-all duration-500 ease-in-out">
                    <div className="max-w-7xl mx-auto">
                        <h2 className="text-4xl font-bold text-center mb-12">Skills & Technologies</h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {skills?.map((skill, index) => (
                                <div key={index} className="bg-gray-800/50 rounded-lg p-6 border border-gray-700 hover:border-green-400 transition-all duration-300">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-lg font-semibold text-green-400">{skill.name}</h3>
                                        <span className="text-sm text-gray-400">{skill.category}</span>
                                                </div>
                                                <div className="w-full bg-gray-700 rounded-full h-2">
                                        <div 
                                            className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-1000 ease-out"
                                            style={{ width: `${skill.proficiency}%` }}
                                        ></div>
                                    </div>
                                    <div className="text-right mt-2">
                                        <span className="text-sm text-gray-400">{skill.proficiency}%</span>
                                                </div>
                                            </div>
                                        ))}
                        </div>
                    </div>
                </section>

                {/* Projects Section */}
                <section id="projects" className="py-16 px-6 transition-all duration-500 ease-in-out">
                    <div className="max-w-7xl mx-auto">
                        <h2 className="text-4xl font-bold text-center mb-12">Featured Projects</h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {projects?.map((project, index) => (
                                <div key={index} className="bg-gray-800/50 rounded-lg overflow-hidden border border-gray-700 hover:border-green-400 transition-all duration-300 hover:transform hover:scale-105">
                                    {project.image && (
                                        <div className="h-48 bg-gray-700 flex items-center justify-center">
                                            <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                                </div>
                                    )}
                                    <div className="p-6">
                                        <h3 className="text-xl font-semibold text-green-400 mb-2">{project.title}</h3>
                                        <p className="text-gray-300 mb-4">{project.description}</p>
                                        <div className="flex flex-wrap gap-2">
                                            {project.technologies?.map((tech, techIndex) => (
                                                <span key={techIndex} className="px-3 py-1 bg-green-600/20 text-green-400 rounded-full text-sm">
                                                    {tech}
                                                </span>
                                            ))}
                                </div>
                            </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Contact Section */}
                <section id="contact" className="py-16 px-6 bg-gray-800/50 transition-all duration-500 ease-in-out">
                    <div className="max-w-7xl mx-auto">
                        <h2 className="text-4xl font-bold text-center mb-12">Get In Touch</h2>
                        <div className="grid md:grid-cols-2 gap-12">
                            <div>
                                <h3 className="text-2xl font-semibold mb-6 text-green-400">Contact Information</h3>
                                <div className="space-y-4">
                                    {contactInfo?.map((info, index) => (
                                        <div key={index} className="flex items-center space-x-4">
                                            <div className="w-12 h-12 bg-green-600/20 rounded-lg flex items-center justify-center">
                                                <i className={`fas fa-${info.icon} text-green-400 text-xl`}></i>
                                        </div>
                                        <div>
                                                <p className="text-gray-400 text-sm">{info.label}</p>
                                                <p className="text-white font-medium">{info.value}</p>
                                    </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                                    <div>
                                <h3 className="text-2xl font-semibold mb-6 text-green-400">Send a Message</h3>
                                <form className="space-y-4">
                                    <input 
                                        type="text" 
                                        placeholder="Your Name" 
                                        className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-green-500 focus:outline-none"
                                    />
                                    <input 
                                        type="email" 
                                        placeholder="Your Email" 
                                        className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-green-500 focus:outline-none"
                                    />
                                    <textarea 
                                        placeholder="Your Message" 
                                        rows={4}
                                        className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-green-500 focus:outline-none resize-none"
                                    ></textarea>
                                    <button 
                                        type="submit" 
                                        className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                                    >
                                        Send Message
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                  {showBackToTop && (
                    <button 
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="fixed bottom-8 right-8 w-12 h-12 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-40"
                    >
                        <i className="fas fa-arrow-up"></i>
                    </button>
                )}
                <footer className="py-8 px-6 border-t border-gray-700 bg-gray-900">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                            <div className="text-gray-400">
                                <p>&copy; 2025 {profile?.full_name}. All rights reserved.</p>
                            </div>
                            <div className="flex gap-4">
                                <a href="https://github.com/lokihanji" target="_blank" className="w-10 h-10 bg-gray-700 hover:bg-green-600 rounded-lg flex items-center justify-center text-gray-300 hover:text-white transition-colors">
                                    <i className="fab fa-github"></i>
                                </a>
                                <a href="https://www.facebook.com/edizon.tabac.9" target="_blank" className="w-10 h-10 bg-gray-700 hover:bg-blue-600 rounded-lg flex items-center justify-center text-gray-300 hover:text-white transition-colors">
                                    <i className="fab fa-facebook"></i>
                                </a>
                                <a href="https://x.com/edizon_tab96314" target="_blank" className="w-10 h-10 bg-gray-700 hover:bg-black rounded-lg flex items-center justify-center text-gray-300 hover:text-white transition-colors">
                                    <i className="fab fa-x-twitter"></i>
                                </a>
                                <a href="mailto:edizontabac1996@gmail.com" className="w-10 h-10 bg-gray-700 hover:bg-green-600 rounded-lg flex items-center justify-center text-gray-300 hover:text-white transition-colors">
                                    <i className="fas fa-envelope"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}

