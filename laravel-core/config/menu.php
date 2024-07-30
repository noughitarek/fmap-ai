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
        "content" => "Pages",
        "active_when" => ["App\Http\Controllers\PageController#"],
        "route" => "/pages",
        "icon" => array("type" => "lucide", "content" => "Facebook"),
    ),
    array("type" => "divider"),
    array(
        "type" => "link",
        "content" => "Templates",
        "active_when" => ["App\Http\Controllers\TemplateController#", "App\Http\Controllers\TemplatesGroupController#"],
        "route" => "/templates",
        "icon" => array("type" => "lucide", "content" => "LayoutPanelTop"),
    ),
    array(
        "type" => "link",
        "content" => "Programs",
        "active_when" => ["App\Http\Controllers\ProgramController#", "App\Http\Controllers\ProgramsGroupController#"],
        "route" => "/programs",
        "icon" => array("type" => "lucide", "content" => "CalendarDays"),
    ),
    array(
        "type" => "link",
        "content" => "Remarketings",
        "active_when" => ["App\Http\Controllers\RemarketingController#"],
        "route" => "/remarketings",
        "icon" => array("type" => "lucide", "content" => "Volume2"),
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