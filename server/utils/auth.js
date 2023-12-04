const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');

const secret = '[...cheeks]';
const expiration = '6h';

module.exports = {
  AuthenticationError: new GraphQLError('Could not authenticate user.', {
    extensions: {
      code: 'UNAUTHENTICATED',
    },
  }),

  authMiddleware: function ({ req }) {
    let token = req.headers.authorization;

    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    if (!token) {
      return req;
    }

    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        console.log('Token expired');
        res.status(401).send({ message: 'Token expired. Please login again.' });
      } else {
        console.log('Invalid token');
      }
    }
    // console.log(token);
    return req;
  },

  signToken: function ({ email, username, _id }) {
    const payload = { email, username, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },

  resetPasswordToken: function ({ email, token }) {
    const payload = { email, token };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
