class Model {
  constructor(id, object, created, owned_by, permission, root, parent) {
    this.id = id;
    this.object = object;
    this.created = created;
    this.owned_by = owned_by;
    this.permission = permission;
    this.root = root;
    this.parent = parent;
  }
}

module.exports = { Model };
