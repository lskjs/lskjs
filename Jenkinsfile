node('node') {

    currentBuild.result = "SUCCESS"

    try {

       stage 'Checkout'

            checkout scm

       stage 'Install Deps'

            env.NODE_ENV = "development"
            print "Environment will be : ${env.NODE_ENV}"

            sh 'node -v'
            sh 'yarn prune'
            sh 'yarn install'

       stage 'Build Project'

            env.NODE_ENV = 'production'
            print "Environment will be : ${env.NODE_ENV}"

            sh 'yarn run build'
            sh 'cd ./build'
            sh 'yarn install'
            sh 'cd ..'

       stage 'Build Image'

            def image = docker.build "mgbeta/lsk-example:${env.BUILD_TAG}"
            image.push()

       stage 'Test Image'

            print "Here, testing the image"

       stage 'Approve Image'

            image.push 'latest'

       stage 'Cleanup'

            echo 'prune and cleanup'
            sh 'yarn prune'
            sh 'rm node_modules -rf'

            mail body: 'project build successful',
            from: 'ci@mgbeta.ru',
            subject: 'project build successful',
            to: 'obt195@gmail.com'

        }


    catch (err) {

        currentBuild.result = "FAILURE"

            mail body: "project build error is here: ${env.BUILD_URL}" ,
            from: 'ci@mgbeta.ru',
            subject: 'project build failed',
            to: 'obt195@gmail.com'

        throw err
    }

}