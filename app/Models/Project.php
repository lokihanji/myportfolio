<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'image',
        'url',
        'github_url',
        'technologies',
        'category',
        'completion_date',
        'is_featured',
        'order',
    ];

    protected $casts = [
        'technologies' => 'array',
        'completion_date' => 'date',
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
