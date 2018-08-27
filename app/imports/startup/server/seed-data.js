import Projects from '../../api/projects/projects';
import Videos from '../../api/videos/videos';
import VideoAnalytics from '../../api/video_analytics/video_analytics';

const projectName = 'Macejkovid-Barrows';

let seedVideos = [
  {
    title: 'Marketing Promo 1',
    url: 'https://s3-ap-southeast-1.amazonaws.com/3p.touch/videos/bunny.mp4',
    thumbnail: 'https://dummyimage.com/215x233.png/dddddd/000000',
    duration: 120000,
    isPublished: true,
    publishDate: new Date(),
    tags: [
      {
        title: 'Product 1',
        description: 'Product 1 Promotion',
        type: 'buy-now',
        sourceUrl: 'https://techcrunch.com/habitasse/platea/dictumst.aspx',
        thumbnail: 'https://dummyimage.com/215x233.png/dddddd/000000',
        coordinates: {
          "x": 115.431153,
          "y": 31.695648
        },
        durationStart: 70000,
        durationEnd: 80000
      }
    ],
    uploadedAt: new Date()
  },
  {
    title: 'Marketing Promo 2',
    url: 'https://www.youtube.com/watch?v=k70oOzOpcY4',
    thumbnail: 'https://dummyimage.com/215x233.png/dddddd/000000',
    duration: 120000,
    isPublished: false,
    tags: [
      {
        title: 'Product 2',
        description: 'Product 2 Promotion',
        type: 'more-info',
        sourceUrl: 'https://instagram.com/massa/id/lobortis/convallis/tortor.jpg',
        thumbnail: 'https://dummyimage.com/215x233.png/dddddd/000000',
        coordinates: {
          "x": 112.206895,
          "y": 28.600129
        },
        durationStart: 70000,
        durationEnd: 80000
      }
    ],
    uploadedAt: new Date()
  }
]

export default function() {
  Meteor.users.remove({});
  Projects.remove({});
  Videos.remove({});

  // Create test account
  const userId = Accounts.createUser({
    email: 'testaccount1@3ptouchmedia.com',
    password: '3ptouchtest',
    username: '3ptouch',
    profile: {
      firstName: 'Tester',
      lastName: 'Account',
      birthday: '10-28-1990',
      avatar:
        'http://www.dealnetcapital.com/wp-content/blogs.dir/9/files/2014/10/blank-profile-300x203.png',
    },
  });

  // Create test project
  const projectId = Projects.insert({ userId, projectName });

  // Attach projectId to seedVideos
  seedVideos.map( video => {
    Videos.insert({
      ...video,
      projectId
    })
  });
}
