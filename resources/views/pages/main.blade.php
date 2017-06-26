@extends('layouts.app')

@section('content')
<div class="app-container" id="app">
	<router-view></router-view>
</div>
@endsection

@section('js')
	{!! Assets::script('vendor.js') !!}
    {!! Assets::script('app.js') !!}

    <script async defer
        src="https://maps.googleapis.com/maps/api/js?v=3&key={!! env('GOOGLEMAP_API_ID') !!}&callback=initMap&libraries=places">
    </script>
@endsection
