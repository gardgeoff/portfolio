<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Directory extends Model
{
    /** @use HasFactory<\Database\Factories\DirectoryFactory> */
    use HasFactory;

    protected $gaurded = [];

    public function parent(): BelongsTo
    {
        return $this->belongsTo(Directory::class, 'parent_id');
    }

    public function files(): HasMany
    {
        return $this->hasMany(File::class);
    }

    public function directories(): HasMany
    {
        return $this->hasMany(Directory::class, 'parent_id');
    }

    public function getContentsAttribute(): array
    {
        return [
            'files' => $this->files,
            'directories' => $this->directories,
        ];
    }
}
