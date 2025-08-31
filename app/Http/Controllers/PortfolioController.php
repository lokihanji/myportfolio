<?php

namespace App\Http\Controllers;

use App\Models\Profile;
use App\Models\Experience;
use App\Models\Skill;
use App\Models\Project;
use App\Models\PortfolioItem;
use App\Models\ContactInfo;
use App\Models\ContentItem;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PortfolioController extends Controller
{
    public function index()
    {
        $data = [
            'profile' => Profile::first(),
            'experiences' => Experience::orderBy('order')->get(),
            'skills' => Skill::orderBy('order')->get(),
            'projects' => Project::where('is_featured', true)->orderBy('order')->get(),
            'portfolioItems' => PortfolioItem::where('is_active', true)->orderBy('order')->get(),
            'contactInfo' => ContactInfo::where('is_active', true)->orderBy('order')->get(),
            'content' => ContentItem::where('is_active', true)->orderBy('order')->get()->keyBy('key'),
        ];

        return Inertia::render('welcome', $data);
    }
}
