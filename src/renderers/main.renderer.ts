import { ipcRenderer } from "electron";
import { AppView } from "../model/app-view.model";
import * as documentHelper from "../services/htmldocument.service";

ipcRenderer.on("appViews", renderViews);

function switchView(viewName: string): void {
    ipcRenderer.send("switch-view", viewName);
}

function renderViews(event: any, appViews: AppView[]): void {
    documentHelper.getElementById("app-menu").innerHTML = "";
    for (const view of appViews) {
        const btnName = "btn-" + view.viewName;
        documentHelper.getElementById("app-menu").innerHTML +=
        "<li class='nav-item  my-2'>" +
            "<button id=" + btnName +
                " class='btn btn-circle'" +
                "style='background-image: url(\"" + view.icon + "\") !important'>" +
            "</button>" +
        "</li>";
    }
    for (const view of appViews) {
        const btnName = "btn-" + view.viewName;
        documentHelper.getElementById(btnName).onclick  = () => { switchView(view.viewName); };
    }
}