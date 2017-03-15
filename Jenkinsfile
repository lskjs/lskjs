#!groovy​
node('master') {

    currentBuild.result = "SUCCESS"

    try {

        stage('Checkout') {
            checkout scm
        }

        stage('Install Deps') {
            env.NODE_ENV = "development"
            print "Environment will be: ${env.NODE_ENV}"
            sh 'yarn install'
        }

        stage('Build Project') {
            env.NODE_ENV = 'production'
            print "Environment will be: ${env.NODE_ENV}"
            sh 'yarn run build'
            sh 'cd ./build && yarn install'
        }

        stage('Build Image') {
            def image = docker.build("mgbeta/lsk-example:${env.BUILD_NUMBER}")
            docker.withRegistry('https://hq.mgbeta.ru:5000/', 'docker-registry') {
                image.push()
                image.push('latest')
            }
        }

        stage('Clean build') {
            sh 'rm -rf build'
            mail body: 'project build successful',
                from: 'ci@mgbeta.ru',
                subject: 'project build successful',
                to: 'obt195@gmail.com'
        }

    } catch (err) {
        currentBuild.result = "FAILURE"

        mail body: "project build error is here: ${env.BUILD_URL}" ,
            from: 'ci@mgbeta.ru',
            subject: 'project build failed',
            to: 'obt195@gmail.com'

        throw err
    }

}