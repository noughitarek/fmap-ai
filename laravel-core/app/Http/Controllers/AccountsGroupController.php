<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\AccountsGroup;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\StoreAccountsGroupRequest;
use App\Http\Requests\UpdateAccountsGroupRequest;

class AccountsGroupController extends Controller
{

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Accounts/CreateGroup');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAccountsGroupRequest $request)
    {
        $group = AccountsGroup::create([
            "name" => $request->input('name'), 
            "description" => $request->input('description'), 
            "created_by" => Auth::user()->id,
            "updated_by" => Auth::user()->id,
        ]);
        if ($group) {
            return redirect()->route('accounts.index')->with('success', 'Group of accounts created successfully.');
        } else {
            return redirect()->back()->with('error', 'Group of accounts could not be created.');
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(AccountsGroup $group)
    {
        return Inertia::render('Accounts/EditGroup', ['group' => $group]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAccountsGroupRequest $request, AccountsGroup $group)
    {
        $group->update([
            "name" => $request->input('name'), 
            "description" => $request->input('description'), 
            'updated_by' => Auth::user()->id,
        ]);
    
        if ($group->wasChanged()) {
            return redirect()->route('accounts.index')->with('success', 'Group of accounts edited successfully.');
        } else {
            return redirect()->back()->with('error', 'Group of accounts could not be edited.');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(AccountsGroup $group)
    {
        $group->update([
            'deleted_by' => Auth::user()->id,
            'deleted_at' => now(),
        ]);
        Account::where('accounts_group_id', $group->id)->update([
            'deleted_by' => Auth::user()->id,
            'deleted_at' => now(),
        ]);
        if ($group->wasChanged()) {
            return redirect()->route('accounts.index')->with('success', 'Group of accounts deleted successfully.');
        } else {
            return redirect()->back()->with('error', 'Group of accounts could not be deleted.');
        }
    }
}
