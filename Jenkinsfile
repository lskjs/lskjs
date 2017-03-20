#!groovy​
node('master') {

    currentBuild.result = "SUCCESS"

    try {

        stage('Checkout') {
            checkout scm
        }

        stage('Preparing data for creating an Docker image') {
            sh 'rm -rf build'
            sh 'docker build -f ./Dockerfile.build -t lsk-example-build .'
            sh 'docker run -v `pwd`:/app lsk-example-build'
            sh 'sudo chown -R jenkins:jenkins build'
        }

        stage('Creating Docker Image') {
            def image = docker.build("lsk-example:${env.BUILD_NUMBER}")
            docker.withRegistry('https://hq.mgbeta.ru:5000/', 'docker-registry') {
                image.push()
                image.push('latest')
            }
        }

        stage('Clean build') {
            mail body: "lsk-example Build # ${env.BUILD_NUMBER} - SUCCESS:\nCheck console output at ${env.BUILD_URL} to view the results.",
                from: 'ci@mgbeta.ru',
                subject: "lsk-example - Build # ${env.BUILD_NUMBER} - SUCCESS!",
                to: 'obt195@gmail.com'
        }

        stage('Deploy') {
            sh 'ssh s3 "cd /projects/lsk && sh run.sh"'
        }

        stage('Test connection') {
            timeout(5, 'SECONDS')
            sh 'wget -q "http://lsk.mgbeta.ru" -O /dev/null'
        }

    } catch (err) {
        currentBuild.result = "FAILURE"

        mail body: "lsk-example - Build # ${env.BUILD_NUMBER} - FAILURE:\nCheck console output at ${env.BUILD_URL} to view the results.",
            from: 'ci@mgbeta.ru',
            subject: "lsk-example - Build # ${env.BUILD_NUMBER} - FAILURE!",
            to: 'obt195@gmail.com'

        throw err
    }

}