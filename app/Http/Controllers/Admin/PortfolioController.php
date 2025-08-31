<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PortfolioItem;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class PortfolioController extends Controller
{
    public function index()
    {
        $portfolioItems = PortfolioItem::orderBy('order')->get();
        return response()->json($portfolioItems);
    }

    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'category' => 'required|string|max:255',
            'image' => 'nullable|string',
            'url' => 'nullable|url|max:255',
            'tags' => 'nullable|array',
            'tags.*' => 'string|max:100',
            'is_active' => 'boolean',
        ]);

        $portfolioItem = PortfolioItem::create([
            'title' => $request->title,
            'description' => $request->description,
            'image' => $request->image,
            'url' => $request->url,
            'category' => $request->category,
            'tags' => $request->tags,
            'is_active' => $request->get('is_active', true),
        ]);

        return response()->json($portfolioItem, 201);
    }

    public function show(PortfolioItem $portfolioItem)
    {
        return response()->json($portfolioItem);
    }

    public function update(Request $request, PortfolioItem $portfolioItem): JsonResponse
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'category' => 'required|string|max:255',
            'image' => 'nullable|string',
            'url' => 'nullable|url|max:255',
            'tags' => 'nullable|array',
            'tags.*' => 'string|max:100',
            'is_active' => 'boolean',
        ]);

        $portfolioItem->update([
            'title' => $request->title,
            'description' => $request->description,
            'image' => $request->image,
            'url' => $request->url,
            'category' => $request->category,
            'tags' => $request->tags,
            'is_active' => $request->get('is_active', true),
        ]);

        return response()->json($portfolioItem);
    }

    public function destroy(PortfolioItem $portfolioItem): JsonResponse
    {
        $portfolioItem->delete();
        return response()->json(null, 204);
    }

    public function reorder(Request $request): JsonResponse
    {
        $request->validate([
            'portfolioItems' => 'required|array',
            'portfolioItems.*.id' => 'required|exists:portfolio_items,id',
            'portfolioItems.*.order' => 'required|integer|min:0',
        ]);

        foreach ($request->portfolioItems as $item) {
            PortfolioItem::where('id', $item['id'])->update(['order' => $item['order']]);
        }

        return response()->json(['message' => 'Order updated successfully']);
    }
}
