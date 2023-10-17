<?php
$popular = [
    [
        'text' => 'Кольца',
        'img' => 'rings.png',
        'alt' => 'ring'
    ],
    [
        'text' => 'Серьги',
        'img' => 'earrings.png',
        'alt' => 'earring'
    ],
    [
        'text' => 'Помолвочные кольца',
        'img' => 'weddingRings.png',
        'alt' => 'weddingRing'
    ],
    [
        'text' => 'Браслеты',
        'img' => 'bracers.png',
        'alt' => 'bracer'
    ],
    [
        'text' => 'Колье и подвески',
        'img' => 'necklace.png',
        'alt' => 'necklace'
    ],
    [
        'text' => 'Часы',
        'img' => 'watch.png',
        'alt' => 'watch'
    ]
];

echo json_encode($popular, JSON_UNESCAPED_UNICODE);