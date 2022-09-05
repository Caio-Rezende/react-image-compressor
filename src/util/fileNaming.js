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

export class FileNamingNoPath {
  constructor(name, attributes = []) {
    this.name = name;
    attributes.forEach((attr) => {
      this[attr] = `public/${attr}/${name}`;
    });
  }
}
