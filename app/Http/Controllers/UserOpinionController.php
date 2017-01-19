<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\UserOpinion;
use App\Store;
use DB;
use Auth;
use Log;

class UserOpinionController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth:api');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        Log::info('place_id:' . $id);
        $opinion = UserOpinion::where('place_id', '=', $id)
        ->join('users', 'users.id', '=', 'user_opinions.user_id')
        ->select(['users.name', 'users.facebook_id', 'user_opinions.comment'])
        ->get();

        return response()->json([
            'ReturnCode' => NO_ERROR,
            'data' => $opinion
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $comment = $request['comment'];

        // Log::info('====debug:'  .  Auth::id());

        $new_opinion = new UserOpinion;
        $new_opinion->user_id = Auth::id();
        $new_opinion->place_id = $id;
        $new_opinion->comment = $comment;
        $new_opinion->save();

        $opinion = UserOpinion::where('place_id', '=', $id)->get();

        return response()->json([
            'ReturnCode' => NO_ERROR,
            'data' => $opinion
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
