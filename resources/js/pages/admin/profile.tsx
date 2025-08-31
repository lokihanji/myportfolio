import {
    AppLayout,
    BreadcrumbItem,
    Head,
    axios,
    FileText,
    Globe,
    Mail,
    Save,
    User,
    useEffect,
    useState,
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    SelectSearchableContent,
    Input,
    Label,
    Button,
    Textarea,
    locationOptions,
} from '@/components/imports';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Profile Management',
        href: '/admin/profile',
    },
];

interface ProfileData {
    id?: number;
    first_name: string;
    middle_name?: string;
    last_name: string;
    title: string;
    location?: string;
    bio?: string;
    avatar?: string;
    website?: string;
    linkedin?: string;
    github?: string;
    twitter?: string;
}

interface UserData {
    id?: number;
    name: string;
    email: string;
    password?: string;
}

interface CombinedData {
    user: UserData;
    profile: ProfileData;
}

export default function ProfileManagement() {
    const [isEditing, setIsEditing] = useState(false);
    const [profile, setProfile] = useState<ProfileData>({
        first_name: '',
        middle_name: '',
        last_name: '',
        title: '',
        location: '',
        bio: '',
        avatar: '',
        website: '',
        linkedin: '',
        github: '',
        twitter: '',
    });
    const [user, setUser] = useState<UserData>({
        name: '',
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [locationSearch, setLocationSearch] = useState('');

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {
        try {
            const [profileResponse, userResponse] = await Promise.all([
                axios.get('/api/admin/profile'),
                axios.get('/api/admin/user')
            ]);
            
            if (profileResponse.data) {
                setProfile(profileResponse.data);
            }
            
            if (userResponse.data) {
                setUser(userResponse.data);
            }
        } catch (error) {
            console.error('Error loading data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            // Save profile data
            if (profile.id) {
                await axios.put(`/api/admin/profile/${profile.id}`, profile);
            } else {
                const response = await axios.post('/api/admin/profile', profile);
                setProfile(response.data);
            }

            // Save user data
            if (user.id) {
                await axios.put(`/api/admin/user/${user.id}`, user);
            } else {
                const response = await axios.post('/api/admin/user', user);
                setUser(response.data);
            }

            setIsEditing(false);
        } catch (error) {
            console.error('Error saving data:', error);
        } finally {
            setSaving(false);
        }
    };

    const handleInputChange = (field: keyof ProfileData, value: string) => {
        setProfile((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleUserInputChange = (field: keyof UserData, value: string) => {
        setUser((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    if (loading) {
        return (
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Profile Management" />
                <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
                    <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-6">
                        <div className="rounded-2xl border border-gray-700/50 bg-gray-800/30 p-8 shadow-2xl backdrop-blur-sm">
                            <div className="text-center text-white">Loading profile...</div>
                        </div>
                    </div>
                </div>
            </AppLayout>
        );
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Profile Management" />

            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
                <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-6">
                    {/* Header */}
                    <div className="rounded-2xl border border-gray-700/50 bg-gray-800/30 p-6 shadow-2xl backdrop-blur-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-3xl font-bold text-transparent">
                                    Profile Management
                                </h1>
                                <p className="mt-2 text-gray-300">Manage your personal information and profile details</p>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Button
                                    onClick={() => setIsEditing(!isEditing)}
                                    className="rounded-xl border border-gray-600/50 bg-gray-700/50 px-6 py-3 text-white transition-all duration-300 hover:bg-gray-600/50 hover:shadow-lg"
                                >
                                    {isEditing ? 'Cancel' : 'Edit Profile'}
                                </Button>
                                {isEditing && (
                                    <Button
                                        onClick={handleSave}
                                        disabled={saving}
                                        className="flex items-center space-x-2 rounded-xl bg-gradient-to-r from-green-600 to-blue-600 px-6 py-3 text-white shadow-lg transition-all duration-300 hover:from-green-700 hover:to-blue-700 hover:shadow-lg disabled:opacity-50"
                                    >
                                        <Save className="h-5 w-5" />
                                        <span>{saving ? 'Saving...' : 'Save Changes'}</span>
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="grid gap-6 lg:grid-cols-3">
                        {/* Profile Picture Section */}
                        <div className="lg:col-span-1">
                            <div className="rounded-2xl border border-gray-700/50 bg-gray-800/30 p-8 shadow-2xl backdrop-blur-sm">
                                <div className="text-center">
                                    <div className="relative mb-6 inline-block">
                                        <div className="flex h-36 w-36 items-center justify-center rounded-full bg-gradient-to-br from-green-500 via-blue-500 to-purple-600 text-4xl text-white shadow-2xl">
                                            <User className="h-20 w-20" />
                                        </div>
                                        {isEditing && (
                                            <Button className="absolute right-0 bottom-0 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg transition-all duration-300 hover:from-green-600 hover:to-blue-600 hover:shadow-lg">
                                                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                                                    />
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                                                    />
                                                </svg>
                                            </Button>
                                        )}
                                    </div>
                                    <h3 className="mb-2 text-2xl font-bold text-white">
                                        {profile.first_name + ' ' + (profile.middle_name ? profile.middle_name + ' ' : '') + profile.last_name ||
                                            'Your Name'}
                                    </h3>
                                    <p className="mb-1 font-semibold text-green-400">{profile.title || 'Your Title'}</p>
                                    <p className="text-sm text-gray-400">{profile.location || 'Your Location'}</p>
                                </div>
                            </div>
                        </div>

                        {/* Profile Form Section */}
                        <div className="lg:col-span-2">
                            <div className="rounded-2xl border border-gray-700/50 bg-gray-800/30 p-8 shadow-2xl backdrop-blur-sm">
                                <form onSubmit={handleSave}>
                                    <div className="space-y-8">
                                        {/* Personal Information */}
                                        <div className="rounded-xl border border-gray-700/30 bg-gray-800/20 p-6">
                                            <h3 className="mb-6 flex items-center text-xl font-semibold text-white">
                                                <div className="mr-3 rounded-lg bg-gradient-to-r from-green-500/20 to-blue-500/20 p-2">
                                                    <User className="h-6 w-6 text-green-400" />
                                                </div>
                                                Personal Information
                                            </h3>
                                            <div className="mb-5 grid gap-6 md:grid-cols-2">
                                                <div>
                                                    <Label className="mb-3 block text-sm font-medium text-gray-300">First Name</Label>
                                                    <Input
                                                        type="text"
                                                        value={profile.first_name}
                                                        onChange={(e) => handleInputChange('first_name', e.target.value)}
                                                        disabled={!isEditing}
                                                        className="w-full rounded-xl border border-gray-600/50 bg-gray-700/30 px-4 py-3 text-white placeholder-gray-400 transition-all duration-300 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                                                    />
                                                </div>
                                                <div>
                                                    <Label className="mb-3 block text-sm font-medium text-gray-300">Last Name</Label>
                                                    <Input
                                                        type="text"
                                                        value={profile.last_name || ''}
                                                        onChange={(e) => handleInputChange('last_name', e.target.value)}
                                                        disabled={!isEditing}
                                                        className="w-full rounded-xl border border-gray-600/50 bg-gray-700/30 px-4 py-3 text-white placeholder-gray-400 transition-all duration-300 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                                                    />
                                                </div>
                                            </div>
                                            <div className="grid gap-6 md:grid-cols-2 mb-5">
                                                <div>
                                                    <Label className="mb-3 block text-sm font-medium text-gray-300">Middle Name</Label>
                                                    <Input
                                                        type="text"
                                                        value={profile.middle_name || ''}
                                                        onChange={(e) => handleInputChange('middle_name', e.target.value)}
                                                        disabled={!isEditing}
                                                        className="w-full rounded-xl border border-gray-600/50 bg-gray-700/30 px-4 py-3 text-white placeholder-gray-400 transition-all duration-300 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                                                    />
                                                </div>
                                                <div>
                                                    <Label className="mb-3 block text-sm font-medium text-gray-300">Job Title</Label>
                                                    <Input
                                                        type="text"
                                                        value={profile.title}
                                                        onChange={(e) => handleInputChange('title', e.target.value)}
                                                        disabled={!isEditing}
                                                        className="w-full rounded-xl border border-gray-600/50 bg-gray-700/30 px-4 py-3 text-white placeholder-gray-400 transition-all duration-300 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                                                    />
                                                </div>
                                                
                                            </div>
                                            <div>
                                                <Label className="mb-3 block text-sm font-medium text-gray-300">Professional Summary</Label>
                                                <Textarea
                                                    value={profile.bio || ''}
                                                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleInputChange('bio', e.target.value)}
                                                    rows={6}
                                                    disabled={!isEditing}
                                                    placeholder="Enter your professional summary here..."
                                                    className="w-full h-40 rounded-xl border border-gray-600/50 bg-gray-700/30 px-4 py-3 text-white placeholder-gray-400 transition-all duration-300 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 leading-relaxed"
                                                />
                                            </div>
                                        </div>

                                         {/* Location Section */}
                                         <div className="rounded-xl border border-gray-700/30 bg-gray-800/20 p-6">
                                            <h3 className="mb-6 flex items-center text-xl font-semibold text-white">
                                                <div className="mr-3 rounded-lg bg-gradient-to-r from-green-500/20 to-blue-500/20 p-2">
                                                    <FileText className="h-6 w-6 text-green-400" />
                                                </div>
                                                Location
                                            </h3>
                                                                                         <div>
                                                 <Label className="mb-3 block text-sm font-medium text-gray-300">Location</Label>
                                                 <Select
                                                     value={profile.location || ''}
                                                     onValueChange={(value) => handleInputChange('location', value)}
                                                     disabled={!isEditing}
                                                 >
                                                     <SelectTrigger className="w-full rounded-xl border border-gray-600/50 bg-gray-700/30 px-4 py-3 text-white placeholder-gray-400 transition-all duration-300 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50">
                                                         <SelectValue placeholder="Select location" />
                                                     </SelectTrigger>
                                                     <SelectSearchableContent 
                                                         searchValue={locationSearch}
                                                         onSearchChange={setLocationSearch}
                                                         searchPlaceholder="Search locations..."
                                                         className="bg-gray-800 border-gray-600 text-white"
                                                     >
                                                         {locationOptions
                                                             .filter(location => 
                                                                 location.toLowerCase().includes(locationSearch.toLowerCase())
                                                         )
                                                             .map(location => (
                                                                 <SelectItem key={location} value={location}>
                                                                     {location}
                                                                 </SelectItem>
                                                             ))}
                                                     </SelectSearchableContent>
                                                 </Select>
                                             </div>
                                        </div>


                                        {/* Account Information */}
                                        <div className="rounded-xl border border-gray-700/30 bg-gray-800/20 p-6">
                                            <h3 className="mb-6 flex items-center text-xl font-semibold text-white">
                                                <div className="mr-3 rounded-lg bg-gradient-to-r from-green-500/20 to-blue-500/20 p-2">
                                                    <Mail className="h-6 w-6 text-green-400" />
                                                </div>
                                                Account Information
                                            </h3>
                                            <div className="mb-5 grid gap-6 md:grid-cols-1">
                                                <div>
                                                    <Label className="mb-3 block text-sm font-medium text-gray-300">Name</Label>
                                                    <Input
                                                        type="text"
                                                        value={user.name}
                                                        onChange={(e) => handleUserInputChange('name', e.target.value)}
                                                        disabled={!isEditing}
                                                        className="w-full rounded-xl border border-gray-600/50 bg-gray-700/30 px-4 py-3 text-white placeholder-gray-400 transition-all duration-300 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                                                    />
                                                </div>
                                            </div>
                                            <div className="grid gap-6 md:grid-cols-2">
                                                <div>
                                                    <Label className="mb-3 block text-sm font-medium text-gray-300">Email</Label>
                                                    <Input
                                                        type="email"
                                                        value={user.email}
                                                        onChange={(e) => handleUserInputChange('email', e.target.value)}
                                                        disabled={!isEditing}
                                                        className="w-full rounded-xl border border-gray-600/50 bg-gray-700/30 px-4 py-3 text-white placeholder-gray-400 transition-all duration-300 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                                                    />
                                                </div>
                                                <div>
                                                    <Label className="mb-3 block text-sm font-medium text-gray-300">Password</Label>
                                                    <Input
                                                        type="password"
                                                        value={user.password || ''}
                                                        onChange={(e) => handleUserInputChange('password', e.target.value)}
                                                        placeholder={isEditing ? "Enter new password" : "••••••••"}
                                                        disabled={!isEditing}
                                                        className="w-full rounded-xl border border-gray-600/50 bg-gray-700/30 px-4 py-3 text-white placeholder-gray-400 transition-all duration-300 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                       
                                        {/* Social Media Links */}
                                        <div className="rounded-xl border border-gray-700/30 bg-gray-800/20 p-6">
                                            <h3 className="mb-6 flex items-center text-xl font-semibold text-white">
                                                <div className="mr-3 rounded-lg bg-gradient-to-r from-green-500/20 to-blue-500/20 p-2">
                                                    <Globe className="h-6 w-6 text-green-400" />
                                                </div>
                                                Social Media & Links
                                            </h3>
                                            <div className="grid gap-6 md:grid-cols-2">
                                                <div>
                                                    <Label className="mb-3 block text-sm font-medium text-gray-300">GitHub</Label>
                                                    <Input
                                                        type="url"
                                                        value={profile.github || ''}
                                                        onChange={(e) => handleInputChange('github', e.target.value)}
                                                        disabled={!isEditing}
                                                        className="w-full rounded-xl border border-gray-600/50 bg-gray-700/30 px-4 py-3 text-white placeholder-gray-400 transition-all duration-300 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                                                    />
                                                </div>
                                                <div>
                                                    <Label className="mb-3 block text-sm font-medium text-gray-300">LinkedIn</Label>
                                                    <Input
                                                        type="url"
                                                        value={profile.linkedin || ''}
                                                        onChange={(e) => handleInputChange('linkedin', e.target.value)}
                                                        disabled={!isEditing}
                                                        className="w-full rounded-xl border border-gray-600/50 bg-gray-700/30 px-4 py-3 text-white placeholder-gray-400 transition-all duration-300 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                                                    />
                                                </div>
                                                <div>
                                                    <Label className="mb-3 block text-sm font-medium text-gray-300">Twitter/X</Label>
                                                    <Input
                                                        type="url"
                                                        value={profile.twitter || ''}
                                                        onChange={(e) => handleInputChange('twitter', e.target.value)}
                                                        disabled={!isEditing}
                                                        className="w-full rounded-xl border border-gray-600/50 bg-gray-700/30 px-4 py-3 text-white placeholder-gray-400 transition-all duration-300 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
