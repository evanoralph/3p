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
        const { projectId, title } = this.request.body;

        if (!projectId || !title) {
          return {
            status: 'error',
            message: 'Project ID / Video Title is required',
          };
        }

        return !!Videos.insert({ title, projectId });
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
        const formData = this.request.query;
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
