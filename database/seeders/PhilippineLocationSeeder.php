<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PhilippineLocationSeeder extends Seeder
{
    public function run(): void
    {
        $this->seedPhilippineCountry();
        $this->seedPhilippineRegions();
        $this->seedPhilippineProvinces();
        $this->seedPhilippineCitiesMunicipalities();
        $this->seedPhilippineBarangays();
    }

    private function seedPhilippineCountry(): void
    {
        DB::table('ref_countries')->insert([
            'name' => 'Philippines',
            'official' => 'Republic of the Philippines',
            'iso_alpha2' => 'PH',
            'iso_alpha3' => 'PHL',
            'iso_num' => '608',
            'region' => 'Asia',
            'subregion' => 'Southeast Asia',
            'capital' => 'Manila',
            'area' => 300000,
            'population' => 109581078,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }

    private function seedPhilippineRegions(): void
    {
        $regions = [
            ['region_code' => 'NCR', 'name' => 'National Capital Region'],
            ['region_code' => 'CAR', 'name' => 'Cordillera Administrative Region'],
            ['region_code' => 'I', 'name' => 'Ilocos Region'],
            ['region_code' => 'II', 'name' => 'Cagayan Valley'],
            ['region_code' => 'III', 'name' => 'Central Luzon'],
            ['region_code' => 'IV-A', 'name' => 'Calabarzon'],
            ['region_code' => 'IV-B', 'name' => 'Mimaropa'],
            ['region_code' => 'V', 'name' => 'Bicol Region'],
            ['region_code' => 'VI', 'name' => 'Western Visayas'],
            ['region_code' => 'VII', 'name' => 'Central Visayas'],
            ['region_code' => 'VIII', 'name' => 'Eastern Visayas'],
            ['region_code' => 'IX', 'name' => 'Zamboanga Peninsula'],
            ['region_code' => 'X', 'name' => 'Northern Mindanao'],
            ['region_code' => 'XI', 'name' => 'Davao Region'],
            ['region_code' => 'XII', 'name' => 'Soccsksargen'],
            ['region_code' => 'XIII', 'name' => 'Caraga'],
            ['region_code' => 'BARMM', 'name' => 'Bangsamoro Autonomous Region in Muslim Mindanao'],
        ];

        $country = DB::table('ref_countries')->where('iso_alpha2', 'PH')->first();
        
        foreach ($regions as $region) {
            $region['country_id'] = $country->id;
            $region['created_at'] = now();
            $region['updated_at'] = now();
        }

        DB::table('ref_regions')->insert($regions);
    }

    private function seedPhilippineProvinces(): void
    {
        $provinces = [
            // NCR
            ['province_code' => 'NCR_MAN', 'name' => 'Manila', 'region_code' => 'NCR'],
            ['province_code' => 'NCR_QC', 'name' => 'Quezon City', 'region_code' => 'NCR'],
            ['province_code' => 'NCR_MAK', 'name' => 'Makati', 'region_code' => 'NCR'],
            
            // Central Luzon
            ['province_code' => 'III_BUL', 'name' => 'Bulacan', 'region_code' => 'III'],
            ['province_code' => 'III_NUE', 'name' => 'Nueva Ecija', 'region_code' => 'III'],
            ['province_code' => 'III_PAM', 'name' => 'Pampanga', 'region_code' => 'III'],
            
            // Calabarzon
            ['province_code' => 'IV-A_CAV', 'name' => 'Cavite', 'region_code' => 'IV-A'],
            ['province_code' => 'IV-A_LAG', 'name' => 'Laguna', 'region_code' => 'IV-A'],
            ['province_code' => 'IV-A_BAT', 'name' => 'Batangas', 'region_code' => 'IV-A'],
        ];

        foreach ($provinces as $province) {
            $region = DB::table('ref_regions')->where('region_code', $province['region_code'])->first();
            unset($province['region_code']);
            
            $province['region_id'] = $region->id;
            $province['created_at'] = now();
            $province['updated_at'] = now();
        }

        DB::table('ref_provinces')->insert($provinces);
    }

    private function seedPhilippineCitiesMunicipalities(): void
    {
        $citiesMunicipalities = [
            // Manila
            ['citymun_code' => 'NCR_MAN_MAN', 'name' => 'Manila', 'type' => 'City', 'zip_code' => '1000', 'postal_code' => '1000', 'province_code' => 'NCR_MAN'],
            
            // Quezon City
            ['citymun_code' => 'NCR_QC_QC', 'name' => 'Quezon City', 'type' => 'City', 'zip_code' => '1100', 'postal_code' => '1100', 'province_code' => 'NCR_QC'],
            
            // Makati
            ['citymun_code' => 'NCR_MAK_MAK', 'name' => 'Makati', 'type' => 'City', 'zip_code' => '1200', 'postal_code' => '1200', 'province_code' => 'NCR_MAK'],
            
            // Cavite
            ['citymun_code' => 'IV-A_CAV_IMU', 'name' => 'Imus', 'type' => 'City', 'zip_code' => '4103', 'postal_code' => '4103', 'province_code' => 'IV-A_CAV'],
            ['citymun_code' => 'IV-A_CAV_CAV', 'name' => 'Cavite City', 'type' => 'City', 'zip_code' => '4100', 'postal_code' => '4100', 'province_code' => 'IV-A_CAV'],
        ];

        foreach ($citiesMunicipalities as $citymun) {
            $province = DB::table('ref_provinces')->where('province_code', $citymun['province_code'])->first();
            unset($citymun['province_code']);
            
            $citymun['province_id'] = $province->id;
            $citymun['created_at'] = now();
            $citymun['updated_at'] = now();
        }

        DB::table('ref_cities_municipalities')->insert($citiesMunicipalities);
    }

    private function seedPhilippineBarangays(): void
    {
        $barangays = [
            // Manila Barangays
            ['barangay_code' => 'NCR_MAN_MAN_BRGY001', 'name' => 'Barangay 1', 'zip_code' => '1000', 'postal_code' => '1000', 'citymun_code' => 'NCR_MAN_MAN'],
            ['barangay_code' => 'NCR_MAN_MAN_BRGY002', 'name' => 'Barangay 2', 'zip_code' => '1000', 'postal_code' => '1000', 'citymun_code' => 'NCR_MAN_MAN'],
            
            // Quezon City Barangays
            ['barangay_code' => 'NCR_QC_QC_BRGY001', 'name' => 'Alicia', 'zip_code' => '1100', 'postal_code' => '1100', 'citymun_code' => 'NCR_QC_QC'],
            ['barangay_code' => 'NCR_QC_QC_BRGY002', 'name' => 'Bagong Silangan', 'zip_code' => '1100', 'postal_code' => '1100', 'citymun_code' => 'NCR_QC_QC'],
            
            // Makati Barangays
            ['barangay_code' => 'NCR_MAK_MAK_BRGY001', 'name' => 'Bangkal', 'zip_code' => '1200', 'postal_code' => '1200', 'citymun_code' => 'NCR_MAK_MAK'],
            ['barangay_code' => 'NCR_MAK_MAK_BRGY002', 'name' => 'Bel-Air', 'zip_code' => '1200', 'postal_code' => '1200', 'citymun_code' => 'NCR_MAK_MAK'],
        ];

        foreach ($barangays as $barangay) {
            $citymun = DB::table('ref_cities_municipalities')->where('citymun_code', $barangay['citymun_code'])->first();
            unset($barangay['citymun_code']);
            
            $barangay['citymun_id'] = $citymun->id;
            $barangay['created_at'] = now();
            $barangay['updated_at'] = now();
        }

        DB::table('ref_barangays')->insert($barangays);
    }
}
