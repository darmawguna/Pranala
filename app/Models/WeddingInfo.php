<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WeddingInfo extends Model
{
    use HasFactory;

    protected $table = 'wedding_info';

    protected $fillable = [
        'bride_full_name',
        'bride_short_name',
        'bride_father_name',
        'bride_mother_name',
        'bride_instagram',
        'groom_full_name',
        'groom_short_name',
        'groom_father_name',
        'groom_mother_name',
        'groom_instagram',
        'event_date',
        'event_time',
        'event_timezone',
        'venue_name',
        'venue_address',
        'venue_lat',
        'venue_lng',
        'maps_embed_url',
        'cover_image',
        'bride_photo',
        'groom_photo',
        'music_url',
        'opening_text',
        'closing_text',
        'quote_text',
    ];

    protected $casts = [
        'event_date' => 'date',
    ];

    /**
     * Get singleton instance
     */
    public static function getInstance(): ?self
    {
        return self::first();
    }
}