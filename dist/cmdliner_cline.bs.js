// Generated by BUCKLESCRIPT VERSION 2.2.2, PLEASE EDIT WITH CARE
'use strict';

var $$Map = require("bs-platform/lib/js/map.js");
var List = require("bs-platform/lib/js/list.js");
var Block = require("bs-platform/lib/js/block.js");
var Curry = require("bs-platform/lib/js/curry.js");
var Printf = require("bs-platform/lib/js/printf.js");
var $$String = require("bs-platform/lib/js/string.js");
var Caml_obj = require("bs-platform/lib/js/caml_obj.js");
var Pervasives = require("bs-platform/lib/js/pervasives.js");
var Caml_string = require("bs-platform/lib/js/caml_string.js");
var Cmdliner_msg = require("./cmdliner_msg.bs.js");
var Cmdliner_base = require("./cmdliner_base.bs.js");
var Cmdliner_info = require("./cmdliner_info.bs.js");
var Cmdliner_trie = require("./cmdliner_trie.bs.js");
var Cmdliner_suggest = require("./cmdliner_suggest.bs.js");
var Caml_builtin_exceptions = require("bs-platform/lib/js/caml_builtin_exceptions.js");

function err_multi_opt_name_def(name, a, a$prime) {
  return Cmdliner_base.err_multi_def("option name", name, Cmdliner_info.arg_doc, a, a$prime);
}

var Amap = $$Map.Make(Cmdliner_info.Arg);

function get_arg(cl, a) {
  try {
    return Curry._2(Amap[/* find */21], a, cl);
  }
  catch (exn){
    if (exn === Caml_builtin_exceptions.not_found) {
      throw [
            Caml_builtin_exceptions.assert_failure,
            [
              "cmdliner_cline.ml",
              29,
              56
            ]
          ];
    } else {
      throw exn;
    }
  }
}

function opt_arg(cl, a) {
  var match = get_arg(cl, a);
  if (match.tag) {
    throw [
          Caml_builtin_exceptions.assert_failure,
          [
            "cmdliner_cline.ml",
            30,
            59
          ]
        ];
  } else {
    return match[0];
  }
}

function pos_arg(cl, a) {
  var match = get_arg(cl, a);
  if (match.tag) {
    return match[0];
  } else {
    throw [
          Caml_builtin_exceptions.assert_failure,
          [
            "cmdliner_cline.ml",
            31,
            59
          ]
        ];
  }
}

function arg_info_indexes(args) {
  var _optidx = Cmdliner_trie.empty;
  var _posidx = /* [] */0;
  var _cl = Amap[/* empty */0];
  var _param = Curry._1(Cmdliner_info.Args[/* elements */19], args);
  while(true) {
    var param = _param;
    var cl = _cl;
    var posidx = _posidx;
    var optidx = _optidx;
    if (param) {
      var l = param[1];
      var a = param[0];
      var match = Cmdliner_info.arg_is_pos(a);
      if (match !== 0) {
        _param = l;
        _cl = Curry._3(Amap[/* add */3], a, /* P */Block.__(1, [/* [] */0]), cl);
        _posidx = /* :: */[
          a,
          posidx
        ];
        continue ;
        
      } else {
        var add = (function(a){
        return function add(t, name) {
          var match = Cmdliner_trie.add(t, name, a);
          if (match[0] >= 3901504) {
            return match[1];
          } else {
            return Pervasives.invalid_arg(err_multi_opt_name_def(name, a, match[1][0]));
          }
        }
        }(a));
        var names = Cmdliner_info.arg_opt_names(a);
        var optidx$1 = List.fold_left(add, optidx, names);
        _param = l;
        _cl = Curry._3(Amap[/* add */3], a, /* O */Block.__(0, [/* [] */0]), cl);
        _optidx = optidx$1;
        continue ;
        
      }
    } else {
      return /* tuple */[
              optidx,
              posidx,
              cl
            ];
    }
  };
}

function is_opt(s) {
  if (s.length > 1) {
    return +(Caml_string.get(s, 0) === /* "-" */45);
  } else {
    return /* false */0;
  }
}

function is_short_opt(s) {
  if (s.length === 2) {
    return +(Caml_string.get(s, 0) === /* "-" */45);
  } else {
    return /* false */0;
  }
}

function parse_opt_arg(s) {
  var l = s.length;
  if (Caml_string.get(s, 1) !== /* "-" */45) {
    if (l === 2) {
      return /* tuple */[
              s,
              /* None */0
            ];
    } else {
      return /* tuple */[
              $$String.sub(s, 0, 2),
              /* Some */[$$String.sub(s, 2, l - 2 | 0)]
            ];
    }
  } else {
    try {
      var i = $$String.index(s, /* "=" */61);
      return /* tuple */[
              $$String.sub(s, 0, i),
              /* Some */[$$String.sub(s, i + 1 | 0, (l - i | 0) - 1 | 0)]
            ];
    }
    catch (exn){
      if (exn === Caml_builtin_exceptions.not_found) {
        return /* tuple */[
                s,
                /* None */0
              ];
      } else {
        throw exn;
      }
    }
  }
}

