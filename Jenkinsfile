#!groovy​
node('master') {

    currentBuild.result = "SUCCESS"

    try {

        stage('Checkout') {
            checkout scm
        }

        stage('Clean previous data') {
            sh 'rm -rf build node_modules'
        }

        stage('Build project') {
            sh 'docker build -f ./Dockerfile.build -t lsk-example-build .'
            sh 'docker run -v `pwd`:/app lsk-example-build'
            sh 'sudo chown -R jenkins:jenkins build node_modules'
        }

        stage('Creating Docker Image') {
            def image = docker.build("lsk-example:${env.BUILD_NUMBER}")
            docker.withRegistry('https://hq.mgbeta.ru:5000/', 'docker-registry') {
                image.push()
                image.push('latest')
            }
        }

        stage('Deploy') {
            sh 'ssh s3 "cd /projects/lsk && sh run.sh"'
        }

        stage('Test connection') {
            sh 'sleep 30'
            httpRequest('http://lsk.mgbeta.ru')
        }

        stage('Clean build') {
            mail body: "lsk-example Build # ${env.BUILD_NUMBER} - SUCCESS:\nCheck console output at ${env.BUILD_URL} to view the results.",
                from: 'ci@mgbeta.ru',
                subject: "lsk-example - Build # ${env.BUILD_NUMBER} - SUCCESS!",
                to: 'obt195@gmail.com, errors@coder24.ru, shitric2@gmail.com'
        }

    } catch (err) {
        currentBuild.result = "FAILURE"

        mail body: "lsk-example - Build # ${env.BUILD_NUMBER} - FAILURE:\nCheck console output at ${env.BUILD_URL} to view the results.",
            from: 'ci@mgbeta.ru',
            subject: "lsk-example - Build # ${env.BUILD_NUMBER} - FAILURE!",
            to: 'obt195@gmail.com, errors@coder24.ru, shitric2@gmail.com'

        throw err
    }

}
