const gql = String.raw;

module.exports = gql`
  type User {
    _id: ID
    username: String
    password: String
  }
  
  type Auth {
  token: ID
  user: User
}


  type Query {
    getAllUsers: [User]
    getUser(userId: ID): User
  }

  type Mutation {
    createUser(username: String, password: String): Auth #Still need to create Auth file
  }
`;
