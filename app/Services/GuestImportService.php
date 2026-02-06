<?php

namespace App\Services;

use App\Models\Guest;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Validator;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithCustomCsvSettings;
use Illuminate\Support\Facades\Log; // Tambahkan ini untuk debug

class GuestImportService implements ToCollection, WithHeadingRow, WithCustomCsvSettings
{
    private array $results = [
        'success' => 0,
        'failed' => 0,
        'errors' => [],
    ];

    public function getCsvSettings(): array
    {
        return [
            'delimiter' => ';'
        ];
    }

    public function collection(Collection $rows)
    {
        foreach ($rows as $index => $row) {
            $rowNumber = $index + 2;

            // Handle data dari CSV Anda
            $data = [
                'name' => $row['name'] ?? null,
                'phone' => $row['phone'] ?? null,
                'address' => $row['address'] ?? $row['addres'] ?? null,
                'type' => isset($row['type']) ? strtolower(trim($row['type'])) : 'lainnya',
            ];

            $validator = Validator::make($data, [
                'name' => 'required|string|max:255',
            ]);

            if ($validator->fails()) {
                $this->results['failed']++;
                $this->results['errors'][] = [
                    'row' => $rowNumber,
                    'errors' => $validator->errors()->all(),
                ];
                continue;
            }

            try {
                Guest::create([
                    'name' => trim($data['name']), // Tambahkan trim agar tidak error di database karena spasi
                    'slug' => Guest::generateSlug($data['name']),
                    'phone' => $data['phone'],
                    'address' => $data['address'],
                    'invitation_type' => $data['type'] ?? 'lainnya',
                ]);

                $this->results['success']++;
            } catch (\Exception $e) {
                $this->results['failed']++;
                // Pastikan log tetap ada untuk developer
                \Log::error("Import Error Row {$rowNumber}: " . $e->getMessage());

                $this->results['errors'][] = [
                    'row' => $rowNumber,
                    'name' => $data['name'] ?? 'Tanpa Nama',
                    'errors' => [$this->parseError($e->getMessage())], // Wrap in array for consistency
                ];
            }
        }
    }


    private function parseError($message): string
    {
        if (str_contains($message, 'Duplicate entry'))
            return 'Data duplikat (Nama/Slug sudah ada)';
        if (str_contains($message, 'too long'))
            return 'Teks terlalu panjang';
        return 'Kesalahan sistem: ' . $message;
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