function hint_matching_opt(optidx, s) {
  if (s.length <= 2) {
    return /* [] */0;
  } else {
    var match = Caml_string.get(s, 1) !== /* "-" */45 ? /* tuple */[
        s,
        Curry._1(Printf.sprintf(/* Format */[
                  /* Char_literal */Block.__(12, [
                      /* "-" */45,
                      /* String */Block.__(2, [
                          /* No_padding */0,
                          /* End_of_format */0
                        ])
                    ]),
                  "-%s"
                ]), s)
      ] : /* tuple */[
        $$String.sub(s, 1, s.length - 1 | 0),
        s
      ];
    var match$1 = parse_opt_arg(match[0]);
    var short_opt = match$1[0];
    var match$2 = parse_opt_arg(match[1]);
    var all = Cmdliner_trie.ambiguities(optidx, "-");
    var match$3 = List.mem(short_opt, all);
    var match$4 = Cmdliner_suggest.value(match$2[0], all);
    if (match$3 !== 0) {
      if (match$4) {
        if (List.mem(short_opt, match$4)) {
          return match$4;
        } else {
          return /* :: */[
                  short_opt,
                  match$4
                ];
        }
      } else {
        return /* :: */[
                short_opt,
                /* [] */0
              ];
      }
    } else if (match$4) {
      return match$4;
    } else {
      return /* [] */0;
    }
  }
}

function parse_opt_args(peek_opts, optidx, cl, args) {
  var loop = function (_errs, _k, _cl, _pargs, _param) {
    while(true) {
      var param = _param;
      var pargs = _pargs;
      var cl = _cl;
      var k = _k;
      var errs = _errs;
      if (param) {
        var s = param[0];
        if (s === "--") {
          return /* tuple */[
                  List.rev(errs),
                  cl,
                  List.rev_append(pargs, param[1])
                ];
        } else {
          var args = param[1];
          if (is_opt(s)) {
            var match = parse_opt_arg(s);
            var value = match[1];
            var name = match[0];
            var match$1 = Cmdliner_trie.find(optidx, name);
            if (typeof match$1 === "number") {
              if (match$1 >= -328798100) {
                var ambs = Cmdliner_trie.ambiguities(optidx, name);
                var ambs$1 = List.sort(Caml_obj.caml_compare, ambs);
                var err = Cmdliner_base.err_ambiguous("option", name, ambs$1);
                _param = args;
                _k = k + 1 | 0;
                _errs = /* :: */[
                  err,
                  errs
                ];
                continue ;
                
              } else if (peek_opts) {
                _param = args;
                _k = k + 1 | 0;
                continue ;
                
              } else {
                var hints = hint_matching_opt(optidx, s);
                var err$1 = Cmdliner_base.err_unknown(/* Some */[hints], "option", name);
                _param = args;
                _k = k + 1 | 0;
                _errs = /* :: */[
                  err$1,
                  errs
                ];
                continue ;
                
              }
            } else {
              var a = match$1[1];
              var match$2 = Cmdliner_info.arg_opt_kind(a);
              var match$3;
              if (value) {
                match$3 = typeof match$2 === "number" ? (
                    match$2 !== 0 ? /* tuple */[
                        value,
                        args
                      ] : (
                        is_short_opt(name) ? /* tuple */[
                            /* None */0,
                            /* :: */[
                              "-" + value[0],
                              args
                            ]
                          ] : /* tuple */[
                            value,
                            args
                          ]
                      )
                  ) : /* tuple */[
                    value,
                    args
                  ];
              } else {
                var exit = 0;
                if (typeof match$2 === "number" && match$2 === 0) {
                  match$3 = /* tuple */[
                    value,
                    args
                  ];
                } else {
                  exit = 1;
                }
                if (exit === 1) {
                  if (args) {
                    var v = args[0];
                    match$3 = is_opt(v) ? /* tuple */[
                        /* None */0,
                        args
                      ] : /* tuple */[
                        /* Some */[v],
                        args[1]
                      ];
                  } else {
                    match$3 = /* tuple */[
                      /* None */0,
                      args
                    ];
                  }
                }
                
              }
              var arg = /* O */Block.__(0, [/* :: */[
                    /* tuple */[
                      k,
                      name,
                      match$3[0]
                    ],
                    opt_arg(cl, a)
                  ]]);
              _param = match$3[1];
              _cl = Curry._3(Amap[/* add */3], a, arg, cl);
              _k = k + 1 | 0;
              continue ;
              
            }
          } else {
            _param = args;
            _pargs = /* :: */[
              s,
              pargs
            ];
            _k = k + 1 | 0;
            continue ;
            
          }
        }
      } else {
        return /* tuple */[
                List.rev(errs),
                cl,
                List.rev(pargs)
              ];
      }
    };
  };
  var match = loop(/* [] */0, 0, cl, /* [] */0, args);
  var pargs = match[2];
  var cl$1 = match[1];
  var errs = match[0];
  if (errs) {
    var err = $$String.concat("\n", errs);
    return /* Error */Block.__(1, [/* tuple */[
                err,
                cl$1,
                pargs
              ]]);
  } else {
    return /* Ok */Block.__(0, [/* tuple */[
                cl$1,
                pargs
              ]]);
  }
}

