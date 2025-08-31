<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Skill extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'category',
        'proficiency',
        'icon',
        'description',
        'order',
        'is_featured',
    ];

    protected $casts = [
        'proficiency' => 'integer',
        'is_featured' => 'boolean',
    ];

    protected static function boot()
    {
        parent::boot();
        
        static::creating(function ($model) {
            if (is_null($model->order)) {
                $model->order = static::max('order') + 1;
            }
        });
    }
}
