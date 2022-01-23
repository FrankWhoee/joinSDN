"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

anime({
  targets: '.arrow',
  translateY: 10,
  direction: 'alternate',
  loop: true,
  easing: 'easeInOutSine'
});
var example_list = [{
  name: "SDN KazzaZoo#001",
  date: "June 9th, 2019"
}, {
  name: "SDN SilverZala#002",
  date: "June 9th, 2019"
}, {
  name: "SDN TheFlash1205#003",
  date: "June 9th, 2019"
}, {
  name: "SDN TreeRacks#004",
  date: "June 9th, 2019"
}, {
  name: "SDN FrankWhoee#005",
  date: "March 6th, 2020"
}, {
  name: "SDN Oblivious#006",
  date: "April 16th, 2019"
}, {
  name: "SDN SnazzyTurtles#007",
  date: "December 29th, 2021"
}];

var PlayerList = /*#__PURE__*/function (_React$Component) {
  _inherits(PlayerList, _React$Component);

  var _super = _createSuper(PlayerList);

  function PlayerList(props) {
    _classCallCheck(this, PlayerList);

    return _super.call(this, props); // this.state = { liked: false };
  }

  _createClass(PlayerList, [{
    key: "render",
    value: function render() {
      var rows = [];
      this.props.players.forEach(function (player) {
        var jtime = new Date(player.time_joined);
        rows.push( /*#__PURE__*/React.createElement(PlayerListRow, {
          name: player.name + "#" + player.tag,
          date: dateFormat(jtime, "mmm dd, yyyy")
        }));
        rows.push( /*#__PURE__*/React.createElement("hr", {
          "class": "shorterhr"
        }));
      });
      return /*#__PURE__*/React.createElement("div", {
        className: "container  text-center playerbox"
      }, rows);
    }
  }]);

  return PlayerList;
}(React.Component);

var PlayerListRow = /*#__PURE__*/function (_React$Component2) {
  _inherits(PlayerListRow, _React$Component2);

  var _super2 = _createSuper(PlayerListRow);

  function PlayerListRow() {
    _classCallCheck(this, PlayerListRow);

    return _super2.apply(this, arguments);
  }

  _createClass(PlayerListRow, [{
    key: "render",
    value: function render() {
      var name = this.props.name;
      var date = this.props.date;
      return /*#__PURE__*/React.createElement("div", {
        className: "row justify-content-center py-3"
      }, /*#__PURE__*/React.createElement("div", {
        className: "col-sm-4 gray"
      }, " ", name, " "), /*#__PURE__*/React.createElement("div", {
        className: "col-sm-4 gray"
      }, date));
    }
  }]);

  return PlayerListRow;
}(React.Component);

function refreshAndRender() {
  fetch("/players").then(function (response) {
    return response.json();
  }).then(function (data) {
    ReactDOM.render( /*#__PURE__*/React.createElement(PlayerList, {
      players: data
    }), document.getElementById("playerlist"));
  });
}

refreshAndRender();

