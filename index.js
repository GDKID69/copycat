const Plugin = require("powercord/entities/Plugin");
const { getModule } = require("powercord/webpack");
const autoChatInput = (text) => getModule(["ComponentDispatch"], false).ComponentDispatch.dispatchToLastSubscribed("INSERT_TEXT", {
    content: text
})

const settings = require("./Settings");

module.exports = class HastePaste extends Plugin {
    entityID = "haste-paste"

    keyup(event) {
        if (
               event.key == "F12"
            || event.key == "F11"
            || event.key == "F10"
            || event.key == "F9"
            || event.key == "F8"
            || event.key == "F7"
            || event.key == "F6"
            || event.key == "F5"
            || event.key == "F4"
            || event.key == "F3"
            || event.key == "F2"
        ) {
            autoChatInput(this.settings.get(event.key, ""));
        }
    }

    startPlugin() {
        powercord.api.settings.registerSettings(
            this.entityID,
            {
                category: this.entityID,
                label: "Haste Paste",
                render: settings
            }
        );

        document.body.addEventListener("keyup", this.keyup.bind(this));
    }

    pluginWillUnload() {
        powercord.api.settings.unregisterSettings(this.entityID);
        document.body.removeEventListener("keyup", this.keyup);
    }
}