import wwObject from './wwObjectText.vue'

const name = "ww-text";
const wwEnableMetrics = false;

const addComponent = function () {
    if (window.vm) {

        wwLib.wwObject.register({
            content: {
                type: name,
                data: {
                    text: {
                        fr_FR: "Nouveau texte"
                    },
                    tag: "div", //h1, quote, code, ...
                    align: "",
                    font: "",
                    size: "",
                    color: "",
                    classes: [],
                    children: []
                }
            },
            enableMetrics: wwEnableMetrics,
            /* wwManager:start */
            cmsOptions: {
            }
            /* wwManager:end */
        });

        window.vm.addComponent(name, wwObject);

        return true;
    }
    return false;
}

if (!addComponent()) {
    const iniInterval = setInterval(function () {
        if (addComponent()) {
            clearInterval(iniInterval);
        }
    }, 10);
}