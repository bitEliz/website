<template>
  <div class='animation-container'>
    <h1>肥肠抱歉，你要找的页面不见了 ╮(￣▽￣)╭</h1>
    <div class='lightning-container'>
      <div class='lightning white'></div>
      <div class='lightning red'></div>
    </div>
    <div class='boom-container'>
      <div class='shape circle big white'></div>
      <div class='shape circle white'></div>
      <div class='shape triangle big yellow'></div>
      <div class='shape disc white'></div>
      <div class='shape triangle blue'></div>
    </div>
    <div class='boom-container second'>
      <div class='shape circle big white'></div>
      <div class='shape circle white'></div>
      <div class='shape disc white'></div>
      <div class='shape triangle blue'></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'notFound',
}
</script>

<style lang="css">
  body {
    margin: 0;
    padding: 0
  }

  body {
    display: flex;
    align-items: center;
    position: relative;
    background: linear-gradient(to bottom right, #070630 0%, #060454 100%);
    min-height: 100vh;
    -webkit-user-select:none;
    -moz-user-select:none;
    -ms-user-select:none;
    user-select:none;
  }

  #app {
    margin: 0 auto;
  }

  h1 {
    font-size: 2em;
    text-align: center;
    color: white;
    transform:rotate(-7deg);
    -ms-transform:rotate(-7deg);     /* IE 9 */
    -moz-transform:rotate(-7deg);     /* Firefox */
    -webkit-transform:rotate(-7deg); /* Safari 和 Chrome */
    -o-transform:rotate(-7deg);     /* Opera */
  }

  .animation-container {
    display: block;
    position: relative;
    /*    width: 800px;*/
    max-width: 100%;
    margin: 0 auto;
  }

  .animation-container .lightning-container {
    position: absolute;
    top: 50%;
    left: 0;
    display: flex;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
  }

  .animation-container .lightning-container .lightning {
    position: absolute;
    display: block;
    height: 12px;
    width: 12px;
    border-radius: 12px;
    -webkit-transform-origin: 6px 6px;
    transform-origin: 6px 6px;
    -webkit-animation-name: woosh;
    animation-name: woosh;
    -webkit-animation-duration: 1.5s;
    animation-duration: 1.5s;
    -webkit-animation-iteration-count: infinite;
    animation-iteration-count: infinite;
    -webkit-animation-timing-function: cubic-bezier(0.445, 0.05, 0.55, 0.95);
    animation-timing-function: cubic-bezier(0.445, 0.05, 0.55, 0.95);
    -webkit-animation-direction: alternate;
    animation-direction: alternate;
  }

  .animation-container .lightning-container .lightning.white {
    background-color: white;
    box-shadow: 0px 50px 50px 0px rgba(255, 255, 255, 0.3);
  }

  .animation-container .lightning-container .lightning.red {
    background-color: #fc7171;
    box-shadow: 0px 50px 50px 0px rgba(252, 113, 113, 0.3);
    -webkit-animation-delay: 0.2s;
    animation-delay: 0.2s;
  }

  .boom-container {
    position: absolute;
    display: flex;
    width: 80px;
    height: 80px;
    text-align: center;
    align-items: center;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
    left: 200px;
    top: -145px;
  }

  .shape {
    display: inline-block;
    position: relative;
    opacity: 0;
    -webkit-transform-origin: center center;
    transform-origin: center center;
  }

  .shape.triangle {
    width: 0;
    height: 0;
    border-style: solid;
    -webkit-transform-origin: 50% 80%;
    transform-origin: 50% 80%;
    -webkit-animation-duration: 1s;
    animation-duration: 1s;
    -webkit-animation-timing-function: ease-out;
    animation-timing-function: ease-out;
    -webkit-animation-iteration-count: infinite;
    animation-iteration-count: infinite;
    margin-left: -15px;
    border-width: 0 2.5px 5px 2.5px;
    border-color: transparent transparent #42e599 transparent;
    -webkit-animation-name: boom-triangle;
    animation-name: boom-triangle;
  }

  .shape.triangle.big {
    margin-left: -25px;
    border-width: 0 5px 10px 5px;
    border-color: transparent transparent #fade28 transparent;
    -webkit-animation-name: boom-triangle-big;
    animation-name: boom-triangle-big;
  }

  .shape.disc {
    width: 8px;
    height: 8px;
    border-radius: 100%;
    background-color: #d15ff4;
    -webkit-animation-name: boom-disc;
    animation-name: boom-disc;
    -webkit-animation-duration: 1s;
    animation-duration: 1s;
    -webkit-animation-timing-function: ease-out;
    animation-timing-function: ease-out;
    -webkit-animation-iteration-count: infinite;
    animation-iteration-count: infinite;
  }

  .shape.circle {
    width: 20px;
    height: 20px;
    -webkit-animation-name: boom-circle;
    animation-name: boom-circle;
    -webkit-animation-duration: 1s;
    animation-duration: 1s;
    -webkit-animation-timing-function: ease-out;
    animation-timing-function: ease-out;
    -webkit-animation-iteration-count: infinite;
    animation-iteration-count: infinite;
    border-radius: 100%;
    margin-left: -30px;
  }

  .shape.circle.white {
    border: 1px solid white;
  }

  .shape.circle.big {
    width: 40px;
    height: 40px;
    margin-left: 0px;
  }

  .shape.circle.big.white {
    border: 2px solid white;
  }

  .shape:after {
    background-color: rgba(178, 215, 232, 0.2);
  }

  .shape.triangle, .shape.circle,
  .shape.circle.big, .shape.disc {
    -webkit-animation-delay: .38s;
    animation-delay: .38s;
    -webkit-animation-duration: 3s;
    animation-duration: 3s;
  }

  .shape.circle {
    -webkit-animation-delay: 0.6s;
    animation-delay: 0.6s;
  }

  .animation-container .boom-container.second {
    left: 485px;
    top: 80%;
  }

  .animation-container .boom-container.second .shape.triangle,
  .animation-container .boom-container.second .shape.circle,
  .animation-container .boom-container.second .shape.circle.big,
  .animation-container .boom-container.second .shape.disc {
    -webkit-animation-delay: 1.9s;
    animation-delay: 1.9s;
  }

  .animation-container .boom-container.second .shape.circle {
    -webkit-animation-delay: 2.15s;
    animation-delay: 2.15s;
  }


  @keyframes woosh {
    0% {
      width: 12px;
      transform: translate(0px, 0px) rotate(-35deg);
    }

    15% {
      width: 50px;
    }

    30% {
      width: 12px;
      transform: translate(214px, -150px) rotate(-35deg);
    }

    30.1% {
      transform: translate(214px, -150px) rotate(46deg);
    }

    50% {
      width: 110px;
    }

    70% {
      width: 12px;
      transform: translate(500px, 150px) rotate(46deg);
    }

    70.1% {
      transform: translate(500px, 150px) rotate(-37deg);
    }

    85% {
      width: 50px;
    }

    100% {
      width: 12px;
      transform: translate(700px, 0) rotate(-37deg);
    }
  }


  @keyframes boom-circle {
    0% {
      opacity: 0;
    }

    5% {
      opacity: 1;
    }

    30% {
      opacity: 0;
      transform: scale(3);
    }
  }

  @keyframes boom-triangle-big {
    0% {
      opacity: 0;
    }

    5% {
      opacity: 1;
    }

    40% {
      opacity: 0;
      transform: scale(2.5) translate(50px, -50px) rotate(360deg);
    }
  }

  @keyframes boom-triangle {
    0% {
      opacity: 0;
    }

    5% {
      opacity: 1;
    }

    30% {
      opacity: 0;
      -webkit-transform: scale(3) translate(20px, 40px) rotate(360deg);
      transform: scale(3) translate(20px, 40px) rotate(360deg);
    }
  }

  @keyframes boom-disc {
    0% {
      opacity: 0;
    }

    5% {
      opacity: 1;
    }

    40% {
      opacity: 0;
      -webkit-transform: scale(2) translate(-70px, -30px);
      transform: scale(2) translate(-70px, -30px);
    }
  }

</style>
