# Location Seeders Documentation

This document explains how to use the location seeders for populating your database with countries, regions, provinces, cities/municipalities, and barangays.

## Overview

The location seeding system consists of several seeders that work together to populate your database with comprehensive location data:

1. **ConservativeLocationSeeder** - Memory-efficient seeder with fewer records (Recommended)
2. **ComprehensiveLocationSeeder** - Full seeder with chunked processing for large datasets
3. **LocationSeeder** - Basic seeder for global locations
4. **PhilippineLocationSeeder** - Specific seeder for Philippine locations

## Database Structure

The seeders work with the following database tables:

- `ref_countries` - Countries with ISO codes and basic information
- `ref_regions` - Regions within countries
- `ref_provinces` - Provinces within regions
- `ref_cities_municipalities` - Cities and municipalities within provinces
- `ref_barangays` - Barangays within cities/municipalities

## How to Use

### 1. Run All Seeders (Recommended)

```bash
php artisan db:seed
```

This will run the `DatabaseSeeder` which includes the `ConservativeLocationSeeder` by default.

### 2. Run Specific Seeders

```bash
# Run the memory-efficient conservative seeder (Recommended)
php artisan db:seed --class=ConservativeLocationSeeder

# Run the comprehensive seeder with chunked processing
php artisan db:seed --class=ComprehensiveLocationSeeder

# Run only the basic location seeder
php artisan db:seed --class=LocationSeeder

# Run only the Philippine location seeder
php artisan db:seed --class=PhilippineLocationSeeder
```

### 3. Fresh Database with Seeding

```bash
php artisan migrate:fresh --seed
```

This will drop all tables, recreate them, and then seed them with data.

## What Gets Seeded

### ConservativeLocationSeeder (Recommended)

1. **Countries**: All countries from the `countries.json` file (250+ countries)
2. **Regions**: Geographic regions and subregions for each country
3. **Provinces**: 1-3 sample provinces per region (memory-efficient)
4. **Cities/Municipalities**: 1-3 cities and 1-2 municipalities per province
5. **Barangays**: 2-5 sample barangays per city/municipality

**Estimated Total Records**: ~5,000-10,000 records

### ComprehensiveLocationSeeder

1. **Countries**: All countries from the `countries.json` file (250+ countries)
2. **Regions**: Geographic regions and subregions for each country
3. **Provinces**: 3-8 sample provinces per region
4. **Cities/Municipalities**: 2-6 cities and 1-4 municipalities per province
5. **Barangays**: 5-15 sample barangays per city/municipality

**Estimated Total Records**: ~50,000-100,000+ records

### LocationSeeder

Basic version with the same structure but simpler data.

### PhilippineLocationSeeder

Philippine-specific locations with real names and codes.

## Memory Optimization

### Conservative Seeder
- **Memory Usage**: Low (~128MB)
- **Processing Time**: Fast
- **Record Count**: Moderate
- **Best For**: Development, testing, small servers

### Comprehensive Seeder
- **Memory Usage**: High (~512MB+)
- **Processing Time**: Slow
- **Record Count**: High
- **Best For**: Production servers with high memory
- **Features**: Chunked processing, progress tracking

## Data Sources

- **Countries**: Uses the `countries.json` file in `database/seeders/data/`
- **Regions**: Generated from country region/subregion data
- **Provinces**: Sample data with realistic naming
- **Cities/Municipalities**: Sample data with proper types and codes
- **Barangays**: Sample data with proper relationships

## Customization

You can modify the seeders to:

1. Add more realistic data for specific countries
2. Change the number of sample locations generated
3. Add more detailed information for each location type
4. Include additional fields like coordinates, population, etc.

## Troubleshooting

### Common Issues

1. **Memory Exhaustion**: Use `ConservativeLocationSeeder` instead of `ComprehensiveLocationSeeder`
2. **Foreign Key Constraints**: Make sure migrations are run in the correct order
3. **Duplicate Data**: The seeders handle duplicates automatically

### Memory Issues

If you encounter memory issues:

```bash
# Increase PHP memory limit in php.ini
memory_limit = 512M

# Or use the conservative seeder
php artisan db:seed --class=ConservativeLocationSeeder
```

### Reset Data

To clear all seeded data:

```bash
php artisan migrate:fresh
```

## Performance Notes

- **Conservative Seeder**: Fast, low memory usage, moderate data
- **Comprehensive Seeder**: Slow, high memory usage, extensive data
- Consider running during off-peak hours for production environments
- The seeders include progress information for monitoring

## File Structure

```
database/seeders/
├── DatabaseSeeder.php              # Main seeder (uses ConservativeLocationSeeder)
├── ConservativeLocationSeeder.php  # Memory-efficient seeder (Recommended)
├── ComprehensiveLocationSeeder.php # Full seeder with chunked processing
├── LocationSeeder.php              # Basic location seeder
├── PhilippineLocationSeeder.php    # Philippine-specific seeder
└── data/
    └── countries.json              # Country data source
```

## Dependencies

- Laravel 10+
- SQLite/MySQL/PostgreSQL database
- The `countries.json` file in the data directory
- PHP memory_limit: 128MB+ (Conservative), 512MB+ (Comprehensive)

## Recommendations

- **For Development/Testing**: Use `ConservativeLocationSeeder`
- **For Production with High Memory**: Use `ComprehensiveLocationSeeder`
- **For Quick Setup**: Use `ConservativeLocationSeeder` (default)
- **For Maximum Data**: Use `ComprehensiveLocationSeeder` with increased memory limit
