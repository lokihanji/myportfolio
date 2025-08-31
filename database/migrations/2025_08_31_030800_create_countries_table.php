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
        Schema::create('ref_countries', function (Blueprint $table) {
            $table->id();
            $table->string('name', 150)->nullable();
            $table->string('official', 255)->nullable();
            $table->char('iso_alpha2', 2)->nullable();
            $table->char('iso_alpha3', 3)->nullable();
            $table->string('iso_num', 3)->nullable();
            $table->string('region', 100)->nullable();
            $table->string('subregion', 100)->nullable();
            $table->string('capital', 100)->nullable();
            $table->double('area')->nullable();
            $table->bigInteger('population')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ref_countries');
    }
};
