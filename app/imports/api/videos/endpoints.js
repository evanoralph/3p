import Videos from '../videos/videos';

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
        const { projectId, title, fileType } = this.request.body;

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

        return Videos.insert({ title, projectId, fileType });
      },
    }
  );

  API.addRoute(
    'videos/:videoId',
    { authRequired: false },
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
          return !!Videos.remove({ _id: this.urlParams.id });
        },
      },
    }
  );
}
