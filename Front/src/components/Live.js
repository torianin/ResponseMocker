import React, { useEffect, useState, useRef } from "react";

export default function Live() {
  const [isPaused, setPause] = useState(false);
  const [paths, setPaths] = useState([]);
  const ws = useRef(null);

  useEffect(() => {
    ws.current = new WebSocket(process.env.BASE_SOCKET_URL + "/live");
    ws.current.onopen = () => console.log("Websockets opened");
    ws.current.onclose = () => console.log("Websockets closed");

    return () => {
      ws.current.close();
    };
  }, []);

  useEffect(() => {
    if (!ws.current) return;

    ws.current.onmessage = (e) => {
      if (isPaused) return;
      setPaths(paths  => ([e.data, ...paths]));
    };
  }, [isPaused]);

  const create = () => ({

  })

  return (
    <div>
      <div className="row p-3">
        <button
          className="btn btn-danger ml-1"
          onClick={() => setPause(!isPaused)}
        >
          {isPaused ? "Resume" : "Pause"}
        </button>
        {paths.map((path) => 
            <div className="card w-100 my-3">
                <div className="card-body">{path}</div>
            </div>
        )}
      </div>
    </div>
  );
}
