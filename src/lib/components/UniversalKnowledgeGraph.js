import React, { useEffect, useState } from "react";
import { nested_to_graph } from "./Helper";
import Graph from "./Graph";


export default function UniversalKnowledgeGraph({ apiData,nodeName="concept_name",nodeDesc="concept_description" }) {
  const [graphData, setGraphData] = useState([]);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    // setGraphData(nested_to_graph(apiData));
    if(apiData===undefined ||apiData===null || apiData.length===0)
    console.log('NO DATA')

    else
    setGraphData(nested_to_graph(apiData,nodeName,nodeDesc));
  }, [apiData]);

  return (
    <div>
        {/* <h3><b>Response</b></h3> */}
            <Graph data={graphData} />
    </div>
  );
}
