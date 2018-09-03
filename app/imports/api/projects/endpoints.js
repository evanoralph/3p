import Projects from './projects';
import Videos from '../videos/videos';

export default function(API) {
  API.addRoute(
    'projects/',
    { authRequired: true },
    {
      get: function() {
        const userId = this.request.headers['x-user-id'];
        const projects = Projects.find({ userId }).fetch();
        const data = projects.reduce((projectArray, project) => {
          let videos = Videos.find({ projectId: project._id }).fetch();
          videos = videos.map(v => {
            return {
              image: v.thumbnail,
              id: v._id
            }
          });

          projectArray.push({
            ...project,
            videos
          })


          return projectArray;
        }, []);

        return {
          status: 'success',
          data,
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
        const projects = Projects.findOne({ _id: this.urlParams.id });

        return {
          status: 'success',
          data: projects,
        };
      },

      patch: function() {
        const formData = this.request.query;
        const updateAction = Projects.update({ _id: this.urlParams.id }, {
          $set: {
            ...formData
          }
        });

        return Boolean(updateAction);
      },

      delete: {
        roleRequired: [],
        action: function() {
          return !!Projects.remove({_id: this.urlParams.id});
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
