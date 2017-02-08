<?php

namespace App\Http\Controllers;

use App\Store;
use App\UserOpinion;
use Illuminate\Http\Request;
use Input;
use Log;

use App\Repositories\StoreRepository;

class StoreController extends Controller
{

    protected $storeRepository;

    public function __construct(StoreRepository $storeRepository)
    {
        $this->storeRepository = $storeRepository;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json([
            'ReturnCode' => NO_ERROR
        ]);
    }

    /**
     * update user search place to database
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function updateSearchPlaces(Request $request)
    {
        $places = $request['places'];
        $result = $this->storeRepository->updateSearchStores($places, true);

        return response()->json([
            'ReturnCode' => NO_ERROR,
            'data' => $result['data'],
            'group' => $result['group']
        ]);
    }
    

    /**
     * Display location nearby place
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function getNearbyPlace(Request $request)
    {
        $radius = $request['radius'];
        $location = $request['userLocation'];
        $storeTypes = $request['storeTypes'];

        $result = $this->storeRepository->getNearbyStore($radius, $location, $storeTypes, true);

        return response()->json([
            'ReturnCode' => NO_ERROR,
            'data' => $result['data'],
            'group' => $result['group']
        ]);
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
        $places = $request['results'];

        $flag = false;

        foreach($places as $place){
            $result = Store::where('place_id', '=', $place['place_id'])->first();
            if(empty($result)){
                $new_place = new Store;
                $new_place->place_id = $place['place_id'];
                $new_place->name = $place['name'];
                $new_place->type = implode(",",$place['types']);
                $new_place->lat = $place['geometry']['location']['lat'];
                $new_place->lng = $place['geometry']['location']['lng'];
                $new_place->vicinity = $place['vicinity'];
                $new_place->save();
                Log::info('<= [Create Data][Store] => ' . $place['place_id']);
                $flag = true;
            }
        }

        return response()->json([
            'ReturnCode' => NO_ERROR,
            'update' => $flag
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
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
        return response()->json([
            'ReturnCode' => NO_ERROR
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
