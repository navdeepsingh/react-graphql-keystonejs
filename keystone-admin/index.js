const { Keystone } = require('@keystonejs/keystone');
const { PasswordAuthStrategy } = require('@keystonejs/auth-password');
const { LocalFileAdapter } = require('@keystonejs/file-adapters');
const { Text, Number, Checkbox, Password, Relationship, File } = require('@keystonejs/fields');
const { GraphQLApp } = require('@keystonejs/app-graphql');
const { AdminUIApp } = require('@keystonejs/app-admin-ui');
const express = require('express');
//const initialiseData = require('./initial-data');


const { MongooseAdapter: Adapter } = require('@keystonejs/adapter-mongoose');

const fileAdapter = new LocalFileAdapter({ src: './files', path: '/files' });

const PROJECT_NAME = "CMS";




const keystone = new Keystone({
  name: PROJECT_NAME,
  adapter: new Adapter()
});

// Access control functions
const userIsAdmin = ({ authentication: { item: user } }) => Boolean(user && user.isAdmin);
const userOwnsItem = ({ authentication: { item: user } }) => {
  if (!user) {
    return false;
  }
  return { id: user.id };
};

const userIsAdminOrOwner = auth => {
  const isAdmin = access.userIsAdmin(auth);
  const isOwner = access.userOwnsItem(auth);
  return isAdmin ? isAdmin : isOwner;
};

const access = { userIsAdmin, userOwnsItem, userIsAdminOrOwner };


// Lists Defined
keystone.createList('User', {
  fields: {
    name: { type: Text },
    email: {
      type: Text,
      isUnique: true,
    },
    isAdmin: {
      type: Checkbox,
      // Field-level access controls
      // Here, we set more restrictive field access so a non-admin cannot make themselves admin.
      access: {
        update: access.userIsAdmin,
      },
    },
    password: {
      type: Password,
    },
  },
  // List-level access controls
  access: {
    read: access.userIsAdminOrOwner,
    update: access.userIsAdminOrOwner,
    create: access.userIsAdmin,
    delete: access.userIsAdmin,
    auth: true,
  },
});
keystone.createList('Signup', {
  fields: {
    name: { type: Text },
    email: {
      type: Text,
      isUnique: true,
    },
    mobile: {
      type: Text
    }
  },
  access: {
    read: access.userIsAdminOrOwner,
    create: true,
    auth: true
  }
});

keystone.createList('Category', {
  fields: {
    name: { type: Text, isRequired: true }
  }
});

keystone.createList('Merchant', {
  fields: {
    name: { type: Text, isRequired: true },
    category: { type: Relationship, ref: 'Category' },
    productList: { type: Relationship, ref: 'Product', many: true }
  }
});

keystone.createList('Product', {
  fields: {
    name: { type: Text, isRequired: true },
    image: {
      type: File,
      adapter: fileAdapter,
      hooks: {
        beforeChange: async ({ existingItem }) => {
          if (existingItem && existingItem.file) {
            await fileAdapter.delete(existingItem.file);
          }
        },
      }, isRequired: true
    },
    quantity: { type: Text, isRequired: true }
  },
  hooks: {
    afterDelete: async ({ existingItem }) => {
      if (existingItem.file) {
        await fileAdapter.delete(existingItem.file);
      }
    },
  },
});

const authStrategy = keystone.createAuthStrategy({
  type: PasswordAuthStrategy,
  list: 'User',
});

module.exports = {
  keystone,
  apps: [
    new GraphQLApp(),
    new AdminUIApp({
      enableDefaultRoute: true,
      authStrategy,
    }),
  ],
  configureExpress: app => {
    app.set('trust proxy', 1);
    app.use('/files', express.static('files'));
  }
};
