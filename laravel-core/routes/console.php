<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;



Schedule::command('app:make-listings-schedule')->everyMinute()->runInBackground();