<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    {!! Assets::style('app.css') !!}

</head>
<body>

    @yield('content')

    <!-- Scripts -->
    
    <script type="text/javascript">
        if (window.location.hash == '#_=_'){
            // Check if the browser supports history.replaceState.
            if (history.replaceState) {
                // Keep the exact URL up to the hash.
                var cleanHref = window.location.href.split('#')[0];
                // Replace the URL in the address bar without messing with the back button.
                history.replaceState(null, null, cleanHref);
            } else {
                // Well, you're on an old browser, we can get rid of the _=_ but not the #.
                window.location.hash = '';

            }
        }
    </script>

    @yield('js')

</body>
</html>
