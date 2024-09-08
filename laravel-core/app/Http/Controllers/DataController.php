<?php

namespace App\Http\Controllers;

use App\Models\Data;
use Inertia\Inertia;
use App\Models\Account;
use Illuminate\Http\Request;
use App\Models\AccountsGroup;
use App\Http\Controllers\Controller;

class DataController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $groups = AccountsGroup::with("createdBy", "updatedBy", "deletedBy", 'accounts.accountsGroup', 'accounts.createdBy', 'accounts.updatedBy')
        ->whereNull('deleted_by')
        ->whereNull('deleted_at')
        ->orderBy('id', 'desc')
        ->get()->toArray();

        return Inertia::render('Data/Index', [
            'groups' => $groups,
            'from' => 1,
            'to' => count($groups),
            'total' => count($groups),
        ]);
    }

    public function account(Account $account)
    {
        $data = Data::where('account_id', $account->id)->get();

        return Inertia::render('Data/Account', ['data' => $data, 'account' => $account]);
    }

}
