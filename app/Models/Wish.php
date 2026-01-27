<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Wish extends Model
{
    use HasFactory;

    protected $fillable = [
        'guest_id',
        'name',
        'message',
        'attendance',
        'is_visible',
    ];


    protected $casts = [
        'is_visible' => 'boolean',
    ];

    /**
     * Get the guest that owns the wish.
     */
    public function guest(): BelongsTo
    {
        return $this->belongsTo(Guest::class);
    }
}
