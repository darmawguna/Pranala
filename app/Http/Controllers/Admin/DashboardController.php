<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Guest;
use App\Models\WeddingInfo;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $stats = [
            'total_guests' => Guest::count(),
            'opened_invitations' => Guest::where('is_opened', true)->count(),
            'unopened_invitations' => Guest::where('is_opened', false)->count(),
            'opening_rate' => Guest::count() > 0
                ? round((Guest::where('is_opened', true)->count() / Guest::count()) * 100, 2)
                : 0,
        ];

        // Recent opened invitations
        $recentOpened = Guest::where('is_opened', true)
            ->latest('opened_at')
            ->take(10)
            ->get();

        // Stats by type
        $statsByType = Guest::selectRaw('invitation_type, count(*) as total, sum(is_opened) as opened')
            ->groupBy('invitation_type')
            ->get();

        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats,
            'recentOpened' => $recentOpened,
            'statsByType' => $statsByType,
        ]);
    }
}