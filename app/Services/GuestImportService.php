<?php

namespace App\Services;

use App\Models\Guest;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Validator;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class GuestImportService implements ToCollection, WithHeadingRow
{
    private array $results = [
        'success' => 0,
        'failed' => 0,
        'errors' => [],
    ];

    public function collection(Collection $rows)
    {
        foreach ($rows as $index => $row) {
            $rowNumber = $index + 2; // +2 because index starts at 0 and we have header row

            // Validate row
            $validator = Validator::make($row->toArray(), [
                'name' => 'required|string|max:255',
                'phone' => 'nullable|string|max:20',
                'address' => 'nullable|string',
                'type' => 'nullable|in:keluarga,teman,kerja,lainnya',
            ]);

            if ($validator->fails()) {
                $this->results['failed']++;
                $this->results['errors'][] = [
                    'row' => $rowNumber,
                    'name' => $row['name'] ?? 'Unknown',
                    'errors' => $validator->errors()->all(),
                ];
                continue;
            }

            try {
                Guest::create([
                    'name' => $row['name'],
                    'slug' => Guest::generateSlug($row['name']),
                    'phone' => $row['phone'] ?? null,
                    'address' => $row['address'] ?? null,
                    'invitation_type' => $row['type'] ?? 'lainnya',
                ]);

                $this->results['success']++;
            } catch (\Exception $e) {
                $this->results['failed']++;
                $this->results['errors'][] = [
                    'row' => $rowNumber,
                    'name' => $row['name'],
                    'errors' => [$e->getMessage()],
                ];
            }
        }
    }

    public function getResults(): array
    {
        return $this->results;
    }

    public static function import($file): array
    {
        $import = new self();
        Excel::import($import, $file);
        return $import->getResults();
    }
}