<?php
$sale = [
    [
        'img' => 'ring1.png',
        'price' => 41000,
        'oldPrice' => 65000,
        'sale' => 45,
        'text' => 'Стильное кольцо из белого золота c бриллиантами',
        'bubbles' => [
            ['text' => 'sale', 'class' => 'bubble_sale'],
            ['text' => 'new', 'class' => 'bubble_new'],
            ['text' => 'хит', 'class' => 'bubble_hit']
        ],
    ],
    [
        'img' => 'ring2.png',
        'price' => 56000,
        'text' => 'Стильное кольцо из белого золота c бриллиантами',
    ],
    [
        'img' => 'ring3.png',
        'price' => 37500,
        'text' => 'Стильное кольцо из белого золота c бриллиантами',
    ],
    [
        'img' => 'ring4.png',
        'price' => 39200,
        'text' => 'Стильное кольцо из белого золота c бриллиантами',
    ]
];

echo json_encode($sale, JSON_UNESCAPED_UNICODE);

