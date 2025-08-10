<?php

namespace App\Terminal\Commands;

class Ls implements \App\Terminal\CommandInterface
{
    public function execute(array $args = []): string
    {
        // Simulate listing files in a directory
        return implode("\n", ['file1.txt', 'file2.txt', 'file3.txt']);
    }

    public function getName(): string
    {
        return 'ls';
    }

    public function getDescription(): string
    {
        return 'List files in the current directory';
    }
}
