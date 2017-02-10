export default (params) => {
  if (typeof params === 'string') {
    params = {
      url: params,
    };
  }
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${params.name} API docs</title>
  <link rel="icon" type="image/png" href="//cdn.mgbeta.ru/swagger/images/favicon-32x32.png" sizes="32x32" />
  <link rel="icon" type="image/png" href="//cdn.mgbeta.ru/swagger/images/favicon-16x16.png" sizes="16x16" />
  <link href='//cdn.mgbeta.ru/swagger/css/typography.css' media='screen' rel='stylesheet' type='text/css'/>
  <link href='//cdn.mgbeta.ru/swagger/css/reset.css' media='screen' rel='stylesheet' type='text/css'/>
  <link href='//cdn.mgbeta.ru/swagger/css/screen.css' media='screen' rel='stylesheet' type='text/css'/>
  <link href='//cdn.mgbeta.ru/swagger/css/reset.css' media='print' rel='stylesheet' type='text/css'/>
  <link href='//cdn.mgbeta.ru/swagger/css/print.css' media='print' rel='stylesheet' type='text/css'/>
  <link href='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css' media='print' rel='stylesheet' type='text/css'/>
  <style>
    .token{
      display: flex;
      justify-content: center;
      flex-direction: column;
    }
    .token__input{
      width: 100%;
      margin-top: 5px;
    }
    .text-center{
      text-align: center;
    }
  </style>

  <script src='//cdn.mgbeta.ru/swagger/lib/object-assign-pollyfill.js' type='text/javascript'></script>
  <script src='//cdn.mgbeta.ru/swagger/lib/jquery-1.8.0.min.js' type='text/javascript'></script>
  <script src='//cdn.mgbeta.ru/swagger/lib/jquery.slideto.min.js' type='text/javascript'></script>
  <script src='//cdn.mgbeta.ru/swagger/lib/jquery.wiggle.min.js' type='text/javascript'></script>
  <script src='//cdn.mgbeta.ru/swagger/lib/jquery.ba-bbq.min.js' type='text/javascript'></script>
  <script src='//cdn.mgbeta.ru/swagger/lib/handlebars-4.0.5.js' type='text/javascript'></script>
  <script src='//cdn.mgbeta.ru/swagger/lib/lodash.min.js' type='text/javascript'></script>
  <script src='//cdn.mgbeta.ru/swagger/lib/backbone-min.js' type='text/javascript'></script>
  <script src='//cdn.mgbeta.ru/swagger/swagger-ui.js' type='text/javascript'></script>
  <script src='//cdn.mgbeta.ru/swagger/lib/highlight.9.1.0.pack.js' type='text/javascript'></script>
  <script src='//cdn.mgbeta.ru/swagger/lib/highlight.9.1.0.pack_extended.js' type='text/javascript'></script>
  <script src='//cdn.mgbeta.ru/swagger/lib/jsoneditor.min.js' type='text/javascript'></script>
  <script src='//cdn.mgbeta.ru/swagger/lib/marked.js' type='text/javascript'></script>
  <script src='//cdn.mgbeta.ru/swagger/lib/swagger-oauth.js' type='text/javascript'></script>

  <!-- Some basic translations -->
  <!-- <script src='//cdn.mgbeta.ru/swagger/lang/translator.js' type='text/javascript'></script> -->
  <!-- <script src='//cdn.mgbeta.ru/swagger/lang/ru.js' type='text/javascript'></script> -->
  <!-- <script src='//cdn.mgbeta.ru/swagger/lang/en.js' type='text/javascript'></script> -->

  <script type="text/javascript">
    $(function () {
      var url = window.location.search.match(/url=([^&]+)/);
      if (url && url.length > 1) {
        url = decodeURIComponent(url[1]);
      } else {
        // Путь
        url = "${params.url}";
      }

      hljs.configure({
        highlightSizeThreshold: 5000
      });

      // Pre load translate...
      if(window.SwaggerTranslator) {
        window.SwaggerTranslator.translate();
      }
      window.swaggerUi = new SwaggerUi({
        url: url,
        dom_id: "swagger-ui-container",
        supportedSubmitMethods: ['get', 'post', 'put', 'delete', 'patch'],
        onComplete: function(swaggerApi, swaggerUi){
          if(typeof initOAuth == "function") {
            initOAuth({
              clientId: "your-client-id",
              clientSecret: "your-client-secret-if-required",
              realm: "your-realms",
              appName: "your-app-name",
              scopeSeparator: " ",
              additionalQueryStringParams: {}
            });
          }

          if(window.SwaggerTranslator) {
            window.SwaggerTranslator.translate();
          }
        },
        onFailure: function(data) {
          log("Unable to Load SwaggerUI");
        },
        docExpansion: "none",
        jsonEditor: false,
        defaultModelRendering: 'schema',
        showRequestHeaders: false
      });

      window.swaggerUi.load();

      function log() {
        if ('console' in window) {
          console.log.apply(console, arguments);
        }
      }
  });
  </script>
</head>

<body class="swagger-section">
<div id='header'>
  <div class="swagger-ui-wrap">
    <a id="logo" href="/"><img class="logo__img" alt="swagger" height="30" width="30" src="//cdn.mgbeta.ru/swagger/images/logo_small.png" /><span class="logo__title">${params.name}</span></a>
    <form id='api_selector'>
      <div class='input'><input placeholder="//example.com/api" id="input_baseUrl" name="baseUrl" type="text"/></div>
      <div id='auth_container'></div>
      <div class='input'><a id="explore" class="header__btn" href="#" data-sw-translate>Explore</a></div>
    </form>
  </div>
</div>
<div class = "token swagger-section swagger-ui-wrap">
  <h2 class = "text-center">Token</h2>
  <input type = "text" name = "token form-control" class = "token__input" value = "${params.devToken || ''}">
</div>
<div id="message-bar" class="swagger-ui-wrap" data-sw-translate>&nbsp;</div>
<div id="swagger-ui-container" class="swagger-ui-wrap"></div>
<script type = "text/javascript">
  $(document).ready(function(){
    var localStorage = window.localStorage;
    $('.token__input').change(function(){
      var el = $(this);
      var token = el.val();
      localStorage.setItem('token', token);
      swaggerUi.api.clientAuthorizations.add("x-access-token", new SwaggerClient.ApiKeyAuthorization("x-access-token", token, "header"));
    })
    var _token = localStorage.getItem('token');
    console.log(_token);
    if(_token) {
      $('.token__input').val(_token);
    }
    swaggerUi.api.clientAuthorizations.add("x-access-token", new SwaggerClient.ApiKeyAuthorization("x-access-token", $('.token__input').val(), "header"));
  })
</script>
</body>
</html>`;
};
