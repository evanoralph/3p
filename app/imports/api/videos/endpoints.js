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
        const { title, url } = this.request.query;

        if (!title || !url) {
          return {
            status: 'error',
            message: 'Title / Video URL is required',
          };
        }

        return !!Videos.insert({ title, url });
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
