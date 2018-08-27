import validator from 'validator';

import Projects from '../projects/projects';
import Videos from '../videos/videos';

export default function(API) {
  API.addRoute(
    'register',
    { authRequired: false },
    {
      post: function() {
        // Get params
        const { email, password, username } = this.request.body;

        // Check null fields
        if (!email | !password || !username) {
          return {
            status: 'error',
            message: 'Please fill out all fields',
          };
        }

        // Check invalid email format
        if (!validator.isEmail(email)) {
          return {
            status: 'error',
            message: `Wrong e-mail format for ${email}`,
          };
        }

        // Check for existing username
        const isExisting = Meteor.users.findOne({ username });

        if (isExisting) {
          return {
            status: 'error',
            message: `Username already exists`,
          };
        }

        try {
          const user = Accounts.createUser({
            email,
            password,
            username,
            profile: {},
          });

          return {
            status: 'success',
            userId: user,
            email,
            username,
          };
        } catch (err) {
          return {
            status: 'error',
            message: err.reason,
          };
        }
      },
    }
  );

  API.addRoute(
    'check-token',
    { authRequired: false },
    {
      post: function() {
        // Get params
        const { authToken, userId } = this.request.body;

        // Check null fields
        if (!authToken || !userId) {
          return {
            status: 'error',
            message: 'Error authorizing this user',
          };
        }

        // Check for existing username
        const isExisting = Meteor.users.findOne({ _id: userId, 'services.resume.loginTokens.hashedToken': Accounts._hashLoginToken(authToken) });

        return Boolean(isExisting);
      },
    }
  );
}
