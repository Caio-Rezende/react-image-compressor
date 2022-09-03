import moment from "moment";

export class FileNaming {
  constructor(name, attributes = []) {
    this.name = name;
    this.path = moment().format("YYYY/MM/DD/HH/mm/SSS");
    attributes.forEach((attr) => {
      this[attr] = `${attr}/${this.path}/${name}`;
    });
  }
}
