<?php

return array(
    array(
        "type" => "link",
        "content" => "Dashboard",
        "active_when" => ["App\Http\Controllers\DashboardController@index"],
        "route" => "/",
        "icon" => array("type" => "lucide", "content" => "House"),
    ),
    array(
        "type" => "link",
        "content" => "Accounts",
        "active_when" => ["App\Http\Controllers\AccountController#", "App\Http\Controllers\AccountsGroupController#"],
        "route" => "/accounts",
        "icon" => array("type" => "lucide", "content" => "Facebook"),
    ),
    array("type" => "divider"),
    array(
        "type" => "link",
        "content" => "Titles",
        "active_when" => ["App\Http\Controllers\TitlesGroupController#"],
        "route" => "/titles",
        "icon" => array("type" => "lucide", "content" => "Captions"),
    ),
    array(
        "type" => "link",
        "content" => "Photos",
        "active_when" => ["App\Http\Controllers\PhotosGroupController#"],
        "route" => "/photos",
        "icon" => array("type" => "lucide", "content" => "Image"),
    ),
    array(
        "type" => "link",
        "content" => "Descriptions",
        "active_when" => ["App\Http\Controllers\PhotoController@index"],
        "route" => "/photos",
        "icon" => array("type" => "lucide", "content" => "LayoutList"),
    ),
    array(
        "type" => "link",
        "content" => "Postings",
        "active_when" => ["App\Http\Controllers\PostingController@index"],
        "route" => "/photos",
        "icon" => array("type" => "lucide", "content" => "TvMinimalPlay"),
    ),
    array("type" => "divider"),
    array(
        "type" => "link",
        "content" => "Users",
        "active_when" => ["App\Http\Controllers\UserController#"],
        "route" => "/users",
        "icon" => array("type" => "lucide", "content" => "Users"),
    ),
    array(
        "type" => "link",
        "content" => "Settings",
        "active_when" => ["App\Http\Controllers\SettingController@index"],
        "section" => "settings",
        "route" => "/settings",
        "icon" => array("type" => "lucide", "content" => "Settings"),
    ),

);