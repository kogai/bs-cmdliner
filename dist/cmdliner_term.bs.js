// Generated by BUCKLESCRIPT VERSION 2.2.2, PLEASE EDIT WITH CARE
'use strict';

var Block = require("bs-platform/lib/js/block.js");
var Curry = require("bs-platform/lib/js/curry.js");
var Cmdliner_info = require("./cmdliner_info.bs.js");

function $$const(v) {
  return /* tuple */[
          Cmdliner_info.Args[/* empty */0],
          (function (_, _$1) {
              return /* Ok */Block.__(0, [v]);
            })
        ];
}

function app(param, param$1) {
  var v = param$1[1];
  var f = param[1];
  return /* tuple */[
          Curry._2(Cmdliner_info.Args[/* union */6], param[0], param$1[0]),
          (function (ei, cl) {
              var e = Curry._2(f, ei, cl);
              if (e.tag) {
                return e;
              } else {
                var e$1 = Curry._2(v, ei, cl);
                if (e$1.tag) {
                  return e$1;
                } else {
                  return /* Ok */Block.__(0, [Curry._1(e[0], e$1[0])]);
                }
              }
            })
        ];
}

exports.$$const = $$const;
exports.app = app;
/* Cmdliner_info Not a pure module */
