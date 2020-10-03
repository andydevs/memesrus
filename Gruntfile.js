/**
 * Your one stop shop for the freshest memes
 * 
 * Author:  Anshul Kharbanda
 * Created: 9 - 25 - 2020
 */
const path = require('path')

module.exports = function configureGrunt(grunt) {
    /**
     * Base configuration of grunt
     */
    grunt.initConfig({
        run: {
            db_clear: {
                args: [
                    path.resolve(__dirname, 'scripts/db/clear.js')
                ]
            },
            db_seed: {
                args: [
                    path.resolve(__dirname, 'scripts/db/seed.js')
                ]
            }
        },
        express: {
            dev: {
                options: {
                    script: path.resolve(__dirname, 'server/index.js')
                }
            }
        },
        watch: {
            server: {
                files: ['server/**/*.js'],
                tasks: ['express:dev'],
                options: {
                    spawn: false
                }
            }
        }
    })

    // Load tasks from npm modules
    grunt.loadNpmTasks('grunt-run')
    grunt.loadNpmTasks('grunt-express-server')
    grunt.loadNpmTasks('grunt-contrib-watch')

    // Register tasks
    grunt.registerTask('serve', ['express:dev', 'watch'])
    grunt.registerTask('db:clear', ['run:db_clear'])
    grunt.registerTask('db:seed', ['run:db_seed'])
    grunt.registerTask('db:reset', ['db:clear', 'db:seed'])
}