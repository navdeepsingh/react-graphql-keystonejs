export const typeDefs = `
type Category {
   id: ID!                # "!" denotes a required field
   name: String
}
# This type specifies the entry points into our API. In this case
# there is only one - "channels" - which returns a list of channels.
type Query {
   categories: [Category]    # "[]" means this is a list of channels
}
`;
