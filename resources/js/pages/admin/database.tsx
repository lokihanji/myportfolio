import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Database, RefreshCw, Download, Upload, Trash2, Plus, Search, Filter, BarChart3, Activity, HardDrive, Server, Clock, AlertTriangle, Eye, EyeOff, Play, Pause, Zap } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Database Management',
        href: '/admin/database',
    },
];

interface DatabaseEvent {
    id: string;
    type: 'query' | 'connection' | 'error' | 'backup' | 'optimization' | 'maintenance';
    message: string;
    timestamp: string;
    duration?: number;
    table?: string;
    user?: string;
    ip?: string;
    severity: 'info' | 'warning' | 'error' | 'success';
    details?: any;
}

interface DatabaseTable {
    name: string;
    records: number;
    size: string;
    last_backup: string;
    status: 'healthy' | 'warning' | 'error';
    engine: string;
    collation: string;
    auto_increment?: number;
    created_at: string;
    updated_at: string;
}

interface DatabaseStats {
    total_tables: number;
    total_records: number;
    database_size: string;
    last_backup: string;
    active_connections: number;
    slow_queries: number;
    uptime: string;
    version: string;
}

export default function DatabaseManagement() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTable, setSelectedTable] = useState('all');
    const [selectedEventType, setSelectedEventType] = useState('all');
    const [isMonitoring, setIsMonitoring] = useState(true);
    const [events, setEvents] = useState<DatabaseEvent[]>([]);
    const [tables, setTables] = useState<DatabaseTable[]>([]);
    const [stats, setStats] = useState<DatabaseStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [eventCount, setEventCount] = useState(0);
    
    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    // Fetch database information
    const fetchDatabaseInfo = useCallback(async () => {
        try {
            setLoading(true);
            const [tablesResponse, statsResponse, eventsResponse] = await Promise.all([
                axios.get('/api/admin/database/tables'),
                axios.get('/api/admin/database/stats'),
                axios.get('/api/admin/database/events')
            ]);

            setTables(tablesResponse.data.tables || []);
            setStats(statsResponse.data.stats || null);
            setEvents(eventsResponse.data.events || []);
            setEventCount(eventsResponse.data.events?.length || 0);
            setError(null);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to fetch database information');
            console.error('Database fetch error:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    // Start real-time monitoring
    useEffect(() => {
        if (!isMonitoring) return;

        const eventSource = new EventSource('/api/admin/database/events/stream');
        
        eventSource.onmessage = (event) => {
            try {
                const newEvent: DatabaseEvent = JSON.parse(event.data);
                setEvents(prev => [newEvent, ...prev.slice(0, 99)]); // Keep last 100 events
                setEventCount(prev => prev + 1);
            } catch (err) {
                console.error('Error parsing event:', err);
            }
        };

        eventSource.onerror = (error) => {
            console.error('EventSource error:', error);
            eventSource.close();
        };

        return () => {
            eventSource.close();
        };
    }, [isMonitoring]);

    // Initial fetch
    useEffect(() => {
        fetchDatabaseInfo();
    }, [fetchDatabaseInfo]);

    // Refresh data periodically
    useEffect(() => {
        if (!isMonitoring) return;
        
        const interval = setInterval(() => {
            fetchDatabaseInfo();
        }, 30000); // Refresh every 30 seconds

        return () => clearInterval(interval);
    }, [isMonitoring, fetchDatabaseInfo]);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'healthy': return 'text-green-400 bg-green-400/20 border-green-400/30';
            case 'warning': return 'text-yellow-400 bg-yellow-400/20 border-yellow-400/30';
            case 'error': return 'text-red-400 bg-red-400/20 border-red-400/30';
            default: return 'text-gray-400 bg-gray-400/20 border-gray-400/30';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'healthy': return '✓';
            case 'warning': return '⚠';
            case 'error': return '✗';
            default: return '•';
        }
    };

    const getEventTypeIcon = (type: string) => {
        switch (type) {
            case 'query': return <Database className="h-4 w-4" />;
            case 'connection': return <Server className="h-4 w-4" />;
            case 'error': return <AlertTriangle className="h-4 w-4" />;
            case 'backup': return <Download className="h-4 w-4" />;
            case 'optimization': return <Zap className="h-4 w-4" />;
            case 'maintenance': return <Activity className="h-4 w-4" />;
            default: return <Activity className="h-4 w-4" />;
        }
    };

    const getEventTypeColor = (type: string) => {
        switch (type) {
            case 'query': return 'text-blue-400 bg-blue-400/20 border-blue-400/30';
            case 'connection': return 'text-green-400 bg-green-400/20 border-green-400/30';
            case 'error': return 'text-red-400 bg-red-400/20 border-red-400/30';
            case 'backup': return 'text-purple-400 bg-purple-400/20 border-purple-400/30';
            case 'optimization': return 'text-orange-400 bg-orange-400/20 border-orange-400/30';
            case 'maintenance': return 'text-yellow-400 bg-yellow-400/20 border-yellow-400/30';
            default: return 'text-gray-400 bg-gray-400/20 border-gray-400/30';
        }
    };

    const getSeverityColor = (severity: string) => {
        switch (severity) {
            case 'info': return 'text-blue-400';
            case 'warning': return 'text-yellow-400';
            case 'error': return 'text-red-400';
            case 'success': return 'text-green-400';
            default: return 'text-gray-400';
        }
    };

    const filteredTables = tables.filter(table => 
        table.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedTable === 'all' || table.status === selectedTable)
    );

    const filteredEvents = events.filter(event => 
        selectedEventType === 'all' || event.type === selectedEventType
    );

    // Pagination logic
    const totalPages = Math.ceil(filteredTables.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentTables = filteredTables.slice(startIndex, endIndex);

    // Reset to first page when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, selectedTable]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleItemsPerPageChange = (newItemsPerPage: number) => {
        setItemsPerPage(newItemsPerPage);
        setCurrentPage(1); // Reset to first page
    };

    const handleRefresh = () => {
        fetchDatabaseInfo();
    };

    const handleBackup = async () => {
        try {
            await axios.post('/api/admin/database/backup');
            // Refresh data after backup
            setTimeout(fetchDatabaseInfo, 2000);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Backup failed');
        }
    };

    const handleOptimize = async () => {
        try {
            await axios.post('/api/admin/database/optimize');
            // Refresh data after optimization
            setTimeout(fetchDatabaseInfo, 5000);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Optimization failed');
        }
    };

    if (loading && !stats) {
        return (
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Database Management" />
                <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-400 mx-auto"></div>
                        <p className="mt-4 text-gray-300">Loading database information...</p>
                    </div>
                </div>
            </AppLayout>
        );
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Database Management" />

            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
                <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-6">
                    {/* Header */}
                    <div className="rounded-2xl border border-gray-700/50 bg-gray-800/30 p-6 backdrop-blur-sm shadow-2xl">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-3xl font-bold text-transparent">
                                    Database Management
                                </h1>
                                <p className="mt-2 text-gray-300">Real-time database monitoring and management</p>
                                {error && (
                                    <div className="mt-2 p-3 bg-red-500/20 border border-red-500/30 rounded-lg">
                                        <p className="text-red-400 text-sm">{error}</p>
                                    </div>
                                )}
                            </div>
                            <div className="flex items-center space-x-3">
                                <button 
                                    onClick={() => setIsMonitoring(!isMonitoring)}
                                    className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-white transition-all duration-300 ${
                                        isMonitoring 
                                            ? 'bg-green-600/50 hover:bg-green-500/50 border border-green-500/50' 
                                            : 'bg-gray-600/50 hover:bg-gray-500/50 border border-gray-500/50'
                                    }`}
                                >
                                    {isMonitoring ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                                    <span>{isMonitoring ? 'Pause' : 'Resume'}</span>
                                </button>
                                <button 
                                    onClick={handleRefresh}
                                    className="flex items-center space-x-2 px-4 py-2 bg-gray-700/50 hover:bg-gray-600/50 border border-gray-600/50 rounded-xl text-white transition-all duration-300"
                                >
                                    <RefreshCw className="h-4 w-4" />
                                    <span>Refresh</span>
                                </button>
                                <button 
                                    onClick={handleBackup}
                                    className="flex items-center space-x-2 px-4 py-2 bg-green-600/50 hover:bg-green-500/50 border border-green-500/50 rounded-xl text-white transition-all duration-300"
                                >
                                    <Download className="h-4 w-4" />
                                    <span>Backup Now</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    {stats && (
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                            <div className="rounded-2xl border border-gray-700/50 bg-gray-800/30 p-6 backdrop-blur-sm shadow-2xl">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-400">Total Tables</p>
                                        <p className="text-2xl font-bold text-white mt-1">{stats.total_tables}</p>
                                    </div>
                                    <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600">
                                        <Database className="h-6 w-6 text-white" />
                                    </div>
                                </div>
                            </div>
                            <div className="rounded-2xl border border-gray-700/50 bg-gray-800/30 p-6 backdrop-blur-sm shadow-2xl">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-400">Total Records</p>
                                        <p className="text-2xl font-bold text-white mt-1">{stats.total_records.toLocaleString()}</p>
                                    </div>
                                    <div className="p-3 rounded-xl bg-gradient-to-r from-green-500 to-green-600">
                                        <BarChart3 className="h-6 w-6 text-white" />
                                    </div>
                                </div>
                            </div>
                            <div className="rounded-2xl border border-gray-700/50 bg-gray-800/30 p-6 backdrop-blur-sm shadow-2xl">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-400">Database Size</p>
                                        <p className="text-2xl font-bold text-white mt-1">{stats.database_size}</p>
                                    </div>
                                    <div className="p-3 rounded-xl bg-gradient-to-r from-purple-500 to-purple-600">
                                        <HardDrive className="h-6 w-6 text-white" />
                                    </div>
                                </div>
                            </div>
                            <div className="rounded-2xl border border-gray-700/50 bg-gray-800/30 p-6 backdrop-blur-sm shadow-2xl">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-400">Active Connections</p>
                                        <p className="text-2xl font-bold text-white mt-1">{stats.active_connections}</p>
                                    </div>
                                    <div className="p-3 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600">
                                        <Server className="h-6 w-6 text-white" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="grid gap-6 lg:grid-cols-3">
                        {/* Database Tables */}
                        <div className="lg:col-span-2">
                            <div className="rounded-2xl border border-gray-700/50 bg-gray-800/30 p-6 backdrop-blur-sm shadow-2xl">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-xl font-bold text-white">Database Tables</h2>
                                    <div className="flex items-center space-x-3">
                                        <div className="relative">
                                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                            <input
                                                type="text"
                                                placeholder="Search tables..."
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                                className="pl-10 pr-4 py-2 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 text-sm focus:border-green-500 focus:outline-none"
                                            />
                                        </div>
                                        <select
                                            value={selectedTable}
                                            onChange={(e) => setSelectedTable(e.target.value)}
                                            className="px-3 py-2 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white text-sm focus:border-green-500 focus:outline-none"
                                        >
                                            <option value="all">All Status</option>
                                            <option value="healthy">Healthy</option>
                                            <option value="warning">Warning</option>
                                            <option value="error">Error</option>
                                        </select>
                                    </div>
                                </div>
                                
                                <div className="space-y-3">
                                    {currentTables.map((table, index) => (
                                        <div key={index} className="flex items-center justify-between p-4 rounded-xl bg-gray-700/20 border border-gray-600/30 hover:bg-gray-700/30 transition-all duration-300">
                                            <div className="flex items-center space-x-4">
                                                <div className="p-2 rounded-lg bg-gray-700/50 border border-gray-600/50">
                                                    <Database className="h-5 w-5 text-gray-400" />
                                                </div>
                                                <div>
                                                    <h3 className="font-medium text-white">{table.name}</h3>
                                                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                                                        <span>{table.records.toLocaleString()} records</span>
                                                        <span>•</span>
                                                        <span>{table.size}</span>
                                                        <span>•</span>
                                                        <span>{table.engine}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-3">
                                                <span className={`px-3 py-1 rounded-lg text-xs font-medium border ${getStatusColor(table.status)}`}>
                                                    {getStatusIcon(table.status)} {table.status}
                                                </span>
                                                <div className="flex items-center space-x-2">
                                                    <button className="p-2 text-gray-400 hover:text-blue-400 transition-colors duration-200 rounded-lg hover:bg-gray-700/50">
                                                        <Download className="h-4 w-4" />
                                                    </button>
                                                    <button className="p-2 text-gray-400 hover:text-green-400 transition-colors duration-200 rounded-lg hover:bg-gray-700/50">
                                                        <Upload className="h-4 w-4" />
                                                    </button>
                                                    <button className="p-2 text-gray-400 hover:text-red-400 transition-colors duration-200 rounded-lg hover:bg-gray-700/50">
                                                        <Trash2 className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    
                                    {/* Pagination Controls */}
                                    {filteredTables.length > 0 && (
                                        <div className="flex items-center justify-between pt-4 border-t border-gray-600/30">
                                            <div className="flex items-center space-x-4">
                                                <span className="text-sm text-gray-400">
                                                    Showing {startIndex + 1} to {Math.min(endIndex, filteredTables.length)} of {filteredTables.length} tables
                                                </span>
                                                <select
                                                    value={itemsPerPage}
                                                    onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
                                                    className="px-2 py-1 bg-gray-700/50 border border-gray-600/50 rounded text-white text-xs focus:border-green-500 focus:outline-none"
                                                >
                                                    <option value={5}>5 per page</option>
                                                    <option value={10}>10 per page</option>
                                                    <option value={20}>20 per page</option>
                                                    <option value={50}>50 per page</option>
                                                </select>
                                            </div>
                                            
                                            <div className="flex items-center space-x-2">
                                                <button
                                                    onClick={() => handlePageChange(currentPage - 1)}
                                                    disabled={currentPage === 1}
                                                    className="px-3 py-1 text-sm bg-gray-700/50 hover:bg-gray-600/50 disabled:bg-gray-800/50 disabled:text-gray-500 border border-gray-600/50 rounded text-white transition-all duration-300 disabled:cursor-not-allowed"
                                                >
                                                    Previous
                                                </button>
                                                
                                                <div className="flex items-center space-x-1">
                                                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                                        let pageNum;
                                                        if (totalPages <= 5) {
                                                            pageNum = i + 1;
                                                        } else if (currentPage <= 3) {
                                                            pageNum = i + 1;
                                                        } else if (currentPage >= totalPages - 2) {
                                                            pageNum = totalPages - 4 + i;
                                                        } else {
                                                            pageNum = currentPage - 2 + i;
                                                        }
                                                        
                                                        return (
                                                            <button
                                                                key={pageNum}
                                                                onClick={() => handlePageChange(pageNum)}
                                                                className={`px-3 py-1 text-sm border rounded transition-all duration-300 ${
                                                                    currentPage === pageNum
                                                                        ? 'bg-green-600/50 border-green-500/50 text-white'
                                                                        : 'bg-gray-700/50 hover:bg-gray-600/50 border-gray-600/50 text-gray-300 hover:text-white'
                                                                }`}
                                                            >
                                                                {pageNum}
                                                            </button>
                                                        );
                                                    })}
                                                </div>
                                                
                                                <button
                                                    onClick={() => handlePageChange(currentPage + 1)}
                                                    disabled={currentPage === totalPages}
                                                    className="px-3 py-1 text-sm bg-gray-700/50 hover:bg-gray-600/50 disabled:bg-gray-800/50 disabled:text-gray-500 border border-gray-600/50 rounded text-white transition-all duration-300 disabled:cursor-not-allowed"
                                                >
                                                    Next
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                    
                                    {filteredTables.length === 0 && (
                                        <div className="text-center py-8 text-gray-400">
                                            <Database className="h-12 w-12 mx-auto mb-3 text-gray-600" />
                                            <p className="text-lg font-medium">No tables found</p>
                                            <p className="text-sm">Try adjusting your search or filter criteria</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Database Health & Events */}
                        <div className="space-y-6">
                            {/* Health Status */}
                            {stats && (
                                <div className="rounded-2xl border border-gray-700/50 bg-gray-800/30 p-6 backdrop-blur-sm shadow-2xl">
                                    <div className="flex items-center space-x-3 mb-4">
                                        <Activity className="h-5 w-5 text-green-400" />
                                        <h3 className="text-lg font-bold text-white">Database Health</h3>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <span className="text-gray-300">Version</span>
                                            <span className="text-green-400">{stats.version}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-gray-300">Uptime</span>
                                            <span className="text-green-400">{stats.uptime}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-gray-300">Connections</span>
                                            <span className="text-green-400">{stats.active_connections}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-gray-300">Slow Queries</span>
                                            <span className="text-yellow-400">{stats.slow_queries}</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Live Events Monitor */}
                            <div className="rounded-2xl border border-gray-700/50 bg-gray-800/30 p-6 backdrop-blur-sm shadow-2xl">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center space-x-3">
                                        <div className={`w-3 h-3 rounded-full ${isMonitoring ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`}></div>
                                        <h3 className="text-lg font-bold text-white">Live Events</h3>
                                        <span className="text-sm text-gray-400">({eventCount})</span>
                                    </div>
                                    <select
                                        value={selectedEventType}
                                        onChange={(e) => setSelectedEventType(e.target.value)}
                                        className="px-2 py-1 bg-gray-700/50 border border-gray-600/50 rounded text-white text-xs focus:border-green-500 focus:outline-none"
                                    >
                                        <option value="all">All Types</option>
                                        <option value="query">Queries</option>
                                        <option value="connection">Connections</option>
                                        <option value="error">Errors</option>
                                        <option value="backup">Backups</option>
                                        <option value="optimization">Optimizations</option>
                                        <option value="maintenance">Maintenance</option>
                                    </select>
                                </div>
                                <div className="space-y-2 max-h-64 overflow-y-auto">
                                    {filteredEvents.slice(0, 10).map((event, index) => (
                                        <div key={event.id || index} className="p-3 rounded-lg bg-gray-700/20 border border-gray-600/30">
                                            <div className="flex items-start space-x-3">
                                                <div className={`p-1 rounded ${getEventTypeColor(event.type)}`}>
                                                    {getEventTypeIcon(event.type)}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-xs text-gray-300 mb-1 line-clamp-2">{event.message}</p>
                                                    <div className="flex items-center justify-between text-xs text-gray-400">
                                                        <span className={getSeverityColor(event.severity)}>{event.severity}</span>
                                                        <span>{new Date(event.timestamp).toLocaleTimeString()}</span>
                                                    </div>
                                                    {event.duration && (
                                                        <span className="text-xs text-gray-500">Duration: {event.duration}ms</span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    {filteredEvents.length === 0 && (
                                        <div className="text-center py-4 text-gray-400 text-sm">
                                            No events to display
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Database Actions */}
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        <div className="rounded-2xl border border-gray-700/50 bg-gray-800/30 p-6 backdrop-blur-sm shadow-2xl">
                            <div className="text-center">
                                <div className="p-3 rounded-xl bg-gradient-to-r from-green-500 to-blue-500 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                                    <Download className="h-8 w-8 text-white" />
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2">Create Backup</h3>
                                <p className="text-sm text-gray-400 mb-4">Create a complete database backup</p>
                                <button 
                                    onClick={handleBackup}
                                    className="w-full px-4 py-2 bg-green-600/50 hover:bg-green-500/50 border border-green-500/50 rounded-xl text-white transition-all duration-300"
                                >
                                    Backup Now
                                </button>
                            </div>
                        </div>

                        <div className="rounded-2xl border border-gray-700/50 bg-gray-800/30 p-6 backdrop-blur-sm shadow-2xl">
                            <div className="text-center">
                                <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                                    <Upload className="h-8 w-8 text-white" />
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2">Restore Backup</h3>
                                <p className="text-sm text-gray-400 mb-4">Restore from a previous backup</p>
                                <button className="w-full px-4 py-2 bg-blue-600/50 hover:bg-blue-500/50 border border-blue-500/50 rounded-xl text-white transition-all duration-300">
                                    Choose File
                                </button>
                            </div>
                        </div>

                        <div className="rounded-2xl border border-gray-700/50 bg-gray-800/30 p-6 backdrop-blur-sm shadow-2xl">
                            <div className="text-center">
                                <div className="p-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                                    <Zap className="h-8 w-8 text-white" />
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2">Optimize Database</h3>
                                <p className="text-sm text-gray-400 mb-4">Clean and optimize database tables</p>
                                <button 
                                    onClick={handleOptimize}
                                    className="w-full px-4 py-2 bg-orange-600/50 hover:bg-orange-500/50 border border-orange-500/50 rounded-xl text-white transition-all duration-300"
                                >
                                    Optimize
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Backup History */}
                    <div className="rounded-2xl border border-gray-700/50 bg-gray-800/30 p-6 backdrop-blur-sm shadow-2xl">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-white">Backup History</h2>
                            <button className="px-4 py-2 bg-gray-700/50 hover:bg-gray-600/50 border border-gray-600/50 rounded-xl text-white transition-all duration-300">
                                View All
                            </button>
                        </div>
                        
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-gray-600/30">
                                        <th className="text-left py-3 px-4 text-gray-300 font-medium">Backup Date</th>
                                        <th className="text-left py-3 px-4 text-gray-300 font-medium">Size</th>
                                        <th className="text-left py-3 px-4 text-gray-300 font-medium">Type</th>
                                        <th className="text-left py-3 px-4 text-gray-300 font-medium">Status</th>
                                        <th className="text-left py-3 px-4 text-gray-300 font-medium">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="space-y-2">
                                    {/* This would be populated with real backup history from your API */}
                                    <tr className="border-b border-gray-600/20">
                                        <td className="py-3 px-4 text-white">No backups found</td>
                                        <td className="py-3 px-4 text-gray-300">-</td>
                                        <td className="py-3 px-4 text-gray-300">-</td>
                                        <td className="py-3 px-4 text-gray-300">-</td>
                                        <td className="py-3 px-4 text-gray-300">-</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
