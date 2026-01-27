<?php

namespace App\Http\Controllers;

use App\Models\Guest;
use App\Models\WeddingInfo;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InvitationController extends Controller
{
    public function index()
    {
        return Inertia::render('Guest/Invitation', []);
    }
    public function show(string $slug)
    {
        // Find guest by slug
        $guest = Guest::where('slug', $slug)->first();

        if (!$guest) {
            return Inertia::render('Guest/NotFound');
        }

        // Mark as opened
        $guest->markAsOpened();

        // Get wedding info
        $weddingInfo = WeddingInfo::getInstance();

        return Inertia::render('Guest/InvitationPlacholder', [
            'guest' => $guest,
            'wedding' => $weddingInfo,
        ]);
    }
}
