/* -------------------------------------------------- */
/* DETECTION
/* -------------------------------------------------- */

/*
var $isAndroidCanvas = navigator.userAgent.toLowerCase().indexOf("android") > -1,
    $isiPhoneCanvas = navigator.userAgent.toLowerCase().indexOf("iphone") > -1,
    $isiPadCanvas = navigator.userAgent.toLowerCase().indexOf("ipad") > -1,
    $isiPodCanvas = navigator.userAgent.toLowerCase().indexOf("ipod") > -1,
    
    $isMobileCanvas = $isAndroidCanvas || $isiPhoneCanvas || $isiPadCanvas || $isiPodCanvas;
*/

/* -------------------------------------------------- */
/* FX
/* -------------------------------------------------- */

// OPTIONS
var ctx,
    viewWidth = window.innerWidth,
    viewHeight = window.innerHeight,
    drawingCanvas = document.getElementById("fx-neural-network"),
    timeStep = (1/50),
    time = 0,
    nodes = [],
    signals = [],
    signalCount = 0,
    tansmitInterval = 8000,
    minNodes = 2,
    maxNodes = 6,
    nodeSize = 4,
    nodeColor = "rgba(0,250,200,1)",
    nodeLineColor = "rgba(0,0,0,0.5)",
    signalColor = "rgba(100,0,250,1)", //"hsl(168,100%,50%)", 'hsl(' + tint + ',100%,50%)';
    signalRandomColor = false,
    nodeLineWidth = 0.1,
    signalLineWidth = 0.2,
    signalDuration = 0.75,
    swayAmount = 12;


// ASSEMBLY
var fxNeuralNetwork = function() {
    fxNeuralNetworkDrawCanvas();
    fxNeuralNetworkCreateNodes();
    fxNeuralNetworkConnectNodes();

    transmit();
    setInterval(transmit, tansmitInterval);

    requestAnimationFrame(loop);
};


// UPDATE
var fxNeuralNetworkUpdate = function() {
    fxNeuralNetworkDrawCanvas();
    fxNeuralNetworkCreateNodes();
    fxNeuralNetworkConnectNodes();

    transmit();
};


// DRAW CANVAS
function fxNeuralNetworkDrawCanvas() {
    drawingCanvas.width = window.innerWidth;
    drawingCanvas.height = window.innerHeight;
    ctx = drawingCanvas.getContext('2d');
}


// NODES
function fxNeuralNetworkCreateNodes() {
    var rad = window.innerWidth * 1 - 10;

    for (var i = 0; i < 15; i++) {
        var q = Math.random() * (Math.PI * 2);
        var r = Math.sqrt(Math.random());
        var x = (rad * r) * Math.cos(q) + window.innerWidth * 0.5;
        var y = (rad * r) * Math.sin(q) + window.innerWidth * 0.5;

        nodes[i] = new Node(x, y);
    }
}


// NETWORK
function fxNeuralNetworkConnectNodes() {
    var connection,
        j,
        connectCount;

    for (var i = 0; i < nodes.length; i++) {
        j = 0;

        connectCount = Math.floor(randomRange(minNodes, maxNodes));

        while (j < connectCount) {
            connection = getRandom(nodes);

            if (nodes[i] !== connection) {
                nodes[i].connections.push(connection);
                j++;
            }
        }
    }
}


// HELPERS
function transmit() {
    signals.push(new Signal(getRandom(nodes)));
    signalCount++;
}


function update() {
    nodes.forEach(function(n) {
        n.update();
    });

    signals.forEach(function(s) {
        if (s.update() === true) {
            signals.splice(signals.indexOf(s), 1);
        }
    });
}


function draw() {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    nodes.forEach(function(n) {
        n.draw();
    });

    signals.forEach(function(s) {
        s.draw();
    });
}


function loop() {
    update();
    draw();
    time += timeStep;
    requestAnimationFrame(loop);
}


// NODE BEHAVIOR
function Node(x, y) {
    this.x = this._x = x;
    this.y = this._y = y;

    this.connections = [];

    this.r = randomRange(- swayAmount, swayAmount); // Adjusts sway speed of connecting lines.
}
Node.prototype = {
    update:function() {
        this.x = this._x + Math.sin(time) * this.r;
        this.y = this._y + Math.cos(time) * this.r;
    },
    draw:function() {
        //ctx.globalAlpha= 0;
        ctx.fillStyle = nodeColor;
        //ctx.strokeStyle = 'rgba(50,0,250,1)';
        ctx.lineWidth = nodeLineWidth;


        
        if ( $isMobile ) {

            ctx.strokeStyle = "transparent";

        } else {

            ctx.strokeStyle = nodeLineColor;
        }
        


        ctx.beginPath();
        ctx.arc(this.x, this.y, nodeSize, 0, nodeSize * Math.PI);
        ctx.fill();


        //ctx.fillRect(this.x, this.y, 10, 10);


        for (var i = 0; i < this.connections.length; i++) {
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this.connections[i].x, this.connections[i].y);
            ctx.stroke();
        }
    }
};


