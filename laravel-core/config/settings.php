<?php
return [
    "id" => "RTM",
    "title" => "Remarketing Tool for Messages",
    "minimum_pourcentage" => 10,
    "max_per_minute" => 20,
    
    "limits" => [
        'conversations' => 10,
        'message_per_conversation' => 1000,
        "max_simultaneous_message" => 10,
    ],

    "scheduler" => [
        "tokens_validity_check" => false,
        "update_conversations" => false,
        "send_remarketing_messages" => false,
    ],

    'facebook' => [
        'client_id' => "971771760955448",
        'client_secret' => "4d75da00c126a15152ce508de2ab334b",
        'redirect' => "https://rtm.ecoshark.org/oauth/facebook/callback",
    ],
];
?>