<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Relations\HasOne;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function profile(): HasOne
    {
        return $this->hasOne(Profile::class);
    }

    /**
     * Get the user's phone number from profile
     */
    public function getPhoneAttribute()
    {
        return $this->profile?->phone;
    }

    /**
     * Get the user's location from profile
     */
    public function getLocationAttribute()
    {
        return $this->profile?->location;
    }

    /**
     * Get the user's website from profile
     */
    public function getWebsiteAttribute()
    {
        return $this->profile?->website;
    }

    /**
     * Get the user's full name from profile or fallback to name
     */
    public function getFullNameAttribute()
    {
        return $this->profile?->first_name . ' ' . $this->profile?->last_name;
    }

    /**
     * Get the user's title from profile
     */
    public function getTitleAttribute()
    {
        return $this->profile?->title;
    }

    /**
     * Get the user's bio from profile
     */
    public function getBioAttribute()
    {
        return $this->profile?->bio;
    }

    /**
     * Get the user's linkedin from profile
     */
    public function getLinkedinAttribute()
    {
        return $this->profile?->linkedin;
    }

    /**
     * Get the user's github from profile
     */
    public function getGithubAttribute()
    {
        return $this->profile?->github;
    }

    /**
     * Get the user's twitter from profile
     */
    public function getTwitterAttribute()
    {
        return $this->profile?->twitter;
    }

    /**
     * Get the user's avatar from profile
     */
    public function getAvatarAttribute()
    {
        return $this->profile?->avatar;
    }
}
