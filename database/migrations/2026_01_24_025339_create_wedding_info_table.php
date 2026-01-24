<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('wedding_info', function (Blueprint $table) {
            $table->id();

            // Bride & Groom Info
            $table->string('bride_full_name');
            $table->string('bride_short_name');
            $table->string('bride_father_name');
            $table->string('bride_mother_name');
            $table->text('bride_instagram')->nullable();

            $table->string('groom_full_name');
            $table->string('groom_short_name');
            $table->string('groom_father_name');
            $table->string('groom_mother_name');
            $table->text('groom_instagram')->nullable();

            // Event Details
            $table->date('event_date');
            $table->time('event_time');
            $table->string('event_timezone')->default('WITA');

            // Venue
            $table->string('venue_name');
            $table->text('venue_address');
            $table->decimal('venue_lat', 10, 7)->nullable();
            $table->decimal('venue_lng', 10, 7)->nullable();
            $table->text('maps_embed_url')->nullable();

            // Media
            $table->string('cover_image')->nullable();
            $table->string('bride_photo')->nullable();
            $table->string('groom_photo')->nullable();
            $table->string('music_url')->nullable();

            // Additional Text
            $table->text('opening_text')->nullable();
            $table->text('closing_text')->nullable();
            $table->text('quote_text')->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('wedding_info');
    }
};