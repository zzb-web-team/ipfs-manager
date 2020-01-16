import { setactionlog } from "../../../src/servers/api";
import VueCookies from 'vue-cookies'

export default {
    //导出反馈
    fanactionlog(act, des, state, before, after) {
        let parmas = new Object();
        parmas.action = act;
        parmas.description = des;
        if (before) {
            parmas.beforevalue = before;
        } else {
            parmas.beforevalue = "-";
        }
        if (after) {
            parmas.aftervalue = after;
        } else {
            parmas.aftervalue = "-";
        }
        parmas.status = state;
        parmas.utype = "ipfs";
        // console.log(VueCookies)
        parmas.id = VueCookies.get("ipfs_id");
        parmas.name = VueCookies.get("ipfs_user");
        setactionlog(parmas)
            .then()
            .catch();
    },
}