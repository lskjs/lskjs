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
            mail body: "$PROJECT_NAME - Build # $BUILD_NUMBER - $BUILD_STATUS: \n Check console output at $BUILD_URL to view the results.",
                from: 'ci@mgbeta.ru',
                subject: "$PROJECT_NAME - Build # $BUILD_NUMBER - $BUILD_STATUS!",
                to: 'obt195@gmail.com'
        }

    } catch (err) {
        currentBuild.result = "FAILURE"

        mail body: "$PROJECT_NAME - Build # $BUILD_NUMBER - $BUILD_STATUS: \n Check console output at $BUILD_URL to view the results.",
            from: 'ci@mgbeta.ru',
            subject: "$PROJECT_NAME - Build # $BUILD_NUMBER - $BUILD_STATUS!",
            to: 'obt195@gmail.com'

        throw err
    }

}