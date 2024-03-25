const fs = require('fs/promises')
const path = require('path')
const contactsPath = path.join(__dirname, './db/contacts.json')
const {nanoid} = require('nanoid')


async function listContacts() {
  const data = await fs.readFile(contactsPath)
  const arr = data.toString()
  return JSON.parse(arr)
}

async function getContactById(contactId) {
  const contatcs = await listContacts()
  const result = contatcs.find(item => item.id === contactId)
  return result || null
}

async function removeContact(contactId) {
  const contacts = await listContacts()
  const index = contacts.findIndex(item => item.id === contactId)
  if (index === -1) {
    return null
  }
  const result = contacts.splice(index, 1)
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
  return result
}

async function addContact(data) {
  const contacts = await listContacts()
  const newContact = {
    id: nanoid(),
    ...data
  }
    contacts.push(newContact)
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
  return newContact
}


module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact
}