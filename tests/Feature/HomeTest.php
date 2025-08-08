<?php

test('example', function () {
    $response = $this->get('/');
    $this->get();
    $response->assertStatus(200);
});
