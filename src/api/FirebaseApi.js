import Api from "@/Api";
import { fireBaseUrl } from "@/consts";

export default class FirebaseApi extends Api {
  constructor() {
    super();
    this.dataTableUrl = `${fireBaseUrl}data-table.json`;
  }
  fetchTable = (url = this.dataTableUrl) => {
    return this.get(url);
  };
  putTable = body => {
    return this.put(this.dataTableUrl, body);
  };
}
