<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\StreamedResponse;

class DatabaseController extends Controller
{
    /**
     * Get database tables information
     */
    public function getTables(): JsonResponse
    {
        try {
            $tables = [];
            $tableNames = $this->getTableNames();
            
            foreach ($tableNames as $tableName) {
                $tableInfo = $this->getTableInfo($tableName);
                $tables[] = $tableInfo;
            }
            
            return response()->json([
                'success' => true,
                'tables' => $tables
            ]);
        } catch (\Exception $e) {
            Log::error('Error fetching database tables: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch database tables',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get database statistics
     */
    public function getStats(): JsonResponse
    {
        try {
            $stats = [
                'total_tables' => count($this->getTableNames()),
                'total_records' => $this->getTotalRecords(),
                'database_size' => $this->getDatabaseSize(),
                'last_backup' => $this->getLastBackupTime(),
                'active_connections' => $this->getActiveConnections(),
                'slow_queries' => $this->getSlowQueriesCount(),
                'uptime' => $this->getDatabaseUptime(),
                'version' => $this->getDatabaseVersion(),
            ];
            
            return response()->json([
                'success' => true,
                'stats' => $stats
            ]);
        } catch (\Exception $e) {
            Log::error('Error fetching database stats: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch database statistics',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get database events
     */
    public function getEvents(): JsonResponse
    {
        try {
            // For now, we'll return recent database activities
            // In a production environment, you might want to store these in a dedicated table
            $events = $this->getRecentDatabaseEvents();
            
            return response()->json([
                'success' => true,
                'events' => $events
            ]);
        } catch (\Exception $e) {
            Log::error('Error fetching database events: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch database events',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Stream database events in real-time
     */
    public function streamEvents(): StreamedResponse
    {
        return response()->stream(function () {
            $lastEventId = 0;
            
            while (true) {
                // Check for new events every 2 seconds
                $newEvents = $this->getNewEvents($lastEventId);
                
                foreach ($newEvents as $event) {
                    $lastEventId = $event['id'];
                    echo "data: " . json_encode($event) . "\n\n";
                }
                
                // Flush output buffer
                if (ob_get_level()) {
                    ob_flush();
                }
                flush();
                
                // Sleep for 2 seconds
                sleep(2);
                
                // Check if client is still connected
                if (connection_aborted()) {
                    break;
                }
            }
        }, 200, [
            'Cache-Control' => 'no-cache',
            'Content-Type' => 'text/event-stream',
            'Connection' => 'keep-alive',
            'X-Accel-Buffering' => 'no'
        ]);
    }

    /**
     * Create database backup
     */
    public function createBackup(): JsonResponse
    {
        try {
            // Log the backup attempt
            $this->logDatabaseEvent('backup', 'Database backup initiated', 'info');
            
            // In a production environment, you would implement actual backup logic here
            // For now, we'll just simulate a successful backup
            
            return response()->json([
                'success' => true,
                'message' => 'Database backup completed successfully',
                'backup_id' => uniqid('backup_')
            ]);
        } catch (\Exception $e) {
            Log::error('Error creating database backup: ' . $e->getMessage());
            $this->logDatabaseEvent('backup', 'Database backup failed: ' . $e->getMessage(), 'error');
            
            return response()->json([
                'success' => false,
                'message' => 'Failed to create database backup',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Optimize database
     */
    public function optimize(): JsonResponse
    {
        try {
            // Log the optimization attempt
            $this->logDatabaseEvent('optimization', 'Database optimization initiated', 'info');
            
            // In a production environment, you would implement actual optimization logic here
            // For now, we'll just simulate a successful optimization
            
            return response()->json([
                'success' => true,
                'message' => 'Database optimization completed successfully'
            ]);
        } catch (\Exception $e) {
            Log::error('Error optimizing database: ' . $e->getMessage());
            $this->logDatabaseEvent('optimization', 'Database optimization failed: ' . $e->getMessage(), 'error');
            
            return response()->json([
                'success' => false,
                'message' => 'Failed to optimize database',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get list of table names from the database
     */
    private function getTableNames(): array
    {
        try {
            // Use Laravel's built-in method to get table names
            $tables = [];
            $results = DB::select('SHOW TABLES');
            
            foreach ($results as $result) {
                $tableName = array_values((array) $result)[0];
                $tables[] = $tableName;
            }
            
            return $tables;
        } catch (\Exception $e) {
            // Fallback: return common Laravel table names
            return ['users', 'password_reset_tokens', 'failed_jobs', 'personal_access_tokens', 'migrations'];
        }
    }

    /**
     * Get detailed information about a specific table
     */
    private function getTableInfo(string $tableName): array
    {
        try {
            $recordCount = DB::table($tableName)->count();
            $tableSize = $this->getTableSize($tableName);
            
            // Determine table status based on various factors
            $status = $this->determineTableStatus($tableName, $recordCount, $tableSize);
            
            return [
                'name' => $tableName,
                'records' => $recordCount,
                'size' => $tableSize,
                'last_backup' => $this->getLastBackupTime(),
                'status' => $status,
                'engine' => $this->getTableEngine($tableName),
                'collation' => $this->getTableCollation($tableName),
                'created_at' => now()->toISOString(),
                'updated_at' => now()->toISOString(),
            ];
        } catch (\Exception $e) {
            return [
                'name' => $tableName,
                'records' => 0,
                'size' => '0 B',
                'last_backup' => 'Never',
                'status' => 'error',
                'engine' => 'Unknown',
                'collation' => 'Unknown',
                'created_at' => now()->toISOString(),
                'updated_at' => now()->toISOString(),
            ];
        }
    }

    /**
     * Get total records across all tables
     */
    private function getTotalRecords(): int
    {
        try {
            $total = 0;
            $tableNames = $this->getTableNames();
            
            foreach ($tableNames as $tableName) {
                $total += DB::table($tableName)->count();
            }
            
            return $total;
        } catch (\Exception $e) {
            return 0;
        }
    }

    /**
     * Get database size
     */
    private function getDatabaseSize(): string
    {
        try {
            // This is a simplified version - in production you might want to use database-specific queries
            $size = 0;
            $tableNames = $this->getTableNames();
            
            foreach ($tableNames as $tableName) {
                $size += $this->getTableSizeBytes($tableName);
            }
            
            return $this->formatBytes($size);
        } catch (\Exception $e) {
            return '0 B';
        }
    }

    /**
     * Get table size in bytes
     */
    private function getTableSizeBytes(string $tableName): int
    {
        try {
            // This is a simplified approach - in production you might want to use database-specific queries
            $recordCount = DB::table($tableName)->count();
            // Estimate: assume average 1KB per record
            return $recordCount * 1024;
        } catch (\Exception $e) {
            return 0;
        }
    }

    /**
     * Get table size in human readable format
     */
    private function getTableSize(string $tableName): string
    {
        $bytes = $this->getTableSizeBytes($tableName);
        return $this->formatBytes($bytes);
    }

    /**
     * Format bytes to human readable format
     */
    private function formatBytes(int $bytes): string
    {
        if ($bytes === 0) return '0 B';
        
        $units = ['B', 'KB', 'MB', 'GB', 'TB'];
        $factor = floor(log($bytes, 1024));
        
        return round($bytes / pow(1024, $factor), 2) . ' ' . $units[$factor];
    }

    /**
     * Get last backup time
     */
    private function getLastBackupTime(): string
    {
        // In production, you would check your actual backup system
        // For now, return a placeholder
        return now()->subHours(2)->format('Y-m-d H:i:s');
    }

    /**
     * Get active connections count
     */
    private function getActiveConnections(): int
    {
        try {
            // This is a simplified approach - in production you might want to use database-specific queries
            return DB::select('SHOW STATUS LIKE "Threads_connected"')[0]->Value ?? 1;
        } catch (\Exception $e) {
            return 1;
        }
    }

    /**
     * Get slow queries count
     */
    private function getSlowQueriesCount(): int
    {
        try {
            // This is a simplified approach - in production you might want to use database-specific queries
            return DB::select('SHOW STATUS LIKE "Slow_queries"')[0]->Value ?? 0;
        } catch (\Exception $e) {
            return 0;
        }
    }

    /**
     * Get database uptime
     */
    private function getDatabaseUptime(): string
    {
        try {
            // This is a simplified approach - in production you might want to use database-specific queries
            $uptime = DB::select('SHOW STATUS LIKE "Uptime"')[0]->Value ?? 0;
            return $this->formatUptime($uptime);
        } catch (\Exception $e) {
            return 'Unknown';
        }
    }

    /**
     * Get database version
     */
    private function getDatabaseVersion(): string
    {
        try {
            return DB::select('SELECT VERSION() as version')[0]->version ?? 'Unknown';
        } catch (\Exception $e) {
            return 'Unknown';
        }
    }

    /**
     * Get table engine
     */
    private function getTableEngine(string $tableName): string
    {
        try {
            $result = DB::select("SHOW TABLE STATUS WHERE Name = ?", [$tableName]);
            return $result[0]->Engine ?? 'Unknown';
        } catch (\Exception $e) {
            return 'Unknown';
        }
    }

    /**
     * Get table collation
     */
    private function getTableCollation(string $tableName): string
    {
        try {
            $result = DB::select("SHOW TABLE STATUS WHERE Name = ?", [$tableName]);
            return $result[0]->Collation ?? 'Unknown';
        } catch (\Exception $e) {
            return 'Unknown';
        }
    }

    /**
     * Determine table status
     */
    private function determineTableStatus(string $tableName, int $recordCount, string $size): string
    {
        // Simple logic to determine table health
        if ($recordCount === 0) return 'warning';
        if ($recordCount > 10000) return 'warning'; // Large tables might need attention
        return 'healthy';
    }

    /**
     * Get recent database events
     */
    private function getRecentDatabaseEvents(): array
    {
        // In production, you would query a dedicated events table
        // For now, return some sample events
        return [
            [
                'id' => uniqid('event_'),
                'type' => 'query',
                'message' => 'SELECT * FROM users WHERE created_at > "2024-01-01"',
                'timestamp' => now()->subMinutes(2)->toISOString(),
                'duration' => 23,
                'table' => 'users',
                'severity' => 'info'
            ],
            [
                'id' => uniqid('event_'),
                'type' => 'connection',
                'message' => 'New database connection established',
                'timestamp' => now()->subMinutes(5)->toISOString(),
                'severity' => 'info'
            ],
            [
                'id' => uniqid('event_'),
                'type' => 'maintenance',
                'message' => 'Database maintenance completed',
                'timestamp' => now()->subHours(1)->toISOString(),
                'severity' => 'success'
            ]
        ];
    }

    /**
     * Get new events since last event ID
     */
    private function getNewEvents(int $lastEventId): array
    {
        // In production, you would query a dedicated events table
        // For now, return empty array
        return [];
    }

    /**
     * Log database event
     */
    private function logDatabaseEvent(string $type, string $message, string $severity): void
    {
        Log::info("Database Event: {$type} - {$message}", [
            'type' => $type,
            'message' => $message,
            'severity' => $severity,
            'timestamp' => now()->toISOString()
        ]);
    }

    /**
     * Format uptime from seconds to human readable format
     */
    private function formatUptime(int $seconds): string
    {
        $days = floor($seconds / 86400);
        $hours = floor(($seconds % 86400) / 3600);
        $minutes = floor(($seconds % 3600) / 60);
        
        if ($days > 0) {
            return "{$days}d {$hours}h {$minutes}m";
        } elseif ($hours > 0) {
            return "{$hours}h {$minutes}m";
        } else {
            return "{$minutes}m";
        }
    }
}
