<?php namespace app\Helpers;

use Html;
use Log;

class Assets
{
	public function __construct()
	{

	}

	public static function style($url, $attributes = array(), $secure = null)
	{
		if(env('APP_ENV') == 'production'){
			return Html::style(elixir($url));
		}
		return Html::style('css/' . $url);
	}

	public static function script($url, $attributes = array(), $secure = null){
		if(env('APP_ENV') == 'production'){
			return Html::script(elixir($url));
		}
		return Html::script('js/' . $url);	
	}

}