// SIGNAL BEHAVIOR
function Signal(start) {
    this.start = start;
    this.parts = [];
    this.completeParts = [];
    this.strength = 2.0;
    this.jumps = 0;
    
    var tint = (signalCount % 12) * 30;
    var tint = Math.floor(Math.random() * 360);
    //console.log(tint);
    //this.style = 'hsl(' + tint + ',100%,50%)';

    if( signalRandomColor ) {

        this.style = 'hsl(' + tint + ',100%,50%)';

    } else {

        this.style = signalColor;

    }

    //this.style = ['hsl(324,100%,50%)', 'hsl(168,100%,50%)', 'hsl(252,100%,50%)'];

    for (var i = 0; i < start.connections.length; i++) {
        this.parts.push(new SignalPart(this.start, this.start.connections[i], this.strength, this.style));
    }
}
Signal.prototype = {
    update:function() {
        var complete = false;
        this.completeParts.length = 0;

        for (var i = this.parts.length - 1; i >= 0; i--) {
            this.parts[i].time += timeStep;

            if (this.parts[i].complete) {
                this.completeParts.push(this.parts.splice(i, 1)[0]);
            }
        }
        
        if (this.completeParts.length > 0) {
            this.jumps++;
            this.strength--;
            complete = this.jumps === 3;
        }
      
        if (complete === false) {
            var part,
              end,
              connection;

            for (var j = 0; j < this.completeParts.length; j++) {
                part = this.completeParts[j];
                end = part.end;

                for (var k = 0; k < end.connections.length; k++) {
                    connection = end.connections[k];

                    this.parts.push(new SignalPart(end, connection, this.strength, this.style));
                }
            }
        }
      
        return complete;
    },
    draw:function() {
        for (var i = 0; i < this.parts.length; i++) {
            this.parts[i].draw();
        }
    }
};


function SignalPart(start, end, strength, style) {
    this.start = start;
    this.end = end;
    this.strength = strength;
    this.style = style;
    this._time = 0;
    this.prevTime = 0;
    this.duration = signalDuration;
    this.complete = false;

    this.p0 = {x:0, y:0};
    this.p1 = {x:0, y:0};
}
SignalPart.prototype = {
    set time(v) {
        this.prevTime = this._time;
        this._time = v >= this.duration ? this.duration : v;
        this.complete = this._time === this.duration;
    },
    get time() {
        return this._time;
    },
    draw:function() {

        var t0 = ease.inOutCubic(this.prevTime, 0, 1, this.duration);
        var t1 = ease.outQuad(this.time, 0, 1, this.duration);

        lerp(this.start, this.end, t0, this.p0);
        lerp(this.start, this.end, t1, this.p1);

        ctx.strokeStyle = this.style;
        ctx.lineWidth = this.strength * signalLineWidth;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(this.p0.x, this.p0.y);
        ctx.lineTo(this.p1.x, this.p1.y);
        ctx.stroke();
    }
};


// CALCULATIONS
function randomRange(min, max) {
    return min + Math.random() * (max - min);
}


function getRandom(a) {
    return a[Math.floor(Math.random() * a.length)];
}


function lerp(n1, n2, t, p) {
    p = p || {x:0, y:0};

    p.x = n1.x + t * (n2.x - n1.x);
    p.y = n1.y + t * (n2.y - n1.y);

    return p;
}


// EASING
/**
 * easing equations from http://gizma.com/easing/
 * t = current time
 * b = start value
 * c = delta value
 * d = duration
 */

var ease = {
    inCubic:function (t, b, c, d) {
        t /= d;
        return c*t*t*t + b;
    },
    outCubic:function(t, b, c, d) {
        t /= d;
        t--;
        return c*(t*t*t + 1) + b;
    },
    inQuad: function (t, b, c, d) {
        return c*(t/=d)*t + b;
    },
    outQuad: function (t, b, c, d) {
        return -c *(t/=d)*(t-2) + b;
    },
    inOutCubic:function(t, b, c, d) {
        t /= d/2;
        if (t < 1) return c/2*t*t*t + b;
        t -= 2;
        return c/2*(t*t*t + 2) + b;
    }
};


/* -------------------------------------------------- */
/* THROTTLE
/* -------------------------------------------------- */

if ( page = $$(".page").data("page") === "index" ) {


    var fxNeuralNetworkIsAnimating = true;


    function fxNeuralNetworkControl() {

        if( !fxNeuralNetworkIsAnimating ) {

            //console.log(fxNeuralNetworkIsAnimating);

            ctx = null;

            return;

        } else {

            //console.log(fxNeuralNetworkIsAnimating);

            fxNeuralNetworkUpdate(); // Only update canvas. No need to redraw.

        }

    }

    //fxNeuralNetworkControl();

    //fxNeuralNetwork();


    // VARS
    var canvas = new Visibility({
        onHidden: isCanvasHidden,
        onVisible: isCanvasVisible
    });


    // FUNCTIONS / CALLBACKS
    function isCanvasHidden () {
        
        $$("#fx-neural-network").css({ "display": "none" })

        fxNeuralNetworkIsAnimating = false;
        fxNeuralNetworkControl();

    }


    function isCanvasVisible () {

        $$("#fx-neural-network").css({ "display": "block" })

        fxNeuralNetworkIsAnimating = true;
        fxNeuralNetworkControl();

    }

    fxNeuralNetwork();

    //$$(pageContent).on("resize", _.debounce(fxNeuralNetworkUpdate, 2));




    (function() {

        window.addEventListener("resize", resizeThrottler, false);

        var resizeTimeout;

        function resizeThrottler() {

            // ignore resize events as long as an actualResizeHandler execution is in the queue
            if ( !resizeTimeout ) {

                resizeTimeout = setTimeout(function() {
                resizeTimeout = null;
                actualResizeHandler();
             
               // The actualResizeHandler will execute at a rate of 15fps
            }, 66); }

        }

        function actualResizeHandler() {

            // handle the resize event
            fxNeuralNetworkUpdate();

        }

    }());

};