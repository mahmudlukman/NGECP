import checkOwner from "./checkOwner.js"

const generatorPermissions = {
  update: {
    roles: ['admin', 'editor'],
    owner: checkOwner
  },
  delete: {
  roles: ['admin', 'editor'],
  owner: checkOwner
  },
}

export default generatorPermissions