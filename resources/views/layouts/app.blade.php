<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">
    
    {{-- <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"> --}}
    {{-- <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"> --}}

    <title>{{ config('app.name', 'Laravel') }}</title>

    {!! Assets::style('app.css') !!}

</head>
<body>
    

    @yield('content')


    <!-- Scripts -->
    {!! Assets::script('vendor.js') !!}
    {!! Assets::script('app.js') !!}
    
    <script async defer
        src="https://maps.googleapis.com/maps/api/js?v=3&key={!! env('GOOGLEMAP_API_ID') !!}&callback=initMap&libraries=places">
    </script>

</body>
</html>
