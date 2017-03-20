#!groovy​
node('master') {

    currentBuild.result = "SUCCESS"

    try {

        stage('Checkout') {
            checkout scm
        }

        stage('Preparing data for creating an Docker image') {
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

        stage('Clean build') {
            sh 'rm -rf build'
            mail body: "${env.PROJECT_NAME} - Build # ${env.BUILD_NUMBER} - ${env.BUILD_STATUS}: \n Check console output at ${env.BUILD_URL} to view the results.",
                from: 'ci@mgbeta.ru',
                subject: "${env.PROJECT_NAME} - Build # ${env.BUILD_NUMBER} - ${env.BUILD_STATUS}!",
                to: 'obt195@gmail.com'
        }

    } catch (err) {
        currentBuild.result = "FAILURE"

        mail body: "${env.PROJECT_NAME} - Build # ${env.BUILD_NUMBER} - ${env.BUILD_STATUS}: \n Check console output at ${env.BUILD_URL} to view the results.",
            from: 'ci@mgbeta.ru',
            subject: "${env.PROJECT_NAME} - Build # ${env.BUILD_NUMBER} - ${env.BUILD_STATUS}!",
            to: 'obt195@gmail.com'

        throw err
    }

}