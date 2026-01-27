<?php

namespace App\Http\Controllers;

use App\Models\Wish;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class WishController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        \Illuminate\Support\Facades\Log::info('WishController@index hit');
        $wishes = Wish::where('is_visible', true)

            ->latest()
            ->paginate(10);

        if ($request->wantsJson()) {
            return response()->json($wishes);
        }

        return $wishes;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        \Illuminate\Support\Facades\Log::info('WishController@store hit', $request->all());

        $validated = $request->validate([
            'guest_id' => 'nullable|exists:guests,id',
            'name' => 'required|string|max:255',
            'message' => 'required|string|max:1000',
            'attendance' => 'nullable|string|in:hadir,tidak_hadir',
        ]);


        // Basic sanitization
        $validated['name'] = strip_tags($validated['name']);
        $validated['message'] = strip_tags($validated['message']);

        Wish::create($validated);

        return back()->with('success', 'Ucapan berhasil dikirim!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Wish $wish)
    {
        // Simple authorization check for admin
        // Assuming there's a basic auth or role check
        if (!Auth::check()) {
            abort(403);
        }

        $wish->delete();

        return back()->with('success', 'Ucapan berhasil dihapus!');
    }
}
