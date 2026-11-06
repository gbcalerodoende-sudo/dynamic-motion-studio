import React from "react";
import {createRoot} from "react-dom/client";
import {StudioApp} from "./studio/StudioApp";
import "./studio/studio.css";
const root=document.getElementById("root");if(!root)throw new Error("App root missing");createRoot(root).render(<React.StrictMode><StudioApp/></React.StrictMode>);
