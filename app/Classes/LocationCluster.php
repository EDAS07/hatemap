<?php namespace App\Classes;

use Log;

class LocationCluster {

	protected $group;

	public function __construct($data)
	{
		$this->group = $this->init($data);
	}

	// 0. init 各家店當作一個group 成為一個list A
	public function init($data)
	{
		$group = [];
		$index = 0;
		foreach($data as $key => $value){
			$cluster = [
				'lat' => $value['lat'],
				'lng' => $value['lng'],
				'data' => [$value]
			];
			$group[$index] = $cluster;
			$index++;
		}
		return $group;
	}

	// 叢集距離小於dis距離的點
	/*
		1. 計算所有group之間的距離
		2. 把小於半徑的店家 由最近的兩家開始合併
		3. 把合併完的店家當作list A - recursive
	*/
	public function groupby($dis)
	{

		do{
			$valid = [];
			for( $i=0 ; $i<count($this->group) ; $i++ ) {
				$valid[$i] = false;
			}
			$dis_array = [];
			for( $i=0 ; $i<count($this->group)-1 ; $i++ ) {
				for( $j=$i+1 ; $j<count($this->group) ; $j++ ) {
					$a_lat = $this->group[$i]['lat'];
					$a_lng = $this->group[$i]['lng'];
					$b_lat = $this->group[$j]['lat'];
					$b_lng = $this->group[$j]['lng'];
					$l_dis = $this->distance($a_lat,$a_lng,$b_lat,$b_lng, 'K') * 1000;
					
					if($l_dis < $dis){
						$dis_array[$i . '-' . $j] = $l_dis;
					}
				}
			}

			$dis_array = $this->sort_node_pair($dis_array);

			if(count($dis_array['dis'])>0){
				for( $i=0 ; $i<count($dis_array['dis']) ; $i++ ) {
					$pair = explode("-", $dis_array['node_pair'][$i]);

					if($valid[$pair[1]] == false && $valid[$pair[0]] == false){
						$this->group[$pair[0]]['lat'] = ($this->group[$pair[0]]['lat'] + $this->group[$pair[1]]['lat'])/2;
						$this->group[$pair[0]]['lng'] = ($this->group[$pair[0]]['lng'] + $this->group[$pair[1]]['lng'])/2;
						foreach($this->group[$pair[1]]['data'] as $key => $value){
							array_push($this->group[$pair[0]]['data'], $value);
						}
						$valid[$pair[0]] = true;
						$valid[$pair[1]] = true;
						unset($this->group[$pair[1]]);
						// Log::info('merge pare:' . $pair[0] . '-' . $pair[1]);
					}
				}
				/*for( $i=0 ; $i<count($valid) ; $i++ ) {
					if($valid[$i]){
						unset($this->group[$i]);
					}
				}*/
				$tmp_group = [];
				$i = 0;
				foreach($this->group as $key => $value){
					$tmp_group[$i] = $value;
					$i++;
				}
				$this->group = $tmp_group;
				// Log::info(print_r($this->group, true));		
			}
		} while(count($dis_array['dis']) > 0);

		return $this->group;
	}

	public function getGroup()
	{
		return $this->group;
	}

	private function sort_node_pair($dis_array){
		$s_dis = array();
		$s_node = array();
		$i = 0;
		foreach ($dis_array as $key => $row)
		{
		    $s_dis[$i] = $row;
		    $s_node[$i] = $key;
		    $i++;
		}
		array_multisort($s_dis, SORT_ASC, $s_node);
		$result = [
			'node_pair' => $s_node,
			'dis' => $s_dis
		];

		return $result;
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
}