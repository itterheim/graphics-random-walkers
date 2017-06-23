var Graphics;
(function (Graphics) {
    var Animation = (function () {
        function Animation(callback) {
            this.callback = callback;
            this._lastDuration = 0;
            this.callback = callback;
        }
        Animation.prototype.stop = function () {
            if (this.animationId)
                window.cancelAnimationFrame(this.animationId);
            this._lastDuration = 0;
        };
        Animation.prototype.animate = function () {
            var _this = this;
            this.animationId = window.requestAnimationFrame(function (duration) { return _this.step(duration); });
        };
        Animation.prototype.step = function (duration) {
            if (!this._lastDuration)
                this._lastDuration = duration;
            var d = duration - this._lastDuration;
            this._lastDuration = duration;
            this.callback(d);
            this.animate();
        };
        return Animation;
    }());
    Graphics.Animation = Animation;
})(Graphics || (Graphics = {}));
var Graphics;
(function (Graphics) {
    var App = (function () {
        function App() {
            var _this = this;
            this.walkers = [];
            this.state = [];
            this.controls = new Graphics.Controls(this);
            this.canvas = document.createElement('canvas');
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
            document.body.insertAdjacentElement('beforeBegin', this.canvas);
            this.ctx = this.canvas.getContext('2d');
            this.animation = new Graphics.Animation(function (duration) {
                _this.step(duration);
            });
            this.run();
        }
        App.prototype.run = function () {
            var color = [
                ['#a00', '#d66'],
                ['#000', '#aaa'],
                ['#06a', '#69d'],
                ['#06a', '#69d'],
                ['#06a', '#69d'],
                ['#06a', '#69d']
            ];
            for (var i = 0; i < this.controls.getCount(); i++) {
                var n = Math.floor(Math.random() * color.length);
                this.walkers.push(new Graphics.RandomWalker(this.canvas.width, this.canvas.height, this.state, color[n][1], color[n][0]));
            }
            this.animation.animate();
        };
        App.prototype.stop = function () {
            this.animation.stop();
        };
        App.prototype.reset = function () {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.walkers = [];
            this.state = [];
        };
        App.prototype.step = function (duration) {
            for (var _i = 0, _a = this.walkers; _i < _a.length; _i++) {
                var walker = _a[_i];
                var point = walker.step();
                walker.renderPoint(point, this.ctx);
            }
        };
        return App;
    }());
    Graphics.App = App;
})(Graphics || (Graphics = {}));
var Graphics;
(function (Graphics) {
    var Controls = (function () {
        function Controls(app) {
            this.app = app;
            this.count = 10000;
            this.show();
        }
        Controls.prototype.show = function () {
            var _this = this;
            if (this.element)
                return;
            var html = "\n                <div id=\"controls\">\n                    <span>" + this.count + "</span>\n                    <input type=\"range\" min=\"1\" max=\"10000\" value=\"" + this.count + "\" />\n                    <button>Restart</button>\n                </div>\n            ";
            document.body.insertAdjacentHTML('beforeend', html);
            this.element = document.getElementById('controls');
            this.element.querySelector('button').addEventListener('click', function () {
                _this.count = parseInt(_this.element.querySelector('input').value);
                _this.app.stop();
                _this.app.reset();
                _this.app.run();
            });
            this.element.querySelector('input').addEventListener('change', function (e) {
                _this.element.querySelector('span').innerHTML = _this.element.querySelector('input').value;
            });
        };
        Controls.prototype.hide = function () {
            if (!this.element)
                return;
            this.element.parentNode.removeChild(this.element);
            this.element = null;
        };
        Controls.prototype.getCount = function () {
            return this.count;
        };
        return Controls;
    }());
    Graphics.Controls = Controls;
})(Graphics || (Graphics = {}));
var Graphics;
(function (Graphics) {
    var RandomWalker = (function () {
        function RandomWalker(width, height, path, onColour, offColour) {
            if (onColour === void 0) { onColour = '#000'; }
            if (offColour === void 0) { offColour = '#aaa'; }
            this.width = width;
            this.height = height;
            this.path = path;
            this.onColour = onColour;
            this.offColour = offColour;
            this.location = { x: Math.floor(Math.random() * width), y: Math.floor(Math.random() * height) };
            this.setState(this.location, true);
        }
        RandomWalker.prototype.step = function () {
            var direction = Math.floor(Math.random() * 4);
            var x = 0;
            var y = 0;
            if (direction === 0) {
                x = 1;
            }
            else if (direction === 1) {
                x = -1;
            }
            else if (direction === 2) {
                y = 1;
            }
            else if (direction === 3) {
                y = -1;
            }
            this.location.x += x;
            this.location.y += y;
            if (this.location.x >= this.width)
                this.location.x -= 2;
            if (this.location.x <= 0)
                this.location.x += 2;
            if (this.location.y >= this.height)
                this.location.y -= 2;
            if (this.location.y <= 0)
                this.location.y += 2;
            this.toggleState(this.location);
            return this.location;
        };
        RandomWalker.prototype.renderPoint = function (location, ctx) {
            if (!this.path[location.y])
                this.path[location.y] = [];
            if (this.path[location.y][location.x]) {
                ctx.fillStyle = this.onColour;
            }
            else {
                ctx.fillStyle = this.offColour;
            }
            ctx.fillRect(location.x, location.y, 1, 1);
        };
        RandomWalker.prototype.getState = function (location) {
            if (!this.path[location.y])
                this.path[location.y] = [];
            return this.path[location.y][location.x];
        };
        RandomWalker.prototype.toggleState = function (location) {
            if (!this.path[location.y])
                this.path[location.y] = [];
            return this.path[location.y][location.x] = !this.path[location.y][location.x];
        };
        RandomWalker.prototype.setState = function (location, state) {
            if (!this.path[location.y])
                this.path[location.y] = [];
            return this.path[location.y][location.x] = state;
        };
        return RandomWalker;
    }());
    Graphics.RandomWalker = RandomWalker;
})(Graphics || (Graphics = {}));
//# sourceMappingURL=graphics.js.map