module.exports = function(grunt) {
  // Do grunt-related things in here
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    pagespeed: {
        options: {
        nokey: true,
        url: "https://zhidaorw.com/m2/reading/#/"
      },
      prod: {
        options: {
          url: "https://zhidaorw.com/m2/reading/#/",
          locale: "en_GB",
          strategy: "des  ktop",
          threshold: 80
        }
      },
      paths: {
        options: {
          paths: ["https://zhidaorw.com/m2/reading/#/"],
          locale: "en_GB",
          strategy: "mobile",
          threshold: 80
        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-pagespeed');

};