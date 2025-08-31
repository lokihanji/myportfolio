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
        Schema::create('ref_regions', function (Blueprint $table) {
            $table->id();
            $table->string('region_code', 10)->unique();
            $table->string('name', 150);
            $table->foreignId('country_id')->constrained('ref_countries')->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ref_regions');
    }
};
