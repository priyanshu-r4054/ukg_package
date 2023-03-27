"use strict";

require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Graph;
require("core-js/modules/web.dom-collections.iterator.js");
var _antd = require("antd");
var _react = _interopRequireWildcard(require("react"));
var _SlideDrawer = _interopRequireDefault(require("./SlideDrawer/SlideDrawer"));
var _Circle = _interopRequireDefault(require("./Node/Circle/Circle"));
var _background = _interopRequireDefault(require("./Asset/background.png"));
require("./Style.css");
var _reaflow = require("reaflow");
var _icons = require("@ant-design/icons");
var _Popup = _interopRequireDefault(require("./Popup/Popup"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function Graph(_ref) {
  let {
    data
  } = _ref;
  const [edges, setEdges] = (0, _react.useState)([]);
  const [nodes, setNodes] = (0, _react.useState)([]);
  const [editable, setEditable] = (0, _react.useState)(false);
  const [openEditPopup, setOpenEditpopup] = (0, _react.useState)(false);
  const [openNodeInfoSidebar, setOpenNodeInfoSidebar] = (0, _react.useState)(false);
  const [zoom, setZoom] = (0, _react.useState)(0.7);
  const [selections, setSelections] = (0, _react.useState)([]);
  const [editHistoryApi, setEditHistoryApi] = (0, _react.useState)([]);
  const [selectedNode, setSelectedNode] = (0, _react.useState)([]);
  const [selectedNodeId, setSelectedNodeId] = (0, _react.useState)(null);
  const ref = (0, _react.useRef)(null);
  (0, _react.useEffect)(() => {
    setEdges(data.edges);
    setNodes(data.nodes);
  }, [data]);
  (0, _react.useEffect)(() => {
    console.log(editHistoryApi);
  }, [editHistoryApi]);
  const {
    undo,
    redo,
    canUndo,
    canRedo,
    history,
    clear,
    count
  } = (0, _reaflow.useUndo)({
    nodes,
    edges,
    onUndoRedo: state => {
      console.log("Undo / Redo", state);
      if (state.type !== "clear") {
        setEdges(state.edges);
        setNodes(state.nodes);
      }
    }
  });
  const addNode = () => {
    setOpenEditpopup(true);
  };
  const setNewNode = e => {
    e.preventDefault();
    let timestamp = Date.now();
    setNodes([...nodes, {
      id: "".concat(timestamp),
      concept_id: timestamp,
      text: "".concat(e.target.text.value),
      desc: "".concat(e.target.desc.value)
    }]);
    setEditHistoryApi(val => {
      return [...val, {
        create_node: {
          //get it from
          concept_id: timestamp,
          text: "".concat(e.target.text.value),
          desc: "".concat(e.target.desc.value)
        }
      }];
    });
    setOpenEditpopup(false);
  };
  const handleNodeClick = event => {
    let data = event.node;
    let nodeData = [["Concept Id", data.concept_id], ["Concept Name", data.concept_name], ["Concept Description", data.concept_desc]];
    setSelectedNodeId(prev => {
      let curr = data.id;
      if (prev !== null) document.getElementById(prev).getElementsByClassName("node-circle")[0].classList.remove("selected-node-color");
      document.getElementById(curr).getElementsByClassName("node-circle")[0].classList.add("selected-node-color");
      return curr;
    });
    setSelectedNode(nodeData);
    setOpenNodeInfoSidebar(true);
  };
  const closeNodeInfoSlider = () => {
    setOpenNodeInfoSidebar(false);
    setSelectedNode(null);
    setSelectedNodeId(prev => {
      let curr = null;
      if (prev !== null) document.getElementById(prev).getElementsByClassName("node-circle")[0].classList.remove("selected-node-color");
      return curr;
    });
  };
  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      padding: "1rem",
      paddingBottom: 0,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/_react.default.createElement(_Popup.default, {
    trigger: openEditPopup,
    setTrigger: setOpenEditpopup
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      margin: "2rem"
    }
  }, /*#__PURE__*/_react.default.createElement("form", {
    onSubmit: setNewNode
  }, /*#__PURE__*/_react.default.createElement(_antd.Input, {
    type: "text",
    placeholder: "name",
    name: "text"
  }), /*#__PURE__*/_react.default.createElement(_antd.Input, {
    type: "text",
    placeholder: "desc",
    name: "desc"
  }), /*#__PURE__*/_react.default.createElement("button", {
    style: {
      marginTop: "1rem"
    },
    type: "submit"
  }, "Create")))), /*#__PURE__*/_react.default.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      marin: "1rem",
      display: "flex"
    }
  }, /*#__PURE__*/_react.default.createElement(_antd.Button, {
    onClick: () => setEditable(val => {
      setSelections([]);
      return !val;
    })
  }, /*#__PURE__*/_react.default.createElement(_icons.EditOutlined, null)), /*#__PURE__*/_react.default.createElement("div", {
    style: editable ? {
      display: "block"
    } : {
      display: "none"
    }
  }, /*#__PURE__*/_react.default.createElement(_antd.Button, {
    disabled: !editable,
    onClick: addNode
  }, "Add Nodes"), /*#__PURE__*/_react.default.createElement(_antd.Button, {
    onClick: undo,
    disabled: !canUndo
  }, "Undo"), /*#__PURE__*/_react.default.createElement(_antd.Button, {
    onClick: redo,
    disabled: !canRedo
  }, "Redo"), /*#__PURE__*/_react.default.createElement(_antd.Button, {
    onClick: () => console.log(history())
  }, "Print history"), /*#__PURE__*/_react.default.createElement(_antd.Button, {
    onClick: () => console.log(count()),
    disabled: !count()
  }, "Print count"), /*#__PURE__*/_react.default.createElement(_antd.Button, {
    onClick: () => clear(nodes, edges)
  }, "Clear history"), " ")), /*#__PURE__*/_react.default.createElement("pre", {
    style: {
      zIndex: 9,
      background: "rgba(0, 0, 0, .5)",
      padding: 10,
      color: "white",
      fontSize: "1.05rem",
      marginBottom: "0.5rem"
    }
  }, "Zoom: ", Math.round(zoom * 100) / 100, /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement(_antd.Button, {
    style: {
      margin: "0.3rem"
    },
    onClick: () => ref.current.zoomIn()
  }, /*#__PURE__*/_react.default.createElement(_icons.ZoomInOutlined, null)), /*#__PURE__*/_react.default.createElement(_antd.Button, {
    style: {
      margin: "0.3rem"
    },
    onClick: () => ref.current.zoomOut()
  }, /*#__PURE__*/_react.default.createElement(_icons.ZoomOutOutlined, null)), /*#__PURE__*/_react.default.createElement(_antd.Button, {
    style: {
      margin: "0.3rem"
    },
    onClick: () => ref.current.fitCanvas(),
    className: "fit-UKG-button"
  }, "Fit"))), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("h3", {
    style: {
      textAlign: "center",
      fontWeight: 700,
      padding: "0.5rem 1rem",
      marginBottom: "0"
    },
    className: "graph-border-text"
  }, editable ? "Edit Mode" : "View Mode"))), /*#__PURE__*/_react.default.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "row-reverse",
      margin: "0 1rem"
    },
    className: "box-shadow"
  }, /*#__PURE__*/_react.default.createElement(_SlideDrawer.default, {
    trigger: openNodeInfoSidebar,
    setTrigger: closeNodeInfoSlider,
    flexBasis: "20%"
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      margin: "1rem"
    }
  }, selectedNode != null ? /*#__PURE__*/_react.default.createElement(_antd.List, {
    header: /*#__PURE__*/_react.default.createElement("h3", null, "Node Information"),
    bordered: true,
    dataSource: selectedNode,
    renderItem: item => /*#__PURE__*/_react.default.createElement(_antd.List.Item, null, /*#__PURE__*/_react.default.createElement("span", {
      style: {
        color: "#1677ff"
      }
    }, item[0]), " :", item[1])
  }) : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null))), /*#__PURE__*/_react.default.createElement("div", {
    style: {
      backgroundImage: "url(".concat(_background.default, ")"),
      marginTop: 0,
      height: "78vh",
      overflow: "hidden",
      flexBasis: openNodeInfoSidebar && "80%",
      transition: "transition: flex-basis 500ms ease-in-out"
    }
  }, /*#__PURE__*/_react.default.createElement(_reaflow.Canvas, {
    className: "canvas-UKG",
    ref: ref,
    fit: true,
    maxWidth: "8000",
    maxHeight: "5000",
    maxZoom: 1.2,
    minZoom: -0.9,
    selections: selections,
    onZoomChange: z => {
      console.log("zooming", z);
      setZoom(z);
    },
    nodes: nodes,
    edges: edges,
    onNodeLink: (_event, from, to) => {
      if (editable) {
        const id = "".concat(from.id, "-").concat(to.id);
        setEdges([...edges, {
          id,
          from: from.id,
          to: to.id
        }]);
        setEditHistoryApi(val => {
          return [...val, {
            create_edge: {
              from: from.concept_id,
              to: to.concept_id
            }
          }];
        });
      }
    },
    onLayoutChange: layout => {
      console.log("Layout", layout);
    }
    //fit canvas
    ,

    edge: _edge => /*#__PURE__*/_react.default.createElement(_reaflow.Edge, _extends({}, _edge, {
      style: {
        stroke: _edge.properties.isRoot ? "#023020" : "#87CEEB"
      },
      onClick: (event, node) => {
        if (editable) setSelections([node.id]);
      },
      onRemove: (event, edge) => {
        console.log("Removing Edge", event, edge);
        setEdges(edges.filter(e => e.id !== edge.id));
        setSelections([]);
        setEditHistoryApi(val => {
          return [...val, {
            delete_edge: {
              from: edge.from,
              to: edge.to
            }
          }];
        });
      }
    })),
    node: _node => /*#__PURE__*/_react.default.createElement(_reaflow.Node, {
      rx: 50,
      ry: 50
      //  {...node}
      // onClick={(event, node) => {
      //   console.log("Selecting Node", event, node);

      //   if (editable) setSelections([node.id]);
      // }}
      // onRemove={(event, node) => {
      //   console.log("Removing Node", event, node);
      //   const result = removeAndUpsertNodes(nodes, edges, node);
      //   setEdges(result.edges);
      //   setNodes(result.nodes);
      //   setSelections([]);
      //   setEditHistoryApi((val)=>{return [...val,{'delete_node':{'concept_id':node.concept_id}}]})
      // }}
    }, event => /*#__PURE__*/_react.default.createElement("foreignObject", {
      height: 100,
      width: 100,
      onClick: () => handleNodeClick(event),
      id: event.node.id
    }, /*#__PURE__*/_react.default.createElement(_Circle.default, {
      text: event.node.concept_name
    })))
  }))));
}