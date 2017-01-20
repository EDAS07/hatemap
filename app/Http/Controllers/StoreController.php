<?php

namespace App\Http\Controllers;

use App\Store;
use App\UserOpinion;
use Illuminate\Http\Request;
use Input;
use Log;

class StoreController extends Controller
{
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

        $datas = [];
        foreach( $places as $key => $place){
            Log::info('place:' . $place['place_id']);
            $result = Store::where('place_id', '=', $place['place_id'])->first();
            if(empty($result)){
                $new_place = new Store;
                $new_place->place_id = $place['place_id'];
                $new_place->name = $place['name'];
                $new_place->type = implode(",",$place['types']);
                $new_place->lat = $place['geometry']['location']['lat'];
                $new_place->lng = $place['geometry']['location']['lng'];
                $new_place->vicinity = $place['formatted_address'];
                $new_place->save();
                Log::info('<= [Create Data][Store] => ' . $place['place_id']);
            }
            $opinion = UserOpinion::where('place_id', '=', $place['place_id'])
            ->join('users', 'users.id', '=', 'user_opinions.user_id')
            ->select(['users.name', 'users.facebook_id', 'user_opinions.comment'])
            ->get();
            $data = [
                'id' => $place['id'],
                'name' => $place['name'],
                'lat' => $place['geometry']['location']['lat'],
                'lng' => $place['geometry']['location']['lng'],
                'place_id' => $place['place_id'],
                'vicinity' => $place['formatted_address'],
                'comments' => $opinion
            ];
            $datas[$key] = $data;
        }

        return response()->json([
            'ReturnCode' => NO_ERROR,
            'data' => $datas
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

        $datas = Store::where(function($q) use ($storeTypes){
            foreach($storeTypes as $type){
                $q->orWhere('type', 'LIKE', "%{$type}%");
            }
        })
        ->get();

        foreach($datas as $key => $data ){
            $dis = $this->distance($location['lat'], $location['lng'], $data->lat, $data->lng, 'K') * 1000;
            $datas[$key]['dis'] = $dis;
            if($dis > $radius){
                unset($datas[$key]);
            }else{
                $opinion = UserOpinion::where('place_id', '=', $datas[$key]['place_id'])
                ->join('users', 'users.id', '=', 'user_opinions.user_id')
                ->select(['users.name', 'users.facebook_id', 'user_opinions.comment'])
                ->get();
                $datas[$key]['comments'] = $opinion;
            }
        }

        return response()->json([
            'ReturnCode' => NO_ERROR,
            'data' => $datas
        ]);
    }

    private function distance($lat1, $lon1, $lat2, $lon2, $unit) {

      $theta = $lon1 - $lon2;
      $dist = sin(deg2rad($lat1)) * sin(deg2rad($lat2)) +  cos(deg2rad($lat1)) * cos(deg2rad($lat2)) * cos(deg2rad($theta));
      $dist = acos($dist);
      $dist = rad2deg($dist);
      $miles = $dist * 60 * 1.1515;
      $unit = strtoupper($unit);

      if ($unit == "K") {
        return ($miles * 1.609344);
      } else if ($unit == "N") {
          return ($miles * 0.8684);
        } else {
            return $miles;
          }
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
