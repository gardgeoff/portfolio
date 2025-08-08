<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class File extends Model
{
    /** @use HasFactory<\Database\Factories\FileFactory> */
    use HasFactory;

    protected $guarded = [];

    public function directory(): BelongsTo
    {
        return $this->belongsTo(Directory::class);
    }
}