function take_range(start, stop, l) {
  var _i = 0;
  var _acc = /* [] */0;
  var _param = l;
  while(true) {
    var param = _param;
    var acc = _acc;
    var i = _i;
    if (param) {
      var vs = param[1];
      if (i < start) {
        _param = vs;
        _i = i + 1 | 0;
        continue ;
        
      } else if (i <= stop) {
        _param = vs;
        _acc = /* :: */[
          param[0],
          acc
        ];
        _i = i + 1 | 0;
        continue ;
        
      } else {
        return List.rev(acc);
      }
    } else {
      return List.rev(acc);
    }
  };
}

function create($staropt$star, al, args) {
  var peek_opts = $staropt$star ? $staropt$star[0] : /* false */0;
  var match = arg_info_indexes(al);
  var match$1 = parse_opt_args(peek_opts, match[0], match[2], args);
  if (match$1.tag) {
    var match$2 = match$1[0];
    return /* Error */Block.__(1, [/* tuple */[
                match$2[0],
                match$2[1]
              ]]);
  } else {
    var match$3 = match$1[0];
    var cl = match$3[0];
    if (peek_opts) {
      return /* Ok */Block.__(0, [cl]);
    } else {
      var posidx = match[1];
      var cl$1 = cl;
      var pargs = match$3[1];
      if (pargs) {
        var last = List.length(pargs) - 1 | 0;
        var pos = function (rev, k) {
          if (rev) {
            return last - k | 0;
          } else {
            return k;
          }
        };
        var loop = function (_misses, _cl, _max_spec, _param) {
          while(true) {
            var param = _param;
            var max_spec = _max_spec;
            var cl = _cl;
            var misses = _misses;
            if (param) {
              var a = param[0];
              var apos = Cmdliner_info.arg_pos(a);
              var rev = Cmdliner_info.pos_rev(apos);
              var start = pos(rev, Cmdliner_info.pos_start(apos));
              var match = Cmdliner_info.pos_len(apos);
              var stop = match ? pos(rev, (Cmdliner_info.pos_start(apos) + match[0] | 0) - 1 | 0) : pos(rev, last);
              var match$1 = rev ? /* tuple */[
                  stop,
                  start
                ] : /* tuple */[
                  start,
                  stop
                ];
              var stop$1 = match$1[1];
              var args = take_range(match$1[0], stop$1, pargs);
              var max_spec$1 = stop$1 > max_spec ? stop$1 : max_spec;
              var cl$1 = Curry._3(Amap[/* add */3], a, /* P */Block.__(1, [args]), cl);
              var match$2 = Cmdliner_info.arg_is_req(a) && +(args === /* [] */0);
              var misses$1 = match$2 !== 0 ? /* :: */[
                  a,
                  misses
                ] : misses;
              _param = param[1];
              _max_spec = max_spec$1;
              _cl = cl$1;
              _misses = misses$1;
              continue ;
              
            } else {
              return /* tuple */[
                      misses,
                      cl,
                      max_spec
                    ];
            }
          };
        };
        var match$4 = loop(/* [] */0, cl$1, -1, posidx);
        var max_spec = match$4[2];
        var cl$2 = match$4[1];
        var misses = match$4[0];
        if (misses !== /* [] */0) {
          return /* Error */Block.__(1, [/* tuple */[
                      Cmdliner_msg.err_pos_misses(misses),
                      cl$2
                    ]]);
        } else if (last <= max_spec) {
          return /* Ok */Block.__(0, [cl$2]);
        } else {
          var excess = take_range(max_spec + 1 | 0, last, pargs);
          return /* Error */Block.__(1, [/* tuple */[
                      Cmdliner_msg.err_pos_excess(excess),
                      cl$2
                    ]]);
        }
      } else {
        var misses$1 = List.filter(Cmdliner_info.arg_is_req)(posidx);
        if (misses$1) {
          return /* Error */Block.__(1, [/* tuple */[
                      Cmdliner_msg.err_pos_misses(misses$1),
                      cl$1
                    ]]);
        } else {
          return /* Ok */Block.__(0, [cl$1]);
        }
      }
    }
  }
}

exports.create = create;
exports.opt_arg = opt_arg;
exports.pos_arg = pos_arg;
/* Amap Not a pure module */
