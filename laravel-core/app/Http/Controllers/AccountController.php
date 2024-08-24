<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Account;
use App\Models\AccountsGroup;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\StoreAccountRequest;
use App\Http\Requests\UpdateAccountRequest;

class AccountController extends Controller
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

        return Inertia::render('Accounts/Index', [
            'groups' => $groups,
            'from' => 1,
            'to' => count($groups),
            'total' => count($groups),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $groups = AccountsGroup::with("createdBy", "updatedBy", "deletedBy", 'accounts.accountsGroup', 'accounts.createdBy', 'accounts.updatedBy')
        ->whereNull('deleted_by')
        ->whereNull('deleted_at')
        ->orderBy('id', 'desc')
        ->get()->toArray();

        return Inertia::render('Accounts/CreateAccount', [
            'groups' => $groups
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAccountRequest $request)
    {
        $account = Account::create([
            'name' => $request->input('name'),
            'description' => $request->input('description'),
            'accounts_group_id' => $request->input('accounts_group_id'),
            'facebook_user_id' => $request->input('facebook_user_id'),
            'username' => $request->input('username'),
            'password' => $request->input('password'),
            'created_by' => Auth::user()->id,
            'updated_by' => Auth::user()->id,
        ]);
            
        if ($account) {
            return redirect()->route('accounts.index')->with('success', 'Account created successfully.');
        } else {
            return redirect()->back()->with('error', 'Account could not be created.');
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Account $account)
    {
        $account = Account::with('accountsGroup')->find($account->id)->toArray();
        
        $groups = AccountsGroup::with("createdBy", "updatedBy", "deletedBy", 'accounts.accountsGroup', 'accounts.createdBy', 'accounts.updatedBy')
        ->whereNull('deleted_by')
        ->whereNull('deleted_at')
        ->orderBy('id', 'desc')
        ->get()->toArray();
        
        return Inertia::render('Accounts/EditAccount', [
            'groups' => $groups,
            'account' => $account,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAccountRequest $request, Account $account)
    {
        $account->update([
            'name' => $request->input('name'),
            'description' => $request->input('description'),
            'accounts_group_id' => $request->input('accounts_group_id'),
            'facebook_user_id' => $request->input('facebook_user_id'),
            'username' => $request->input('username'),
            'password' => $request->input('password'),
            'updated_by' => Auth::user()->id,
        ]);
        
        if ($account->wasChanged()) {
            return redirect()->route('accounts.index')->with('success', 'Account updated successfully.');
        } else {
            return redirect()->back()->with('error', 'Account could not be updated.');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Account $account)
    {
        $account->update([
            'deleted_by' => Auth::user()->id,
            'deleted_at' => now(),
        ]);
        if ($account->wasChanged()) {
            return redirect()->route('accounts.index')->with('success', 'Account deleted successfully.');
        } else {
            return redirect()->back()->with('error', 'Account could not be deleted.');
        }
    }
}
