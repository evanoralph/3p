import Videos from '../videos/videos';
const Projects = new Mongo.Collection('projects');

// Delete associated videos when a project is deleted
Projects.after.remove((userId, doc) => {

  // Get project id
  const projectId = doc._id;
  // Remove videos
  Videos.remove({ projectId });

})

export default Projects;