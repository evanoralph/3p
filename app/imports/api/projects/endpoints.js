import Projects from './projects';

export default function(API) {
  API.addRoute(
    'projects/',
    { authRequired: false },
    {
      get: function() {
        const projects = Projects.find({}).fetch();

        return {
          status: 'success',
          data: projects,
        };
      },
    }
  );

  API.addRoute(
    'projects/:userId',
    { authRequired: false },
    {
      get: function() {
        const projects = Projects.find({ userId: this.urlParams.userId }).fetch();

        return {
          status: 'success',
          data: projects,
        };
      },
    }
  );

  API.addRoute(
    'projects/:userId/:projectId',
    { authRequired: false },
    {
      get: function() {
        const project = Projects.findOne({
          _id: this.urlParams.projectId,
          userId: this.urlParams.userId,
        });

        return {
          status: 'success',
          data: project,
        };
      },

      patch: function() {
        const formData = this.request.query;
        const updateAction = Projects.update({ _id: this.urlParams.projectId }, {
          $set: {
            ...formData
          }
        });

        if (updateAction) {
          return true;
        } else {
          return false;
        }
      },

      delete: {
        roleRequired: [],
        action: function() {
          if (Projects.remove({ _id: this.urlParams.projectId })) {
            return true;
          }
          return false;
        }
      }
    }
  );
}
