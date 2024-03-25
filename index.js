const { program } = require("commander");
const contacts = require('./contacts') 


program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const allContacts = await contacts.listContacts()
      return console.log(allContacts)
      break;

    case "get":
      const findContact = await contacts.getContactById(id)
      return console.log(findContact)
      break;

    case "add":
      const newContact = await contacts.addContact({name, email, phone})
      return console.log(newContact)
      break;

    case "remove":
      const removeContact = await contacts.removeContact(id)
      return console.log(removeContact)
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}


// invokeAction({action: 'list'});
// invokeAction({action: 'get', id: '1DEXoP8AuCGYc1YgoQ6hw'});
// invokeAction({action: 'add', name: "Alice", email: "alise.mail.com", phone: "595555623"});
// invokeAction({action: 'remove', id: '1DEXoP8AuCGYc1YgoQ6hw'});
