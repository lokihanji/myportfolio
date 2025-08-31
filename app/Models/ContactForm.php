<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ContactForm extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'email',
        'subject',
        'message',
        'status',
        'read_at',
        'replied_at',
    ];

    protected $casts = [
        'read_at' => 'datetime',
        'replied_at' => 'datetime',
    ];

    public function markAsRead()
    {
        $this->update(['read_at' => now(), 'status' => 'read']);
    }

    public function markAsReplied()
    {
        $this->update(['replied_at' => now(), 'status' => 'replied']);
    }
}
