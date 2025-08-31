<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ConservativeLocationSeeder extends Seeder
{
    public function run(): void
    {
        $this->command->info('Starting conservative location seeding...');
        
        $this->seedCountries();
        $this->seedRegions();
        $this->seedProvinces();
        $this->seedCitiesMunicipalities();
        $this->seedBarangays();
        
        $this->command->info('Conservative location seeding completed!');
    }

    private function seedCountries(): void
    {
        $this->command->info('Seeding countries...');
        
        $json = file_get_contents(database_path('seeders/data/countries.json'));
        $countries = json_decode($json, true);

        $data = [];

        foreach ($countries as $country) {
            $data[] = [
                'name'      => $country['name']['common'] ?? null,
                'official'  => $country['name']['official'] ?? null,
                'iso_alpha2'=> $country['cca2'] ?? null,
                'iso_alpha3'=> $country['cca3'] ?? null,
                'iso_num'   => $country['ccn3'] ?? null,
                'region'    => $country['region'] ?? null,
                'subregion' => $country['subregion'] ?? null,
                'capital'   => isset($country['capital'][0]) ? $country['capital'][0] : null,
                'area'      => $country['area'] ?? null,
                'population'=> $country['population'] ?? null,
            ];
        }

        DB::table('ref_countries')->insert($data);
        $this->command->info('Countries seeded: ' . count($data));
    }

    private function seedRegions(): void
    {
        $this->command->info('Seeding regions...');
        
        // Get all countries
        $countries = DB::table('ref_countries')->get();
        
        $regions = [];
        
        foreach ($countries as $country) {
            if ($country->region) {
                $regions[] = [
                    'region_code' => strtoupper(substr($country->region, 0, 3)) . '_' . $country->id,
                    'name' => $country->region,
                    'country_id' => $country->id,
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            }
            
            if ($country->subregion) {
                $regions[] = [
                    'region_code' => strtoupper(substr($country->subregion, 0, 3)) . '_' . $country->id,
                    'name' => $country->subregion,
                    'country_id' => $country->id,
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            }
        }
        
        // Remove duplicates based on name and country_id
        $uniqueRegions = collect($regions)->unique(function ($item) {
            return $item['name'] . '_' . $item['country_id'];
        })->values()->all();
        
        DB::table('ref_regions')->insert($uniqueRegions);
        $this->command->info('Regions seeded: ' . count($uniqueRegions));
    }

    private function seedProvinces(): void
    {
        $this->command->info('Seeding provinces...');
        
        // Process in chunks to avoid memory issues
        $chunkSize = 100;
        $totalProvinces = 0;
        
        DB::table('ref_regions')->orderBy('id')->chunk($chunkSize, function ($regions) use (&$totalProvinces) {
            $provinces = [];
            
            foreach ($regions as $region) {
                // Create fewer provinces per region to reduce memory usage
                $provinceCount = rand(1, 3); // Reduced from 3-8 to 1-3
                
                for ($i = 1; $i <= $provinceCount; $i++) {
                    $provinces[] = [
                        'province_code' => $region->region_code . '_PROV_' . $i,
                        'name' => 'Province ' . $i . ' of ' . $region->name,
                        'region_id' => $region->id,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ];
                }
            }
            
            if (!empty($provinces)) {
                DB::table('ref_provinces')->insert($provinces);
                $totalProvinces += count($provinces);
                $this->command->info("Processed chunk: " . count($provinces) . " provinces");
            }
        });
        
        $this->command->info('Provinces seeded: ' . $totalProvinces);
    }

    private function seedCitiesMunicipalities(): void
    {
        $this->command->info('Seeding cities and municipalities...');
        
        // Process in chunks to avoid memory issues
        $chunkSize = 100;
        $totalCitiesMunicipalities = 0;
        
        DB::table('ref_provinces')->orderBy('id')->chunk($chunkSize, function ($provinces) use (&$totalCitiesMunicipalities) {
            $citiesMunicipalities = [];
            
            foreach ($provinces as $province) {
                // Create fewer cities and municipalities per province
                $cityCount = rand(1, 3); // Reduced from 2-6 to 1-3
                $municipalityCount = rand(1, 2); // Reduced from 1-4 to 1-2
                
                // Add cities
                for ($i = 1; $i <= $cityCount; $i++) {
                    $citiesMunicipalities[] = [
                        'citymun_code' => $province->province_code . '_CITY_' . $i,
                        'name' => 'City ' . $i . ' of ' . $province->name,
                        'type' => 'City',
                        'zip_code' => rand(1000, 9999),
                        'postal_code' => rand(1000, 9999),
                        'province_id' => $province->id,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ];
                }
                
                // Add municipalities
                for ($i = 1; $i <= $municipalityCount; $i++) {
                    $citiesMunicipalities[] = [
                        'citymun_code' => $province->province_code . '_MUN_' . $i,
                        'name' => 'Municipality ' . $i . ' of ' . $province->name,
                        'type' => 'Municipality',
                        'zip_code' => rand(1000, 9999),
                        'postal_code' => rand(1000, 9999),
                        'province_id' => $province->id,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ];
                }
            }
            
            if (!empty($citiesMunicipalities)) {
                DB::table('ref_cities_municipalities')->insert($citiesMunicipalities);
                $totalCitiesMunicipalities += count($citiesMunicipalities);
                $this->command->info("Processed chunk: " . count($citiesMunicipalities) . " cities/municipalities");
            }
        });
        
        $this->command->info('Cities and municipalities seeded: ' . $totalCitiesMunicipalities);
    }

    private function seedBarangays(): void
    {
        $this->command->info('Seeding barangays...');
        
        // Process in chunks to avoid memory issues
        $chunkSize = 100;
        $totalBarangays = 0;
        
        DB::table('ref_cities_municipalities')->orderBy('id')->chunk($chunkSize, function ($citiesMunicipalities) use (&$totalBarangays) {
            $barangays = [];
            
            foreach ($citiesMunicipalities as $citymun) {
                // Create fewer barangays per city/municipality
                $barangayCount = rand(2, 5); // Reduced from 5-15 to 2-5
                
                for ($i = 1; $i <= $barangayCount; $i++) {
                    $barangays[] = [
                        'barangay_code' => $citymun->citymun_code . '_BRGY_' . $i,
                        'name' => 'Barangay ' . $i . ' of ' . $citymun->name,
                        'zip_code' => rand(1000, 9999),
                        'postal_code' => rand(1000, 9999),
                        'citymun_id' => $citymun->id,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ];
                }
            }
            
            if (!empty($barangays)) {
                DB::table('ref_barangays')->insert($barangays);
                $totalBarangays += count($barangays);
                $this->command->info("Processed chunk: " . count($barangays) . " barangays");
            }
        });
        
        $this->command->info('Barangays seeded: ' . $totalBarangays);
    }
}

