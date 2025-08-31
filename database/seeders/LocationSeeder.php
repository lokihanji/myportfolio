<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class LocationSeeder extends Seeder
{
    public function run(): void
    {
        $this->seedCountries();
        $this->seedRegions();
        $this->seedProvinces();
        $this->seedCitiesMunicipalities();
        $this->seedBarangays();
    }

    private function seedCountries(): void
    {
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
    }

    private function seedRegions(): void
    {
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
    }

    private function seedProvinces(): void
    {
        // Get all regions
        $regions = DB::table('ref_regions')->get();
        
        $provinces = [];
        
        foreach ($regions as $region) {
            // Create sample provinces for each region
            $provinceCount = rand(3, 8); // Random number of provinces per region
            
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
        
        DB::table('ref_provinces')->insert($provinces);
    }

    private function seedCitiesMunicipalities(): void
    {
        // Get all provinces
        $provinces = DB::table('ref_provinces')->get();
        
        $citiesMunicipalities = [];
        
        foreach ($provinces as $province) {
            // Create sample cities and municipalities for each province
            $cityCount = rand(2, 6); // Random number of cities per province
            $municipalityCount = rand(1, 4); // Random number of municipalities per province
            
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
        
        DB::table('ref_cities_municipalities')->insert($citiesMunicipalities);
    }

    private function seedBarangays(): void
    {
        // Get all cities and municipalities
        $citiesMunicipalities = DB::table('ref_cities_municipalities')->get();
        
        $barangays = [];
        
        foreach ($citiesMunicipalities as $citymun) {
            // Create sample barangays for each city/municipality
            $barangayCount = rand(5, 15); // Random number of barangays per city/municipality
            
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
        
        DB::table('ref_barangays')->insert($barangays);
    }
}
