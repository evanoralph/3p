// Collections
import Projects from '../../api/projects/projects';
import Videos from '../../api/videos/videos';
import VideoAnalytics from '../../api/video_analytics/video_analytics';

// API Endpoints
import ProjectEndpoints from '../../api/projects/endpoints';
import VideoEndpoints from '../../api/videos/endpoints';
import VideoAnalyticsEndpoints from '../../api/video_analytics/endpoints';
import UserEndpoints from '../../api/users/endpoints';

if (Meteor.isServer) {
  const API = new Restivus({
    version: 'v1',
    useDefaultAuth: true,
    prettyJson: true,
  });

  // Initialize collections
  API.addCollection(Projects);
  API.addCollection(Videos);
  API.addCollection(VideoAnalytics);

  API.addCollection(Meteor.users, {
    excludedEndpoints: ['patch', 'put', 'getAll'],
    routeOptions: {
      authRequired: false,
    },
    endpoints: {
      post: {
        authRequired: false,
      },
      delete: {
        roleRequired: 'admin',
      },
    },
  });

  // Run endpoints init
  ProjectEndpoints(API);
  UserEndpoints(API);
}
