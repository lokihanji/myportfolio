<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('ref_cities_municipalities', function (Blueprint $table) {
            $table->id();
            $table->string('citymun_code', 20)->unique();
            $table->string('name', 150);
            $table->enum('type', ['City','Municipality'])->default('City');
            $table->string('zip_code', 10)->nullable();
            $table->string('postal_code', 10)->nullable();
            $table->foreignId('province_id')->constrained('ref_provinces')->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ref_cities_municipalities');
    }
};
