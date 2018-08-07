import Projects from './projects';
import Videos from '../videos/videos';

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
    'projects/add',
    { authRequired: false },
    {
      post: function() {
        const { userId, projectName } = this.request.query;

        return !!Projects.insert({ userId, projectName });
      },
    }
  );

  API.addRoute(
    'projects/:projectId',
    { authRequired: false },
    {
      get: function() {
        const project = Projects.findOne({ _id: this.urlParams.projectId });

        return {
          status: 'success',
          data: projects,
        };
      },

      patch: function() {
        const formData = this.request.query;
        const updateAction = Projects.update({ _id: this.urlParams.projectId }, {
          $set: {
            ...formData
          }
        });

        return Boolean(updateAction);
      },

      delete: {
        roleRequired: [],
        action: function() {
          return !!Projects.remove({_id: this.urlParams.projectId});
        }
      }

    }
  );

  API.addRoute(
    'projects/:projectId/videos',
    { authRequired: false },
    {
      get: function() {
        const videos = Videos.find({
          projectId: this.urlParams.projectId,
        }).fetch();

        return {
          status: 'success',
          data: videos,
        };
      }
    }
  );
}
