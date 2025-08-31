<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Experience;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class ExperienceController extends Controller
{
    public function index()
    {
        $experiences = Experience::orderBy('order')->get();
        return response()->json($experiences);
    }

    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'company' => 'required|string|max:255',
            'location' => 'nullable|string|max:255',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date|after:start_date',
            'is_current' => 'boolean',
            'description' => 'required|string',
            'achievements' => 'nullable|string',
            'logo' => 'nullable|string',
        ]);

        $experience = Experience::create($request->all());

        return response()->json($experience, 201);
    }

    public function show(Experience $experience)
    {
        return response()->json($experience);
    }

    public function update(Request $request, Experience $experience): JsonResponse
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'company' => 'required|string|max:255',
            'location' => 'nullable|string|max:255',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date|after:start_date',
            'is_current' => 'boolean',
            'description' => 'required|string',
            'achievements' => 'nullable|string',
            'logo' => 'nullable|string',
        ]);

        $experience->update($request->all());

        return response()->json($experience);
    }

    public function destroy(Experience $experience): JsonResponse
    {
        $experience->delete();
        return response()->json(null, 204);
    }

    public function reorder(Request $request): JsonResponse
    {
        $request->validate([
            'experiences' => 'required|array',
            'experiences.*.id' => 'required|exists:experiences,id',
            'experiences.*.order' => 'required|integer|min:0',
        ]);

        foreach ($request->experiences as $item) {
            Experience::where('id', $item['id'])->update(['order' => $item['order']]);
        }

        return response()->json(['message' => 'Order updated successfully']);
    }
}
