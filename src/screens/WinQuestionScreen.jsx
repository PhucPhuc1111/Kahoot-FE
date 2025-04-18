function WinQuestionScreen() {
    return (
        <>
            <style>
                {`
          *, *::after, *::before {
            box-sizing: border-box;
          }
  
          :root {
            font-size: 0.75vw;
            --bg:rgb(103, 188, 34);
            --anime-speed: 0.2s;
          }
  
          body {
            height: 100vh;
            font-family: arial;
            background: var(--bg);
            overflow: hidden;
          }
  
          .cow {
            width: 30rem;
            aspect-ratio: 2/1;
            border-radius: 4rem/15%;
            background-color: #fefefe;
            position: absolute;
            top: 40%;
            z-index: 10;
            transform-origin: 50% 150%;
            left: 60%;
            transform: translateY(0) rotate(0deg) scaleX(-1);
            animation: jmb var(--anime-speed) linear, move calc(var(--anime-speed) * 10) linear;
            animation: dance 1s ease-in-out infinite alternate;
          }
  
          .cow:before {
            content: "";
            position: absolute;
            left: 11%;
            top: 0;
            width: 40%;
            height: 60%;
            color: #000;
            background: currentcolor;
            border-radius: 0 0 100% 50%;
            box-shadow: 9rem -2rem 0 -2rem, 15rem -3rem 0 -3rem;
          }
  
          .cow:after {
            content: "";
            position: absolute;
            left: 20%;
            bottom: 6%;
            color: #000;
            background: currentcolor;
            box-shadow: 8rem -4rem 0 -1rem;
            width: 5rem;
            aspect-ratio: 1/1;
            border-radius: 43% 57% 51% 49%/51% 55% 45% 49%;
          }
  
          .cow .head {
            position: absolute;
            top: 0;
            left: 100%;
            z-index: 1;
          }
  
          .cow .head .face {
            width: 11rem;
            aspect-ratio: 12.5/7.5;
            background: #fff;
            box-shadow: -2rem 4.5rem #000 inset;
            border-radius: 10% 100% 50% 45%/44% 72% 26% 25%;
            transform: rotateX(180deg) rotate(-55deg) translate(-25%, -55%);
            position: relative;
            z-index: 10;
          }
  
          .cow .head:after,
          .cow .head:before {
            content: "";
            position: absolute;
            top: -3.5rem;
            left: -5.5rem;
            transform: rotate(-25deg);
            background: #000;
            width: 4rem;
            height: 5rem;
            z-index: 20;
            box-shadow: 0.2rem 0.1rem 0 0.2rem #fff inset;
            border-radius: 0% 100% 38% 62%/41% 73% 27% 59%;
          }
  
          .cow .head:before {
            z-index: 2;
            top: -4rem;
            left: -5rem;
            transform: rotate(-5deg);
          }
  
          .cow .leg {
            position: absolute;
            top: 95%;
            background: #FFF;
            width: 1.5rem;
            height: 3rem;
            transform-origin: top center;
          }
  
          .cow .leg:after {
            content: "";
            position: absolute;
            left: 0;
            top: 90%;
            width: 100%;
            height: 2.5rem;
            background: #FFF;
            border-bottom: 1.5rem solid #000;
          }
  
          .cow .leg.b {
            left: 4%;
            animation: legMoveB var(--anime-speed) alternate infinite;
          }
  
          .cow .leg.b.l {
            left: 13%;
          }
  
          .cow .leg.b.l:after {
            left: 10%;
            top: 75%;
            transform: rotate(-5deg);
          }
  
          .cow .leg.b.r {
            animation-delay: var(--anime-speed);
          }
  
          .cow .leg.b.r:after {
            left: 32%;
            top: 90%;
            transform: rotate(-15deg);
          }
  
          .cow .leg.f {
            right: 5%;
            animation: legMoveF var(--anime-speed) alternate infinite;
          }
  
          .cow .leg.f.l {
            right: 10%;
            animation-delay: var(--anime-speed);
          }
  
          .cow .leg.f.l:after {
            right: 10%;
            left: auto;
            top: 75%;
            transform: rotate(5deg);
          }
  
          .cow .leg.f.r:after {
            right: 20%;
            left: auto;
            top: 90%;
            transform: rotate(10deg);
          }
  
          .cow .tail {
            position: absolute;
            right: 98%;
            top: 12%;
            width: 2rem;
            height: 10rem;
            border-left: 0.5rem solid #fff;
            border-top: 0.5rem solid #fff;
            border-radius: 100% 0% 51% 49%/42% 100% 0% 58%;
            transform-origin: top left;
            animation: tail 0.75s alternate infinite;
          }
  
          .cow .tail:after {
            content: "";
            position: absolute;
            left: 7%;
            top: 100%;
            background: #000;
            width: 1.5rem;
            height: 1.75rem;
            border-radius: 70% 30% 100% 0%/100% 30% 70% 0%;
            transform: rotate(-60deg);
          }
  
          .well {
            background: var(--bg);
            width: 30rem;
            height: 2rem;
            position: absolute;
            top: calc(40% + 19rem);
            left: 60%;
          }
  
          .well::after {
            content: "";
            position: absolute;
            left: 0;
            top: 50%;
            width: 100%;
            height: 24rem;
            background: var(--bg);
            z-index: 100;
          }
  
          .home-btn {
            position: absolute;
            left: -190%;
            top: 2rem;
            font-size: 2.5rem;
            font-weight: bold;
            color: #000;
            background: #FFD600;
            display: inline-block;
            text-decoration: none;
            padding: 1.5rem 3rem;
            border-radius: 1rem;
            transition: background 0.3s ease-in;
            transform-origin: 45rem 45rem;
            animation: btnAnim calc(var(--anime-speed) * 20) linear;
          }
  
          .home-btn:hover {
            background: #FBC02D;
          }
  
          .text-box {
            font-family: "Cabin Sketch", serif;
            font-weight: 700;
            color: #fff;
            text-align: center;
            position: absolute;
            left: 10%;
            top: 28%;
            animation: textAnim calc(var(--anime-speed) * 18) linear;
          }
  
          .text-box h1 {
            font-size: 24rem;
            margin: 0;
            line-height: 18rem;
          }
  
          .text-box p {
            width: 42rem;
            font-size: 5rem;
            line-height: 1;
            margin: 0;
          }

          .hearts {
  position: absolute;
  top: 1%;
  left: 60%;
  width: 30rem;
  height: 30rem;
  pointer-events: none;
  z-index: 20;
}

.heart {
  position: absolute;
  bottom: 0;
  width: 2rem;
  height: 2rem;
  background: pink;
  transform: rotate(45deg);
  animation: floatUp 2s infinite ease-in-out;
}

.heart::before,
.heart::after {
  content: "";
  position: absolute;
  width: 2rem;
  height: 2rem;
  background: pink;
  border-radius: 50%;
}

.heart::before {
  top: -1rem;
  left: 0;
}

.heart::after {
  left: -1rem;
  top: 0;
}

@keyframes floatUp {
  0% {
    transform: translateY(0) scale(1) rotate(45deg);
    opacity: 1;
  }
  100% {
    transform: translateY(-10rem) scale(1.2) rotate(45deg);
    opacity: 0;
  }
}

        @keyframes dance {
  0% {
    transform: translateY(0) rotate(0deg);
  }
  25% {
    transform: translateY(-1rem) rotate(-3deg);
  }
  50% {
    transform: translateY(0.5rem) rotate(3deg);
  }
  75% {
    transform: translateY(-1rem) rotate(-2deg);
  }
  100% {
    transform: translateY(0) rotate(0deg);
  }
}

          @keyframes btnAnim {
            0%, 48% {
              transform: translateX(-10rem) rotate(95deg);
            }
            55%, 100% {
              transform: translateX(0rem) rotate(0deg);
            }
          }
  
          @keyframes textAnim {
            0%, 60% {
              top: 0%;
              transform: translatey(0);
              opacity: 0;
            }
            70%, 76%, 85% {
              top: 28%;
              transform: translatey(5%);
              opacity: 1;
            }
            73%, 79% {
              top: 28%;
              transform: translatey(-15%);
              opacity: 1;
            }
            100% {
              top: 28%;
              transform: translatey(0);
            }
          }
  
          @keyframes jmb {
            0%, 100% {
              transform: translatey(0);
            }
            50% {
              transform: translatey(5px);
            }
          }
  
          @keyframes legMoveB {
            0% {
              transform: rotate(2deg) translatey(0%);
            }
            100% {
              transform: rotate(-5deg) translatey(-5%);
            }
          }
  
          @keyframes legMoveF {
            0% {
              transform: rotate(0deg) translatey(0%);
            }
            100% {
              transform: rotate(-15deg) translatey(-5%);
            }
          }
  
          @keyframes tail {
            0% {
              transform: rotate(3deg);
              height: 10rem;
            }
            100% {
              transform: rotate(-3deg);
              height: 8rem;
            }
          }
          `}
            </style>

            <div className="cow">
                <div className="head">
                    <div className="face"></div>
                </div>
                <div className="leg b l"></div>
                <div className="leg b r"></div>
                <div className="leg f l"></div>
                <div className="leg f r"></div>
                <div className="tail"></div>
            </div>
            <div className="hearts">
                <span className="heart" style={{ left: "10%" }}></span>
                <span className="heart" style={{ left: "50%" }}></span>
                <span className="heart" style={{ left: "80%" }}></span>
            </div>

            <div className="well">
                <a className="home-btn" href="/">
                    Next question
                </a>
            </div>

            <div className="text-box">
                <p> 🎉 Congratulate! You've chosen the right answer ! 🎉</p>
            </div>
        </>
    );
}

export default WinQuestionScreen;
