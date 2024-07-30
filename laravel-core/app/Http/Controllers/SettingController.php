<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Setting;
use App\Models\FacebookPage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Laravel\Socialite\Facades\Socialite;

class SettingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Settings/Index', ['settings' => config('settings')]);
    }

    public function store(Request $request)
    {
        foreach($request->all() as $path=>$content)
        {
            if($path == "_token") continue;
            $setting = Setting::where('path', $path)->first();
            if(!$setting){
                $setting = Setting::create([
                    'path' => $path,
                    'content' => $content,
                ]);
            }else{
                $setting->update(['content'=>$content]);
            }
        }
        return back()->with('succss', 'Settings has been updated successfully');

    }


}
