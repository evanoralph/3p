import Videos from '../videos/videos';

const allowedFileTypes = ['mp4', 'mov']; // mp4 and mov

export default function(API) {
  API.addRoute(
    'videos/',
    { authRequired: false },
    {
      get: function() {
        const videos = Videos.find({}).fetch();

        return {
          status: 'success',
          data: videos,
        };
      },
    }
  );

  API.addRoute(
    'videos/add',
    { authRequired: false },
    {
      post: function() {
        const { projectId, title, fileType, orientation } = this.request.body;

        if (!projectId) {
          return {
            status: 'error',
            message: 'Project ID is required',
          };
        }

        if (!title) {
          return {
            status: 'error',
            message: 'Video title is required',
          };
        }

        if (!fileType) {
          return {
            status: 'error',
            message: 'File type is required',
          };
        }

        if (fileType && allowedFileTypes.indexOf(fileType) === -1) {
          return {
            status: 'error',
            message: 'Only .mp4 and .mov files are accepted file types',
          };
        }

        if (!orientation) {
          return {
            status: 'error',
            message: 'Please specify video orientation (portrait/landscape)',
          };
        }

        return Videos.insert({ title, projectId, fileType, orientation });
      },
    }
  );

  API.addRoute(
    'videos/:videoId',
    { authRequired: true },
    {
      get: function() {
        const video = Videos.findOne({ _id: this.urlParams.id });
        return {
          status: 'success',
          data: video,
        };
      },

      patch: function() {
        const formData = this.request.body;
        const updateAction = Videos.update(
          { _id: this.urlParams.id },
          {
            $set: {
              ...formData,
            },
          }
        );

        return Boolean(updateAction);
      },

      delete: {
        roleRequired: [],
        action: function() {
          // Get userid from headers
          const userId = this.request.headers['x-user-id'];

          if (userId) {
            return !!Videos.remove({ _id: this.urlParams.id, userId });
          }
        },
      },
    }
  );
}
