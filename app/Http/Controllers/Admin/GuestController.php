<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Guest;
use App\Services\GuestImportService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GuestController extends Controller
{
    public function index(Request $request)
    {
        $query = Guest::query();

        // Search
        if ($request->has('search')) {
            $search = $request->search;
            $query->where('name', 'like', "%{$search}%")
                ->orWhere('phone', 'like', "%{$search}%");
        }

        // Filter by type
        if ($request->has('type') && $request->type !== 'all') {
            $query->where('invitation_type', $request->type);
        }

        // Filter by opened status
        if ($request->has('opened')) {
            $query->where('is_opened', $request->opened === 'true');
        }

        $guests = $query->latest()->paginate(50);

        return Inertia::render('Admin/GuestList', [
            'guests' => $guests,
            'filters' => $request->only(['search', 'type', 'opened']),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'nullable|string|max:20',
            'address' => 'nullable|string',
            'invitation_type' => 'required|in:keluarga,teman,kerja,lainnya',
        ]);

        $guest = Guest::create([
            ...$validated,
            'slug' => Guest::generateSlug($validated['name']),
        ]);

        return redirect()->back()->with('success', 'Guest added successfully!');
    }

    public function update(Request $request, Guest $guest)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'nullable|string|max:20',
            'address' => 'nullable|string',
            'invitation_type' => 'required|in:keluarga,teman,kerja,lainnya',
        ]);

        // Regenerate slug if name changed
        if ($guest->name !== $validated['name']) {
            $validated['slug'] = Guest::generateSlug($validated['name']);
        }

        $guest->update($validated);

        return redirect()->back()->with('success', 'Guest updated successfully!');
    }

    public function destroy(Guest $guest)
    {
        $guest->delete();
        return redirect()->back()->with('success', 'Guest deleted successfully!');
    }

    public function bulkImport(Request $request)
    {
        $request->validate([
            'file' => 'required|mimes:xlsx,xls,csv,txt|max:2048',
        ]);

        $results = GuestImportService::import($request->file('file'));

        if ($results['failed'] > 0) {
            return redirect()->back()->with([
                'import_results' => $results
            ]);
        }
        return redirect()->back()->with([
            'success' => "Berhasil mengimport {$results['success']} data.",
            'import_results' => $results
        ]);
    }

    public function exportLinks()
    {
        $guests = Guest::orderBy('name')->get();

        // Get base URL
        $baseUrl = config('app.url');

        // Create CSV content
        $csvData = "Nama Tamu,Link Undangan\n";

        foreach ($guests as $guest) {
            $invitationLink = $baseUrl . '/to/' . $guest->slug;

            $csvData .= sprintf(
                '"%s","%s"' . "\n",
                str_replace('"', '""', $guest->name), // Escape quotes in name
                $invitationLink
            );
        }

        $filename = 'invitation-links-' . now()->format('Y-m-d') . '.csv';

        return response($csvData)
            ->header('Content-Type', 'text/csv; charset=utf-8')
            ->header('Content-Disposition', 'attachment; filename="' . $filename . '"')
            ->header('Content-Transfer-Encoding', 'binary')
            ->header('Cache-Control', 'must-revalidate, post-check=0, pre-check=0')
            ->header('Pragma', 'public');
    }

    /**
     * Export full guest data (for backup purposes)
     */
    public function exportFullData()
    {
        $guests = Guest::orderBy('created_at', 'desc')->get();

        $csvData = "name,phone,address,type,slug,opened,opened_at,created_at\n";

        foreach ($guests as $guest) {
            $csvData .= sprintf(
                '"%s","%s","%s","%s","%s","%s","%s","%s"' . "\n",
                str_replace('"', '""', $guest->name),
                $guest->phone ?? '',
                str_replace('"', '""', $guest->address ?? ''),
                $guest->invitation_type,
                $guest->slug,
                $guest->is_opened ? 'Yes' : 'No',
                $guest->opened_at ? $guest->opened_at->format('Y-m-d H:i:s') : '',
                $guest->created_at->format('Y-m-d H:i:s')
            );
        }

        $filename = 'guests-full-data-' . now()->format('Y-m-d') . '.csv';

        return response($csvData)
            ->header('Content-Type', 'text/csv; charset=utf-8')
            ->header('Content-Disposition', 'attachment; filename="' . $filename . '"')
            ->header('Content-Transfer-Encoding', 'binary')
            ->header('Cache-Control', 'must-revalidate, post-check=0, pre-check=0')
            ->header('Pragma', 'public');
    }
}
