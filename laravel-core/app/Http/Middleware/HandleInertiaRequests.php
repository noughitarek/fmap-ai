<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use Illuminate\Support\Facades\Route;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $currentRoute = Route::current();
        $controllerClass = get_class($currentRoute->getController());
        $controllerMethod = $currentRoute->getActionMethod();

        $menu = config('menu');
        foreach($menu as $sub_menu)
        {
            if(isset($sub_menu['active_when']))
            {
                foreach($sub_menu['active_when'] as $active_when)
                {
                    if($controllerClass."@".$controllerMethod == $active_when)
                    {
                        $sub_menu['active'] = true;
                        break;
                    }
                    if(substr($active_when, -1) === '#' && $controllerClass."#" == $active_when)
                    {
                        $sub_menu['active'] = true;
                        break;
                    }
                }
            }
            $formated_menu[] = $sub_menu;
        }
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user()
            ],
            'menu' => $formated_menu,
            'settings' => config('settings')
        ];
    }
}
