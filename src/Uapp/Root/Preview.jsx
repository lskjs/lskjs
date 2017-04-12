
<style media="screen">
    html, body {
      height: 100%;
      min-height: 100%;
      margin: 0;
    }

    /*
    body.js-load > .loader {
      animation: jsload .5s ease-in-out;
    }
    */
    .ua_js_no body {
      overflow: hidden;
    }
    .ua_js_yes body {
      overflow: auto;
    }
    .ua_js_yes .loader {
      display: none;
    }

    .loader {
      width: 100%;
      height: 100%;
      position: absolute;
      z-index: 100000;
      opacity: 1;
      top: 0;
    }
    .sk-container {
      width: 100%;
      height: 100%;
      position: absolute;
      background-color: #2b87c2;
      -webkit-animation: background 4.0s infinite linear;
      animation: background 4.0s infinite linear;
    }
    .sk-wrapper {
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
      margin: auto;
      width: 40px;
      height: 40px;
    }

    .sk-cube-grid {
        width: 40px;
        height: 40px;
    }

    .sk-cube-grid .sk-cube {
        width: 33%;
        height: 33%;
        background-color: white;
        float: left;
        -webkit-animation: sk-cubeGridScaleDelay 1.0s infinite ease-in-out;
        animation: sk-cubeGridScaleDelay 1.0s infinite ease-in-out;
    }

    .sk-cube-grid .sk-cube1 {
        -webkit-animation-delay: 0.2s;
        animation-delay: 0.2s;
    }

    .sk-cube-grid .sk-cube2 {
        -webkit-animation-delay: 0.3s;
        animation-delay: 0.3s;
    }

    .sk-cube-grid .sk-cube3 {
        -webkit-animation-delay: 0.4s;
        animation-delay: 0.4s;
    }

    .sk-cube-grid .sk-cube4 {
        -webkit-animation-delay: 0.1s;
        animation-delay: 0.1s;
    }

    .sk-cube-grid .sk-cube5 {
        -webkit-animation-delay: 0.2s;
        animation-delay: 0.2s;
    }

    .sk-cube-grid .sk-cube6 {
        -webkit-animation-delay: 0.3s;
        animation-delay: 0.3s;
    }

    .sk-cube-grid .sk-cube7 {
        -webkit-animation-delay: 0s;
        animation-delay: 0s;
    }

    .sk-cube-grid .sk-cube8 {
        -webkit-animation-delay: 0.1s;
        animation-delay: 0.1s;
    }

    .sk-cube-grid .sk-cube9 {
        -webkit-animation-delay: 0.2s;
        animation-delay: 0.2s;
    }
    @-webkit-keyframes background {
      0% {
        background-color: #2b87c2;
      }
      50% {
        background-color: #8d76be;
      }
      100% {
        background-color: #2b87c2;
      }
    }
    @keyframes background {
      0% {
        background-color: #2b87c2;
      }
      50% {
        background-color: #8d76be;
      }
      100% {
        background-color: #2b87c2;
      }
    }
    @-webkit-keyframes jsload {
      0% {
        opacity: 1;
      }
      100% {
        opacity: 0;
      }
    }
    @keyframes jsload {
      0% {
        opacity: 1;
      }
      100% {
        opacity: 0;
      }
    }
    @-webkit-keyframes sk-cubeGridScaleDelay {
        0%,
        70%,
        100% {
            -webkit-transform: scale3D(1, 1, 1);
            transform: scale3D(1, 1, 1);
        }
        35% {
            -webkit-transform: scale3D(0, 0, 1);
            transform: scale3D(0, 0, 1);
        }
    }

    @keyframes sk-cubeGridScaleDelay {
        0%,
        70%,
        100% {
            -webkit-transform: scale3D(1, 1, 1);
            transform: scale3D(1, 1, 1);
        }
        35% {
            -webkit-transform: scale3D(0, 0, 1);
            transform: scale3D(0, 0, 1);
        }
    }
</style>
<div class='loader'>
  <div class='sk-container'>
    <div class="sk-wrapper">
      <div class="sk-cube-grid">
        <div class="sk-cube sk-cube1"></div>
        <div class="sk-cube sk-cube2"></div>
        <div class="sk-cube sk-cube3"></div>
        <div class="sk-cube sk-cube4"></div>
        <div class="sk-cube sk-cube5"></div>
        <div class="sk-cube sk-cube6"></div>
        <div class="sk-cube sk-cube7"></div>
        <div class="sk-cube sk-cube8"></div>
        <div class="sk-cube sk-cube9"></div>
      </div>
    </div>
  </div>
</div>
