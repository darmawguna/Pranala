<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('guests', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->string('phone')->nullable();
            $table->text('address')->nullable();
            $table->enum('invitation_type', ['keluarga', 'teman', 'kerja', 'lainnya'])->default('lainnya');
            $table->boolean('is_opened')->default(false);
            $table->timestamp('opened_at')->nullable();
            $table->timestamps();

            // Indexes untuk performance
            $table->index('slug');
            $table->index('is_opened');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('guests');
    }
};