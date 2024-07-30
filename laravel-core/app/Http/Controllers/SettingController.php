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

    public function redirectToFacebook()
    {
        return Socialite::driver('facebook')->scopes(['email', 'pages_show_list', 'pages_messaging'])->redirect();
    }
    
    public function handleFacebookCallback()
    {
        try {
            $user = Socialite::driver('facebook')->user();
        } catch (\Exception $e) {
            return redirect('/login')->with('error', 'Facebook authentication failed.');
        }
        $fb_user = FacebookPage::where("facebook_page_id", (string)$user->id)->first();
        if(!$fb_user){
            $fb_user = FacebookPage::create([
                "facebook_page_id" => (string)$user->id,
                "name" => $user->name,
                "access_token" => $user->token,
                'type' => 'user',
                'expired_at' => null
            ]);
        }else{
            $fb_user->update([
                "facebook_page_id" => (string)$user->id,
                "name" => $user->name,
                "access_token" => $user->token,
                'type' => 'user',
                'expired_at' => null
            ]);
        }

        try{
            $this->get_pages($fb_user);
        }
        catch(\Exception $e){
            echo 'Error: ' . $e->getMessage();
        }
        
        return redirect('/');
    }

    public function get_pages($active_user)
    {
        $response = Http::get('https://graph.facebook.com/v19.0/me/accounts', [
            'access_token' => $active_user->access_token,
        ]);
        
        if ($response->successful()){
            $responseData = $response->json();

            if(isset($responseData['data'])){
                FacebookPage::where('type', 'business')->update(['expired_at'=> now()]);

                foreach ($responseData['data'] as $pageVal) {
                    $fb_page = FacebookPage::where('facebook_page_id', (string)$pageVal['id'])->first();
                    
                    if(!$fb_page){
                        $fb_page = FacebookPage::create([
                            'facebook_page_id' => (string)$pageVal['id'],
                            "name" => $pageVal['name'],
                            "access_token" => $pageVal['access_token'],
                            'type' => 'business',
                        ]);
                        
                    }else{
                        $fb_page->update([
                            'facebook_page_id' => (string)$pageVal['id'],
                            "name" => $pageVal['name'],
                            "access_token" => $pageVal['access_token'],
                            'type' => 'business',
                            'expired_at' => null
                        ]);   
                    }
                }
            }else{
                echo 'No data found in the response.';
            }
        }else{
            echo 'Error occurred while fetching data from Facebook API.';
        }
    }
}
