<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Profile;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class ProfileController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $profile = $user->profile;
        
        if (!$profile) {
            return response()->json(null);
        }
        
        return response()->json($profile);
    }

    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'middle_name' => 'nullable|string|max:255',
            'title' => 'required|string|max:255',
            'location' => 'nullable|string|max:255',
            'bio' => 'nullable|string',
            'avatar' => 'nullable|string',
            'website' => 'nullable|url|max:255',
            'linkedin' => 'nullable|url|max:255',
            'github' => 'nullable|string|max:255',
            'twitter' => 'nullable|string|max:255',
        ]);

        $user = Auth::user();
        
        $profile = $user->profile()->updateOrCreate(
            ['user_id' => $user->id],
            $request->all()
        );

        return response()->json($profile, 201);
    }

    public function update(Request $request, Profile $profile): JsonResponse
    {
        // Ensure the profile belongs to the authenticated user
        if ($profile->user_id !== Auth::id()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'middle_name' => 'nullable|string|max:255',
            'title' => 'required|string|max:255',
            'location' => 'nullable|string|max:255',
            'bio' => 'nullable|string',
            'avatar' => 'nullable|string',
            'website' => 'nullable|url|max:255',
            'linkedin' => 'nullable|url|max:255',
            'github' => 'nullable|string|max:255',
            'twitter' => 'nullable|string|max:255',
        ]);

        $profile->update($request->all());

        return response()->json($profile);
    }

    public function show(Profile $profile): JsonResponse
    {
        // Ensure the profile belongs to the authenticated user
        if ($profile->user_id !== Auth::id()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        return response()->json($profile);
    }

    public function destroy(Profile $profile): JsonResponse
    {
        // Ensure the profile belongs to the authenticated user
        if ($profile->user_id !== Auth::id()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $profile->delete();

        return response()->json(['message' => 'Profile deleted successfully']);
    }
}
